export default {
  user(state: Store.State): User | null {
    return state.user;
  },
  categories(state: Store.State): CategoryType[] {
    return state.categories;
  },
  systemMessage(state: Store.State): SystemMessage {
    return state.systemMessage;
  },
};
