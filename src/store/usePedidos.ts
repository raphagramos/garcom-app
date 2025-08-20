import { create } from "zustand";
import { Order } from "../../types";

type PedidoState = {
  pedidos: Order[];
  fetchPedidos: () => Promise<void>;
  addPedido: (p: Omit<Order, "id" | "createdAt">) => Promise<string>;
  updateStatus: (id: string, status: string) => Promise<void>;
};

export const usePedidos = create<PedidoState>((set, get) => ({
  pedidos: [],

  // 📥 Buscar pedidos no backend
  fetchPedidos: async () => {
    const res = await fetch("http://10.0.2.2:8080/pedidos", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data: Order[] = await res.json();
    set({ pedidos: data });
  },

  // ➕ Criar pedido
  addPedido: async (p) => {
    const res = await fetch("http://10.0.2.2:8080/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    const newOrder: Order = await res.json();
    set({ pedidos: [newOrder, ...get().pedidos] });
    return newOrder.id;
  },

  // 🔄 Atualizar status
  updateStatus: async (id, status) => {
    const res = await fetch(`http://10.0.2.2:8080/pedidos/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const updated: Order = await res.json();
    set({
      pedidos: get().pedidos.map((o) => (o.id === id ? updated : o)),
    });
  },
}));
