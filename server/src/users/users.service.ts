import { Injectable , UnauthorizedException } from '@nestjs/common';
import { User } from './users.model';
import {InjectModel} from '@nestjs/sequelize';
import { CreateUserDto } from '../auth/dto/user.dto';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private rolesService:RolesService){}

    async createUser(userDto: CreateUserDto) {
        const user = await this.userRepository.create(userDto);
        const roles = await this.rolesService.getRoleByValue("USER");
        await user.$set('roles', [roles.id]);
        user.roles = [roles];
        return user;
    }

    async getAllUsers() {
        const users = await (await this.userRepository.findAll({ include: { all: true } }))
            .map(user => user.get({ plain: true }));
        
        return {users};
    }

    async getUserByLogin(login: string) {
        const user = await this.userRepository.findOne({ where: { login }, include:Role });
        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include:Role });
        return user;
    }

    async activateUserByLink(activationLink: string) {
        const user = await this.userRepository.findOne({where: {activationLink}});
        const activatedRole = await this.rolesService.getRoleByValue("ACTIVATED-USER");
        user.$add('roles', [activatedRole.id])
        return user;
        
    }
}
