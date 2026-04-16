import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdminEntity } from '../admin/admin.entity';

@Entity('admin_profile')
export class AdminProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 200 })
  address: string;

  @Column({ type: 'int' })
  age: number;

  @OneToOne(() => AdminEntity, (admin) => admin.profile)
  admin: AdminEntity;
}