//Dependencies
const express = require('express')
const { json } = require('express/lib/response')
const comment = express.Router()
const CommentCommentController = require('../models/comment.js')

//Index
comment.get('/', async (_req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: unknown): void; new(): any } } }) => {
    try {
        const foundComments = await CommentCommentController.find()
        res.status(200).json(foundComments)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Create
comment.post('/', async (req: { body: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: unknown): void; new(): any } } }) => {
    try {
        await CommentCommentController.create(req.body)
        res.status(200).json({ message: "Comment added" })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Delete
comment.delete('/:id', async (req: { params: { id: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: unknown): void; new(): any } } }) => {
    try {
        const deletedComments = await CommentCommentController.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: `Successfully deleted ${deletedComments} comment.`
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Export
module.exports = comment