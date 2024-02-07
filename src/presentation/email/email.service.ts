import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';



interface SendMailOptions {
    to:string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]

}

interface Attachment {
    filename: string;
    path:string;
}

//todo Attachments: Adjuntos

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });


    async sendEmail(options:SendMailOptions):Promise<boolean>{

        const {to, subject, htmlBody, attachments = []} = options;

        try {
            const sendInformation = await this.transporter.sendMail({
                to:to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            })

            console.log(sendInformation);
            console.log("Correo enviado correctamente");

            return true
        } catch (error) {
            return false            
        }
    }

    async sendEmailWithFileSystemLogs(to:string | string[] ){
        const subject = 'Logs del servidor' 
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p>Viene con los txt de los logs</p>
            <p>Ver logs Adjuntos</p>
        `;

        const attachments:Attachment[] = [
            {filename: 'logs-all.log', path: './logs/logs-all.log'},
            {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
            {filename: 'logs-high.log', path: './logs/logs-high.log'},
        ];

        return this.sendEmail({to, subject,attachments, htmlBody})
    }


}

