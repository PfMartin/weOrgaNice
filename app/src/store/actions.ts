import { ActionContext } from 'vuex';

type Context = ActionContext<Store.State, Store.State>;

export enum STORE_ACTIONS {
  SET_USER = 'setUser',
  SET_CATEGORIES = 'setCategories',
  SET_SYSTEM_MESSAGE = 'setSystemMessage',
  TOGGLE_MENU = 'toggleMenu',
}

export default {
  setUser(context: Context, payload: any | null): void {
    const user: User | null = payload ? payload.user : null;
    context.commit(STORE_ACTIONS.SET_USER, user);
  },

  setCategories(context: Context, payload: CategoryType[]): void {
    context.commit(STORE_ACTIONS.SET_CATEGORIES, payload);
  },

  setSystemMessage(context: Context, payload: SystemMessage): void {
    context.commit(STORE_ACTIONS.SET_SYSTEM_MESSAGE, payload);
    setTimeout(() => {
      const emptySystemMessage = {
        msg: '',
        msgType: '',
      };

      context.commit(STORE_ACTIONS.SET_SYSTEM_MESSAGE, emptySystemMessage);
    }, 5000);
  },

  toggleMenu(context: Context): void {
    context.commit(STORE_ACTIONS.TOGGLE_MENU, !context.state.isMenuOpen);
  },
};
