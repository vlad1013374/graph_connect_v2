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
        const users = this.userRepository.findAll({include:{all:true}});
        return users;
    }

    async getUserByLogin(login: string) {
        const user = this.userRepository.findOne({ where: { login }, include:Role });
        return user;
    }

    async getUserByEmail(email: string) {
        const user = this.userRepository.findOne({ where: { email }, include:Role });
        return user;
    }

    async activateUserByLink(activationLink: string) {
        return await this.userRepository.findOne({where: {activationLink}})
        .then( user => {
            user.isActivate = true
            return user.save();
        })
        .catch( error => {
            throw new UnauthorizedException({message:"Пользователь не найден!"}); 
        });
        
    }
}
