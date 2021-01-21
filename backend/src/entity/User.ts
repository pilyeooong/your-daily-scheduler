import { Entity, Column, OneToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import CoreEntity from './Core';
import Schedule from './Schedule';

export enum City {
  서울 = '서울',
  제주 = '제주',
}

@Entity()
export default class User extends CoreEntity {
  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @OneToOne(() => Schedule)
  schedule!: Schedule;

  @Column({ type: 'enum', enum: City, nullable: true })
  city!: City;

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
