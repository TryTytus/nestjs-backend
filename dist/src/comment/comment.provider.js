"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentProviders = void 0;
const comments_1 = require("../../mongodb/comments");
exports.commentProviders = [
    {
        provide: 'COMMENT_MODEL',
        useFactory: (connection) => connection.model('Comment', comments_1.CommentSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=comment.provider.js.map