import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import * as uuid from 'uuid';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService,
                @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy) {}

    async registration(userDto: CreateUserDto) {
        if ( await this.userService.getUserByEmail(userDto.email) || await this.userService.getUserByLogin(userDto.login)) {
            throw new HttpException({message: 'Пользователь уже существует!'}, HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const activationLink = uuid.v4();
        const user = await this.userService.createUser({...userDto, password: hashPassword, activationLink:activationLink });
        return this.generateToken(user);
    }

    async login(userDto: LoginAuthDto) {
        const user = await this.checkUser(userDto);
        this.communicationClient.emit(
            'user_logged',
            user.login
        );
        return this.generateToken(user);
    }


    private async generateToken( user: User) {
        const payload = {id: user.id, login: user.login, isActivate:user.isActivate, roles: user.roles};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async checkUser(userDto: LoginAuthDto) {
        const user =  await this.userService.getUserByEmail(userDto.nick) || await this.userService.getUserByLogin(userDto.nick);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Ошибка авторизации!'});
    }

}
