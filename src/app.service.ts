import { Injectable } from '@nestjs/common';
import { EntityManager, MikroORM } from '@mikro-orm/core'
import { User, UserWrite } from './entities/user.entity'

@Injectable()
export class AppService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager
  ) {
  }
  getHello(): string {
    return 'Hello World!';
  }

  async getUsers(): Promise<User[]> {
    return this.em.find(User, {});
  }

  async getUser(id: string): Promise<User> {
    return this.em.findOne(User, id);
  }

  async createUser(user: UserWrite): Promise<User> {
    const created = await this.em.create(User, user);
    await this.em.persistAndFlush(created);
    return created;
  }

  async updateUser(id: string, user: UserWrite): Promise<User> {
    const existing = await this.em.findOne(User, id);
    existing.email = user.email;
    existing.first = user.first;
    existing.last = user.last;

    await this.em.persistAndFlush(existing);
    return existing;
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await this.em.nativeDelete(User, id);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
