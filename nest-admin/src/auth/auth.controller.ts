import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {

    }

    @Post('register')
    async register(@Body() body: any): Promise<User> {
        if(body.password !== body.password_confirm) {
            throw new BadRequestException('Password do not match!');
        }

        const hashed = await bcrypt.hash(body.password, 12);

        return await this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: hashed
        });
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.userService.findOne({email: email});

        if(!user) {
            throw new NotFoundException('User not found');
        }

        if(!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('Invalid credentials')
        }
        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt, {httpOnly: true});
        console.log(user);

        return user;
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request) {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);

        return await this.userService.findOne({id: data['id']});
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'Success'
        }
    }
}
