import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { Alert, FlatList, TouchableOpacity, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Lanche } from "../../types";
import { theme } from "../styles/theme";
import { useLanches } from "../store/useLanches";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Input from "../components/Input";
import { usePedidos } from "../store/usePedidos";

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

const Subtle = styled.Text`
  color: ${({ theme }) => theme.colors.subtle};
  margin-bottom: 8px;
`;

// O LancheLabel foi removido pois o Checkbox já deve renderizar o nome.

type Props = NativeStackScreenProps<RootStackParamList, "New">;

export default function CadastroPedidoScreen({ navigation }: Props) {
  const { lanches } = useLanches();
  const { addPedido } = usePedidos();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [customIngredients, setCustomIngredients] = useState<
    Record<string, string[]>
  >({});
  const [note, setNote] = useState("");
  // --- ADICIONADO ---
  // 1. Estado para guardar o número da mesa.
  const [mesa, setMesa] = useState("");

  function toggleLanche(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function salvarPedido() {
    if (selectedIds.length === 0) {
      Alert.alert("Atenção", "Selecione ao menos um lanche.");
      return;
    }
    // --- ADICIONADO ---
    // 2. Validação para o campo da mesa.
    if (!mesa.trim()) {
      Alert.alert("Atenção", "Informe o número da mesa.");
      return;
    }

    const lanchesDoPedido = selectedIds.map((id) => {
      const lanche = lanches.find(l => l.id === id)!;
      return {
        lancheId: id,
        ingredients: customIngredients[id] ?? lanche.ingredientes.map(i => i.name),
      }
    });

    try {
      const payload = {
        lanches: lanchesDoPedido,
        note,
        mesa: mesa.trim(), // 3. Incluímos a mesa no payload a ser enviado.
      };
      
      console.log("Enviando pedido para o backend:", JSON.stringify(payload, null, 2));

      const orderId = await addPedido(payload);

      if (orderId && typeof orderId === 'string') {
        Alert.alert("Sucesso", `Pedido #${orderId.split("_").pop()} criado.`);
        navigation.goBack();
      } else {
        throw new Error("Resposta inválida do servidor ao criar o pedido.");
      }

    } catch (error) {
      console.error("Falha ao salvar o pedido:", error);
      Alert.alert("Erro", "Não foi possível salvar o pedido. Verifique os dados e tente novamente.");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>Adicionar Lanches ao Pedido</Title>
        <Subtle>Selecione os lanches que deseja adicionar:</Subtle>

        <FlatList
          data={lanches}
          keyExtractor={(item: Lanche) => item.id}
          renderItem={({ item }) => {
            const pressAction = () => {
              if (item.ingredientes?.length) {
                navigation.navigate("PedidoCustom", {
                  lancheId: item.id,
                  selectedIngredients: customIngredients[item.id],
                  mode: "pedido",
                  onReturn: (selectedNames: string[]) => {
                    if (!selectedIds.includes(item.id)) {
                      toggleLanche(item.id);
                    }
                    setCustomIngredients((prev) => ({
                      ...prev,
                      [item.id]: selectedNames,
                    }));
                  },
                });
              } else {
                toggleLanche(item.id);
              }
            };

            return (
              // --- CORRIGIDO ---
              // O TouchableOpacity agora só envolve o Checkbox,
              // que já deve renderizar o nome do lanche.
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}
                onPress={pressAction}
              >
                <Checkbox
                  label={item.nome}
                  checked={selectedIds.includes(item.id)}
                  onChange={pressAction}
                />
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={{ paddingBottom: 16 }}
        />

        {/* --- ADICIONADO --- */}
        {/* 4. Input para o usuário digitar o número da mesa. */}
        <Input
          placeholder="Número da mesa"
          value={mesa}
          onChangeText={setMesa}
          keyboardType="numeric"
        />

        <Input
          placeholder="Observações do pedido"
          value={note}
          onChangeText={setNote}
        />

        <Button
          title="Salvar Pedido"
          variant="success"
          onPress={salvarPedido}
        />
      </Container>
    </ThemeProvider>
  );
}
