const prod = process.env.NODE_ENV === 'production';
export const API_HOST = prod ? 'http://api.yourdailyscheduler.link' : 'http://localhost:4000';

export const holidays = [
  { name: '신정', date: '2021-01-01' },
  { name: '설날 연휴', date: '2021-02-11' },
  { name: '설날', date: '2021-02-12' },
  { name: '설날 연휴', date: '2021-02-13' },
  { name: '삼일절', date: '2021-03-01' },
  { name: '어린이날', date: '2021-05-05' },
  { name: '석가탄신일', date: '2021-05-19' },
  { name: '현충일', date: '2021-06-06' },
  { name: '광복절', date: '2021-08-15' },
  { name: '추석 연휴', date: '2021-09-20' },
  { name: '추석', date: '2021-09-21' },
  { name: '추석 연휴', date: '2021-09-22' },
  { name: '개천절', date: '2021-10-03' },
  { name: '한글날', date: '2021-10-09' },
  { name: '크리스마스', date: '2021-12-25' },
];

export const cities = [
  '서울',
  '제주',
  '부산',
  '대전',
  '인천',
  '세종',
  '대구',
  '울산',
  '광주',
  '경기',
  '강원',
  '충북',
  '충남',
  '경북',
  '경남',
  '전북',
  '전남',
];
