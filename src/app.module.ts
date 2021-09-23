import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/src/entities'],
      entitiesTs: ['./src/entities'],
      type: 'postgresql',
      clientUrl: 'postgres://localhost:5432',

      // todo: inject database.env
      dbName: 'simple_database',
      user: 'simple_user',
      password: 'simple_password',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
