import React from "react";
import { styled } from "@mui/material";

const RoomsEnd = () => {
  return <EndSc>Все комнаты с чатами получены! 👍</EndSc>;
};

const EndSc = styled("p")`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
`;

export default React.memo(RoomsEnd);
