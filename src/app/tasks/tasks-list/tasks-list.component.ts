import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [
    taskStatusOptionsProvider, // Inject the task status options into the component. We are not providing a class here, we are providing a value.
  ]
})
export class TasksListComponent {
  private selectedFilter = signal<string>('all');

  /** A reference to the tasks service */
  private tasksService = inject(TasksService);

  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  /** A signal to store the tasks */
  tasks = computed(() => {
    const tasks = this.tasksService.allTasks()();

    switch (this.selectedFilter()) {
      case 'open':
        return tasks.filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return tasks.filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return tasks.filter((task) => task.status === 'DONE');
      default:
        return tasks;
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
