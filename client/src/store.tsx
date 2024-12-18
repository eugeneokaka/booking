import { create } from "zustand";
type info = {
  id: string | null;
  name: string | null;
  email: string | null;
};
type CounterStore = {
  user: info;
  setinfo: (obj: info) => void;
};
export const useCounterStore = create<CounterStore>((set) => ({
  user: {
    id: null,
    email: null,
    name: null,
  },
  setinfo: (obj) => {
    set(() => ({ user: obj }));
  },
}));
