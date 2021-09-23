import { v4 } from 'uuid';
import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User extends BaseEntity<any, any> {

  @PrimaryKey()
  id: string = v4();

  @Property()
  first!: string;

  @Property()
  last!: string;

  @Property()
  email!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}

export type UserWrite = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;