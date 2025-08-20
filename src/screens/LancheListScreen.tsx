import React from "react";
import styled, { ThemeProvider } from "styled-components/native";

import { theme } from "../styles/theme";
import Lanche from "../../assets/pedidos.svg";
import Refri from "../../assets/refri.svg";
import Button from "../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
`;

const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 16px;
`;

type Props = NativeStackScreenProps<RootStackParamList, "Lanches">;

export default function LancheListScreen({ navigation }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid>
          <Button
            title="Cadastrar Lanche/Prato"
            icon={Lanche}
            variant="info"
            onPress={() =>
              navigation.navigate("CadastroLanche", { comIngredientes: true })
            }
          />

          <Button
            title="Cadastrar Item Simples"
            icon={Refri}
            variant="primary"
            onPress={() =>
              navigation.navigate("CadastroLanche", { comIngredientes: false })
            }
          />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
