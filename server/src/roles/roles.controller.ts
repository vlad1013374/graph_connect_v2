import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/roles-guard/roles.decorator';
import { RoleCreationDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { RolesAuthGuard } from 'src/auth/roles-guard/roles-auth.guard';
import { RoleToUserDto } from './dto/role-to-user.dto';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService){}

    @Roles('ADMIN')
    @UseGuards(RolesAuthGuard)
    @Post('create')
    createRole(@Body() roleDto: RoleCreationDto){
        return this.rolesService.createRole(roleDto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesAuthGuard)
    @Post('addToUser')
    addRoleToUser(@Body() addRoleDto: RoleToUserDto) {
        return this.rolesService.addRoleToUser(addRoleDto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesAuthGuard)
    @Delete('removeFromUser')
    deleteRoleFromUser(@Body() deleteRoleDto: RoleToUserDto) {
        return this.rolesService.deleteRoleFromUser(deleteRoleDto);
    }


}
