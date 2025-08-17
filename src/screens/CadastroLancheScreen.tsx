import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import Input from "../components/Input";
import Button from "../components/Button";
import { theme } from "../styles/theme";
import { useLanches } from "../store/useLanches";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Alert } from "react-native";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.colors.subtle};
  margin-top: 8px;
`;

type Props = NativeStackScreenProps<RootStackParamList, "Cadastrar Lanche">;

export default function CadastroLancheScreen({ navigation }: Props) {
  const { addLanche } = useLanches();
  const [nome, setNome] = useState<string>("");
  const [ingredientes, setIngredientes] = useState<string>("");

  function salvar() {
    const ingList = ingredientes.split(",").map(s => s.trim()).filter(Boolean);
    if (!nome.trim()) return Alert.alert("Erro", "Informe o nome do lanche.");
    if (ingList.length === 0) return Alert.alert("Erro", "Informe ao menos um ingrediente.");
    addLanche(nome.trim(), ingList);
    Alert.alert("Sucesso", "Lanche cadastrado!");
    navigation.navigate("Lanches");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Label>Nome do lanche</Label>
        <Input placeholder="Ex.: X-Burger" value={nome} onChangeText={setNome} />

        <Label>Ingredientes (separe por vírgula)</Label>
        <Input placeholder="Ex.: pão, hambúrguer, queijo, alface, tomate, maionese" value={ingredientes} onChangeText={setIngredientes} multiline />

        <Button title="Salvar" onPress={salvar} />
      </Container>
    </ThemeProvider>
  );
}
