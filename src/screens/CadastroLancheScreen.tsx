import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import Input from "../components/Input";
import Button from "../components/Simplebutton";
import { theme } from "../styles/theme";
import { useLanches } from "../store/useLanches";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
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

type Props = NativeStackScreenProps<RootStackParamList, "CadastroLanche">;

export default function CadastroLancheScreen({ navigation, route }: Props) {
  const { comIngredientes } = route.params; // pega o parâmetro
  const { addLanche } = useLanches();
  const [nome, setNome] = useState<string>("");
  const [ingredientes, setIngredientes] = useState<string>("");

  async function salvar() {
    if (!nome.trim()) {
      return Alert.alert("Erro", "Informe o nome do item.");
    }

    const ingList = comIngredientes
      ? ingredientes
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    if (comIngredientes && ingList.length === 0) {
      return Alert.alert("Erro", "Informe ao menos um ingrediente.");
    }

    try {
      await addLanche(nome.trim(), ingList); // ⬅️ espera a requisição terminar
      Alert.alert("Sucesso", "Item cadastrado!");
      navigation.navigate("Lanches");
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível cadastrar o item.");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Label>Nome do item</Label>
        <Input
          placeholder={comIngredientes ? "Ex.: X-Salada" : "Ex.: Coca-cola"}
          value={nome}
          onChangeText={setNome}
        />

        {comIngredientes && (
          <>
            <Label>Ingredientes (separe por vírgula)</Label>
            <Input
              placeholder="Ex.: pão, hambúrguer, queijo, alface, tomate, maionese"
              value={ingredientes}
              onChangeText={setIngredientes}
              multiline
            />
          </>
        )}

        <Button title="Salvar" variant="success" onPress={salvar} />
      </Container>
    </ThemeProvider>
  );
}
