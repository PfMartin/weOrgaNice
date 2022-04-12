type ReactiveString = string | undefined;

interface Category {
  name: string;
  details: string;
  color: string;
  isDefault: boolean;
  user_id?: string;
}

interface SupabaseCategory extends Category {
  id: number;
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
