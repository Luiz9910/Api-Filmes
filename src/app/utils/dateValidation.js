function validateDate(date) {
    const dateNow = new Date();
    let dateNowBr = dateNow.toLocaleDateString("pt-BR");
    dateNowBr = dateNowBr.replace(/\D/g, "")

    date = date.toLocaleDateString("pt-BR");
    date = date.replace(/\D/g, "")

    if (date == dateNowBr) return false
    return true
}


module.exports = validateDate;
