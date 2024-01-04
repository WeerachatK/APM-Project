const express = require('express');
const router = express.Router();

// Assuming connection is passed as a parameter to this module
module.exports = function (connection) {

    /**
     * @swagger
     * tags:
     *   name: Sport
     *   description: Everything about Sports
     * 
     * /api/sports:
     *   get:
     *     summary: Retrieve a list of all sports
     *     tags: [Sport]
     *     description: Retrieve a list of all sports from the database.
     *     responses:
     *       200:
     *         description: A list of sports.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: bigint
     *                   type:
     *                     type: string
     *                   sub_type:
     *                     type: string
     *                   remark:
     *                     type: string
     *       500:
     *         description: An error occurred with the database operation.
     */
    router.get('/sports', (req, res) => {
        const query = 'SELECT * FROM `apm-project`.sport;';
        connection.query(query, (err, result) => {
            if (err) {
                console.error('Error fetching sports:', err);
                res.status(500).send('An error occurred with the database operation.');
            } else {
                res.json(result);
            }
        });
    });
/**
 * @swagger
 * /api/sports/{id}:
 *   get:
 *     summary: Retrieve a specific sport by ID
 *     tags: [Sport]
 *     description: Retrieve details of a specific sport by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the sport to retrieve.
 *         schema:
 *           type: bigint
 *     responses:
 *       200:
 *         description: Details of the sport.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: bigint
 *                 type:
 *                   type: string
 *                 sub_type:
 *                   type: string
 *                 remark:
 *                   type: string
 *       404:
 *         description: Sport not found.
 *       500:
 *         description: An error occurred with the database operation.
 */
router.get('/sports/:id', (req, res) => {
    const sportId = req.params.id;
    const query = 'SELECT * FROM `apm-project`.sport WHERE id = ?;';
    connection.query(query, [sportId], (err, result) => {
        if (err) {
            console.error('Error fetching sport:', err);
            res.status(500).send('An error occurred with the database operation.');
        } else if (result.length === 0) {
            res.status(404).send('Sport not found.');
        } else {
            res.json(result[0]);
        }
    });
});
/**
 * @swagger
 * /api/sports:
 *   post:
 *     summary: Create a new sport
 *     tags: [Sport]
 *     description: Add a new sport to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *               sub_type:
 *                 type: string
 *               remark:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sport created successfully.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Error adding the sport to the database.
 */
router.post('/sports', (req, res) => {
    const { type, sub_type, remark } = req.body;

    if (!type) {
        return res.status(400).send('Missing required field: type is required');
    }

    const query = `
        INSERT INTO \`apm-project\`.sport (type, sub_type, remark)
        VALUES (?, ?, ?);
    `;
    connection.query(query, [type, sub_type, remark], (err, result) => {
        if (err) {
            console.error('SQL Error:', err.message);
            res.status(500).send(`Error adding the sport: ${err.message}`);
        } else {
            res.status(201).send({ message: 'Sport created successfully', id: result.insertId });
        }
    });
});

/**
 * @swagger
 * /api/sports/{id}:
 *   put:
 *     summary: Update a sport by ID
 *     tags: [Sport]
 *     description: Update details of a specific sport by its ID in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the sport to update.
 *         schema:
 *           type: int
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               sub_type:
 *                 type: string
 *               remark:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sport updated successfully.
 *       400:
 *         description: Missing required fields.
 *       404:
 *         description: Sport not found.
 *       500:
 *         description: Error updating the sport in the database.
 */
router.put('/sports/:id', (req, res) => {
    const sportId = req.params.id;
    const { type, sub_type, remark } = req.body;

    const query = `
        UPDATE \`apm-project\`.sport
        SET type = ?, sub_type = ?, remark = ?
        WHERE id = ?;
    `;
    connection.query(query, [type, sub_type, remark, sportId], (err, result) => {
        if (err) {
            console.error('SQL Error:', err.message);
            res.status(500).send(`Error updating the sport: ${err.message}`);
        } else if (result.affectedRows === 0) {
            res.status(404).send('Sport not found.');
        } else {
            res.status(200).send('Sport updated successfully.');
        }
    });
});

/**
 * @swagger
 * /api/sports/{id}:
 *   delete:
 *     summary: Delete a sport by ID
 *     tags: [Sport]
 *     description: Remove a specific sport by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the sport to delete.
 *         schema:
 *           type: bigint
 *     responses:
 *       200:
 *         description: Sport deleted successfully.
 *       404:
 *         description: Sport not found.
 *       500:
 *         description: Error deleting the sport from the database.
 */
router.delete('/sports/:id', (req, res) => {
    const sportId = req.params.id;

    const query = 'DELETE FROM \`apm-project\`.sport WHERE id = ?;';
    connection.query(query, [sportId], (err, result) => {
        if (err) {
            console.error('SQL Error:', err.message);
            res.status(500).send(`Error deleting the sport: ${err.message}`);
        } else if (result.affectedRows === 0) {
            res.status(404).send('Sport not found.');
        } else {
            res.status(200).send('Sport deleted successfully.');
        }
    });
});

    return router;
}
