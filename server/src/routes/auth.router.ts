import express, { Request, Response } from 'express'
import { hash, compare } from 'bcrypt'
import { User } from '../entities/user.entity'
import { appDataSource } from '../data-source'

const router = express.Router()

router.route('/register').post(async (req: Request, res: Response, next) => {
    const { username, email, password } = req.body

    const newUser = new User()
    
    hash(password, 10, async (err, hash) => {
        newUser.username = username
        newUser.email = email
        newUser.password = hash
        
        try {
            await appDataSource.getRepository(User).insert(newUser)
            res.status(200).json({"message": "Success"})
        } catch (err) {
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

    compare(password, existingUser.password, function(err, result) {
        if (result === true) {        
            res.status(200).json({"message": "Success"})
        } else {
            res.status(401).json({"message": "Wrong user password."})
        }
    });
})

module.exports = router
