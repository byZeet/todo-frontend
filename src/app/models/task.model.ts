export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  date: Date; // Aquí antes era string, ahora lo cambiamos a Date
  color: string;
}
