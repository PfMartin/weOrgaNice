declare namespace Store {
  interface State {
    user: User | null;
    categories: Category[];
    systemMessage: SystemMessage;
    isMenuOpen: boolean;
  }
}
