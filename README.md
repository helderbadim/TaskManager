# Services Deep Dive

A small Angular 18 task manager that shows how standalone components share state through injectable services, signals, and an injection token.

Tasks live in memory. Adding or updating a task updates a signal in `TasksService`, and the list recomputes from that signal. Each change is also written to the browser console by `LoggingService`.

## Features

- Add a task with a title and description. New tasks start as **Open**.
- Change a task to **Open**, **In Progress**, or **Completed**.
- Filter the list by status. The filter options come from `TASK_STATUS_OPTIONS`.
- Log add and status-change actions with a timestamp.

## Getting started

Install dependencies, then start the dev server:

```bash
npm install
npm start
```

Open [http://localhost:4200/](http://localhost:4200/). The app reloads when you change a source file.

Other scripts:

| Command | What it does |
| --- | --- |
| `npm start` | Serves the app at `http://localhost:4200/` |
| `npm run build` | Builds for production into `dist/` |
| `npm test` | Runs unit tests with Karma |

## Project structure

```text
src/app/
  app.component.ts              Root component; renders the tasks screen
  logging.service.ts            Root service that logs messages to the console
  tasks/
    tasks.component.ts          Hosts the new-task form and the task list
    tasks.service.ts            Holds the task list and add/update methods
    task.model.ts               Task type, status options, and injection token
    new-task/                   Form that calls TasksService.addTask()
    tasks-list/                 Filters tasks and renders one item per task
      task-item/                Shows one task and updates its status
```

## How state is shared

`TasksService` and `LoggingService` are registered with `providedIn: 'root'`, so every component that injects them gets the same instance.

`TasksService` keeps tasks in a private signal. `allTasks()` returns that signal as readonly. The list reads it inside a `computed()`, so filtering stays in sync when a task is added or its status changes.

Status labels are not hard-coded in the templates. `task.model.ts` defines `TASK_STATUS_OPTIONS` and `taskStatusOptionsProvider`. `TasksListComponent` and `TaskItemComponent` provide that token and inject the option list for their dropdowns.
