import * as TypeORM from 'typeorm';

export default async function bootstrapDatabase() {
    return await TypeORM.createConnection();
}
