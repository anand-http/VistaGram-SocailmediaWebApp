import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {

    // const transporter = nodemailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     service: process.env.SMTP_SERVICE,
    //     auth: {
    //         user: process.env.SMTP_MAIL,
    //         pass: process.env.SMTP_PASSWORD
    //     }


    // });
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "28c6fd85c8be69",
            pass: "8cb2c9a2aea609"
        }
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions);


}