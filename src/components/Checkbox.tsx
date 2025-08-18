import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styled, { useTheme } from "styled-components/native";

const Container = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const Box = styled.View<{ checked: boolean; color: string }>`
  width: 24px;
  height: 24px;
  border-width: 2px;
  border-color: ${({ color }) => color};
  background-color: ${({ checked, color }) => (checked ? color : "transparent")};
  border-radius: 4px;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`;

const Label = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

type Props = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function Checkbox({ label, checked, onChange }: Props) {
  const theme = useTheme();

  return (
    <Container
      onPress={() => {
        onChange(!checked); // ✅ inverte o valor ao clicar
      }}
    >
      <Box checked={checked} color={theme.colors.primary} />
      <Label>{label}</Label>
    </Container>
  );
}
