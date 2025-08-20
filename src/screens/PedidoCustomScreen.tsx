import React, { useState, useMemo } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { FlatList, TextInput, TouchableOpacity, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Ingredient } from "../../types";
import { theme } from "../styles/theme";
import { useLanches } from "../store/useLanches";
import Button from "../components/Simplebutton";
import Checkbox from "../components/Checkbox";
import { uid } from "../utils/uid";

// --- Styled Components (sem alterações) ---
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

const Input = styled(TextInput)`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const DeleteText = styled.Text`
  color: red;
  font-size: 18px;
  font-weight: bold;
  padding: 4px 8px;
`;

const IngredientLabel = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  margin-left: 8px;
  font-size: 16px;
`;
// --- Fim dos Styled Components ---

type Props = NativeStackScreenProps<RootStackParamList, "PedidoCustom">;

export default function PedidoCustomScreen({ route, navigation }: Props) {
  const { lancheId, mode, onReturn, selectedIngredients } = route.params;
  const { getById, updateIngredients } = useLanches();
  const lancheOriginal = getById(lancheId);

  // --- LÓGICA CORRIGIDA ---

  // 1. Converte o array de strings da store para um array de objetos com IDs únicos.
  //    Isto é feito com useMemo para que a conversão ocorra apenas uma vez.
  const ingredientesComId = useMemo(
    () =>
      (lancheOriginal?.ingredientes ?? []).map(
        (name: any): Ingredient => ({ // Alterado para 'any' para evitar erro de tipo na conversão
          id: uid("ing"), // Gera um ID único para a UI
          name: name,
        })
      ),
    [lancheOriginal?.ingredientes]
  );

  // 2. O estado 'ingredientes' é inicializado com a lista de objetos já convertida.
  const [ingredientes, setIngredientes] =
    useState<Ingredient[]>(ingredientesComId);
  const [newIngredient, setNewIngredient] = useState("");

  // 3. O estado 'flags' é inicializado a partir da mesma lista de objetos convertida.
  const [flags, setFlags] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      ingredientesComId.map((i) => [
        i.id,
        selectedIngredients ? selectedIngredients.includes(i.name) : true,
      ])
    )
  );

  function addIngredient() {
    if (!newIngredient.trim()) return;
    const novos = newIngredient
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0)
      .map(
        (name): Ingredient => ({
          id: uid("ing"),
          name,
        })
      );
    if (novos.length === 0) return;
    setIngredientes((prev) => [...prev, ...novos]);
    setFlags((prev) => {
      const updated = { ...prev };
      novos.forEach((ing) => {
        updated[ing.id] = true;
      });
      return updated;
    });
    setNewIngredient("");
  }

  function deleteIngredient(idParaRemover: string) {
    setIngredientes((prev) => prev.filter((ing) => ing.id !== idParaRemover));
    setFlags((prev) => {
      const updated = { ...prev };
      delete updated[idParaRemover];
      return updated;
    });
  }

  function salvar() {
    const nomesDosIngredientes = ingredientes.map((ing) => ing.name);

    if (mode === "cadastro" && lancheOriginal) {
      updateIngredients(lancheId, nomesDosIngredientes);
    }

    if (onReturn) {
      const selectedNames = ingredientes
        .filter((ing) => flags[ing.id])
        .map((ing) => ing.name);
      onReturn(selectedNames);
    }

    navigation.goBack();
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>{lancheOriginal?.nome}</Title>
        {mode === "cadastro" && (
          <>
            <Input
              placeholder="Adicione múltiplos, separados por ',' "
              placeholderTextColor={theme.colors.subtle}
              value={newIngredient}
              onChangeText={setNewIngredient}
              onSubmitEditing={addIngredient}
            />
            <Button title="Adicionar ingrediente" onPress={addIngredient} />
          </>
        )}
        <FlatList
          data={ingredientes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Row>
              {mode === "pedido" ? (
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                  onPress={() => setFlags((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                >
                  <Checkbox
                    label={item.name}
                    checked={flags[item.id] ?? true}
                    onChange={(isChecked) =>
                      setFlags((prev) => ({ ...prev, [item.id]: isChecked }))
                    }
                  />
                  {/* --- CORREÇÃO APLICADA AQUI --- */}
                  {/* O IngredientLabel foi removido para evitar a duplicação do nome. */}
                  {/* <IngredientLabel>{item.name}</IngredientLabel> */}
                </TouchableOpacity>
              ) : (
                <Title style={{ fontSize: 16, fontWeight: "normal" }}>
                  {item.name}
                </Title>
              )}

              {mode === "cadastro" && (
                <TouchableOpacity onPress={() => deleteIngredient(item.id)}>
                  <DeleteText>✕</DeleteText>
                </TouchableOpacity>
              )}
            </Row>
          )}
        />
        <Button title="Salvar" onPress={salvar} />
      </Container>
    </ThemeProvider>
  );
}
