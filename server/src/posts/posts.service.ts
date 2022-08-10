import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from 'src/photos/photos.model';
import { PhotosService } from 'src/photos/photos.service';
import { Post } from '../posts/posts.model'
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postsRepository: typeof Post,
        private photosService: PhotosService
    ) {}

    async getAllPostsByUserId(user_id) {
        const posts = this.postsRepository.findAll({
            where: {user_id}, 
            include: {
                model: Photo,
                attributes: ["id", "fileName", "createdAt"],
                through: {
                    attributes: []
                }
            }
        })
        return posts;
    }

    async createPost(user_id: number, createDto: CreatePostDto, photos: Array<Express.Multer.File>) {
        try{
            const post = await this.postsRepository.create({...createDto, user_id});
            await this.photosService.addPhotosToPage(user_id, photos, post.id);
            return post;
        }catch(e) {
            console.log(e);
            
        }
        
    }

}
