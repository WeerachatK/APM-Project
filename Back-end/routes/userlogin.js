const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config()
const express = require('express');
const router = express.Router();

module.exports = function (connection) {

    /**
     * @swagger
     * tags:
     *   name: User Management
     *   description: API endpoints related to user login management
     * 
     * /api/login:
     *   get:
     *     summary: Retrieve a list of user login details
     *     tags: [User Management]
     *     description: Retrieve a list of all user login details from the database. This is for admin use only and should be protected.
     *     responses:
     *       200:
     *         description: A list of user login details.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   username:
     *                     type: string
     *                     description: The username of the user.
     *                   password:
     *                     type: string
     *                     description: The password of the user. Note that passwords should be stored securely and not exposed in APIs.
     *                   role:
     *                     type: string
     *                     description: The role of the user within the system.
     *       500:
     *         description: An error occurred with the database operation.
     */
    router.get('/login', (req, res) => {
        const query = 'SELECT * FROM apmdatabase.userlogin;';
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
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User Management]
 *     description: Register a new user with username, password, and role. The password will be stored securely.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new account.
 *               password:
 *                 type: string
 *                 description: The password for the new account. This will be hashed for storage.
 *               role:
 *                 type: string
 *                 description: The role assigned to the new account.
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Missing required fields or user already exists.
 *       500:
 *         description: Internal server error.
 */

    router.post('/register', (req, res) => {
        const { username, password, role } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Hashing the password before storing it in the database
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ error: 'Error hashing password' });
            }

            // Store the hashed password in the database
            connection.query('INSERT INTO apmdatabase.userlogin (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], (err, result) => {
                if (err) {
                    console.error('Error during database query:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                return res.status(201).json({ message: 'User registered successfully' });
            });
        });
    });

    /**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     tags: [User Management]
 *     description: Authenticate a user by username and password, returning a JWT token upon successful authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: Login successful, JWT token returned.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticating further requests.
 *       400:
 *         description: Username and password are required.
 *       401:
 *         description: Invalid username or password.
 *       500:
 *         description: Internal server error.
 */


    router.post('/login', (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        connection.query('SELECT * FROM apmdatabase.userlogin WHERE username = ?', [username], (err, users) => {
            if (err) {
                console.error('Error during database query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (users.length === 1) {
                const user = users[0];

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.error('Error during password verification:', err);
                        return res.status(500).json({ error: 'Error during password verification' });
                    }
                    if (isMatch) {
                        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                        return res.status(200).json({ message: 'Login successful', username: user.username , token });
                    } else {
                        return res.status(401).json({
                            error: 'Invalid username or password',
                        });
                    }
                });
            } else {
                return res.status(401).json({ error: 'Invalid username' });
            }
        });
    });

    /**
 * @swagger
 * /userlogin/{username}:
 *   put:
 *     summary: Update a user's password and role
 *     tags: [User Management]
 *     description: Update the password and role of an existing user. The password will be hashed before storage.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user.
 *               role:
 *                 type: string
 *                 description: The new role for the user.
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *       400:
 *         description: Password is required.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error or error hashing password.
 */
    router.put('/userlogin/:username', (req, res) => {
        const { username } = req.params;
        const { password, role } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        // Hashing the password before storing it in the database
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ error: 'Error hashing password' });
            }

            // Update the user in the database
            const query = 'UPDATE apmdatabase.userlogin SET password = ?, role = ? WHERE username = ?';
            connection.query(query, [hashedPassword, role, username], (err, result) => {
                if (err) {
                    console.error('SQL Error:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }

                return res.status(200).json({ message: 'User updated successfully' });
            });
        });
    });


    /**
 * @swagger
 * /userlogin/{username}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User Management]
 *     description: Delete an existing user from the database by username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

    router.delete('/userlogin/:username', (req, res) => {
        const { username } = req.params;

        const query = 'DELETE FROM apmdatabase.userlogin WHERE username = ?';
        connection.query(query, [username], (err, result) => {
            if (err) {
                console.error('SQL Error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json({ message: 'User deleted successfully' });
        });
    });



    return router;
}

