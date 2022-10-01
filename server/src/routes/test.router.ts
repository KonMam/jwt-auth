import express, { Request, Response } from 'express'

const router = express.Router()

router.route('/').get(async (req: Request, res: Response) => {
    
    return res.status(200).json([{"user": "bob"}, {"user": "steve"}])
})

router.route('/').post(async (req: Request, res: Response) => {
    const { name }: {name: string} = req.body
    const some_array: string[] = []

    for (let i = 0; i < name.length; ++i) {
        const letter = name.at(i)
        if (letter) {
            some_array.push(letter)
        }
    }
    
    return res.status(200).json(some_array)
})


module.exports = router