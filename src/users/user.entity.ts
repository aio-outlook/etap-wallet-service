import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';


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

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}