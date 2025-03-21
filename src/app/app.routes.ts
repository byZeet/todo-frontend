import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component'; // Importa el componente principal

export const routes: Routes = [
  { path: '', component: TaskListComponent }
];