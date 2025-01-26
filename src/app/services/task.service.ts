import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, Timestamp, updateDoc } from '@angular/fire/firestore';
import { Task } from '../models/task.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private collectionName = "tasks";

  constructor(private firestore: Firestore) { }

  //create new task
  async createTask(data: Task): Promise<void> {
    const tasksCollection = collection(this.firestore, this.collectionName);
    await addDoc(tasksCollection, data);
  }

  //get the list of tasks
  getTasks(): Observable<any[]>{
    const tasksCollection = collection(this.firestore, this.collectionName);
    return collectionData(tasksCollection, { idField: "id" }).pipe(
      map((tasks) =>
        tasks.map((task) => {
          // check if the dueDate is instance of timestamp
          if (task['dueDate'] instanceof Timestamp) {
            return { ...task, dueDate: task['dueDate'].toDate() }
          }
          return task;
        })
      )
    );
  }

   // read a single task by ID
   getTaskById(id: string): Observable<any> {
    const taskDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(taskDoc, { idField: 'id' });
  }

  // update a task
  async updateTask(id: string, data: any): Promise<void> {
    const taskDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    await updateDoc(taskDoc, data);
  }

  // delete a task
  async deleteTask(id: string): Promise<void> {
    const taskDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    await deleteDoc(taskDoc);
  }
}
