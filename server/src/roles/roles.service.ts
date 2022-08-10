import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleCreationDto } from './dto/role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private rolesRepository: typeof Role){}

    async createRole(roleDto: RoleCreationDto) {
        const role = await this.rolesRepository.create(roleDto);
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.rolesRepository.findOne({where:{value}});
        return role;
    }
}
