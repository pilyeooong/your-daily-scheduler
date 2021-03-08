import { Entity, Column, OneToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import CoreEntity from './Core';
import Schedule from './Schedule';

export enum City {
  reset = '초기화',
  서울 = '서울',
  제주 = '제주',
  부산 = '부산',
  대전 = '대전',
  인천 = '인천',
  세종 = '세종',
  대구 = '대구',
  울산 = '울산',
  광주 = '광주',
  경기 = '경기',
  강원 = '강원',
  충북 = '충북',
  충남 = '충남',
  경북 = '경북',
  경남 = '경남',
  전북 = '전북',
  전남 = '전남',
}

@Entity()
export default class User extends CoreEntity {
  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @OneToOne(() => Schedule)
  schedule!: Schedule;

  @Column({ type: 'varchar', length: 20, default: 'local' })
  provider!: string;

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
