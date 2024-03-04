const express = require('express');
const router = express.Router();

// Assuming connection is passed as a parameter to this module
module.exports = function (connection) {

    /**
     * @swagger
     * tags:
     *   name: Athlete
     *   description: Athlete management
     */

    /**
 * @swagger
 * /api/athletes:
 *   get:
 *     summary: Retrieve a list of all athletes
 *     tags: [Athlete]
 *     description: Retrieve a list of all athletes from the database.
 *     responses:
 *       200:
 *         description: A list of athletes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The athlete ID.
 *                   email:
 *                     type: string
 *                     description: The athlete's email address.
 *                   first_name:
 *                     type: string
 *                     description: The athlete's first name.
 *                   last_name:
 *                     type: string
 *                     description: The athlete's last name.
 *                   profile_pic:
 *                     type: string
 *                     description: URL to the athlete's profile picture.
 *                   country:
 *                     type: string
 *                     description: The athlete's country code.
 *                   bib:
 *                     type: string
 *                     description: The athlete's bib number.
 *                   gender:
 *                     type: string
 *                     description: The athlete's gender.
 *                   date_of_birth:
 *                     type: string
 *                     format: date
 *                     description: The athlete's date of birth.
 *                   phone_number:
 *                     type: string
 *                     description: The athlete's phone number.
 *                   classification:
 *                     type: string
 *                     description: The athlete's classification.
 *                   remark:
 *                     type: string
 *                     description: Additional remarks about the athlete.
 *       500:
 *         description: An error occurred with the database operation.
 */
    router.get('/athletes', (req, res) => {
        const query = 'SELECT * FROM `apmdatabase`.athlete;';
        connection.query(query, (err, result) => {
            if (err) {
                console.error('Error fetching athletes:', err);
                res.status(500).send('An error occurred with the database operation.');
            } else {
                res.json(result);
            }
        });
    });


    /**
 * @swagger
 * /api/athletes/{id}:
 *   get:
 *     summary: Retrieve a specific athlete by ID
 *     tags: [Athlete]
 *     description: Retrieve details of a specific athlete by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the athlete to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the athlete.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: integer
 *                     description: The athlete ID.
 *                   email:
 *                     type: string
 *                     description: The athlete's email address.
 *                   first_name:
 *                     type: string
 *                     description: The athlete's first name.
 *                   last_name:
 *                     type: string
 *                     description: The athlete's last name.
 *                   profile_pic:
 *                     type: string
 *                     description: URL to the athlete's profile picture.
 *                   country:
 *                     type: string
 *                     description: The athlete's country code.
 *                   bib:
 *                     type: string
 *                     description: The athlete's bib number.
 *                   gender:
 *                     type: string
 *                     description: The athlete's gender.
 *                   date_of_birth:
 *                     type: string
 *                     format: date
 *                     description: The athlete's date of birth.
 *                   phone_number:
 *                     type: string
 *                     description: The athlete's phone number.
 *                   classification:
 *                     type: string
 *                     description: The athlete's classification.
 *                   remark:
 *                     type: string
 *                     description: Additional remarks about the athlete.
 *       404:
 *         description: Athlete not found.
 *       500:
 *         description: An error occurred with the database operation.
 */
    router.get('/athletes/:id', (req, res) => {
        const athleteId = req.params.id;
        const query = 'SELECT * FROM `apmdatabase`.athlete WHERE id = ?;';
        connection.query(query, [athleteId], (err, result) => {
            if (err) {
                console.error('Error fetching athlete:', err);
                res.status(500).send('An error occurred with the database operation.');
            } else if (result.length === 0) {
                res.status(404).send('Athlete not found.');
            } else {
                res.json(result[0]);
            }
        });
    });

    /**
    * @swagger
    * /api/athletes:
    *   post:
    *     summary: Create a new athlete
    *     tags: [Athlete]
    *     description: Add a new athlete to the database.
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             required:
    *               - email
    *               - first_name
    *               - last_name
    *             properties:
    *               email:
    *                 type: string
    *               first_name:
    *                 type: string
    *               last_name:
    *                 type: string
    *               profile_pic:
    *                 type: string
    *               country:
    *                 type: string
    *               bib:
    *                 type: string
    *               gender:
    *                 type: string
    *               date_of_birth:
    *                 type: string
    *                 format: date
    *               phone_number:
    *                 type: string
    *               classification:
    *                 type: string
    *               remark:
    *                 type: string
    *     responses:
    *       201:
    *         description: Athlete created successfully.
    *       400:
    *         description: Missing required fields.
    *       500:
    *         description: Error adding the athlete to the database.
    */

    router.post('/athletes', (req, res) => {
        const { email, first_name, last_name, profile_pic, country, bib, gender, date_of_birth, phone_number, classification, remark } = req.body;

        if (!email || !first_name || !last_name) {
            return res.status(400).send('Missing required fields');
        }

        const query = `
    INSERT INTO \`apmdatabase\`.ATHLETE (email, first_name, last_name, profile_pic, country, bib, gender, date_of_birth, phone_number, classification, remark)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

        connection.query(query, [email, first_name, last_name, profile_pic, country, bib, gender, date_of_birth, phone_number, classification, remark], (err, result) => {
            if (err) {
                console.error('SQL Error:', err.message);
                res.status(500).send(`Error adding the athlete: ${err.message}`);
            } else {
                res.status(201).send({ message: 'Athlete created successfully', id: result.insertId });
            }
        });
    });


    /**
     * @swagger
     * /api/athletes/{id}:
     *   put:
     *     summary: Update an athlete by ID
     *     tags: [Athlete]
     *     description: Update details of a specific athlete by its ID in the database.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: The ID of the athlete to update.
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               first_name:
     *                 type: string
     *               last_name:
     *                 type: string
     *               profile_pic:
     *                 type: string
     *               country:
     *                 type: string
     *               bib:
     *                 type: string
     *               gender:
     *                 type: string
     *               date_of_birth:
     *                 type: string
     *                 format: date
     *               phone_number:
     *                 type: string
     *               classification:
     *                 type: string
     *               remark:
     *                 type: string
     *     responses:
     *       200:
     *         description: Athlete updated successfully.
     *       400:
     *         description: Missing required fields.
     *       404:
     *         description: Athlete not found.
     *       500:
     *         description: Error updating the athlete in the database.
     */

    router.put('/athletes/:id', (req, res) => {
        const athleteId = req.params.id;
        const updateFields = [];
        const updateValues = [];

        const possibleFields = ['email', 'first_name', 'last_name', 'profile_pic', 'country', 'bib', 'gender', 'date_of_birth', 'phone_number', 'classification', 'remark'];

        possibleFields.forEach(field => {
            if (req.body.hasOwnProperty(field)) {
                updateFields.push(`${field} = ?`);
                updateValues.push(req.body[field]);
            }
        });

        if (updateFields.length === 0) {
            return res.status(400).send('No fields provided for update.');
        }

        updateValues.push(athleteId);

        const query = `
        UPDATE \`apmdatabase\`.ATHLETE
        SET ${updateFields.join(', ')}
        WHERE id = ?;
    `;

        connection.query(query, updateValues, (err, result) => {
            if (err) {
                console.error('SQL Error:', err.message);
                res.status(500).send(`Error updating the athlete: ${err.message}`);
            } else if (result.affectedRows === 0) {
                res.status(404).send('Athlete not found.');
            } else {
                res.status(200).send('Athlete updated successfully.');
            }
        });
    });


    /**
     * @swagger
     * /api/athletes/{id}:
     *   delete:
     *     summary: Delete an athlete by ID
     *     tags: [Athlete]
     *     description: Remove a specific athlete by its ID from the database.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: The ID of the athlete to delete.
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Athlete deleted successfully.
     *       404:
     *         description: Athlete not found.
     *       500:
     *         description: Error deleting the athlete from the database.
     */
    router.delete('/athletes/:id', (req, res) => {
        const athleteId = req.params.id;

        const query = `DELETE FROM \`apmdatabase\`.ATHLETE WHERE id = ?;`;
        connection.query(query, [athleteId], (err, result) => {
            if (err) {
                console.error('SQL Error:', err.message);
                res.status(500).send(`Error deleting the athlete: ${err.message}`);
            } else if (result.affectedRows === 0) {
                res.status(404).send('Athlete not found.');
            } else {
                res.status(200).send('Athlete deleted successfully.');
            }
        });
    });

    return router;
}
