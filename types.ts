export type Ingredient = {
  id: string;
  name: string;
};
export type IngredientSelection = Ingredient & {
  selected: boolean;
};

export type Lanche = {
  id: string;
  nome: string;
  ingredientes: Ingredient[];
};

export type Order = {
  id: string;
  createdAt: number;
  lanches: {
    lancheId: string;
    ingredients: string[];
  }[];
  note: string;
};

export type RootStackParamList = {
  Home: undefined;
  Lanches: undefined;
  CadastroLanche: { comIngredientes: boolean };
  ProductLists: undefined;
  Pedido: { lancheId: string };
  PedidoCustom: {
    lancheId: string;
    selectedIngredients?: string[];
    onReturn?: (selected: string[]) => void;
    mode: "pedido" | "cadastro"; 
  };
  New: undefined;
  ConsultarPedidos: undefined;
};