import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { Wallet } from './wallet.entity';

export enum TransactionStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FUNDED = 'FUNDED',
}

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

@Entity()
export class WalletTransaction {
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

  @ManyToOne(type=> Wallet, (wallet)=> wallet.transaction,)
  @JoinColumn({
    name: "walletId"
  })
  wallet: Wallet;

  @Column({
    name: 'walletId',
    nullable:false
  })
  walletId: number;

  @Column({nullable:true})
  paymentReference: string;

  @Column('decimal', {nullable:false, scale: 2 })
  amount: number;

  @Column("enum", {enum: TransactionType, nullable: false })
  transactionType: string

  @Column("enum", {enum: TransactionStatus,default:TransactionStatus.PENDING })
  status: string

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;


}