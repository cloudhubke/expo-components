import create from 'zustand/vanilla';
import appReducer, { INITIAL_STATE } from './appReducer';

const authStore = create((set) => ({
  ...INITIAL_STATE,
  dispatch: (args) => set((state) => appReducer(state, args)),
}));

export default authStore;