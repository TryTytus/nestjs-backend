import { Prisma } from '@prisma/client';
export declare class UpdatePostDto implements Partial<Prisma.PostCreateInput> {
    id: number;
    content: string;
    userId: string;
    likesCount?: number;
    viewsCont?: number;
    commentsCount?: number;
    updatedAt?: string | Date;
    createdAt?: string | Date;
}
