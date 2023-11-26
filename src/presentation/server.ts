import { CheckService } from "../domain/use-cases/checks/check-services";
import { CronService } from "./cron/cron-service";


export class Server {
    public static start(){
        console.log('Server Started...');
        CronService.createJob(
            '*/5 * * * * * ',
            ()=>{
                const url = 'https://google.com' 
                new CheckService(
                    ()=>{console.log(`${url} is ok`)},
                    (error)=>{console.error(error)}
                ).execute(url)
                // new CheckService().execute('http://localhost:3000')
            }
        );
    
     
    }

}