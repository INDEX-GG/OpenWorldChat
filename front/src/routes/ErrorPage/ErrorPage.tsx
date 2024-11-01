import React from "react";
import ButtonUI from "UI/ButtonUI/ButtonUI";
import { styled } from "@mui/material";
import { PATH_URL_FRONTEND } from "lib/constants/constants";

const ErrorPage = () => {
  return (
    <ContainerSC>
      <WrapperSC>
        <TitleSC>404</TitleSC>
        <SubtitleSC>страница не найдена</SubtitleSC>
        <ButtonContainerSC>
          <ButtonUI href={PATH_URL_FRONTEND}>на главную</ButtonUI>
        </ButtonContainerSC>
      </WrapperSC>
    </ContainerSC>
  );
};

const ContainerSC = styled("section")`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eef4f7;
`;

const WrapperSC = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleSC = styled("h1")`
  margin: 0 0 0 0;
  font-size: 56px;
`;

const SubtitleSC = styled("h2")`
  margin: 0 0 20px 0;
  font-size: 16px;
  text-transform: uppercase;
`;

const ButtonContainerSC = styled("div")`
  width: 300px;
`;

export default React.memo(ErrorPage);
