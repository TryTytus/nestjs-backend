"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer_1 = require("multer");
const getFilename = (originalname) => {
    const date = Date.now();
    const randomDigits = Math.round(Math.random() * 1e9);
    const ext = originalname.split('.').pop();
    return `${date}-${randomDigits}.${ext}`;
};
exports.storage = {
    storage: (0, multer_1.diskStorage)({
        destination: './public',
        filename: (req, file, callback) => {
            callback(null, getFilename(file.originalname));
        },
    }),
};
//# sourceMappingURL=storage.js.map