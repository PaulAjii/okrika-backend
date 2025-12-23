import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

export enum SellerStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
}

@Entity('sellerProfile')
export class SellerProfile extends BaseEntity {
  // STORE DETAILS
  @Column({ unique: true })
  storeName: string;

  @Column({ unique: true })
  storeSlug: string;

  @Column({ type: 'text', nullable: true })
  storeDescription: string;

  @Column({ nullable: true })
  storeLogoUrl: string;

  @Column({ type: 'enum', enum: SellerStatus, default: SellerStatus.PENDING })
  status: SellerStatus;

  // FINANCIALS
  @Column()
  bankAccountNumber: string;

  @Column()
  bankName: string;

  @Column({ nullable: true })
  bankCode: string;

  // RELATIONS
  @OneToOne(() => User, (user) => user.sellerProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;
}
