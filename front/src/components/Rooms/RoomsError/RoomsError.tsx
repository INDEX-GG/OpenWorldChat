import React from "react";
import { styled } from "@mui/material";
import ButtonUI from "UI/ButtonUI/ButtonUI";

interface IRoomsError {
  error: string;
}

const RoomsError = ({ error }: IRoomsError) => {
  return (
    <ErrorContainerSC>
      <ErrorParagraphSC>{error}</ErrorParagraphSC>
      <ButtonUI>Повторная загрузка</ButtonUI>
    </ErrorContainerSC>
  );
};

const ErrorContainerSC = styled("div")``;
const ErrorParagraphSC = styled("p")`
  color: #ff6565;
  margin-bottom: 10px;
  text-align: center;
`;

export default React.memo(RoomsError);
