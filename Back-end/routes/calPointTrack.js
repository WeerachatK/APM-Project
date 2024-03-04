const express = require('express');
const router = express.Router();

// Assuming connection is passed as a parameter to this module
module.exports = function (connection) {

    /**
     * @swagger
     * /api/calculatePoints/track:
     *   post:
     *     summary: Calculate points for track events
     *     tags: [CalculatePoints]
     *     description: Calculate points based on performance in track events.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - score
     *               - gender
     *               - class
     *               - event
     *             properties:
     *               score:
     *                 type: number
     *                 description: The performance score of the athlete.
     *               gender:
     *                 type: string
     *                 description: Gender of the athlete ('M' or 'F').
     *               class:
     *                 type: string
     *                 description: The class/category of the event.
     *               event:
     *                 type: string
     *                 description: The track event.
     *     responses:
     *       200:
     *         description: Successfully calculated points.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 score:
     *                   type: number
     *                   description: The submitted performance score.
     *                 gender:
     *                   type: string
     *                   description: Gender of the athlete.
     *                 class:
     *                   type: string
     *                   description: The class/category of the event.
     *                 event:
     *                   type: string
     *                   description: The track event.
     *                 a:
     *                   type: number
     *                   description: Parameter 'a' from the calculation formula.
     *                 b:
     *                   type: number
     *                   description: Parameter 'b' from the calculation formula.
     *                 c:
     *                   type: number
     *                   description: Parameter 'c' from the calculation formula.
     *                 point:
     *                   type: number
     *                   description: Calculated points based on the score.
     *       400:
     *         description: Missing required parameters in the request body.
     *       404:
     *         description: Parameters not found for the given criteria in track events.
     *       500:
     *         description: Database query error.
     */
    router.post('/calculatePoints/track', (req, res) => {
        const { score, gender, class: classParam, event } = req.body;

        if (!gender || !classParam || !event) {
            return res.status(400).send('Missing required parameters: score, gender, class, event');
        }
    
        const numericalScore = parseFloat(score);
        if (isNaN(numericalScore)) {
            return res.status(400).send('Score must be a numeric value');
        }
    
        const query = `
            SELECT a, b, c 
            FROM apmdatabase.trackpoint
            WHERE gender = ? AND class = ? AND event = ?;
        `;
    
        
        connection.query(query, [gender, classParam, event], (err, results) => {
            if (err) {
                console.error('SQL Error:', err);
                return res.status(500).send('Database query error');
            }
    
            if (results.length === 0) {
                console.error(query);
                return res.status(404).send('Parameters not found for the given criteria in track events');

            }
    
            const { a, b, c } = results[0];
    
            const point = Math.floor(a * Math.exp(-Math.exp(b - c / numericalScore)));
    
            res.json({
                score: numericalScore,
                gender,
                class: classParam,
                event,
                a,
                b,
                c,
                point
            });
        });
    });

    return router;
};
