const nodemailer = require("nodemailer");

module.exports = async (email, token) => {
    try {

        let html1 = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>

                <!--GOOGLE FONTS-->
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap" rel="stylesheet">

                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: Arial, Helvetica, sans-serif   ;
                    }

                    header {
                        background-color: #11111F;
                        padding: 30px 10px;
                    }

                    .logo {
                        text-transform: uppercase;
                        color: #4CAF50;
                        font-size: 2.5rem;
                        text-align: center;
                        font-family: 'Bree Serif', serif;
                    }

                    main {
                        background-color: #D9D9D9;
                        padding: 0 40px;
                        height: 100vh;
                    }

                    main > div {
                        height: 100vh;
                        background-color: white;
                        margin: 0 auto;
                        max-width: 1200px;
                        text-align: center;
                        padding: 40px 0;
                    }

                    main > div > h1 {
                        font-size: 1.7rem;
                    }

                    main > div > p {
                        color: #595151;
                        text-align: center;
                        margin-top: 12px;
                        font-style: normal;
                        font-weight: 700;
                        line-height: normal;
                    }

                    .container {
                        display: inline-block;
                        margin: 70px auto;
                        padding: 10px 20px;
                        border-radius: 0.25rem;
                        border: 1px solid #B4ABAB;
                        background: #D9D9D9;
                        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                    }

                    .resultado {
                        color: #000;
                        font-size: 2.2rem;
                        font-style: normal;
                        font-weight: 700;
                        line-height: normal;
                    }

                    .aviso {
                        max-width: 570px;
                        margin: 0 auto;
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <header>
                    <p class="logo">GOFLIX</p>
                </header>
                <main>
                    <div>
                        <h1>RECUPERAÇÃO DE SENHA</h1>
                        <p>Use o código de verificação abaixo para recuperar sua senha</p>
                        <div class="container"><p class="resultado">${token}</p></div>
                        <p class="aviso">Você recebeu este e-mail porque solicitou sua recuperação de senha.
                            Caso essa solicitação não seja sua, pedimos que ignore este e-mail.</p>
                    </div>
                </main>
            </body>
            </html>
            `

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
            html: html1
        })

        return true
    } catch (err) {
        return false
    }
}
