import React from "react";
import styled from "styled-components/native";
import { Switch } from "react-native";
import { Ingredient } from "../types";

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 4px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const Left = styled.View`
  flex-direction: column;
`;

const Name = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const Subtle = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subtle};
`;

type Props = {
  ingredient: Ingredient;
  value: boolean; // true = inclui; false = excluir (cliente não quer)
  onChange: (next: boolean) => void;
};

export default function IngredientFlag({ ingredient, value, onChange }: Props) {
  return (
    <Row>
      <Left>
        <Name>{ingredient.name}</Name>
        {!value ? <Subtle>Marcado como "sem"</Subtle> : null}
      </Left>
      <Switch value={value} onValueChange={onChange} />
    </Row>
  );
}
