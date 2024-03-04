const express = require('express');
const router = express.Router();

// Assuming connection is passed as a parameter to this module
module.exports = function (connection) {

    /**
 * @swagger
 * /api/competitions/athletes/{athlete_id}:
 *   get:
 *     summary: Retrieve competitions for a specific athlete
 *     tags: [Compete]
 *     description: Retrieve a list of competitions that a specific athlete has participated in from the database.
 *     parameters:
 *       - in: path
 *         name: athlete_id
 *         required: true
 *         description: The ID of the athlete to retrieve competitions for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of competitions for the specified athlete.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *       404:
 *         description: Athlete or competitions not found.
 *       500:
 *         description: An error occurred with the database operation.
 */

    router.get('/competitions/athletes/:athlete_id', (req, res) => {
        const athleteId = req.params.athlete_id;
        const query = `
        SELECT 
            c.*, e.*
        FROM 
        \`apmdatabase\`.competes_in c
        JOIN 
        \`apmdatabase\`.athlete a ON c.athlete_id = a.id
        JOIN 
        \`apmdatabase\`.events e ON c.event_id = e.id
        WHERE 
            c.athlete_id = ?;
    `;
        connection.query(query, [athleteId], (err, result) => {
            if (err) {
                console.error('Error fetching competitions:', err);
                res.status(500).send('An error occurred with the database operation.');
            }  else {
                res.json(result);
            }
        });
    });
    

/**
 * @swagger
 * /api/competitions/events/{event_id}:
 *   get:
 *     summary: Retrieve a list of athletes in a specific event
 *     tags: [Compete]
 *     description: Retrieve a list of athletes who competed in a specific event.
 *     parameters:
 *       - in: path
 *         name: event_id
 *         required: true
 *         description: The ID of the event to retrieve athletes for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of athletes in the specified event.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *       404:
 *         description: Event or athletes not found.
 *       500:
 *         description: An error occurred with the database operation.
 */
router.get('/competitions/events/:event_id', (req, res) => {
    const eventId = req.params.event_id;
    const query = `
        SELECT 
            a.*,
            c.*
        FROM 
        \`apmdatabase\`.competes_in c
        JOIN 
        \`apmdatabase\`.athlete a ON c.athlete_id = a.id
        JOIN 
        \`apmdatabase\`.events e ON c.event_id = e.id
        WHERE 
            c.event_id = ?;
    `;
    connection.query(query, [eventId], (err, result) => {
        if (err) {
            console.error('SQL Error:', err.message);
            res.status(500).send(`Error fetching athletes for the event: ${err.message}`);
        } else {
            res.json(result);
        }
    });
});

/**
 * @swagger
 * /api/competitions/allAthlete:
 *   get:
 *     summary: Retrieve all competitions along with athlete details
 *     tags: [Compete]
 *     description: Retrieves a complete list of all competitions including details of each participating athlete. This endpoint is useful for getting an overview of all competitions and their athletes.
 *     responses:
 *       200:
 *         description: A list of competitions with athlete details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   athlete_id:
 *                     type: integer
 *                     description: The unique identifier for the athlete.
 *                   first_name:
 *                     type: string
 *                     description: The first name of the athlete.
 *                   last_name:
 *                     type: string
 *                     description: The last name of the athlete.
 *                   gender:
 *                     type: string
 *                     description: The gender of the athlete.
 *                   class:
 *                     type: string
 *                     description: The class/category the athlete competes in.
 *                   event_id:
 *                     type: integer
 *                     description: The unique identifier for the event.
 *                   event_name:
 *                     type: string
 *                     description: The name of the event.
 *                   event_date:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time of the event.
 *       404:
 *         description: No athletes found for the specified event.
 *       500:
 *         description: Error fetching athletes for the event.
 */
router.get('/competitions/allAthlete', (req, res) => {
    const query = `
          SELECT 
            a.*,
            c.*
        FROM 
apmdatabase.competes_in c
        JOIN 
apmdatabase.athlete a ON c.athlete_id = a.id
        JOIN 
apmdatabase.events e ON c.event_id = e.id
;
    `;
    connection.query(query, (err, result) => {
        if (err) {
            console.error('SQL Error:', err.message);
            res.status(500).send(`Error fetching athletes for the event: ${err.message}`);
        } else if (result.length === 0) {
            res.status(404).send('No athletes found for the specified event.');
        } else {
            res.json(result);
        }
    });
});
/**
 * @swagger
 * /api/competitions:
 *   post:
 *     summary: Create a new competition record
 *     tags: [Compete]
 *     description: Add a new competition record to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - athlete_id
 *               - event_id
 *             properties:
 *               athlete_id:
 *                 type: integer
 *               event_id:
 *                 type: integer
 *               score:
 *                 type: object
 *               remark:
 *                 type: string
 *     responses:
 *       201:
 *         description: Competition record created successfully.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Error adding the competition record to the database.
 */
router.post('/competitions', (req, res) => {
    const { athlete_id, event_id, score, medal, rank, remark, point, order } = req.body;

    if (!athlete_id || !event_id) {
        return res.status(400).send('Missing required fields: athlete_id and event_id are required.');
    }

    const query = `
        INSERT INTO \`apmdatabase\`.COMPETES_IN (athlete_id, event_id, score, medal, rank, remark, point, \`order\`)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;
    connection.query(query, [athlete_id, event_id, JSON.stringify(score), medal, rank, remark, point, order], (err, result) => {
        if (err) {
            console.error('SQL Error:', err.message);
            res.status(500).send(`Error adding the competition record: ${err.message}`);
        } else {
            res.status(201).send({ message: 'Competition record created successfully', id: result.insertId });
        }
    });
});

/**
 * @swagger
 * /api/competitions/{id}:
 *   put:
 *     summary: Update a competition record by ID
 *     tags: [Compete]
 *     description: Update details of a specific competition record by its ID in the database, including updating the athlete's performance score and any remarks.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the competition record to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               athlete_id:
 *                 type: integer
 *                 description: The ID of the athlete participating in the competition.
 *               event_id:
 *                 type: integer
 *                 description: The ID of the event in which the competition is held.
 *               score:
 *                 type: object
 *                 description: The score of the athlete in the competition, can be a JSON object to accommodate different scoring formats.
 *               remark:
 *                 type: string
 *                 description: Any additional remarks about the athlete's performance in the competition.
 *               medal:
 *                 type: integer
 *                 description: The medal achieved by the athlete in the competition (if any).
 *               rank:
 *                 type: integer
 *                 description: The rank achieved by the athlete in the competition.
 *               point:
 *                 type: integer
 *                 description: The points awarded to the athlete for their performance in the competition.
 *     responses:
 *       200:
 *         description: Competition record updated successfully.
 *       400:
 *         description: Missing required fields.
 *       404:
 *         description: Competition record not found.
 *       500:
 *         description: Error updating the competition record in the database.
 */
router.put('/competitions/:id', (req, res) => {
    const competitionId = req.params.id;
    const { athlete_id, event_id, score, remark, medal, rank, point, order } = req.body;
    let updateFields = [];
    let queryParams = [];

    // Build dynamic query based on provided fields
    if (athlete_id) {
        updateFields.push('athlete_id = ?');
        queryParams.push(athlete_id);
    }
    if (event_id) {
        updateFields.push('event_id = ?');
        queryParams.push(event_id);
    }
    if (score) {
        updateFields.push('score = ?');
        queryParams.push(JSON.stringify(score));
    }
    if (remark) {
        updateFields.push('remark = ?');
        queryParams.push(remark);
    }
    if (medal !== undefined) {
        updateFields.push('medal = ?');
        queryParams.push(medal);
    }
    if (rank !== undefined) {
        updateFields.push('rank = ?');
        queryParams.push(rank);
    }
    if (point !== undefined) {
        updateFields.push('point = ?');
        queryParams.push(point);
    }
    if (order !== undefined) {
        // Enclose the column name 'order' in backticks
        updateFields.push('`order` = ?');
        queryParams.push(order);
    }

    // Check if any field is provided for update
    if (updateFields.length === 0) {
        return res.status(400).send('No fields provided for update.');
    }

    // Add competitionId to query parameters
    queryParams.push(competitionId);

    const query = `
        UPDATE \`apmdatabase\`.COMPETES_IN
        SET ${updateFields.join(', ')}
        WHERE id = ?;
    `;

    connection.query(query, queryParams, (err, result) => {
        if (err) {
            console.error('SQL Error:', err.message);
            res.status(500).send(`Error updating the competition record: ${err.message}`);
        } else if (result.affectedRows === 0) {
            res.status(404).send('Competition record not found.');
        } else {
            res.status(200).send('Competition record updated successfully.');
        }
    });
});


/**
 * @swagger
 * /api/competitions/{id}:
 *   delete:
 *     summary: Delete a competition record by ID
 *     tags: [Compete]
 *     description: Remove a specific competition record by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the competition record to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Competition record deleted successfully.
 *       404:
 *         description: Competition record not found.
 *       500:
 *         description: Error deleting the competition record from the database.
 */
router.delete('/competitions/:id', (req, res) => {
    const competitionId = req.params.id;

    const query = `DELETE FROM \`apmdatabase\`.COMPETES_IN WHERE id = ?;`;
    connection.query(query, [competitionId], (err, result) => {
        if (err) {
            console.error('SQL Error:', err.message);
            res.status(500).send(`Error deleting the competition record: ${err.message}`);
        } else if (result.affectedRows === 0) {
            res.status(404).send('Competition record not found.');
        } else {
            res.status(200).send('Competition record deleted successfully.');
        }
    });
});
    return router;
}
