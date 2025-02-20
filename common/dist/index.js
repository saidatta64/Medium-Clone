"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInputs = exports.createBlogInputs = exports.updateuserInputs = exports.signinInput = exports.signupInputs = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInputs = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    username: zod_1.default.string().optional()
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
});
exports.updateuserInputs = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(8)
});
exports.createBlogInputs = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string()
});
exports.updateBlogInputs = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.number(),
    published: zod_1.default.boolean()
});
