import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TaskService], // Agregar aquí el servicio
  imports: [RouterOutlet] // Asegura la correcta importación del RouterOutlet
})
export class AppComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  title = 'todo-frontend';  // 👈 Agregado para evitar el error

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      console.log('Tareas:', tasks);
    });
  }
}
