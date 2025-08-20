import LancheCard from "../components/LancheCard";
import { FlatList } from "react-native";
import { useLanches } from "../store/useLanches";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import styled from "styled-components/native";
type Props = NativeStackScreenProps<RootStackParamList, "ProductLists">;

const Empty = styled.Text`
  color: ${({ theme }) => theme.colors.subtle};
  text-align: center;
  margin-top: 40px;
`;

export default function ProductList({ navigation }: Props) {
  const { lanches, removeLanche } = useLanches();

  return (
    <FlatList
      data={lanches}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <LancheCard
          lanche={item}
          onOrder={() =>
            navigation.navigate("PedidoCustom", {
              lancheId: item.id,
              mode: "cadastro",
            })
          }
          onRemove={() => removeLanche(item.id)}
        />
      )}
      ListEmptyComponent={<Empty>Nenhum produto cadastrado ainda.</Empty>}
    />
  );
}
