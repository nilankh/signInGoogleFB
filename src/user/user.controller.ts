import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import {UserService} from './user.service';


@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('/login')
    async loginUser(
        @Body()
        user: User,
        @Res() res,
    ){
        const loginRes = await this.userService.loginUser(user);
        let smsSent = false;


        if(loginRes.success){
            smsSent = await this.userService.sendUserVerificationCode(
                loginRes.retrievedUser,
            );
        }

        res.status(HttpStatus.OK).send({
            success: loginRes.success && smsSent,
            userId: loginRes?.retrievedUser.userId,
        })

    }   
}
