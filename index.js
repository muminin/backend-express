const express = require('express'),
    app = express(),
    port = 3001;

/**
    CORS merupakan singkatan dari Cross Origin Resource Sharing, yaitu sebuah teknik menggunakan permintaan HTTP
    untuk mengizinkan browser pada suatu domain mendapatkan akses ke server pada sumber yang berbeda.
    Ini digunakan agar Retful API yang sudah kita buat sebelumnya bisa digunakan atau bisa di akses oleh
    aplikasi lain seperti aplikasi Android atau web browser.
*/
const cors = require('cors');

// Use Cors
app.use(cors());

/**
    Body Parser merupakan library yang berisi middleware untuk membaca sebuah data yang dikirimkan oleh HTTP POST
    dan menyimpannya sebagai objek JavaScript yang dapat di akses melalui req.body.

    Menggunakan keyword use untuk melakukan assign library tersebut ke dalam project Express.js.
*/
const bodyParser = require('body-parser');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false,
}));

// Parse application/json
app.use(bodyParser.json());

// Import Route Posts
const postRouter = require('./routes/posts');

// Use Route Posts di Express
app.use('/api/post', postRouter);

app.listen(port, () => {
    console.log(`App Running at https://localhost:${port}`);
})