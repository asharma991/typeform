import React, { useEffect } from "react";
import { Grid, Button } from "@mui/material";
import FormSet from "./FormSet";
import { questionsSchema } from "./masterConfig";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
const style = {
  height: "100vh",
};

let allAnswers = {};
const updateData = (id, val) => {
  allAnswers = { ...allAnswers, [id]: val };
};
const list = questionsSchema.map((item, index) => (
  <FormSet {...item} style={style} updateData={updateData} />
));

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
  useEffect(() => {
    console.log(allAnswers);
  }, [allAnswers]);
  return (
    <Grid>
      <Button onClick={inc}>INC</Button>
      <Button onClick={dec}>dec</Button>
      <SetForm form={form} />
    </Grid>
  );
};

export default TypeForm;
