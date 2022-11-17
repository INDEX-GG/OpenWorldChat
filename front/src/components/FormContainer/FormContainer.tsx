import React, { ReactNode } from "react";
import { styled } from "@mui/material";

interface IFormErrorProps {
  children: ReactNode;
  title: string;
}

const FormContainer = ({ title, children }: IFormErrorProps) => {
  return (
    <ContainerSC>
      <FormTitleSC>{title}</FormTitleSC>
      {children}
    </ContainerSC>
  );
};

const ContainerSC = styled("section")`
  width: 665px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 27px 20px 68px;
`;

const FormTitleSC = styled("h1")`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 16px;
  line-height: 20px;
`;

export default React.memo(FormContainer);
