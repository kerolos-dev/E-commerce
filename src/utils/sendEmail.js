import  nodemailer   from "nodemailer" 



export async function sendMassega({to,subject,text,html}){

    const transporter = nodemailer.createTransport({
      host: "localhost",
      port:3000,
      secure: true, // Use `true` for port 465, `false` for all other ports
      service: "gmail",
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.PASSUSER,
      },
    });
    // async..await is not allowed in global scope, must use a wrapper
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: `  kerolos  e-commeras  app  👻, <${process.env.EMAILUSER}>`  , // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html,// html body
      });
    
  //  console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    
    
    // main().catch(console.error);
   if(info.accepted.length > 0) return  true;
   return false;   
  }
  

