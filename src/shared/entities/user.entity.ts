import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDonationEntity } from './userDonation.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false, unique: true })
  login: string;

  @Column({ unique: true, length: 50 })
  mdp: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => UserDonationEntity, (donation) => donation.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  donation: UserDonationEntity[];
}
