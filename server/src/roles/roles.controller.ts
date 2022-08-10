import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleCreationDto } from './dto/role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService){}

    @Post()
    createRole(@Body() roleDto: RoleCreationDto){
        return this.rolesService.createRole(roleDto);
    }


}
