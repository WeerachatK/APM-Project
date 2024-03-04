// event-api.js
const express = require('express');
const router = express.Router();

// Assuming connection is passed as a parameter to this module
module.exports = function (connection) {
    /**
 * @swagger
 * tags:
 *   name: Events
 *   description: Everything about Events
 * 
 * /api/events:
 *   get:
 *     tags: [Events]
 *     summary: Retrieve a list of events
 *     description: Retrieve a list of events from the database.
 *     responses:
 *       200:
 *         description: A list of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The event ID.
 *                   name:
 *                     type: string
 *                     description: The name of the event.
 *       500:
 *         description: An error occurred with the database operation.
 */
    router.get('/events', (req, res) => {
        const query = `SELECT * FROM \`apmdatabase\`.EVENTS;`;
        connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred with the database operation.');
            } else {
                res.json(result);
            }
        });
    });

    /**
     * @swagger
     * /api/events/{id}:
     *   get:
     *     tags: [Events]
     *     summary: Retrieve a single event by ID
     *     description: Retrieve details of a specific event by its ID from the database.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: The ID of the event to retrieve.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Details of the event.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   description: The event ID.
     *                 name:
     *                   type: string
     *                   description: The name of the event.
     *       404:
     *         description: Event not found.
     *       500:
     *         description: An error occurred with the database operation.
     */
    router.get('/events/:id', (req, res) => {
        const eventId = req.params.id;
        const query = `SELECT * FROM \`apmdatabase\`.EVENTS WHERE id = ?;`;
        connection.query(query, [eventId], (err, result) => {
            if (err) {
                console.error('Error fetching event:', err);
                res.status(500).send('An error occurred with the database operation.');
            } else if (result.length === 0) {
                res.status(404).send('Event not found.');
            } else {
                res.json(result[0]);
            }
        });
    });

/**
 * @swagger
 * /api/events:
 *   post:
 *     tags: [Events]
 *     summary: Create a new event
 *     description: Add a new event to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - classification
 *               - date_time
 *               - gender
 *               - status
 *               - sport_id
 *               - number
 *             properties:
 *               number:
 *                 type: string
 *               name:
 *                 type: string
 *               classification:
 *                 type: string
 *               date_time:
 *                 type: string
 *                 format: date-time
 *               gender:
 *                 type: string
 *               status:
 *                 type: string
 *               location:
 *                 type: string
 *               sport_id:
 *                 type: integer
 *               stage:
 *                 type: string
 *               bypoint:
 *                 type: boolean
 *               score_format:
 *                 type: string
 *               remark:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event added successfully.
 *       400:
 *         description: Missing required fields.
 *       404:
 *         description: Sport not found.
 *       500:
 *         description: Error adding event to the database.
 */

    router.post('/events', (req, res) => {

        const requiredFields = ['name', 'classification', 'date_time', 'gender', 'status', 'sport_id', 'number'];
        for (let field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send(`${field} is required`);
            }
        }

        const query = `
            INSERT INTO \`apmdatabase\`.EVENTS 
            (number, name, classification, date_time, gender, status, location, sport_id, stage, bypoint, score_format, remark) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
    
        connection.query(query, [
            req.body.number,
            req.body.name,
            req.body.classification,
            req.body.date_time,
            req.body.gender,
            req.body.status,
            req.body.location || null,
            req.body.sport_id,
            req.body.stage || null,
            req.body.bypoint || null,
            req.body.score_format || null,
            req.body.remark || null
        ], (err, result) => {
            if (err) {
                console.error('SQL Error:', err.message);
                res.status(500).send(`Error adding event to the database: ${err.message}`);
            } else {
                res.status(201).send({ message: 'Event added successfully.', id: result.insertId });
            }
        });
    });
    
    
    

    /**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     tags: [Events]
 *     summary: Update an event
 *     description: Update an existing event in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the event to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated successfully.
 *       400:
 *         description: No fields provided for update.
 *       500:
 *         description: Error updating event.
 */
    router.put('/events/:id', (req, res) => {
        const eventId = req.params.id;
        const updateFields = [];
        const updateValues = [];
    
        // Adjusting field names to match your database structure
        const possibleFields = [
            'number', 'name', 'classification', 'date_time', 'gender',
            'status', 'location', 'sport_id', 'stage', 'bypoint', 'score_format', 'remark'
        ];
    
        possibleFields.forEach(field => {
            if (req.body.hasOwnProperty(field)) {
                updateFields.push(`${field} = ?`);
                updateValues.push(req.body[field]);
            }
        });
    
        if (updateFields.length === 0) {
            return res.status(400).send('No fields provided for update.');
        }
    
        updateValues.push(eventId);
    
        const query = `
            UPDATE \`apmdatabase\`.EVENTS 
            SET ${updateFields.join(', ')}
            WHERE id = ?;
        `;
    
        connection.query(query, updateValues, (err, result) => {
            if (err) {
                console.error('SQL Error:', err);
                res.status(500).send('Error updating event.');
            } else if (result.affectedRows === 0) {
                res.status(404).send('Event not found.');
            } else {
                res.status(200).send('Event updated successfully.');
            }
        });
    });
    

    /**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     tags: [Events]
 *     summary: Delete an event
 *     description: Remove an event from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the event to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted successfully.
 *       500:
 *         description: Error deleting event.
 */
    router.delete('/events/:id', (req, res) => {
        const eventId = req.params.id;
        const query = `DELETE FROM \`apmdatabase\`.EVENTS WHERE id = ?;`;
        connection.query(query, [eventId], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error deleting event.');
            } else {
                res.status(200).send('Event deleted successfully.');
            }
        });
    });

    return router;
}
