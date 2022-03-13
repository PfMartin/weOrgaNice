type ReactiveString = string | undefined;

interface CategoryType {
  id: number;
  name: string;
  color: string;
  default: boolean;
}

interface RepeatingType {
  name: string;
  value: number;
}

interface Todo {
  category_id: number;
  name: string;
  details: string;
  due_date: string;
  user_id: string;
  repeating_unit?: string;
  repeating_number?: number;
}
