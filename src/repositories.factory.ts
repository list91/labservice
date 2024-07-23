import { Injectable } from "@nestjs/common";
import { Connection, Repository } from "typeorm";

@Injectable()
export class RepositoriesFactory {
    constructor(
        private connection: Connection
    ){}
    getRepository<T>(entity: string): Repository<T> {
        return this.connection.getRepository(entity);
    }
}
