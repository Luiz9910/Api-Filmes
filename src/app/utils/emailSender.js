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
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    justify-content: center;
                }

                svg {
                    margin-top: 4px;
                }

                .logo {
                    text-transform: uppercase;
                    color: #4CAF50;
                    font-size: 2.5rem;
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

                @media (max-width: 700px) {
                    main {
                    background-color: #D9D9D9;
                    padding: 0 0;
                    height: 100vh;
                    }
                }
            </style>
        </head>
        <body>
            <header>
                <p class="logo">GOFLIX</p>
                <svg width="35" height="35" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="27" height="27" fill="url(#pattern0)"/>
                    <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_4_2" transform="scale(0.00195312)"/>
                    </pattern>
                    <image id="image0_4_2" width="512" height="512" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAIABJREFUeAHt3Xu0ZGlZ3/HTXLyBtxVFvMULEYhZywQngtEsM4k42F1vnXqrJ0dRTESTwX8SRdRE44U2WYkKaozGyGS5RNBEbKfrrZ4hw2BC8BKTiBhUcBlBuehKQBCiw0VhhjlZu/uc7l1Vu2rvc+qp7lNnf2atWaf2u3ftrvrW83vet3bV+Z6dHf8hgAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAmsQ2Lu49+jdy7tPGpb8Zank70iT8YuG09HLUsn3+f9kMRhORy8d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AAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQGCbCPx/Q76QS0iqOm8AAAAASUVORK5CYII="/>
                    </defs>
                    </svg>
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
        </html>`;

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "dbb7caae4eab07",
                pass: "60cdd19a5b854e",
            },
        });

        await transport.sendMail({
            from: "GoFlix <GOFLIX@gmail.com>",
            to: email,
            subject: "Password recovery",
            html: html1,
        });

        return true;
    } catch (err) {
        return false;
    }
};
