const knex = require("../../database/connection");
const User = require("./User");

class PasswordToken {
    async create(email) {
        let resultUser = await User.findEmail(email);

        let numerosAleatorios = [];
        for (let i = 0; i < 6; i++) {
            numerosAleatorios.push(Math.round(Math.random() * 9));
        }

        const token = numerosAleatorios.join("");

        const date = new Date();
        const nowDate = date.toISOString().substring(0, 10);
        const nowTime = date.toLocaleTimeString("pt-BR", {
            hour12: false,
            timeZone: "America/Sao_Paulo",
        });

        if (resultUser != undefined) {
            try {
                const responseDeleteToken = await this.delete(email);
                if (!responseDeleteToken.status) {
                    return {
                        status: false,
                        err: "Failed to delete token",
                        estate: 500,
                    };
                }

                await knex
                    .insert({
                        token,
                        user_email: resultUser.result[0].email,
                        date_expiration: nowDate,
                        time_expiration: nowTime,
                    })
                    .table("passwordtokens");
                return { status: true, token };
            } catch (err) {
                return { status: false, err: err, estate: 400 };
            }
        } else {
            return {
                status: false,
                err: "user not Found, email not exist",
                estate: 404,
            };
        }
    }

    async delete(email) {
        try {
            await knex
                .delete()
                .where({ user_email: email })
                .table("passwordtokens");
            return { status: true };
        } catch (err) {
            return { status: false, err: "Error deleting token" };
        }
    }

    async findPasswordToken(token) {
        try {
            const resultEmailToRecover = await knex
                .select()
                .where({ token })
                .table("passwordtokens");
            return { status: true, result: resultEmailToRecover };
        } catch (err) {
            return { status: false, err: "Error finding token" };
        }
    }
}

module.exports = new PasswordToken();
