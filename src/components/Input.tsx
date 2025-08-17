import styled from "styled-components/native";
import { TextInputProps } from "react-native";

const Input = styled.TextInput<TextInputProps>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 12px 14px;
  margin-vertical: 8px;
  background-color: white;
  font-size: 16px;
`;

export default Input;
