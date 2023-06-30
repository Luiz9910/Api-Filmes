const express = require("express");
const app = express();
const router = require("./routes/routes");

// parse application/json
app.use("/favicon.ico", express.static("src/images/favicon.ico"));
app.use(express.json());
app.use(router);

app.listen(8686,() => {
    console.log("Server listening on");
});