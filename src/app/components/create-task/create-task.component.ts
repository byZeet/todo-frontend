import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Importa CommonModule
import { FormsModule } from '@angular/forms'; // ✅ Importa FormsModule
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Asegura que FormsModule está importado
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  title: string = '';
  selectedDate: string = new Date().toISOString().split('T')[0];
  startTime: string = '18:00';
  endTime: string = '21:00';
  selectedPriority: 'high' | 'medium' | 'low' = 'medium';
  selectedColor: string = '#FF5733';

  // Lista de colores predefinidos
  colorOptions: string[] = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1', '#A133FF'];

  alertEnabled: boolean = false;

  constructor(private taskService: TaskService, private router: Router) {}

  setPriority(priority: 'high' | 'medium' | 'low'): void {
    this.selectedPriority = priority;
  }

  setColor(color: string): void {
    this.selectedColor = color;
  }

  addTask(): void {
    if (!this.title.trim()) return;

    const newTask: Task = {
      _id: '',
      title: this.title,
      completed: false,
      date: new Date(this.selectedDate),
      color: this.selectedColor,
      priority: this.selectedPriority,
      startTime: this.startTime,
      endTime: this.endTime,
      alert: this.alertEnabled
    };

    console.log('Tarea a enviar:', newTask);

    this.taskService.addTask(
      newTask.title,
      newTask.color,
      newTask.date,
      newTask.priority,
      newTask.startTime,
      newTask.endTime,
      newTask.alert
    ).subscribe(
      () => {
        console.log('Tarea guardada correctamente');
        this.router.navigate(['/']);
      },
      (error) => console.error('Error al guardar la tarea:', error)
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
