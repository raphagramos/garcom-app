import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Order } from "../../types";
import { uid } from "../utils/uid";

type PedidoState = {
  pedidos: Order[];
  addPedido: (p: Omit<Order, "id" | "createdAt">) => string;
  clear: () => void;
};

export const usePedidos = create<PedidoState>()(
  persist(
    (set, get) => ({
      pedidos: [],
      addPedido: (p) => {
        const id = uid("pedido");
        const newOrder: Order = {
          id,
          createdAt: Date.now(),
          ...p,
        };
        set({ pedidos: [newOrder, ...get().pedidos] });
        return id;
      },
      clear: () => set({ pedidos: [] }),
    }),
    {
      name: "garcom_pedidos",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
