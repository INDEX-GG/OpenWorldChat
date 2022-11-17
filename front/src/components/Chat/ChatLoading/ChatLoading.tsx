import React from "react";
import SpinnerUI from "UI/SpinnerUI/SpinnerUI";
import { styled } from "@mui/material";

const ChatLoading = () => {
  return (
    <ContainerSC>
      <SpinnerUI size={70} />
    </ContainerSC>
  );
};

const ContainerSC = styled("div")`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
`;

export default React.memo(ChatLoading);
