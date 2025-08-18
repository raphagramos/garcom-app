// src/styles/styled.d.ts
import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      background: string;
      card: string;
      primary: string;
      success: string;
      info: string;
      text: string;
      subtle: string;
      border: string;
      danger: string; // <-- igual ao theme.ts
    };
    radius: {
      md: string;
      lg: string;
    };
  }
}
