import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { atom, useRecoilState } from "recoil";
import TextField from "@mui/material/TextField";

const BasicRating = ({ style, id, title, required, valueAtom, updateData }) => {
  const [value, setValue] = useRecoilState(valueAtom);
  useEffect(() => {
    updateData(id, value);
  }, [value]);
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend">{title}</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </Box>
  );
};

const BasicText = ({
  style,
  id,
  placeholder,
  title,
  required,
  valueAtom,
  validation,
  updateData,
}) => {
  const [value, setValue] = useRecoilState(valueAtom);
  const [error, setError] = React.useState(false);
  const textRef = React.useRef();
  useEffect(() => {
    textRef.current.focus();
  }, []);
  useEffect(() => {
    updateData(id, value);
  }, [value]);
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography component="legend">{title}</Typography>
      <TextField
        inputRef={textRef}
        error={error}
        value={value}
        id="filled-basic"
        label="Filled"
        variant="filled"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={(e) => {
          setError(validation(e.target.value));
        }}
        required
        placeholder={placeholder}
        helperText={error}
      />
    </Box>
  );
};

const FormSet = (props) => {
  const { type, initValue, id } = props;
  const valueAtom = atom({
    key: id,
    default: initValue,
  });
  return (
    <Grid style={{ ...props.style }}>
      {type === "rating" && (
        <>
          <BasicRating {...props} valueAtom={valueAtom} />
        </>
      )}
      {type === "text" && (
        <>
          <BasicText {...props} valueAtom={valueAtom} />
        </>
      )}
    </Grid>
  );
};

export default FormSet;
