type ReactiveString = string | undefined;

interface CategoryType {
  id: number;
  name: string;
  color: string;
  default: boolean;
}

interface RepeatingName {
  id: number;
  name: string;
  multiple_of_hour: number;
}

interface RepeatingType {
  name: string;
  value: number;
}

interface Todo {
  id?: number;
  category_id: number;
  name: string;
  details: string;
  due_date: string;
  user_id: string;
  created_at?: string;
  repeating_name_id?: number;
  repeating_value?: number;
}

interface SystemMessage {
  msg: string;
  msgType: string;
}
