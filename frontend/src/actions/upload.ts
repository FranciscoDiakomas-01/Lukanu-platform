export async function uploadAction(formData: FormData) {
  const cover = formData.get("coverUrl") as File | null;
  const pdf = formData.get("fileURl") as File | null;
  const server = "https://api.uploadthing.com/v6/uploadFiles";
  const key =
    "sk_live_b5436731c71f7fdc40d8ca8f4ce97a3f7dedf184787f53fe2dedd3a7ccf1ea50";
  if (!server || !key) {
    throw new Error("Variáveis de ambiente não configuradas");
  }
  if (!cover || !pdf) {
    return {
      success: false,
      message: "Arquivos não fornecidos",
    };
  }
  try {
    const createUploadReq = async (file: File) => {
      const resp = await fetch(server, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Uploadthing-Api-Key": key,
        },
        body: JSON.stringify({
          files: [
            {
              name: file.name,
              size: file.size,
              type: file.type,
              customId: null,
            },
          ],
          acl: "public-read",
          metadata: null,
          contentDisposition: "inline",
        }),
      });

      if (!resp.ok) {
        throw new Error("Erro ao criar sessão de upload");
      }

      return resp.json();
    };
    const [coverSession, pdfSession] = await Promise.all([
      createUploadReq(cover),
      createUploadReq(pdf),
    ]);

    const coverUploadData = coverSession?.data?.[0];
    const pdfUploadData = pdfSession?.data?.[0];

    if (!coverUploadData || !pdfUploadData) {
      return {
        success: false,
        message: "Erro ao gerar URLs de upload",
      };
    }

    const uploadToBucket = async (
      file: File,
      uploadData: any
    ): Promise<string> => {
      const form = new FormData();

      Object.entries(uploadData.fields).forEach(([k, v]) =>
        form.append(k, v as string)
      );

      form.append("file", file);

      const res = await fetch(uploadData.url, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        console.error("Erro ao subir arquivo:", await res.text());
        throw new Error("Erro ao fazer upload no bucket");
      }

      return uploadData.fileUrl as string;
    };

    const [coverUrl, pdfUrl] = await Promise.all([
      uploadToBucket(cover, coverUploadData),
      uploadToBucket(pdf, pdfUploadData),
    ]);

    return {
      success: true,
      coverUrl,
      pdfUrl,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.message ??
        error?.error ??
        error?.cause ??
        "Erro ao slavar os arquivos",
    };
  }
}


export async function uploadSingleFile(file: File) {
  const server = "https://api.uploadthing.com/v6/uploadFiles";
  const key =
    "sk_live_b5436731c71f7fdc40d8ca8f4ce97a3f7dedf184787f53fe2dedd3a7ccf1ea50";

  if (!server || !key) {
    throw new Error("Variáveis de ambiente não configuradas");
  }

  if (!file) {
    return {
      success: false,
      message: "Nenhum arquivo fornecido",
    };
  }

  try {
    // 1. Criar sessão de upload
    const sessionRes = await fetch(server, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Uploadthing-Api-Key": key,
      },
      body: JSON.stringify({
        files: [
          {
            name: file.name,
            size: file.size,
            type: file.type,
            customId: null,
          },
        ],
        acl: "public-read",
        metadata: null,
        contentDisposition: "inline",
      }),
    });

    if (!sessionRes.ok) {
      const err = await sessionRes.text();
      return {
        success: false,
        message: "Erro ao iniciar sessão de upload: " + err,
      };
    }

    const sessionData = await sessionRes.json();
    const upload = sessionData?.data?.[0];

    if (!upload) {
      return {
        success: false,
        message: "Falha ao gerar URL de upload",
      };
    }

    // 2. Enviar arquivo ao bucket
    const form = new FormData();
    Object.entries(upload.fields).forEach(([k, v]) =>
      form.append(k, v as string)
    );
    form.append("file", file);

    const uploadRes = await fetch(upload.url, {
      method: "POST",
      body: form,
    });

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      return {
        success: false,
        message: "Erro ao subir arquivo: " + errText,
      };
    }

    // 3. Retornar URL pública
    return {
      success: true,
      url: upload.fileUrl as string,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.message ??
        error?.error ??
        error?.cause ??
        "Erro inesperado ao enviar arquivo",
    };
  }
}
