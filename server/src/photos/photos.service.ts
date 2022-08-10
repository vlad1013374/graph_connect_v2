import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileService, FileType } from 'src/file/file.service';
import { PhotoAlbumsService } from 'src/photo_albums/photo_albums.service';
import { Photo } from './photos.model';

@Injectable()
export class PhotosService {
    constructor(
        @InjectModel(Photo) private photosReposytory: typeof Photo,
        private fileService: FileService,
        private albumService: PhotoAlbumsService
    ) {}

    async addPhotosToPage(user_id: number, photos: Array<Express.Multer.File>, post_id: number= null) {
        try{
            const type_value = "page";
            let album = await this.albumService.getAlbumByUserIdAndTypeValue(user_id, type_value);
            if( !album ) {
                album = await this.albumService.createAlbumByValue(user_id, type_value);
            }
            const album_id = album.id;
            photos.forEach(async file => {
                const fileName = await this.fileService.createFile(FileType.IMAGE, file);
                const photo = await this.photosReposytory.create({fileName, album_id});
                if(post_id) {
                    await photo.$set('posts', post_id)                
                }
            });
            
        }catch(e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }
}
