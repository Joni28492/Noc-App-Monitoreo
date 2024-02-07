import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-services";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService} from "./email/email.service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
    // new postgressDatasource(), //aqui es donde podriamos cambiar
    // new mongoDatasource(), //aqui es donde podriamos cambiar

)



export class Server {
    public static start(){
        console.log('Server Started...');


        //mandar email

        // const emailService = new EmailService()
        // emailService.sendEmailWithFileSystemLogs(
        //     ['correo@gmail.com']
        // )
        // emailService.sendEmail({
        //     to: 'correo@gmail.com',
        //     subject: 'logs de sistema',
        //     htmlBody: `
        //         <h3>Logs de sistema - NOC</h3>
        //         <p>Texto de reelleno no me apetece hacer un lorem</p>
        //         <p>Ver logs Adjuntos</p>
        //     `
        // })

        // CronService.createJob(
        //     '*/5 * * * * * ',
        //     ()=>{
        //         const url = 'https://google.com';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             ()=> console.log(`${url} is ok`),
        //             (error)=>console.log(error)
        //         ).execute(url)
        //     }    
        // );
    
     
    }

}