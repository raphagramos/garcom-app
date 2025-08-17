import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import Button from "../components/Button";
import { theme } from "../styles/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.subtle};
  margin-bottom: 20px;
`;

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>Garçom</Title>
        <Subtitle>Cadastre lanches e anote pedidos marcando o que o cliente NÃO quer.</Subtitle>
        <Button title="Ver Lanches" onPress={() => navigation.navigate("Lanches")} />
        <Button title="Cadastrar Lanche" variant="info" onPress={() => navigation.navigate("Cadastrar Lanche")} />
      </Container>
    </ThemeProvider>
  );
}
