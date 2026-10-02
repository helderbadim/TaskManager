import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root', // This means the service is available throughout the app, we can use it in any component, directive, pipe, etc.
})
export class TasksService {
  /** A signal to store the tasks */
  private tasks = signal<Task[]>([]);

  /** A reference to the logging service */
  private loggingService = inject(LoggingService);

  /** Get all tasks
   * @returns A readonly signal of the tasks
   */
  allTasks() {
    return this.tasks.asReadonly();
  }

  /** Add a new task
   * @param taskData - The data for the new task
   * @returns void
   */
  addTask(taskData: { title: string, description: string }) {
    const newTask: Task = { id: Date.now().toString(), status: 'OPEN', ...taskData };
    this.tasks.update(tasks => [...tasks, newTask]);
    this.loggingService.log(`Added task: ${newTask.title}`);
  }

  /** Update the status of a task
   * @param taskId - The id of the task to update
   * @param newStatus - The new status of the task
   * @returns void
   */
  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update(tasks => tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
    this.loggingService.log(`Updated task status: ${taskId} to ${newStatus}`);
  }

}
