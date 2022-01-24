interface StoreState {
  user: null | User;
}

interface StoreMutations {
  setUser: (state: StoreState, newUser: User) => void;
}

interface StoreActions {
  setUser: (context: any, payload: any) => void;
}
