const bodyParser = require('body-parser')
const express = require("express")
const app = express()
const router = require("./routes/routes")

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/",router);

app.listen(8686,() => {
    console.log("Servidor rodando")
});
