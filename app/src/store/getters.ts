export default {
  user(state: Store.State): User | null {
    return state.user;
  },
  categories(state: Store.State): Category[] {
    return state.categories;
  },
  systemMessage(state: Store.State): SystemMessage {
    return state.systemMessage;
  },
  isMenuOpen(state: Store.State): boolean {
    return state.isMenuOpen;
  },
};
