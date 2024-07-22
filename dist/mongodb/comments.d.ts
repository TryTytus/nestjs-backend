import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export declare const CommentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    content?: string;
    userId?: string;
    name?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    content?: string;
    userId?: string;
    name?: string;
}>> & mongoose.FlatRecord<{
    content?: string;
    userId?: string;
    name?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
export interface Comment extends Document {
    content: string;
    userId: string;
    name: string;
    comments: Comment[];
}
