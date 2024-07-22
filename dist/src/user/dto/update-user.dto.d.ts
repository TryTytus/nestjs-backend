import { Prisma } from '@prisma/client';
export declare class UpdateUserDto implements Partial<Prisma.UserCreateInput> {
    id: string;
    name: string;
    nickname: string;
    createdAt: string | Date;
    posts?: Prisma.PostCreateNestedManyWithoutUserInput;
}
