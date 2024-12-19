"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blog_constant_1 = require("./blog.constant");
// create blogSchema for blog
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'The title field is required.'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'The content field is required.'],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The author field is required.'],
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
//remove files in res in means  some filed is hidden
blogSchema.set('toJSON', {
    transform: function (doc, ret) {
        blog_constant_1.BlogHiddenfelds.forEach((field) => {
            delete ret[field];
        });
        return ret;
    },
});
// Create and export the Blog model
const Blog = (0, mongoose_1.model)('Blog', blogSchema);
exports.default = Blog;
