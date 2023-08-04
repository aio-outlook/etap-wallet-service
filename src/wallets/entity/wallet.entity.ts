import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';


@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'userId',
    nullable:false
  })
  userId: number;

  @ManyToOne(type=> User, (user)=> user.wallets,)
  @JoinColumn({
    name: "userId"
  })
  user: User;

  @Column()
  currency: string;

  @Column('decimal', { default:0.0, scale: 2 })
  balance: number;


}