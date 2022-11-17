import { styled } from "@mui/material";

const ContainerSC = styled("main")`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #eef4f7;
`;

const FormWrapperSC = styled("form")`
  width: 100%;
  max-width: 400px;
  margin-top: 74px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainerSC = styled("div")`
  margin-bottom: 5px;
  width: 100%;
`;

const ErrorParagraph = styled("p")`
  color: #ff6565;
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;
  margin-bottom: 23px;
  min-height: 17px;
`;

const ButtonContainerSC = styled("div")`
  max-width: 250px;
  width: 100%;
`;

export const useSignInPageStyles = () => ({
  ContainerSC,
  FormWrapperSC,
  InputContainerSC,
  ErrorParagraph,
  ButtonContainerSC,
});
