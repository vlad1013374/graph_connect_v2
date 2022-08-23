import { Body, Controller, Get, Param, Post, Redirect, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/auth/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,
                private userService: UsersService) {}

    @Get('login')
    @Render('login')
    loginPage(@Req() req: Request) {
        console.log(req.cookies);
        
        return {"user": "anonumous"};
    }
    
    @Post('registration')
    registration(
        @Body() userDto: CreateUserDto,
        @Res({ passthrough: true }) res: Response
    ){
        const token = this.authService.registration(userDto);
        
        res.cookie('token', token);
        return {"status": 200, "mesage": "success"}
    }

    @Post('login')
    login(
        @Body() userDto: LoginAuthDto,
        @Res() res: Response
    ){
        this.authService.login(userDto)
            .then(token => {
                res.cookie('token', token.token);
                res.end(JSON.stringify({"status": 200, "mesage": "success"}))

            });

    }

    @Get('activateMail/:link')
    // @Redirect("http://localhost:5000/posts", 302)
    activateMail(@Param('link') link: string){
       return this.userService.activateUserByLink(link); 
    }
}
