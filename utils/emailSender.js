const nodemailer = require("nodemailer");

module.exports = async (email) => {
    try {
        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "6cd5497f5762b5",
              pass: "15dfdbcb88b69d"
            }
        });

        await transport.sendMail({
            from: 'GoFlix <GOFLIX@gmail.com>',
            to: email,
            subject: "Password recovery",
            html: "ds"
        })

        return true
    } catch (err) {
        return false
    }
}
