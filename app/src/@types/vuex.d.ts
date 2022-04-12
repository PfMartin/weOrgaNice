interface StoreState {
  user: null | User;
  categories: Category[];
}

interface StoreMutations {
  setUser: (state: StoreState, newUser: User) => void;
}

interface StoreActions {
  setUser: (context: any, payload: any) => void;
}
