import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSevertyLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";



export class LogRepositoryImpl implements LogRepository {


    constructor(
        private readonly logDataSource:LogDataSource //<--- fs, mongo, sql etc...
    ){}

    async saveLog(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog(log)
    }
    async getLogs(severityLevel: LogSevertyLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel)
    }

}