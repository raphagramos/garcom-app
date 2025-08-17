import styled from "styled-components/native";

const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 14px;
  margin-vertical: 8px;
`;

export default Card;
