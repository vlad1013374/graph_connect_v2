import { Body, Controller, Get, Param, Post, Redirect, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,
                private userService: UsersService) {}
    @Post('registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto);
    }

    @Post('login')
    login(@Body() userDto: LoginAuthDto){
        return this.authService.login(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('activateMail/:link')
    // @Redirect("http://localhost:5000/posts", 302)
    activateMail(@Param('link') link: string){
       return this.userService.activateUserByLink(link); 
    }
}
