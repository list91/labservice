import { Injectable } from '@nestjs/common';
import { createWriteStream, mkdirSync } from 'fs';
import { dirname, join } from 'path';

@Injectable()
export class FileService {
  async saveFiles(files: any[]): Promise<string[]> {
    const savedFileNames: string[] = [];

    for (const file of files) {
      const filename = file.originalname; // Имя исходного файла
    //   if (file.mimetype) {
        var type_dir = ""
        if(file.mimetype.includes("image/")) {
            type_dir = "img"
        } else if (file.mimetype.includes("application/")) {
            type_dir = "docs"
        } else {
            type_dir = "other"
        }
      const filePath = join(__dirname, 'uploads', type_dir, filename); // Полный путь для сохранения файла

        const directory = dirname(filePath);

        mkdirSync(directory, { recursive: true });

      // Создание потока для записи файла
      const writeStream = createWriteStream(filePath);
      writeStream.write(file.buffer); // Запись содержимого файла

      // Закрытие потока записи
      writeStream.end();

      savedFileNames.push(filename);
    }

    return savedFileNames;
  }
}
