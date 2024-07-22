"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = void 0;
const mongoose = require("mongoose");
exports.CommentSchema = new mongoose.Schema({
    content: String,
    userId: String,
    name: String,
});
exports.CommentSchema.add({
    comments: [exports.CommentSchema],
});
//# sourceMappingURL=comments.js.map