import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import Button from "../components/Button";
import { theme } from "../styles/theme";
import AddIcon from "../../assets/cadastro.svg";
import NewIcon from "../../assets/new_order.svg";
import SearchIcon from "../../assets/consulta_pedido.svg";
import ListIcon from "../../assets/pedidos.svg";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

const Container = styled.SafeAreaView`
display: flex;
align-items: center;
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
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

const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap; 
  justify-content: space-between;
  margin: 16px;
`;


type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>Mesa Click</Title>
        <Grid>
        <Button
          title="Cadastro"
          icon={AddIcon}
          onPress={() => navigation.navigate("Lanches")}
        />
        <Button
          title="Novo Pedido"
          icon={NewIcon}
          variant="success"
          onPress={() => navigation.navigate("New")}
        />
        <Button
          title="Consultar Pedidos"
          icon={SearchIcon}
          variant="info"
          onPress={() => navigation.navigate("ConsultarPedidos")}
        />
        <Button
          title="Listagem Produtos"
          icon={ListIcon}
          variant="info"
          onPress={() => navigation.navigate("ProductLists")}
        />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
