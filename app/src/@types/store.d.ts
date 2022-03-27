declare namespace Store {
  interface State {
    user: User | null;
    categories: CategoryType[];
    systemMessage: SystemMessage;
    isMenuOpen: boolean;
  }
}
