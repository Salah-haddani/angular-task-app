import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-task-filter',
  imports: [FormsModule, MatSelectModule],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css'],
})
export class TaskFilterComponent {
  @Output() filterChange = new EventEmitter<{
    status: string;
    priority: string;
  }>();

  selectedStatus: string = 'all';
  selectedPriority: string = 'all';

  applyFilter() {
    console.log('log 4');
    this.filterChange.emit({
      status: this.selectedStatus,
      priority: this.selectedPriority,
    });
    console.log('log 5');
  }

  resetFilter() {
    this.selectedPriority = 'all';
    this.selectedStatus = 'all';
    this.applyFilter();
  }
}
