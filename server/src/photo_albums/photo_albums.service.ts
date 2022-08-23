import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PhotoAlbumDefaultTypes } from './albums_default_types.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { PhotoAlbum } from './photo_albums.model';

@Injectable()
export class PhotoAlbumsService {
    constructor(
        @InjectModel(PhotoAlbum) private albumRepository: typeof PhotoAlbum,
        @InjectModel(PhotoAlbumDefaultTypes) private albumTypesRepository: typeof PhotoAlbumDefaultTypes,
    ) {}

    async getAlbumByUserIdAndTypeValue(user_id: number, type_value: string) {
        const type_id = (await this.albumTypesRepository.findOne({where: {value: type_value}})).id;
        return await this.albumRepository.findOne({where: {user_id, type_id}});
    }

    

    async createAlbumByValue(user_id: number, type_value: string) {
        const albumType = await this.albumTypesRepository.findOne({where: {value: type_value}});
        return await this.albumRepository.create({user_id, name: albumType.name, type_id: albumType.id})

    }

    async createDefaultAlbum(user_id: number, albumDto: CreateAlbumDto) {
        const type_id = (await this.albumTypesRepository.findOne({where: {value: "common"}})).id;
        return await this.albumRepository.create({...albumDto, user_id, type_id});
    }
}
