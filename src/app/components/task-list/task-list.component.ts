import { Component, inject } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TaskService } from '../../services/task.service';
import { TaskFilterComponent } from '../task-filter/task-filter.component';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    TaskFilterComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  private taskService = inject(TaskService);

  taskList: Task[] = [];
  filteredTaskList: Task[] = [];
  sortCriteria: string = 'date';

  private _bottomSheet = inject(MatBottomSheet);

  constructor() {
    this.taskService.getTasks().subscribe((data) => {
      this.taskList = data;
      this.filteredTaskList = [...this.taskList];
      this.sortTasks(this.sortCriteria);
    });
  }

  addNewTask() {
    this._bottomSheet.open(TaskCreateComponent);
  }

  markAsCompleted(item: Task) {
    item.completed = true;
    this.taskService
      .updateTask(item.id, item)
      .then((data) => {})
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  markAsUnCompleted(item: Task) {
    item.completed = false;
    this.taskService
      .updateTask(item.id, item)
      .then((data) => {})
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  deleteTask(item: Task) {
    this.taskService
      .deleteTask(item.id)
      .then((data) => {})
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //Filtering Tasks
  applyFilter(filterCriteria: { status: string; priority: string }) {
    console.log('log 1');
    this.filteredTaskList = this.taskList.filter((task) => {
      console.log('log 2');
      const statusMatch =
        filterCriteria.status === 'all' ||
        (filterCriteria.status === 'completed' && task.completed) ||
        (filterCriteria.status === 'pending' && !task.completed);
      const priorityMatch =
        filterCriteria.priority === 'all' ||
        task.priority === filterCriteria.priority;
      console.log(statusMatch && priorityMatch);
      return statusMatch && priorityMatch;
    });
  }

  // Sorting tasks list
  sortTasks(criteria: string) {
    this.sortCriteria = criteria;
    if (criteria === 'date') {
      this.filteredTaskList.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    } else if (criteria === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      this.filteredTaskList.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    }
  }
}
