import { Body, Controller, Get, Param, Post, Render, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Request } from 'express';
import { User } from 'src/users/users.model';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RolesAuthGuard } from 'src/auth/roles-guard/roles-auth.guard';
import { Roles } from 'src/auth/roles-guard/roles.decorator';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get('')
    @Render('posts')
    getAllPosts(@Param('user_id') user_id: number) {
        return  this.postsService.getAllPosts();
    }

    @Get(':user_id')
    @Render('posts')
    getAllPostsByUserId(@Param('user_id') user_id: number) {
        return  this.postsService.getAllPostsByUserId(user_id);
    }

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
