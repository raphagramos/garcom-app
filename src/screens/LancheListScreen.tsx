import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { FlatList } from "react-native";
import { theme } from "../styles/theme";
import { useLanches } from "../store/useLanches";
import LancheCard from "../components/LancheCard";
import Button from "../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
`;

const Empty = styled.Text`
  color: ${({ theme }) => theme.colors.subtle};
  text-align: center;
  margin-top: 40px;
`;

type Props = NativeStackScreenProps<RootStackParamList, "Lanches">;

export default function LancheListScreen({ navigation }: Props) {
  const { lanches, removeLanche } = useLanches();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Button
          title="Cadastrar Lanche/Prato"
          variant="info"
          onPress={() =>
            navigation.navigate("CadastroLanche", { comIngredientes: true })
          }
        />

        <Button
          title="Cadastrar Item Simples"
          variant="primary"
          onPress={() =>
            navigation.navigate("CadastroLanche", { comIngredientes: false })
          }
        />
        <FlatList
          data={lanches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LancheCard
              lanche={item}
              onOrder={() =>
                navigation.navigate("Pedido", { lancheId: item.id })
              }
              onRemove={() => removeLanche(item.id)}
            />
          )}
          ListEmptyComponent={<Empty>Nenhum lanche cadastrado ainda.</Empty>}
        />
      </Container>
    </ThemeProvider>
  );
}
