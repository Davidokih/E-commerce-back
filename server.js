require('./utils/db');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 1111;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', require('./router/router'));
app.use("/api/item", require("./router/itemsRouter"));

app.use("/api/item/like", require("./router/likeRouter"));
app.use("/api/item/rating", require("./router/ratingRouter"));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});