import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export declare const CommentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    content?: string;
    userId?: string;
    likesCount?: number;
    name?: string;
    bgimg?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    content?: string;
    userId?: string;
    likesCount?: number;
    name?: string;
    bgimg?: string;
}>> & mongoose.FlatRecord<{
    content?: string;
    userId?: string;
    likesCount?: number;
    name?: string;
    bgimg?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare const PostSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    comments: mongoose.Types.DocumentArray<{
        content?: string;
        userId?: string;
        likesCount?: number;
        name?: string;
        bgimg?: string;
    }>;
    postId?: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    comments: mongoose.Types.DocumentArray<{
        content?: string;
        userId?: string;
        likesCount?: number;
        name?: string;
        bgimg?: string;
    }>;
    postId?: number;
}>> & mongoose.FlatRecord<{
    comments: mongoose.Types.DocumentArray<{
        content?: string;
        userId?: string;
        likesCount?: number;
        name?: string;
        bgimg?: string;
    }>;
    postId?: number;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface CommentDoc extends Document {
    content: string;
    userId: string;
    likesCount?: Number;
    name: string;
    bgimg?: string;
    comments: CommentDoc[];
}
export interface PostDoc extends Document {
    postId: number;
    comments: CommentDoc[];
}
