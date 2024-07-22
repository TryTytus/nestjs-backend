import { Connection } from 'mongoose';
export declare const commentProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<{
        content?: string;
        userId?: string;
        name?: string;
    }, {}, {}, {}, import("mongoose").Document<unknown, {}, {
        content?: string;
        userId?: string;
        name?: string;
    }> & {
        content?: string;
        userId?: string;
        name?: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
        content?: string;
        userId?: string;
        name?: string;
    }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
        content?: string;
        userId?: string;
        name?: string;
    }>> & import("mongoose").FlatRecord<{
        content?: string;
        userId?: string;
        name?: string;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
    inject: string[];
}[];
