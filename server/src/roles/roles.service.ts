import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleToUserDto } from './dto/role-to-user.dto';
import { RoleCreationDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { UserRoles } from './user-roles.model';

@Injectable()
export class RolesService {

    constructor(
        @InjectModel(Role) private rolesRepository: typeof Role,
        @InjectModel(UserRoles) private userRolesRepository: typeof UserRoles
    ){}

    async createRole(roleDto: RoleCreationDto) {
        const role = await this.rolesRepository.create(roleDto);
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.rolesRepository.findOne({where:{value}});
        return role;
    }
 
    async addRoleToUser(addRoleDto: RoleToUserDto) {
        const user_role = await this.userRolesRepository.create(addRoleDto);
        return "Роль успешно добавлена";
    }

    async deleteRoleFromUser(deleteRoleDto: RoleToUserDto) {
        const user_role = await this.userRolesRepository.destroy({
            where:{
                user_id: deleteRoleDto.user_id,
                role_id: deleteRoleDto.role_id
            }
        });
        return "Роль убрана";
    }
}
