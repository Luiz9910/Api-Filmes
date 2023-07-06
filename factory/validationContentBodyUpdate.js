module.exports = function validateContentBodyUpdate(contentBody) {
    let data = {};

    for (let content in contentBody) {
        if (contentBody[content] != undefined && contentBody[content].length > 0) {
            
            data[content] = contentBody[content];
        }
    }

    return data;
}
  