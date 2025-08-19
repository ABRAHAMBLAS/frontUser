export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  fecha: Date;
  // Puedes agregar más campos según la estructura de tu base de datos
  created_at: string;
  updated_at: string;
}