import express, { Request, Response, Router } from 'express';
import { UserExist } from '../Utils/AuthUtils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../database';

const router: Router = express.Router();

// Define the register route
router.post('/register', async (req: Request, res: Response) => {
    const {username, email, password} = req.body;

    const userExists = await UserExist(username, email) 
   if(userExists){
    res.status(401).json({message: "User Already exists"})
    return
   } 
   const hashedPass = await bcrypt.hash(password, 10)

   const creationResult = await query(
    'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username',
    [username, email, hashedPass]
   )

   const newUser = creationResult[0]
   const token = jwt.sign(
    {userId: newUser.user_id, username: newUser.username},
    process.env.JWT_SECRET!,
    {expiresIn: '40h'}
   )

   res.status(201).json({message: "Success", token})
});

// Define the login route
router.post('/login', async (req: Request, res: Response) => {
    const {username, password} = req.body
    const userExists = await UserExist(username, '')
    if(!userExists){
        res.status(401).json({message: "User doesn't exist!"})
        return
    }

    const storedUser = await query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    )
    const storedPassword = storedUser[0].password_hash
    const passCheck = await bcrypt.compare(password, storedPassword)

    if(!passCheck){
        res.status(401).json({message:"Wrong Password, try again"})
        return
    }
    const token = jwt.sign(
    {userId: storedUser[0].user_id, username: storedUser[0].username},
    process.env.JWT_SECRET!,
    {expiresIn: '40h'}
   )

   res.status(201).json({message: "Success", token})
});

// Define the verify route
router.get('/verify', (req: Request, res: Response) => {
    // TODO: Implement verification logic here
    res.send('Verify endpoint');
});

export default router;
