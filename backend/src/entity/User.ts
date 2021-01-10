import { Entity, Column, OneToOne, JoinColumn, RelationId } from 'typeorm';
import * as bcrypt from 'bcrypt';
import CoreEntity from './Core';
import Schedule from './Schedule';

@Entity()
export default class User extends CoreEntity {
  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @OneToOne(() => Schedule)
  schedule!: Schedule;

  async checkPassword(passwordInput: string): Promise<boolean> {
    try {
      const isMatched = await bcrypt.compare(passwordInput, this.password);
      return isMatched;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
