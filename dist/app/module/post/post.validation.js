"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostValidation = void 0;
const zod_1 = require("zod");
exports.createPostValidation = zod_1.z.object({
    body: zod_1.z.object({
        text: zod_1.z.string().optional(),
        image: zod_1.z.string().optional()
    }).refine((data) => data.text || data.image, {
        message: 'Either text or image must be provided',
        path: ["text", "image"]
    })
});
