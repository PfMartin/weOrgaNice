export default {
  user(state: any): string | null {
    return state.user;
  },
  categories(state: any): CategoryType[] {
    return state.categories;
  },
};
