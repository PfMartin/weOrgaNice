interface StoreState {
  user: null | User;
  categories: CategoryType[];
}

interface StoreMutations {
  setUser: (state: StoreState, newUser: User) => void;
}

interface StoreActions {
  setUser: (context: any, payload: any) => void;
}
