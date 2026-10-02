import { InjectionToken } from "@angular/core";

/** A type for the task status */
export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

/** A type for the task status option */
type TaskStatusOption = {
  value: 'open' | 'in-progress' | 'done';
  taskStatus: TaskStatus;
  text: string;
};

/** A token for the task status options */
export const TASK_STATUS_OPTIONS = new InjectionToken<typeof TaskStatusOptions>('task-status-option');

/** A list of options for the task status */
export const TaskStatusOptions: TaskStatusOption[] = [
  {
    value: 'open',
    taskStatus: 'OPEN',
    text: 'Open',
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    text: 'In Progress',
  },
  {
    value: 'done',
    taskStatus: 'DONE',
    text: 'Completed',
  },
];

/** A provider for the task status options */
export const taskStatusOptionsProvider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions,
};

/** A type for the task */
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
