const express = require('express'),
    router = express.Router();

// Import Express Validator
const { body, validationResult } = require('express-validator');

// Import Database
const connection = require('../config/database');

// Index Get
router.get('/', function (req, res) {
    // Query
    connection.query('SELECT * FROM posts ORDER BY id desc', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: `Internal Server Error: ${err}`,
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'List Data Posts',
                data: rows,
            });
        }
    });
});

// Store Post
router.post('/', [
    /**
        Melakukan konfigurasi Express Validator terlebih dahulu untuk melakukan validasi terhdapat request yang dikirimkan.
    */
    body('title').notEmpty(),
    body('content').notEmpty(),
], (req, res) => {
    // Handle Validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    // Define formData
    let formData = {
        title: req.body.title,
        content: req.body.content,
    };

    // Insert Query
    connection.query('INSERT INTO posts SET ?', formData, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: `Internal Server Error: ${err}`,
            });
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0],
            });
        }
    });
});

// Get Data by Id
router.get('/(:id)', function (req, res) {
    // Get Data dari parameter request
    let id = req.params.id;
    connection.query(`SELECT * FROM posts WHERE id = ${id}`, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: `Internal Server Error: ${err}`,
            });
        }

        // Jika data tidak ditemukan
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: `Data ID: ${id} Not Found`,
            });
        } else {
            return res.status(200).json({
                status: true,
                message: `Detail Data ID: ${id}`,
                data: rows[0],
            });
        }
    });
});

// Patch Update By Id
router.patch('/(:id)', [
    // Validating Post Data
    body('title').notEmpty(),
    body('content').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }

    // Post ID
    let id = req.params.id;

    // Post Data
    let formData = {
        title: req.body.title,
        content: req.body.content,
    };

    // Update Query
    connection.query(`SELECT * FROM posts WHERE id = ${id}`, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: `Internal Server Error: ${err}`,
            });
        }

        // Jika data tidak ditemukan
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: `Data ID: ${id} Not Found`,
            });
        } else {
            connection.query(`UPDATE posts SET ? WHERE id = ${id}`, formData, function (err, rows) {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        message: `Internal Server Error: ${err}`,
                    });
                } else {
                    return res.status(200).json({
                        status: true,
                        message: 'Update Data Successfully',
                    });
                }
            });
        }
    });
});

// Delete Update By Id
router.delete('/(:id)', function (req, res) {
    let id = req.params.id;

    connection.query(`SELECT * FROM posts WHERE id = ${id}`, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: `Internal Server Error: ${err}`,
            });
        }

        // Jika data tidak ditemukan
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: `Data ID: ${id} Not Found`,
            });
        } else {
            connection.query(`DELETE FROM posts WHERE id = ${id}`, function (err, rows) {
                if (err) {
                    return res.status(500).json({
                        status: false,
                        message: `Internal Server Error: ${id}`,
                    });
                } else {
                    return res.status(200).json({
                        status: true,
                        message: 'Delete Data Successfully!',
                    });
                }
            });
        }
    });
});

module.exports = router;