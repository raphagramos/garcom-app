import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LancheListScreen from "../screens/LancheListScreen";
import CadastroLancheScreen from "../screens/CadastroLancheScreen";
import PedidoScreen from "../screens/PedidoScreen";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Lanches" component={LancheListScreen} />
        <Stack.Screen name="Cadastrar Lanche" component={CadastroLancheScreen} />
        <Stack.Screen name="New" component={CadastroLancheScreen} />
        <Stack.Screen name="Pedido" component={PedidoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
