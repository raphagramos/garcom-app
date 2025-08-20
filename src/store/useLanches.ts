import { create } from "zustand";
import { Lanche } from "../../types";

type LancheState = {
  lanches: Lanche[];
  fetchLanches: () => Promise<void>;
  addLanche: (nome: string, ingredientes: string[]) => Promise<void>;
  removeLanche: (id: string) => Promise<void>;
  updateIngredients: (lancheId: string, ingredientes: string[]) => Promise<void>;
  getById: (id: string) => Lanche | undefined;
};

export const useLanches = create<LancheState>((set, get) => ({
  lanches: [],

  // 📥 Buscar todos os lanches
  fetchLanches: async () => {
    try {
      const res = await fetch("http://10.0.2.2:8080/lanches");
      const data: Lanche[] = await res.json();
      set({ lanches: data });
    } catch (error) {
      console.error("!! ❌ Erro ao buscar lanches:", error);
    }
  },

  // ➕ Criar novo lanche
  addLanche: async (nome, ingredientes) => {
    // 1. Prepara o objeto que será enviado
    const lancheParaEnviar = { nome, ingredientes };

    // 2. LOG: Mostra no console exatamente o que está sendo enviado
    console.log(
      ">> 🚀 Enviando para o back-end:",
      JSON.stringify(lancheParaEnviar, null, 2)
    );

    try {
      const res = await fetch("http://10.0.2.2:8080/lanches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lancheParaEnviar),
      });

      // 3. LOG: Mostra o status da resposta (ex: 200 para OK, 500 para erro)
      console.log("<< ✅ Resposta do back-end (status):", res.status);

      if (!res.ok) {
        // Se a resposta não for OK, loga o corpo do erro
        const errorBody = await res.text();
        console.error("!! ❌ Corpo do erro recebido do back-end:", errorBody);
        throw new Error(`Erro do servidor: ${res.status}`);
      }

      const newLanche: Lanche = await res.json();

      // 4. LOG: Mostra o objeto completo que o back-end retornou após salvar
      console.log(
        "<< 📦 Dados recebidos do back-end:",
        JSON.stringify(newLanche, null, 2)
      );

      set({ lanches: [newLanche, ...get().lanches] });
    } catch (error) {
      // 5. LOG: Captura qualquer erro de rede ou falha na requisição
      console.error("!! ❌ Erro na função addLanche:", error);
    }
  },

  // ❌ Remover lanche
  removeLanche: async (id) => {
    try {
      await fetch(`http://10.0.2.2:8080/lanches/${id}`, { method: "DELETE" });
      set({ lanches: get().lanches.filter((l) => l.id !== id) });
    } catch (error) {
      console.error(`!! ❌ Erro ao remover lanche ${id}:`, error);
    }
  },

  // ✏️ Atualizar ingredientes
  updateIngredients: async (lancheId, ingredientes) => {
    // Adicionando logs aqui também para consistência
    const dadosParaAtualizar = { ingredientes };
    console.log(
      ">> ✏️ Atualizando ingredientes do lanche:",
      lancheId,
      JSON.stringify(dadosParaAtualizar, null, 2)
    );
    try {
      const res = await fetch(`http://10.0.2.2:8080/lanches/${lancheId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosParaAtualizar),
      });
      const updated: Lanche = await res.json();
      set({
        lanches: get().lanches.map((l) => (l.id === lancheId ? updated : l)),
      });
    } catch (error) {
        console.error(`!! ❌ Erro ao atualizar lanche ${lancheId}:`, error);
    }
  },

  // 🔎 Buscar lanche em memória pelo id
  getById: (id) => get().lanches.find((l) => l.id === id),
}));
