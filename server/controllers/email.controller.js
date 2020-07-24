const emailController = {};
const nodemailer = require('nodemailer');
const ejs = require('ejs')


emailController.sendNewMail = async (email , body , header) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "afokadolawyer@gmail.com",
            pass: "emad1998"
        },
        tls: {
            rejectUnauthorized: false
        }
    });
     await  ejs.renderFile("./views/email.ejs" ,{body : body},function(err , data){
        if(err){
           return {error: 'email sended failed !!' };
        }
        else{
            const mailOption = {
                from: 'afokadolawyer@gmail.com',
                to: email,
                subject: header,
                html : data
                 }
         transporter.sendMail(mailOption, (err, info) => {     
                    if (err) {
                        return {error: 'email sended failed !!'};
                    }
                })
        }
    })
           
            
};

module.exports = emailController;