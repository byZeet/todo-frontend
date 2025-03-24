import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskId: string = '';
  title: string = '';
  selectedDate: string = '';
  startTime: string = '';
  endTime: string = '';
  selectedColor: string = '#ff66b2';
  selectedPriority: 'high' | 'medium' | 'low' = 'medium';
  alertEnabled: boolean = false;

  colorOptions: string[] = ['#ff66b2', '#ffcc00', '#66ccff', '#ff6666', '#99cc33', '#9966ff'];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Task ID recibido:', this.taskId);
    
    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe(
        (task: Task) => {
          console.log('Tarea recibida:', task);
          this.title = task.title;
          this.selectedDate = new Date(task.date).toISOString().split('T')[0];
          this.startTime = task.startTime;
          this.endTime = task.endTime;
          this.selectedColor = task.color;
          this.selectedPriority = task.priority;
          this.alertEnabled = task.alert;
        },
        (error) => {
          console.error('Error al obtener la tarea:', error);
        }
      );
    } else {
      console.error('❌ No se recibió un Task ID válido.');
    }
  }

  updateTask(): void {
    if (!this.title.trim()) return;
  
    const updatedTask: Task = {
      _id: this.taskId,
      title: this.title,
      completed: false,
      date: new Date(this.selectedDate),
      color: this.selectedColor,
      startTime: this.startTime,
      endTime: this.endTime,
      priority: this.selectedPriority,
      alert: this.alertEnabled
    };
  
    this.taskService.updateTask(updatedTask).subscribe(
      () => {
        console.log('Tarea actualizada correctamente:', updatedTask);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error al actualizar la tarea:', error);
      }
    );
  }

  deleteTask(): void {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) return;
    
    this.taskService.deleteTask(this.taskId).subscribe(
      () => {
        console.log('Tarea eliminada correctamente');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error al eliminar la tarea:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
