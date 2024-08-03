import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  model: string;

  @Column('text')
  question: string;

  @Column('text')
  response: string;

  @CreateDateColumn()
  createdAt: Date;
}
