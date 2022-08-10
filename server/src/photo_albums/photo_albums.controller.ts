import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/users.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { PhotoAlbumsService } from './photo_albums.service';

@Controller('photo-albums')
export class PhotoAlbumsController {
    constructor(private albumService: PhotoAlbumsService) {}

    @Post()
    createAlbum(@Body() albumDto: CreateAlbumDto, @Req() req: Request & {user: User}) {
        return this.albumService.createDefaultAlbum(req.user.id, albumDto);
    }
}
