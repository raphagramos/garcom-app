import React from "react";
import styled from "styled-components/native";
import { TouchableOpacityProps } from "react-native";

const Btn = styled.TouchableOpacity<{ variant?: "primary" | "success" | "info" | "danger" }>`
  padding: 14px 18px;
  border-radius: 12px;
  margin-vertical: 6px;
  background-color: ${({ variant, theme }) =>
    variant === "success" ? theme.colors.success :
    variant === "info" ? theme.colors.info :
    variant === "danger" ? theme.colors.danger :
    theme.colors.primary};
`;

const Label = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
  font-weight: 700;
`;

type Props = TouchableOpacityProps & { title: string; variant?: "primary" | "success" | "info" | "danger" };

export default function Button({ title, variant = "primary", ...rest }: Props) {
  return (
    <Btn accessibilityRole="button" activeOpacity={0.9} variant={variant} {...rest}>
      <Label>{title}</Label>
    </Btn>
  );
}
