import { CanActivate, ExecutionContext } from '@nestjs/common';
import { VerifySessionOptions } from 'supertokens-node/recipe/session';
export declare class AuthGuard implements CanActivate {
    private readonly getSessionOptions?;
    constructor(getSessionOptions?: VerifySessionOptions);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
