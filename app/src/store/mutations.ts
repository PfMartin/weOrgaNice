export default {
  setUser(state: any, newUser: User | null): void {
    state.user = newUser;
  },
  setCategories(state: any, categories: CategoryType[]): void {
    state.categories = categories;
  },
};
