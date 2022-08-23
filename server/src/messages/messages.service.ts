import { Injectable } from '@nestjs/common';
import { writeFile, readFileSync, existsSync } from 'fs';

@Injectable()
export class MessagesService {

    async getAll() {
        const log = existsSync('log') && readFileSync('log');
        const messages = log || [];
        return messages;
    }
}
