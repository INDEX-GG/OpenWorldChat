import React from "react";
import { Button, ButtonProps, styled } from "@mui/material";

const ButtonUI = (props: ButtonProps) => {
  return (
    <ButtonSC {...props} variant="contained">
      {props.children}
    </ButtonSC>
  );
};

export const ButtonSC = styled(Button)`
  width: 100%;
  border-radius: 20px;
  background-color: #2892ce;
  box-shadow: none;
`;

export default React.memo(ButtonUI);
