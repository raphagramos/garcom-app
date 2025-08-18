import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LancheListScreen from "../screens/LancheListScreen";
import CadastroLancheScreen from "../screens/CadastroLancheScreen";
import PedidoScreen from "../screens/PedidoScreen";
import { RootStackParamList } from "../../types";
import CadastroPedidoScreen from "../screens/CadastroPedidos";
import ConsultarPedidosScreen from "../screens/ConsultaPedidos";
import PedidoCustomScreen from "../screens/PedidoCustomScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Lanches" component={LancheListScreen} />
        <Stack.Screen name="CadastroLanche" component={CadastroLancheScreen} />
        <Stack.Screen name="New" component={CadastroPedidoScreen} />
        <Stack.Screen name="Pedido" component={PedidoScreen} />
        <Stack.Screen name="PedidoCustom" component={PedidoCustomScreen} />
        <Stack.Screen name="ConsultarPedidos" component={ConsultarPedidosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
