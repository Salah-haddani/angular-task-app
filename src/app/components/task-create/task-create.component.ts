import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css',
})
export class TaskCreateComponent {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<TaskCreateComponent>>(MatBottomSheetRef);

  private taskService = inject(TaskService);

  taskForm!: FormGroup;

  task = {
    title: '',
    dueDate: new Date(),
    priority: 'High',
  };

  constructor() {
    this.initForm();
  }

  initForm() {
    this.taskForm = new FormGroup({
      title: new FormControl(this.task.title, Validators.required),
      dueDate: new FormControl(this.task.dueDate, Validators.required),
      priority: new FormControl(this.task.priority, Validators.required),
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    }

    this.taskService.createTask(this.taskForm.value).then(() => {
      console.log('Task created successfully');
      this._bottomSheetRef.dismiss();
    });
  }
}
