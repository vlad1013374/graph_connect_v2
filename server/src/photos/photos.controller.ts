import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import * as path from 'path';
import { GetPhotoDto } from './dto/get-photo-query.dto';

@Controller('photos')
export class PhotosController {
    @Get('')
    getPhotoByName() {
        
    }
}
