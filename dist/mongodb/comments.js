"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = exports.CommentSchema = void 0;
const mongoose = require("mongoose");
exports.CommentSchema = new mongoose.Schema({
    content: String,
    userId: String,
    likesCount: Number,
    name: String,
    bgimg: String,
});
exports.CommentSchema.add({
    comments: [exports.CommentSchema],
});
exports.PostSchema = new mongoose.Schema({
    postId: Number,
    comments: [exports.CommentSchema],
});
//# sourceMappingURL=comments.js.map