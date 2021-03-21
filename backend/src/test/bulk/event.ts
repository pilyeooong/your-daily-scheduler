import { DeepPartial } from 'typeorm';
import Database from '../../database';
import Event from '../../entity/Event';

const BULK_DATA: DeepPartial<Event>[] = [];

for (let i = 0; i < 1000; i++) {
  const randomContent = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(0, 5);
  BULK_DATA.push({
    content: randomContent,
    schedule: { id: 8 },
    date: '2021-03-19',
  });
}

const database = new Database();

const insertBulkData = async () => {
  await (await database.getConnection())
    .createQueryBuilder()
    .insert()
    .into(Event)
    .values(BULK_DATA)
    .execute();
};

insertBulkData();
