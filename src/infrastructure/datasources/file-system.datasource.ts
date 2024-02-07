import fs from 'fs';
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSevertyLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDataSource {

    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/logs-all.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () =>{
        if( !fs.existsSync(this.logPath) ){
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path=> {
            if(fs.existsSync(path)) return
            fs.writeFileSync(path, '');
        })
    }


    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson =  `${JSON.stringify(newLog)}\n`
        //añade linea al final sin necesidad de leer el archivo
        fs.appendFileSync(this.allLogsPath, logAsJson)

        if(newLog.level === LogSevertyLevel.low) return;

        if(newLog.level === LogSevertyLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath,  logAsJson)
        } else {
            fs.appendFileSync(this.highLogsPath,  logAsJson)
        }

    }

    private getLogsFromFile = (path:string):LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8')
        const logs = content.split('\n').map(LogEntity.fromJson);
        // const logs = content.split('\n').map( //otra forma
        //     log => LogEntity.fromJson(log)
        // );

        return logs
    }

    async getLogs(severityLevel: LogSevertyLevel): Promise<LogEntity[]> {

        switch (severityLevel) {
            case LogSevertyLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSevertyLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSevertyLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${severityLevel} not implemented`)   
        }

    }

}


