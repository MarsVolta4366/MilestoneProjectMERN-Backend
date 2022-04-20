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
const { append } = require('express/lib/response');
const Post = require("../models/post");
const { post } = require('./comment_controller');
const posts = require('express').Router();
// GET
posts.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundPosts = yield Post.find().sort({ post_date: -1 });
        res.status(200).json(foundPosts);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// // POST
posts.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Post.create(req.body);
        res.status(200).json({ message: 'POST CREATED' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// SHOW
//sorting via https://stackoverflow.com/questions/16352768/how-to-sort-a-populated-document-in-find-request
posts.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundPost = yield Post.findById(req.params.id)
            .populate({ path: "comments", options: { sort: { comment_date: -1 } } });
        res.status(200).json(foundPost);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// UPDATE
posts.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Post.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: 'UPDATED' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// // DELETE
posts.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'DELETED' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
module.exports = posts;
