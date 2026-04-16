import { AuthService } from './auth.service';
import express from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>, res: express.Response): Promise<{
        message: string;
        access_token: any;
    }>;
}
