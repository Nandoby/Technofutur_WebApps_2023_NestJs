import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  login: string;

  @Column({ unique: true, length: 50 })
  mdp: string;

  @Column()
  active: boolean;
}
