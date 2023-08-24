const express = require("express");
const app = express();
const router = require("./src/routes/routes");
const helmet = require('helmet');

app.use(helmet());

// parse application/json
app.use(express.json());
app.use(router);

app.listen(8686,() => {
    console.log("Server listening on");
});
