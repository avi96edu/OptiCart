import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { AdminProfileEntity } from '../profile/profile.entity';
import { ProjectEntity } from '../project/project.entity';
import { SellerEntity } from '../seller/seller.entity';

@Entity('admin')
export class AdminEntity {
  @PrimaryColumn({ type: 'varchar', length: 30 })
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 150 })
  fullName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean | undefined;

  @OneToOne(() => AdminProfileEntity, (profile) => profile.admin, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  profile!: AdminProfileEntity | null;

  @OneToMany(() => ProjectEntity, (project) => project.admin)
  projects: ProjectEntity[] | undefined;

  @OneToMany(() => SellerEntity, (seller) => seller.admin)
  sellers: SellerEntity[] | undefined;

  @BeforeInsert()
  generateId() {
    this.id = 'ADM-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }
}