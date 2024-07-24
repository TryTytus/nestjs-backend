"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postProviders = void 0;
const comments_1 = require("../../mongodb/comments");
exports.postProviders = [
    {
        provide: 'POST_MODEL',
        useFactory: async (connection) => {
            const PostModel = connection.model('Post', comments_1.PostSchema);
            await PostModel.createCollection();
            return PostModel;
        },
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=post.provider.js.map