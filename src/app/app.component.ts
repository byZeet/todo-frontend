import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TaskService], // Inyecta el servicio de tareas
  imports: [RouterOutlet] // Asegura la correcta importación del RouterOutlet
})
export class AppComponent implements OnInit {
  title = 'todo-frontend';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      console.log('Tareas:', tasks);
    });
  }
}
