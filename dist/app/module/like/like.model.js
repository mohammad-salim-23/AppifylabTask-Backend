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
exports.Like = void 0;
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    targetId: { type: mongoose_1.Schema.Types.ObjectId, required: true, refPath: 'targetType' },
    targetType: { type: String, required: true, enum: ['Post', 'Comment'] },
}, { timestamps: true });
// prevent duplicate likes
likeSchema.index({ user: 1, targetId: 1 }, { unique: true });
// static method for toggle
likeSchema.statics.toggleLike = function (userId, targetId, targetType) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield this.findOne({ user: userId, targetId, targetType });
        if (existing) {
            yield existing.deleteOne();
            return { liked: false };
        }
        else {
            yield this.create({ user: userId, targetId, targetType });
            return { liked: true };
        }
    });
};
exports.Like = (0, mongoose_1.model)("Like", likeSchema);
