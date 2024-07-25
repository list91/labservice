import { Injectable } from '@nestjs/common';
import { createWriteStream, mkdirSync, unlinkSync } from 'fs';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  async saveFiles(files: any[]): Promise<string[]> {
    const savedFileNames: string[] = [];
    for (const file of files) {
      const tempFileName = uuidv4(); // Генерация уникального имени файла
      const typeDir = file.mimetype.startsWith('image/') ? 'img' : file.mimetype.startsWith('application/') ? 'docs' : 'other';
      const fileName = `${tempFileName}-${file.originalname}`; // Генерация окончательного имени файла
      const filePath = join(__dirname, 'uploads', typeDir, fileName); // Полный путь для сохранения файла

      const directory = dirname(filePath);
      mkdirSync(directory, { recursive: true });
      const writeStream = createWriteStream(filePath);
      writeStream.write(file.buffer); // Запись содержимого файла
      writeStream.end();
      savedFileNames.push(filePath); // Сохранение полного пути к сохраненному файлу
    }
    return savedFileNames;
  }
  async deleteFiles(filePaths: string[]): Promise<void> {
    for (const filePath of filePaths) {
      try {
        unlinkSync(filePath); // Удаление файла с указанным путем
        console.log(`File deleted: ${filePath}`);
      } catch (error) {
        console.error(`Error deleting file ${filePath}: ${error}`);
      }

    }

  }
}
