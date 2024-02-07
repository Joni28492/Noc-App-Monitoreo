import { LogEntity, LogSevertyLevel } from "../entities/log.entity";


export abstract class LogDataSource {
    abstract saveLog(log:LogEntity): Promise<void>;
    abstract getLogs(severityLevel:LogSevertyLevel): Promise<LogEntity[]>;
}



