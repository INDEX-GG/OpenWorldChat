import React from "react";
import RoomsLayout from "layout/RoomsLayout/RoomsLayout";
import styled from "styled-components";

const RoomsPage = () => {
  return (
    <RoomsLayout isOverflowScroll={false}>
      <ContainerSC>
        <TitleSC>Чтобы отправить сообщение выберите диалог</TitleSC>
      </ContainerSC>
    </RoomsLayout>
  );
};

const ContainerSC = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TitleSC = styled("h1")`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  margin: 0;
  padding: 10px;
  text-align: center;
`;

export default React.memo(RoomsPage);
