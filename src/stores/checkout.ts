import { create } from "zustand";

type States = {
  name: string;
  informations: {
    grade1: string;
    grade2: string;
    gradeFinal: number;
    email: string;
    avatar: string;
    active: boolean;
  };
};

type Actions = {
  setName: (name: States['name']) => void;
  setInformations: (informations: States['informations']) => void;
};

const initialState: States = {
  name: '',
  informations: {
    grade1: '',
    grade2: '',
    gradeFinal: 0,
    email: '',
    avatar: '',
    active: false,
  },
};

export const useCheckoutStore = create<States & Actions>()((set) => ({
  ...initialState,
  setName: (name) => set((state) => ({ ...state, name })),
  setInformations: (informations) =>
    set((state) => ({ ...state, informations })),
}));
