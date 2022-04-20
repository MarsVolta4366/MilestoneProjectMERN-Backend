"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Dependencies
const express = require('express');
const { json } = require('express/lib/response');
const comment = express.Router();
const CommentCommentController = require('../models/comment.js');
//Index
comment.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundComments = yield CommentCommentController.find();
        res.status(200).json(foundComments);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//Create
comment.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield CommentCommentController.create(req.body);
        res.status(200).json({ message: "Comment added" });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//Delete
comment.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedComments = yield CommentCommentController.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: `Successfully deleted ${deletedComments} comment.`
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//Export
module.exports = comment;
