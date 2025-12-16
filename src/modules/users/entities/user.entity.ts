import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { UserRole } from 'src/common/constants/roles.enum';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.BUYER })
  role: UserRole;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  // SELLER DETAILS
  @Column({ type: 'varchar', nullable: true })
  store_name: string;

  @Column({ type: 'varchar', nullable: true })
  store_description: string;
}
