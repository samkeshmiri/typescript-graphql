import { Request, Response } from 'express';

export interface MyContext { // & is intersection type - merge and create new type of types
    req: Request & { session: { userId?: number, applicantId: string | undefined }};
    res: Response;
}