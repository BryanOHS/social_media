import express, { Request, Response, Router } from 'express';
import { UserExist } from '../Utils/AuthUtils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../database';

const router: Router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await UserExist(username, email);
        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const creationResult = await query(
            'INSERT INTO users (username, display_name, email, password_hash) VALUES ($1, $1, $2, $3) RETURNING user_id, username',
            [username, username ,email, hashedPass]
        );

        const newUser = creationResult[0];
        const token = jwt.sign(
            { userId: newUser.user_id, username: newUser.username },
            process.env.JWT_SECRET!,
            { expiresIn: '40h' }
        );

        return res.status(201).json({ message: "Success", token });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Define the login route
router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const storedUser = await query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (storedUser.length === 0) {
            return res.status(401).json({ message: "User doesn't exist!" });
        }

        const storedPassword = storedUser[0].password_hash;
        const passCheck = await bcrypt.compare(password, storedPassword);

        if (!passCheck) {
            return res.status(401).json({ message: "Wrong password, try again" });
        }

        const token = jwt.sign(
            { userId: storedUser[0].user_id, username: storedUser[0].username },
            process.env.JWT_SECRET!,
            { expiresIn: '40h' }
        );

        return res.status(200).json({ message: "Success", token });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/verify', (req: Request, res: Response) => {

    const JWT_SECRET = process.env.JWT_SECRET || '';
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Token is required', data: false});
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token', error: err.message , data:false});
        }
        // Token is valid
        res.json({ message: 'Token is valid', decoded , data:true });
    });
});

export default router;
