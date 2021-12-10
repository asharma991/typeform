import React from "react";
import { Grid, Button } from "@mui/material";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
const style = {
  height: "100vh",
};
const list = [
  <Form1 style={style} />,
  <Form2 style={style} />,
  <Form3 style={style} />,
];
const SetForm = ({ form }) => {
  return list.map((item, index) => {
    return form === index ? <Grid key={index}>{item}</Grid> : null;
  });
};
const TypeForm = () => {
  const [form, setForm] = React.useState(0);
  const inc = () => {
    setForm(form + 1);
    if (form === 2) {
      setForm(0);
    }
  };
  const dec = () => {
    setForm(form - 1);
    if (form === 0) {
      setForm(2);
    }
  };
  return (
    <Grid>
      <Button onClick={inc}>INC</Button>
      <Button onClick={dec}>dec</Button>
      <SetForm form={form} />
    </Grid>
  );
};

export default TypeForm;
