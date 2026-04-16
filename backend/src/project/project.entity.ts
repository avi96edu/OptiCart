import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdminEntity } from '../admin/admin.entity';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'float' })
  budget: number;

  @Column({ type: 'date' })
  deadline: string;

  @ManyToOne(() => AdminEntity, (admin) => admin.projects)
  admin: AdminEntity;
}