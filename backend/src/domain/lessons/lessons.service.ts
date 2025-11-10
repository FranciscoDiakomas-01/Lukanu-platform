import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import PrismaService from '@infra/database/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateLessonDto, userId: number) {
    const isACourse = await this.prisma.course.findFirst({
      where: {
        id: data.courseId,
      },
    });

    if (!isACourse) {
      throw new NotFoundException('Curso não encontrado');
    }
    if (isACourse?.isPublished) {
      throw new ConflictException('Curso ja foi publicado');
    }
    const [lesson] = await this.prisma.$transaction([
      this.prisma.lesson.create({
        data,
      }),
      this.prisma.notification.create({
        data: {
          title: 'Nova aula criada',
          message: `Acabaste de registrar uma nova aula no curo de ${isACourse.title}`,
          userId,
        },
      }),
      this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          totalUnreadNotification: {
            increment: 1,
          },
        },
      }),
      this.prisma.course.update({
        data: {
          totalLessons: {
            increment: 1,
          },
        },
        where: {
          id: isACourse.id,
        },
      }),
    ]);
    return {
      data: lesson,
      sucess: true,
    };
  }
  async update(id: number, data: CreateLessonDto) {
    try {
      await this.prisma.lesson.update({
        data: {
          title: data.title,
          description: data.description,
          tags: data.tags,
          videoURl: data.videoURl,
        },
        where: {
          id,
        },
      });

      return {
        sucess: true,
      };
    } catch (error) {
      throw new BadRequestException(
        error?.message ??
          error?.cause ??
          error?.error ??
          'Erro ao actualizar a aula',
      );
    }
  }
  async remove(id: number, userId: number) {
    this.prisma.lesson
      .delete({
        where: {
          id,
        },
        include: {
          Course: true,
        },
      })
      .then(async (data) => {
        await this.prisma.$transaction([
          this.prisma.course.update({
            data: {
              totalLessons: {
                decrement: 1,
              },
            },
            where: {
              id: data.courseId,
            },
          }),
          this.prisma.notification.create({
            data: {
              title: 'Remoção de Aula',
              message: `Removeste a aula ${data.title} do curso de ${data.Course.title}`,
              userId,
            },
          }),
          this.prisma.user.update({
            data: {
              totalUnreadNotification: {
                increment: 1,
              },
            },
            where: {
              id: userId,
            },
          }),
        ]);
        return {
          sucess: true,
        };
      })
      .catch((error) => {
        throw new BadRequestException(
          error?.message ??
            error?.cause ??
            error?.error ??
            'Erro ao actualizar a aula',
        );
      });
  }
}
