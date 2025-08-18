export type Ingredient = { 
  id: string; 
  name: string; 
};

export type Lanche = {
  id: string;
  name: string;
  ingredients: Ingredient[];
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
  Pedido: { lancheId: string };
  PedidoCustom: {
    lancheId: string;
    selectedIngredients?: string[];
    onReturn?: (selected: string[]) => void;
  };
  New: undefined;
  ConsultarPedidos: undefined;
};
