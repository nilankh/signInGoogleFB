import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import  UserEntity  from './schemas/user.entity';
import { User } from './interfaces/user.interface';
import twilio from 'twilio';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';
import * as phoneToken from 'generate-sms-verification-code';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async loginUser(user: User) {
    const retrievedUser = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (retrievedUser) {
      return {
        success: await bcrypt.compare(user.password, retrievedUser.password),
        retrievedUser,
      };
    } else {
      return { success: false };
    }
  }

  generateUserVerificationCode() {
    return phoneToken(4);
  }

  async sendSMSToUser(user: User, body: string) {
    const smsSent = await client.messages.create({
      body,
      to: user.phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    return !!smsSent.sid;
  }

  async sendUserVerificationCode(user: User) {
    const verificationCode = this.generateUserVerificationCode();

    await this.userRepository.update(user.userId, {
      smsOTP: verificationCode,
      otpExpirationDate: moment().add(5, 'm').toDate(),
    });

    const smsSent = await this.sendSMSToUser(
      user,
      `Your verification code is: ${verificationCode}`,
    );

    return smsSent;
  }
}
