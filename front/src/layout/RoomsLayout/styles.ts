import { styled } from "@mui/material";
import { IChatLayoutProps } from "layout/RoomsLayout/types";

const MainSC = styled("main")`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: 1920px;
`;

const AsideSC = styled("aside")<Pick<IChatLayoutProps, "isOverflowScroll">>`
  width: 100%;
  height: 100%;
  max-width: 785px;
  min-height: 100vh;
  max-height: ${({ isOverflowScroll }) =>
    isOverflowScroll ? "100vh" : "none"};
  background-color: #eef4f7;
  overflow: ${({ isOverflowScroll }) =>
    isOverflowScroll ? "scroll" : "hidden"};
`;

const SectionSC = styled("section")`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
`;

export const useRoomsLayoutStyles = () => ({
  MainSC,
  AsideSC,
  SectionSC,
});
