import { Injectable } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { config } from 'dotenv';

config();

@Injectable()
export class AppService {
  public constructor(@InjectTwilio() private readonly client: TwilioClient) {}
  // constructor() {
  //     super({
  //       taID: process.env.TWILIO_ACCOUNT_SID,
  //       taTok: process.env.TWILIO_AUTH_TOKEN,
  //     });
  // }

  async sendSMS() {
    try {
      return await this.client.messages.create({
        body: 'SMS Body, sent to the phone!',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: TARGET_PHONE_NUMBER,
      });
    } catch (e) {
      return e;
    }
  }
}
