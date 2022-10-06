import express, { Request, Response } from 'express'
import { hash, compare } from 'bcrypt'
import { Secret, sign, verify } from 'jsonwebtoken'

import { User } from '../entities/user.entity'
import { appDataSource } from '../data-source'

const router = express.Router()
const accessSecret = process.env.ACCESS_TOKEN_SECRET as Secret
const refreshSecret = process.env.REFRESH_TOKEN_SECRET as Secret

router.route('/register').post(async (req: Request, res: Response, next) => {
    const { username, email, password } = req.body

    const newUser = new User()
    
    hash(password, 10, async (_err, hash) => {
        newUser.username = username
        newUser.email = email
        newUser.password = hash
        
        try {
            await appDataSource.getRepository(User).insert(newUser)

            const accessToken = sign({ userId: newUser.id, email: newUser.email}, accessSecret, { expiresIn: "30m" });
            const refreshToken = sign({  userId: newUser.id, email: newUser.email }, refreshSecret, { expiresIn: '15d' });

            res.cookie("accessToken", accessToken, { httpOnly: true, 
                sameSite: 'none', secure: true, 
                maxAge: 30 * 60 * 1000
            });
        
            res.cookie("refreshToken", refreshToken, { httpOnly: true, 
                sameSite: 'none', secure: true, 
                maxAge: 24 * 60 * 60 * 1000 * 15
            });

            res.status(200).json({"message": "Success"})
        } catch {
            const error = new Error('User with these details already exists.');
            next(error)
            res.status(409).json({"message": "User with these details already exists."})
        };

    });
})

router.route('/login').post(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await appDataSource.getRepository(User).findOneBy({ username: username })

    if (!existingUser) {
        res.status(401).json({"message": "User doesn't exist."})
        return;
    }

    compare(password, existingUser.password, (_err, result) => {
        if (result === true) {        

            const accessToken = sign({ id: existingUser.id, email: existingUser.email }, accessSecret, { expiresIn: "30m" });
            const refreshToken = sign({  id: existingUser.id, email: existingUser.email }, refreshSecret, { expiresIn: '15d' });

            res.cookie("accessToken", accessToken, { httpOnly: true, 
                sameSite: 'none', secure: true, 
                maxAge: 30 * 60 * 1000
            });
        
            res.cookie("refreshToken", refreshToken, { httpOnly: true, 
              sameSite: 'none', secure: true, 
              maxAge: 24 * 60 * 60 * 1000 * 15
            });

            res.status(200).json({"message": "Success"})
        } else {
            res.status(401).json({"message": "Wrong user password."})
        }
    });
})

router.route('/refresh').post(async (req, res) => {
    if (req.cookies?.refreshToken) {

        const refreshToken = req.cookies.refreshToken;

        interface JwtPayload {
            id: number,
            email: string
        }

       const { id, email } = verify(refreshToken, refreshSecret) as JwtPayload

        //console.log(id, email)

        const accessToken = sign(
            { id: id, email: email },
            accessSecret, 
            { expiresIn: "30m" }
        );

        res.cookie("accessToken", accessToken, { httpOnly: true, 
            sameSite: 'none', secure: true, 
            maxAge: 30 * 60 * 1000
        });

        return res.status(200).json({"message": "Success"});
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
});


module.exports = router
