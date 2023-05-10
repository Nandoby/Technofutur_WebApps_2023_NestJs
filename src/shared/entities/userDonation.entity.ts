import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_donation')
export class UserDonationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: true, default: 0.0 })
  qty_in_kg: number;

  @Column({
    default: new Date().toLocaleString('fr-be', {
      timeZone: 'Europe/Brussels',
    }),
  })
  expiration_date: string;

  @ManyToOne(() => UserEntity, (user) => user.donation, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  user: UserEntity;
}
