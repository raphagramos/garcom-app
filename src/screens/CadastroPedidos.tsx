import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Lanche } from "../../types";
import { theme } from "../styles/theme";
import { useLanches } from "../store/useLanches";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Input from "../components/Input";
import { usePedidos } from "../store/usePedidos";

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

const Subtle = styled.Text`
  color: ${({ theme }) => theme.colors.subtle};
  margin-bottom: 8px;
`;

type Props = NativeStackScreenProps<RootStackParamList, "New">;

export default function CadastroPedidoScreen({ navigation }: Props) {
  const { lanches } = useLanches();
  const { addPedido } = usePedidos();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [customIngredients, setCustomIngredients] = useState<Record<string, string[]>>({});
  const [note, setNote] = useState("");

  function toggleLanche(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function salvarPedido() {
  if (selectedIds.length === 0) {
    alert("Selecione ao menos um lanche.");
    return;
  }

  // Monta os lanches com ingredientes selecionados
  const lanchesComIngredientes = selectedIds.map((id) => ({
    lancheId: id,
    ingredients: customIngredients[id] ?? [], // se não tiver custom, salva vazio
  }));

  addPedido({
    lanches: lanchesComIngredientes,
    note,
  });

  alert(`Pedido criado com ${selectedIds.length} lanche(s).`);
  navigation.goBack();
}

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>Adicionar Lanches ao Pedido</Title>
        <Subtle>Selecione os lanches que deseja adicionar:</Subtle>

        <FlatList
          data={lanches}
          keyExtractor={(item: Lanche) => item.id}
          renderItem={({ item }) => (
            <Checkbox
              label={item.name}
              checked={selectedIds.includes(item.id)}
              onChange={() => {
                if (item.ingredients?.length) {
                  navigation.navigate("PedidoCustom", {
                    lancheId: item.id,
                    selectedIngredients: customIngredients[item.id] ?? [],
                    onReturn: (selected: string[]) => {
                      toggleLanche(item.id);
                      setCustomIngredients((prev) => ({
                        ...prev,
                        [item.id]: selected,
                      }));
                    },
                  });
                } else {
                  toggleLanche(item.id);
                }
              }}
            />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />

        <Input
          placeholder="Observações do pedido"
          value={note}
          onChangeText={setNote}
        />

        <Button title="Salvar Pedido" variant="success" onPress={salvarPedido} />
      </Container>
    </ThemeProvider>
  );
}
