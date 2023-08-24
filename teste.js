const date = new Date();
let nowDate = date.toLocaleDateString('pt-BR');
let nowTime = date.toLocaleTimeString("pt-BR", {
    hour12: false,
    timeZone: "America/Sao_Paulo",
});
date.setMinutes(date.getMinutes() + 1);

let data = "24-08-2023"

function validateDate(dateD, dateAtual) {
    dateD = dateD.replace(/\D/g, "")
    dateAtual = dateAtual.replace(/\D/g, "")

    if (dateD == dateAtual) return false
    return true
}

validateDate(data, nowDate)

