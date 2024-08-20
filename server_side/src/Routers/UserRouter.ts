import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../database';

// Create a router instance
const router:Router = express.Router();

// Define the /token endpoint
router.get('/token', async (req: Request, res: Response) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || '';
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Token is required', data: false});
    }
    jwt.verify(token, JWT_SECRET, async (err, decoded:any) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token', error: err.message , data:false});
        }
        // Token is valid
        if(!decoded){
            return
        }
        const storedUser = await query(
            `SELECT user_id, username, display_name, email, user_profile, user_banner, verified, friends_amount
            FROM users WHERE user_id = $1
            `,
            [decoded.userId]
        )

        res.status(200).json({data: storedUser[0]})
    
    });

  


  } catch (error) {
    // Handle any errors
    console.error('Error fetching token:', error);
    res.status(500).json({ error: 'An error occurred while fetching the token' });
  }
});

export default router;
