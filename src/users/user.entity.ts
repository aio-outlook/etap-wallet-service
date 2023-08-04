import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Wallet } from 'src/wallets/entity/wallet.entity';



export enum UserType {
    OWNER = 'OWNER',
    ADMIN = 'ADMIN',
  }
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique: true})
  phone: string;

  @Column()
  password: string;

  @Column({type: "enum", enum: UserType, default: UserType.OWNER})
  user_type: string;

  @OneToMany(()=>Wallet, wallets=>wallets.user) wallets:Wallet[]

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}