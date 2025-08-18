import React, { useMemo, useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { Alert, FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Lanche, Ingredient } from "../../types";
import { theme } from "../styles/theme";
import { useLanches } from "../store/useLanches";
import IngredientFlag from "../components/IngredientFlag";
import Button from "../components/Button";
import Input from "../components/Input";
import { usePedidos } from "../store/usePedidos";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const Subtle = styled.Text`
  color: ${({ theme }) => theme.colors.subtle};
  margin-bottom: 8px;
`;

type Props = NativeStackScreenProps<RootStackParamList, "Pedido">;

function PedidoScreen({ route, navigation }: Props) {
  const { lancheId } = route.params;
  const { getById } = useLanches();
  const { addPedido } = usePedidos();
  const lanche = getById(lancheId);

  const [note, setNote] = useState<string>("");

  const [flags, setFlags] = useState<Record<string, boolean>>(() => {
    // Se lanche ou ingredientes forem undefined, retorna objeto vazio
    if (!lanche?.ingredients) return {};
    // Senão, inicializa cada ingrediente como true
    return Object.fromEntries(lanche.ingredients.map((i) => [i.id, true]));
  });

  const excludedNames = useMemo(() => {
    if (!lanche?.ingredients) return [];
    return lanche.ingredients
      .filter((i) => flags[i.id] === false)
      .map((i) => i.name);
  }, [flags, lanche]);

  if (!lanche) {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Subtle>Ops, lanche não encontrado.</Subtle>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </Container>
      </ThemeProvider>
    );
  }

  function salvar() {
    const excludedIds = Object.entries(flags)
      .filter(([_, v]) => v === false)
      .map(([k]) => k);

    const orderId = addPedido({
      lanches: [
        {
          lancheId: lanche!.id,
          ingredients: excludedIds, // ou os ingredientes que o usuário selecionou
        },
      ],
      note,
    });

    Alert.alert("Pedido salvo", `Pedido #${orderId.split("_").pop()} criado.`);
    navigation.goBack();
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>{lanche.name}</Title>
        <Subtle>
          Marque para INCLUIR — desmarque o que o cliente NÃO quer.
        </Subtle>

        <FlatList
          data={lanche.ingredients ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <IngredientFlag
              ingredient={item}
              value={flags[item.id] !== false}
              onChange={(next) =>
                setFlags((prev) => ({ ...prev, [item.id]: next }))
              }
            />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />

        <Input
          placeholder="Observações (ex.: ponto da carne, pouco sal)"
          value={note}
          onChangeText={setNote}
        />

        {excludedNames.length > 0 ? (
          <Subtle>Sem: {excludedNames.join(", ")}</Subtle>
        ) : (
          <Subtle>Nenhum ingrediente removido.</Subtle>
        )}

        <Button title="Salvar Pedido" variant="success" onPress={salvar} />
      </Container>
    </ThemeProvider>
  );
}

export default PedidoScreen;
