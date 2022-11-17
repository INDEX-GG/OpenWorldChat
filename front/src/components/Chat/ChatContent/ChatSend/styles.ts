import { styled, TextField } from "@mui/material";
import { ButtonSC } from "UI/ButtonUI/ButtonUI";

const FooterSC = styled("footer")`
  margin-bottom: 30px;
  padding: 5px 35px 0;
`;

const FormSC = styled("form")`
  display: flex;
  align-items: flex-end;
  height: 100%;
`;

const ButtonSendSC = styled(ButtonSC)`
  width: 45px;
  min-width: 35px;
  padding: 0;
  border-radius: 0;
  border: 0 !important;
  background-color: transparent;
`;

const TextAreaContainerSC = styled("div")`
  width: 100%;
  margin-right: 5px;
`;

const TextAreaLengthSC = styled("p")`
  font-size: 12px;
  color: gray;
  padding: 3px 0 0 20px;
`;

const TextAreaSC = styled(TextField)`
  & > .MuiInputBase-root {
    background-color: #eef4f7;
    border-radius: 20px;
    padding: 10px 30px;
    & > .MuiInputBase-input {
      &::placeholder {
        opacity: 1;
        font-family: inherit;
        color: #c7c7c7;
      }
    }
    & > .MuiOutlinedInput-notchedOutline {
      border-radius: 20px;
    }
  }
`;

export const useStylesChatSend = () => ({
  FooterSC,
  FormSC,
  TextAreaSC,
  ButtonSendSC,
  TextAreaLengthSC,
  TextAreaContainerSC,
});
