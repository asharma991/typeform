import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useRecoilState , useRecoilValue } from "recoil";
import TextField from "@mui/material/TextField";
import { allValueSet, errorSet, focusedField } from "./AtomUtils";
import { constants } from "./constants";
import { validationCheck, validateFields } from "./commonUtils";
import { useKeyPress } from "./useKeyPressHook";

const defaultError = "Required Field";

const BasicRating = ({
  style,
  id,
  title = "",
  required,
  valueAtom,
  options,
  initValue,
}) => {
  const [value, setValue] = useRecoilState(allValueSet);
  const [rating, setRating] = useState(value[id] || initValue);
  const keyPress = useKeyPress();
  useEffect(() => {
    if (!keyPress) return;
    if (options.includes(Number(keyPress)) && value[id] !== keyPress) {
      setRating(Number(keyPress));
    }
    if (keyPress === constants.Navigation.rightKey) {
      options.includes(rating + 1) && setRating(rating + 1);
    }
    if (keyPress === constants.Navigation.leftKey) {
      options.includes(rating - 1) && setRating(rating - 1);
    }
  }, [keyPress]);

  useEffect(() => {
    setValue({ ...value, [id]: rating });
  }, [rating]);
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography variant="h2" component="legend">
        {title}
      </Typography>
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
  title = "",
  required,
  errorMsg,
  type,
  regex,
  label,
  initValue = "",
}) => {
  const [value, setValue] = useRecoilState(allValueSet);
  const [error, setError] = useRecoilState(errorSet);
  const val = value[id] || initValue;
  const validate = (e, val) => {
    const isError =
      !validationCheck(e?.target?.value || val, type, regex) && errorMsg;
    setError({ ...error, [id]: isError });
  };
  useEffect(() => {
    setValue({ ...value, [id]: val });
    required && validate(null, val);
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h2" component="legend">
        {title}
      </Typography>
      <TextField
        error={error[id] || false}
        value={value[id] || ""}
        id={id}
        label={label}
        variant="filled"
        onChange={(e) => {
          validate(e);
          setValue({ ...value, [id]: e.target.value });
        }}
        placeholder={placeholder}
        helperText={error[id]}
        required={required}
      />
    </Box>
  );
};
const MobileField = ({
  style,
  id,
  placeholder,
  title = "",
  required,
  errorMsg,
  type,
  regex,
  label,
  initValue = "",
}) => {
  const [value, setValue] = useRecoilState(allValueSet);
  const [error, setError] = useRecoilState(errorSet);
  const val = value[id] || initValue;
  const focused = useRecoilValue(focusedField);

  const validate = (val) => {
    const isError = !validationCheck(val, type, regex) && errorMsg;
    setError({ ...error, [id]: isError });
  };
  const handleOnChange = (val) => {
    validate(val);
    setValue({ ...value, [id]: val });
  };

  useEffect(() => {
    setValue({ ...value, [id]: val });
    required && validate(val);
  }, [focused]);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h2" component="legend">
        {title}
      </Typography>
      <MuiPhoneNumber
        value={value[id]}
        onChange={handleOnChange}
        defaultCountry={"in"}
        label={label}
        variant="filled"
        id={id}
        // placeholder={placeholder}
        error={error[id] || false}
        helperText={error[id]}
        required={required}
      />
    </Box>
  );
};

const FormSet = (props) => {
  const { type, id, initValue = "", required } = props;
  return (
    <Grid style={{ ...props.style }}>
      {type === "rating" && (
        <>
          <BasicRating {...props} />
        </>
      )}
      {type === "Mobile" && (
        <>
          <MobileField {...props} />
        </>
      )}
      {constants.stringTypeFields.includes(type) && (
        <>
          <BasicText {...props} />
        </>
      )}
    </Grid>
  );
};

export default FormSet;
