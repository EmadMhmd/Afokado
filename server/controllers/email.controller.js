const emailController = {};
const nodemailer = require('nodemailer');


emailController.sendNewMail = (email , body , header) => {

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
    const mailOption = {
        from: 'afokadolawyer@gmail.com',
        to: email,
        subject: header,
        text: body
    }

    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            return res.status(401).send({
                error: 'email sended failed !!'
            });
        }
    })

};

module.exports = emailController;