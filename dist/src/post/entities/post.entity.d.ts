import { Post as PrismaPost } from '@prisma/client';
export type Post = PrismaPost & {
    isLiked?: boolean;
    isBookmarked?: boolean;
};
