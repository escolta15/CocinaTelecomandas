import { Dish } from './dish.model';
export interface SentSocket {
  tipo?: string;
  type?: string;
  id: number;
  plato: Dish;
}
