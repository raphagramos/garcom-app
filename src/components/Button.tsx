import React from "react";
import styled from "styled-components/native";
import { TouchableOpacityProps, View } from "react-native";
import { SvgProps } from "react-native-svg";

const Btn = styled.TouchableOpacity<{
  variant?: "primary" | "success" | "info" | "danger";
}>`
  width: 120px; 
  height: 120px;  
  border-radius: 16px;
  margin: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${({ variant, theme }) =>
    variant === "success"
      ? theme.colors.success
      : variant === "info"
      ? theme.colors.info
      : variant === "danger"
      ? theme.colors.danger
      : theme.colors.primary};
`;

const Label = styled.Text`
  color: white;
  font-size: 13px;
  text-align: center;
  font-weight: 700;
  margin-top: 6px;
`;

type Props = TouchableOpacityProps & {
  icon?: React.FC<SvgProps>;
  title: string;
  variant?: "primary" | "success" | "info" | "danger";
};

export default function Button({
  icon: Icon,
  title,
  variant = "primary",
  ...rest
}: Props) {
  return (
    <Btn accessibilityRole="button" activeOpacity={0.9} variant={variant} {...rest}>
      {Icon && <Icon width={32} height={32}/>}
      {title && <Label>{title}</Label>}
    </Btn>
  );
}
