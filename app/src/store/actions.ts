export default {
  setUser(context: any, newUser: string | null): void {
    context.commit('setUser', newUser);
  },
};
