import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Task, TASK_STATUS_OPTIONS, TaskStatus, taskStatusOptionsProvider } from '../../task.model';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
  providers: [
    taskStatusOptionsProvider,
  ],
})
export class TaskItemComponent {
  /** A required input for the task */
  task = input.required<Task>();

  /** A reference to the tasks service */
  private tasksService = inject(TasksService);

  /** A reference to the task status options */
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);


  /** A computed signal to store the task status */
  taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  });

  /** Change the status of a task
   * @param taskId - The id of the task to update
   * @param status - The new status of the task
   * @returns void
   */
  onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatus = 'OPEN';

    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }

    this.tasksService.updateTaskStatus(taskId, newStatus);
  }
}
