import express, {Request, Response} from 'express';
import { body} from 'express-validator'; //check email and password
import { BadRequestError,  validateRequest} from '@syswift1/common';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/auth/signup',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .matches(
            /^(?=.*\d)(?=.*[a-z])/,
          )
        .withMessage('Password must have letters and numbers'),
    body('password')
        .trim()
        .matches(
            /^(?=.*[A-Z])/,
          )
        .withMessage('Password must have atleast one uppercase letters'),
    body('password')
        .trim()
        .isLength({min: 8, max: 20})
        .withMessage('Password must be between 8 and 20 characters')
], 
validateRequest,
async (req: Request, res: Response) =>{

    const { email, password, con_password } = req.body;

    if(password !== con_password){
        throw new BadRequestError('please input same password as above');
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new BadRequestError('Email in use');
    }

    const user = User.build({email, password});
    await user.save();

    //Generate JWT
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!);

    //store on session object
    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
}); 


export {router as signupRouter};