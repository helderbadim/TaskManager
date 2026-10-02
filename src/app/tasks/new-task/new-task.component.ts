import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  /** A reference to the form element */
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  /** A reference to the tasks service */
  private tasksService = inject(TasksService);

  /** Add a new task when the form is submitted
   * @param title - The title of the task
   * @param description - The description of the task
   * @returns void
  */
  onAddTask(title: string, description: string) {
    this.tasksService.addTask({ title, description });
    this.formEl()?.nativeElement.reset();
  }
}
