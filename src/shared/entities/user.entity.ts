import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
