import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { FlatList, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Order, Lanche } from "../../types";
import { theme } from "../styles/theme";
import { usePedidos } from "../store/usePedidos";
import { useLanches } from "../store/useLanches";
import Button from "../components/Button";

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

type Props = NativeStackScreenProps<RootStackParamList, "ConsultarPedidos">;

export default function ConsultarPedidosScreen({ navigation }: Props) {
  const { pedidos } = usePedidos();
  const { getById } = useLanches();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>Pedidos</Title>
        <FlatList
          data={pedidos}
          keyExtractor={(item: Order) => item.id}
          renderItem={({ item }) => (
            <>
              <Text style={{ fontWeight: "bold" }}>
                Pedido #{item.id.split("_").pop()}
              </Text>

              {(item.lanches ?? []).map(({ lancheId, ingredients }) => {
                const lanche = getById(lancheId);
                if (!lanche) return null;

                const ingredientNames = (ingredients ?? [])
                  .map(
                    (iId) => lanche.ingredientes?.find((i) => i.id === iId)?.name
                  )
                  .filter(Boolean);

                return (
                  <Text key={lanche.id}>
                    {lanche.nome}
                    {ingredientNames.length > 0
                      ? ` (Ingredientes: ${ingredientNames.join(", ")})`
                      : ""}
                  </Text>
                );
              })}

              {item.note ? <Text>Obs: {item.note}</Text> : null}
            </>
          )}
          ItemSeparatorComponent={() => <Text>────────────</Text>}
        />
      </Container>
    </ThemeProvider>
  );
}
