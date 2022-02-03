import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public phoneNumber: string;

  @Column()
  public password: string;

//   @Column()
//   public smsOTP: string;

//   @Column()
//   otpExpirationDate: Date;
}

export default UserEntity;