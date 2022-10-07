import express, { Request, Response } from 'express'
import { appDataSource } from "../data-source";
import { Task } from "../entities/task.entity"
import { User } from "../entities/user.entity"

import { Secret, verify } from 'jsonwebtoken'

interface JwtPayload {
    id: number,
    email: string,
    exp: number
}

const router = express.Router()
const accessSecret = process.env.ACCESS_TOKEN_SECRET as Secret


router.route('/').get(async (req: Request, res: Response, next) => {

    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).send('Token not provided.');
    }
    
    const { id, email, exp } = verify(token, accessSecret) as JwtPayload
    //console.log(id, email, exp)

    if (!id) {
        return res.status(401).send('Invalid Signature.');
    }

    const tasks = await appDataSource.getRepository(Task).find({
        where: {
            user: {
                id: id
            }
        }
    })

    if (!tasks) {
        const error = new Error("Error! Couldn't get the tasks.");
        return next(error)
    }

    res.status(200).send(tasks)
})


router.route('/').post(async (req: Request, res: Response, next) => {
    
    const { title, description } = req.body

    const token = req.cookies.accessToken;
    // console.log(token)
    if (!token) {
        return res.status(401).send('Token not provided.');
    }

    const { id, email, exp } = verify(token, accessSecret) as JwtPayload
    //console.log(id, email, exp)

    if (!id) {
        return res.status(401).send('Invalid Signature.');
    }

    let user;
    try {
        user = await appDataSource.getRepository(User).findOneBy({ id: id })
    } catch {
        const error = new Error("Error! Something went wrong.");
        return next(error)
    };

    const newTask = new Task()
    newTask.status = "To Do"
    newTask.title = title
    newTask.description = description

    if (user) {
        newTask.user = user
    }

    try {
        await appDataSource.getRepository(Task).save(newTask)
    } catch {
        const error = new Error("Error! Something went wrong.");
        return next(error);
    };


    res.status(200).json({
        id: newTask.id,
        status: newTask.status,
        text: newTask.title,
        description: newTask.description
    });
})

router.route('/').put(async (req: Request, res: Response, next) => {

    const task = req.body

    const token = req.cookies.accessToken;
    //console.log(token)
    if (!token) {
        return res.status(401).send('Token not provided.');
    }

    const { id, email, exp } = verify(token, accessSecret) as JwtPayload
    //console.log(id, email, exp)

    if (!id) {
        return res.status(401).send('Invalid Signature.');
    }

    const user = await appDataSource.getRepository(User).findOneBy({ 
        id: id 
    })

    if (!user) {
        return res.status(401).send("User doesn't exists");
    }

    try {
        console.log(task)
        await appDataSource.getRepository(Task).save(task)
    } catch {
        const error = new Error("Error! Something went wrong.");
        return next(error);
    };

    res.status(200).json({
        id: task.id,
        status: task.status,
        text: task.title,
        description: task.description
    });
})

router.route('/').delete(async (req: Request, res: Response, next) => {

    const { taskId } = req.body

    const token = req.cookies.accessToken;
    //console.log(token)
    if (!token) {
        return res.status(401).send('Token not provided.');
    }

    const { id, email, exp } = verify(token, accessSecret) as JwtPayload
    //console.log(id, email, exp)

    if (!id) {
        return res.status(401).send('Invalid Signature.');
    }

    const user = await appDataSource.getRepository(User).findOneBy({ 
        id: id 
    })

    if (!user) {
        return res.status(401).send("User doesn't exists");
    }

    try {
    await appDataSource.getRepository(Task).delete({ id: taskId })
    } catch {
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }

    res.status(200).json({
        message: `Task with id ${taskId} successfully deleted.`
    });
})


module.exports = router