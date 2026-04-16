import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdminEntity } from '../admin/admin.entity';

@Entity('seller')
export class SellerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  sellerName: string;

  @Column({ type: 'varchar', length: 100 })
  shopName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @ManyToOne(() => AdminEntity, (admin) => admin.sellers, {
    onDelete: 'CASCADE',
  })
  admin: AdminEntity;
}