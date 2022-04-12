export default {
  setUser(state: Store.State, newUser: User | null): void {
    state.user = newUser;
  },
  setCategories(state: Store.State, categories: Category[]): void {
    state.categories = categories;
  },
  setSystemMessage(state: Store.State, systemMessage: SystemMessage): void {
    state.systemMessage = systemMessage;
  },
  toggleMenu(state: Store.State, newValue: boolean): void {
    state.isMenuOpen = newValue;
  },
};
