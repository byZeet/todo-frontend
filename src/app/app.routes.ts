import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component'; // ✅ Importado

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'create-task', component: CreateTaskComponent }, // ✅ Ruta para crear tarea
  { path: 'edit-task/:id', component: EditTaskComponent }  // ✅ Nueva ruta para editar tarea
];
