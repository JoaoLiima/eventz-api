import { Role } from '@/common/enums/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  AdminEntity,
  CostumerEntity,
  CredentialEntity,
} from '@/infra/typeorm/entities';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { name: 'user_id' })
  userId: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
    name: 'last_name',
  })
  lastName?: string;

  @Column({ enum: Role })
  role: Role;

  @Column({ nullable: true, unique: true })
  phone?: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @OneToOne(
    () => CredentialEntity,
    (credential: CredentialEntity) => credential.user,
    {
      cascade: ['insert', 'update'],
      eager: true,
    },
  )
  credential?: CredentialEntity;

  @OneToOne(() => AdminEntity, (admin: AdminEntity) => admin.user)
  admin?: AdminEntity;

  @OneToOne(() => CostumerEntity, (costumer: CostumerEntity) => costumer.user)
  costumer?: CostumerEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
