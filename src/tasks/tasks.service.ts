import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';

import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    try {
      const tasks = await this.tasksRepository.find();
      if (!tasks) {
        return null;
      }
      return tasks;
    } catch (err) {
      console.log('Error while get tasks', err);
      return null;
    }
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    try {
      const newTask = this.tasksRepository.create(dto);
      await this.tasksRepository.save(newTask);
      return newTask;
    } catch (err) {
      console.log('Error while add task', err);
      return null;
    }
  }

  async updateTask(id: number, updatedData: CreateTaskDto) {
    try {
      const task = await this.tasksRepository.findOneBy({ id });
      if (!task) {
        return null;
      }
      this.tasksRepository.merge(task, updatedData);
      await this.tasksRepository.save(task);
      return task;
    } catch (err) {
      console.log('Error while update task', err);
    }
  }

  async getTaskById(id: number) {
    try {
      const task = await this.tasksRepository.findOneBy({ id });
      if (!task) {
        return null;
      }
      return task;
    } catch (err) {
      console.log('Error while get task by id', err);
      return null;
    }
  }

  async deleteTask(id: number) {
    try {
      const result = await this.tasksRepository.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (err) {
      console.log('Error while delete task', err);
    }
  }
}
