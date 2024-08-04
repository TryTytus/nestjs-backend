import { diskStorage } from "multer";

const getFilename = (originalname: string): string => {
    const date = Date.now();
    const randomDigits = Math.round(Math.random() * 1e9)
    const ext = originalname.split('.').pop()

    return `${date}-${randomDigits}.${ext}`
}


export const storage = {
    storage: diskStorage({
      destination: './public',
      filename: (req, file, callback) => {
        callback(
          null,
          getFilename(file.originalname),
        );
      },
    }),
  }