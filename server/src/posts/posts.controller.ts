import { Body, Controller, Get, Param, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Request } from 'express';
import { User } from 'src/users/users.model';
import { JwtIsActivateAuthGuard } from 'src/auth/is-activate-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @UseGuards(JwtIsActivateAuthGuard)
    @Get(':user_id')
    getAllPosts(@Param('user_id') user_id: number) {
        return this.postsService.getAllPostsByUserId(user_id);
    }

    @UseGuards(JwtIsActivateAuthGuard)
    @Post()
    @UseInterceptors(FilesInterceptor('photos'))
    createNewPost(
        @Body() createDto: CreatePostDto, 
        @Req() req: Request & {user: User},
        @UploadedFiles() photos: Array<Express.Multer.File>
    ) {
        return this.postsService.createPost(req.user.id, createDto, photos)
        
    }
}
