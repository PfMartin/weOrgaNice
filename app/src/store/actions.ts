export default {
  setUser(context: any, payload: any | null): void {
    const user: User | null = payload ? payload.user : null;
    context.commit('setUser', user);
  },
};
