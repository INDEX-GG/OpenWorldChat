import React, { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import styled from "styled-components";

const InputUI = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  return (
    <TextFieldSC
      ref={ref}
      fullWidth={true}
      helperText={props.helperText || " "}
      {...props}
    />
  );
});

export const TextFieldSC = styled(TextField)`
  width: 100%;
  display: block !important;
  & > .MuiInputBase-root {
    height: 50px;
    border-radius: 50px;
    & > .MuiInputBase-input {
      height: 50px;
      box-sizing: border-box;
      font-size: 16px;
      line-height: 19.5px;
      font-family: inherit;
      border-radius: inherit;
      padding-left: 20px;
      background-color: #eef4f7;
    }
    & > .MuiOutlinedInput-notchedOutline {
      padding-left: 15px !important;
      border-color: #eef4f7;
    }
  }
  & > .MuiFormLabel-root {
    top: -3px;
    font-size: 16px !important;
    padding-left: 10px !important;
  }
`;

InputUI.displayName = "InputUI";
export default React.memo(InputUI);
