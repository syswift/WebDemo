import express, {Request,Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError,  validateRequest} from '@syswift1/common';
import { User } from '../models/user';
import { Password } from '../service/password';

const router = express.Router();

router.post('/api/auth/signin',
[
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
], 
validateRequest,
async (req: Request, res: Response) =>{
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser){
        throw new BadRequestError('Invalid credentials, wrong email or password');
    }
    const passwordMatch = await Password.compare(existingUser.password, password);
    if(!passwordMatch) {
        throw new BadRequestError('Invalid credentials, wrong email or password');
    }

    //Generate JWT
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);
    
    //store on session object
    req.session = {
        jwt: userJwt
    };
    
    res.status(200).send(existingUser);
});

export {router as signinRouter};