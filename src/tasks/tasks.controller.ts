import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';

@ApiTags('Задачи')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 200,
    type: Task,
    description: 'The task has been successfully created.',
  })
  @Post()
  createTask(@Body() taskDto: CreateTaskDto) {
    return this.tasksService.createTask(taskDto);
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    type: [Task],
  })
  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(id: number) {
    console.log(id);
    return this.tasksService.getTaskById(id);
  }
}
