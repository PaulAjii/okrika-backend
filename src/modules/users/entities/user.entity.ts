import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/base.entity';
import { UserRole } from 'src/common/constants/roles.enum';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.BUYER })
  role: UserRole;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  // SELLER DETAILS
  @Column({ type: 'varchar', nullable: true })
  storeName: string;

  @Column({ type: 'varchar', nullable: true })
  storeDescription: string;
}
