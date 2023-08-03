import {create} from 'zustand'


type CartStore = {
    updateCart: boolean;
    setUpdateCart: (value: boolean) => void;
  };
  
  export const useCartStore = create<CartStore>((set) => ({
    updateCart: false,
    setUpdateCart: (value: boolean) => set({ updateCart: value }),
  }));