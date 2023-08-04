import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { WalletTransaction } from './wallet.transaction.entity';


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

  @OneToMany(()=>WalletTransaction, transaction=>transaction.wallet) transaction:WalletTransaction[]

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

}