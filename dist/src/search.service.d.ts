import { OnModuleInit } from '@nestjs/common';
import { Index, Meilisearch } from 'meilisearch';
export type PostSearchable = {
    id: number;
    content: string;
};
export type UserSearchable = {
    id: string;
    name: string;
    nickname: string;
    avatar?: string;
};
export declare class SearchService extends Meilisearch implements OnModuleInit {
    posts: Index<PostSearchable> | undefined;
    users: Index<UserSearchable> | undefined;
    constructor();
    onModuleInit(): Promise<void>;
}
