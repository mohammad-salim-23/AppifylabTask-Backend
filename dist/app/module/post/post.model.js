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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, trim: true },
    image: { type: String },
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
}, { timestamps: true });
postSchema.statics.getFeed = function (userId, limit, lastSeen) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = { visibility: 'public' };
        if (lastSeen)
            query.createdAt = { $lt: lastSeen };
        return this.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('author', 'firstName lastName email')
            .lean();
    });
};
postSchema.statics.getPostsByAuthor = function (userId, limit, lastSeen) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = { author: new mongoose_1.Types.ObjectId(userId) };
        if (lastSeen)
            query.createdAt = { $lt: lastSeen };
        return this.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('author', 'firstName lastName email')
            .lean();
    });
};
exports.Post = (0, mongoose_1.model)('Post', postSchema);
