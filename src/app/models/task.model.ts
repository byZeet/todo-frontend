export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  date: Date;
  color: string;
  priority: 'high' | 'medium' | 'low'; // ❌ Quita el '?', ahora siempre es obligatorio
  startTime: string;
  endTime: string;
  alert: boolean;
}
