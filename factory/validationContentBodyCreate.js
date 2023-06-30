module.exports = function validateContentBodyCreate(contentBody) {
    const invalidFields = {};

    for (let field in contentBody) {
        if (contentBody[field] === undefined || contentBody[field].length === 0) {
            invalidFields[field] = `Invalid ${field}`;
        }
    }

    return invalidFields;
}