import React, { useEffect } from "react";
import { Grid, Button } from "@mui/material";
import FormSet from "./FormSet";
import { questionsSchema } from "./masterConfig";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { makeStyles } from "@mui/styles";
import { allValueSet } from "./AtomUtils";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: "#f5f5f5",
    height: "100vh",
  },
  innerContainer: {
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    height: "50vh",
    position: "relative",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  buttonBox: {
    position: "absolute",
    bottom: "0",
    backgroundColor: "#dcdcdc",
    left: "0",
    borderRadius: "inherit",
  },
}));

const AnswerTab = () => {
  const value = useRecoilValue(allValueSet);
  return questionsSchema.map((item, index) => {
    return (
      <Grid key={index} xs={12}>
        <h2>{item.title}</h2>
        <p>{value[item.id]}</p>
      </Grid>
    );
  });
};

// Secondary Component
const SetForm = ({ form, classes }) => {
  //Coverting the questions to a list of components
  const list = questionsSchema.map((item, index) => (
    <FormSet {...item} classes={classes} />
  ));

  return list.map((item, index) => {
    return form === index ? <Grid key={index}>{item}</Grid> : null;
  });
};

// Main Component
const TypeForm = () => {
  const classes = useStyles();
  const [value, setValue] = useRecoilState(allValueSet);
  const [form, setForm] = React.useState(0); //Setting the form to the first form
  const [capturedValue, setCapturedValue] = React.useState(false);
  //Changing the form
  const inc = () => {
    setForm(form + 1);
    if (form === questionsSchema.length - 1) {
      setForm(0);
    }
  };

  const dec = () => {
    setForm(form - 1);
    if (form === 0) {
      setForm(questionsSchema.length - 1);
    }
  };

  const show = () => {
    setCapturedValue(!capturedValue);
  };

  const resetFrom = () => {
    setCapturedValue(false);
    setValue({});
    setForm(0);
  };

  document.onkeydown = function (e) {
    e = e || window.event;
    console.log("new", e);
    var isEscape = false;
    if ("key" in e) {
      isEscape = e.key === "Escape" || e.key === "Esc";
    } else {
      isEscape = e.keyCode === 27;
    }
    if (isEscape) {
      alert("Escape key pressed, Resetting Form");
      resetFrom();
    }
    if (e.key === "Enter" || e.key === "ArrowUp") {
      inc();
    }
    if (e.key === "ArrowDown") {
      dec();
    }
    if (e.key === "Tab") {
      show();
    }
  };
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      alignItems="center"
      className={classes.mainContainer}
    >
      <Grid
        item
        container
        direction="row"
        xs={8}
        className={classes.innerContainer}
      >
        <Grid item container xs={12}>
          {capturedValue ? (
            <AnswerTab />
          ) : (
            <SetForm form={form} classes={classes} />
          )}
        </Grid>
        <Grid
          className={classes.buttonBox}
          item
          container
          xs={12}
          justifyContent="flex-end"
        >
          <Button onClick={show}>{`Show [Tab]`}</Button>
          <Button onClick={resetFrom}>{`Reset [Ecs]`}</Button>
          <Button onClick={inc}>{`Next [Enter Or ⬆]`}</Button>
          <Button onClick={dec}>{`Prev [⬇]`}</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TypeForm;
