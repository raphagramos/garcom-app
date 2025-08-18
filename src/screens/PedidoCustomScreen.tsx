import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { FlatList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Lanche } from "../../types";
import { theme } from "../styles/theme";
import { useLanches } from "../store/useLanches";
import Checkbox from "../components/Checkbox";
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
  margin-bottom: 8px;
`;

type Props = NativeStackScreenProps<RootStackParamList, "PedidoCustom">;

export default function PedidoCustomScreen({ route, navigation }: Props) {
  const { lancheId, selectedIngredients, onReturn } = route.params;
  const { getById } = useLanches();
  const lanche = getById(lancheId);

  const [flags, setFlags] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      lanche?.ingredients.map((i) => [
        i.id,
        selectedIngredients?.includes(i.id) ?? true,
      ]) ?? []
    )
  );

  function voltar() {
    const selected = Object.entries(flags)
      .filter(([_, v]) => v)
      .map(([k]) => k);

    if (onReturn) {
      onReturn(selected);
    }
    navigation.goBack();
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>{lanche?.name}</Title>
        <FlatList
          data={lanche?.ingredients ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Checkbox
              label={item.name}
              checked={flags[item.id] ?? true}
              onChange={(v: any) => setFlags((prev) => ({ ...prev, [item.id]: v }))}
            />
          )}
        />
        <Button title="Voltar" onPress={voltar} />
      </Container>
    </ThemeProvider>
  );
}
