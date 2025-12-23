import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/base.entity';
import { UserRole } from 'src/common/constants/roles.enum';
import { SellerProfile } from '../../seller/entities/seller.entity';
import { Address } from '../../address/entities/address.entity';

@Entity('users')
export class User extends BaseEntity {
  // AUTH
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.BUYER })
  role: UserRole;

  // PROFILE
  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  // METADATA
  @Column({ default: false })
  isEmailVerified: boolean;

  @Exclude()
  @Column({ nullable: true, select: false })
  emailVerificationToken: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  lastLogin: Date;

  @Column({ default: false })
  acceptsMarketing: boolean;

  // RELATIONS
  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToOne(() => SellerProfile, (sellerProfile) => sellerProfile.user)
  sellerProfile: SellerProfile;
}
