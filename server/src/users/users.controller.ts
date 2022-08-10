import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolesAuthGuard } from 'src/auth/roles-guard/roles-auth.guard';
import { Roles } from 'src/auth/roles-guard/roles.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Roles('ADMIN')
    @UseGuards(RolesAuthGuard)
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
}
