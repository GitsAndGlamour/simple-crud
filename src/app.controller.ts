import { Body, Controller, Delete, Get, Param, Patch, Put } from '@nestjs/common'
import { AppService } from './app.service';
import { User, UserWrite } from './entities/user.entity'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  async getUsers(): Promise<User[]> {
    return this.appService.getUsers();
  }

  @Get('/users/:id')
  async getUser(@Param() id: string): Promise<User> {
    return this.appService.getUser(id);
  }

  @Put('/users')
  async createUser(@Body() user: UserWrite): Promise<User> {
    return this.appService.createUser(user);
  }

  @Patch('/users/:id')
  async updateUser(@Param() id: string, @Body() user: UserWrite): Promise<User> {
    return this.appService.updateUser(id, user);
  }

  @Delete('/users/:id')
  async deleteUser(@Param() id: string): Promise<boolean> {
    return this.appService.deleteUser(id);
  }
}
