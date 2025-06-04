import { Connection } from 'mongoose';
export declare const postProviders: {
    provide: string;
    useFactory: (connection: Connection) => Promise<import("mongoose").Model<{
        comments: import("mongoose").Types.DocumentArray<{
            content?: string;
            userId?: string;
            likesCount?: number;
            name?: string;
            bgimg?: string;
        }>;
        postId?: number;
    }, {}, {}, {}, import("mongoose").Document<unknown, {}, {
        comments: import("mongoose").Types.DocumentArray<{
            content?: string;
            userId?: string;
            likesCount?: number;
            name?: string;
            bgimg?: string;
        }>;
        postId?: number;
    }> & {
        comments: import("mongoose").Types.DocumentArray<{
            content?: string;
            userId?: string;
            likesCount?: number;
            name?: string;
            bgimg?: string;
        }>;
        postId?: number;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
        comments: import("mongoose").Types.DocumentArray<{
            content?: string;
            userId?: string;
            likesCount?: number;
            name?: string;
            bgimg?: string;
        }>;
        postId?: number;
    }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
        comments: import("mongoose").Types.DocumentArray<{
            content?: string;
            userId?: string;
            likesCount?: number;
            name?: string;
            bgimg?: string;
        }>;
        postId?: number;
    }>> & import("mongoose").FlatRecord<{
        comments: import("mongoose").Types.DocumentArray<{
            content?: string;
            userId?: string;
            likesCount?: number;
            name?: string;
            bgimg?: string;
        }>;
        postId?: number;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    }>>>;
    inject: string[];
}[];
