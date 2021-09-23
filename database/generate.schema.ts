import { MikroORM } from '@mikro-orm/core';

(async () => {
  const orm = await MikroORM.init({
    discovery: {
      warnWhenNoEntities: false,
    },
    entities: [process.cwd() + '/dist/entities'],
    entitiesTs: [process.cwd() + '/src/entities'],
    type: 'postgresql',
    clientUrl: 'postgres://localhost:5432',

    // todo: inject database.env
    dbName: 'simple_database',
    user: 'simple_user',
    password: 'simple_password',
  });

  // Generate table schema
  const generator = orm.getSchemaGenerator();
  const dump = await generator.generate();
  console.log(dump);

  // Run schema
  const connection = orm.em.getConnection();
  const res = await connection.execute(dump);
  console.log(res);

  await orm.close(true);
})();