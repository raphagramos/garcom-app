import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Lanche } from "../types";
import { uid } from "../utils/uid";

type LancheState = {
  lanches: Lanche[];
  addLanche: (name: string, ingredientNames: string[]) => void;
  removeLanche: (id: string) => void;
  getById: (id: string) => Lanche | undefined;
};

export const useLanches = create<LancheState>()(
  persist(
    (set, get) => ({
      lanches: [],
      addLanche: (name, ingredientNames) => {
        const ingredients = ingredientNames
          .map(n => n.trim())
          .filter(Boolean)
          .map(n => ({ id: uid("ing"), name: n }));
        const lanche: Lanche = { id: uid("lanche"), name, ingredients };
        set({ lanches: [lanche, ...get().lanches] });
      },
      removeLanche: (id) => {
        set({ lanches: get().lanches.filter(l => l.id !== id) });
      },
      getById: (id) => get().lanches.find(l => l.id === id),
    }),
    {
      name: "garcom_lanches",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
