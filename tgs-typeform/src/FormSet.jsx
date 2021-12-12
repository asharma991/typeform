import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useRecoilState } from "recoil";
import TextField from "@mui/material/TextField";
import { allValueSet } from "./AtomUtils";
const BasicRating = ({
  style,
  id,
  title,
  required,
  valueAtom,
  options,
  initValue,
}) => {
  const [value, setValue] = useRecoilState(allValueSet);
  const [rating, setRating] = useState(initValue);

  document.addEventListener("keypress", function onEvent(event) {
    if (options.includes(Number(event.key)) && value[id] !== event.key) {
      setRating(Number(event.key));
    }
  });
  useEffect(() => {
    setValue({ ...value, [id]: rating });
  }, [rating]);
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend">{title}</Typography>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
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
}) => {
  const [value, setValue] = useRecoilState(allValueSet);
  const [error, setError] = React.useState(false);
  const textRef = React.useRef();
  useEffect(() => {
    textRef.current.focus();
  }, []);
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
        error={!!error}
        value={value[id] || ""}
        id="filled-basic"
        label="Filled"
        variant="filled"
        onChange={(e) => {
          setValue({ ...value, [id]: e.target.value });
        }}
        onBlur={(e) => {
          setError(validation(e.target.value));
          textRef.current.focus();
        }}
        required
        placeholder={placeholder}
        helperText={error}
      />
    </Box>
  );
};

const FormSet = (props) => {
  const { type } = props;

  return (
    <Grid style={{ ...props.style }}>
      {type === "rating" && (
        <>
          <BasicRating {...props} />
        </>
      )}
      {type === "text" && (
        <>
          <BasicText {...props} />
        </>
      )}
    </Grid>
  );
};

export default FormSet;
