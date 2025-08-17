export type Ingredient = { id: string; name: string };
export type Lanche = { id: string; name: string; ingredients: Ingredient[] };

export type Order = {
  id: string;
  lancheId: string;
  excludedIngredientIds: string[];
  note?: string;
  createdAt: number;
};

export type RootStackParamList = {
  Home: undefined;
  Lanches: undefined;
  "Cadastrar Lanche": undefined;
  Pedido: { lancheId: string };
  New: undefined;
};
