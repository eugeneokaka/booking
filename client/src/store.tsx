import { create } from "zustand";
import { persist } from "zustand/middleware";
type info = {
  id: string | null;
  name: string | null;
  email: string | null;
};
type Journey = {
  destination: string | null;

  price: number | 0;
};
type CounterStore = {
  user: info;
  journey: Journey;
  setinfo: (obj: info) => void;
  setbook: (obj: Journey) => void;
};
export const useCounterStore = create<CounterStore>((set) => ({
  user: {
    id: null,
    email: null,
    name: null,
  },
  journey: {
    destination: null,

    price: 0,
  },
  setinfo: (obj) => {
    set(() => ({ user: obj }));
  },
  setbook: (obj) => {
    set(() => ({ journey: obj }));
  },
}));
