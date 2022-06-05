// require('./utils/db');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 1111;

const app = express();
const url = process.env.URL;
mongoose.connect(url).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log(err);
});
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status("success").json({
        message: "It works"
    });
});
app.use('/api/user', require('./router/router'));
app.use("/api/item", require("./router/itemsRouter"));

app.use("/api/item/like", require("./router/likeRouter"));
app.use("/api/item/rating", require("./router/ratingRouter"));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});