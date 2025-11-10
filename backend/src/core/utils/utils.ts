import PrismaService from '@infra/database/prisma.service';

export async function isAnUser(
  database: PrismaService,
  userid: number,
): Promise<boolean> {
  if (!userid) return false;
  try {
    const user = await database.user.findFirst({
      where: {
        id: userid,
      },
    });
    return user?.id ? true : false;
  } catch (error) {
    return false;
  }
}
