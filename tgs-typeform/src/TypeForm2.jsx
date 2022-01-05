import React, { useEffect } from "react";
import { Grid, Button, Slide } from "@mui/material";
import FormSet from "./FormSet";
import { questionsSchema } from "./masterConfig";
import { useRecoilState, useRecoilValue } from "recoil";
import { makeStyles } from "@mui/styles";
import { allValueSet, errorSet, focusedField } from "./AtomUtils";
import { constants } from "./constants";
import LinearProgress from "./LinearProgress";
import {
  isError,
  getRequiredFields,
  validateRequiredFields,
} from "./commonUtils";
import { useKeyPress } from "./useKeyPressHook";
import { useMouse } from "./useMouseHook";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: "#f5f5f5",
    height: "100vh",
    overflow: "hidden",
  },
  innerContainer: {
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    // minHeight: "70vh",
    height: "90vh",
    // position: "relative",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    overflow: "hidden",
  },
  buttonBox: {
    position: "fixed",
    bottom: "0",
    backgroundColor: "#dcdcdc",
    left: "0",
    borderRadius: "inherit",
  },
  formContainer: {
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "flex-start",
    height: "500px",
  },
}));

const AnswerTab = () => {
  const value = useRecoilValue(allValueSet);
  return questionsSchema.map((item, index) => {
    const { id, title, type } = item;
    if (type === "multiValue") {
      return Object.values(item.fields).map((field, index) => {
        const { id, title, type } = field;
        return (
          <Slide direction="down" timeout={750} in={value}>
            {" "}
            <Grid key={index} xs={12}>
              <h2>{title}</h2>
              <p>{value[id]}</p>
            </Grid>
          </Slide>
        );
      });
    } else {
      return (
        <Slide direction="down" timeout={750} in={value}>
          {" "}
          <Grid key={index} xs={12}>
            <h2>{title}</h2>
            <p>{value[id]}</p>
          </Grid>
        </Slide>
      );
    }
  });
};

const getProgress = (step, list) => {
  return (step / list.length) * 100;
};

// Secondary Component
const SetForm = ({ step, classes, list, containerRef }) => {
  //Coverting the questions to a list of components
  const transition = !constants.Navigation.forwardKey.includes(useKeyPress())
    ? "down"
    : "up";
  const List = list.map((item, index) => {
    const { type } = item;
    if (type === "multiValue") {
      return Object.values(item.fields).map((field, index) => (
        <FormSet {...field} classes={classes} />
      ));
    } else {
      return <FormSet {...item} classes={classes} />;
    }
  });

  return List.map((item, index) => {
    return step === index ? (
      <Slide
        direction={transition}
        timeout={750}
        in={step === index}
        // appear={step === index}
        key={index}
        container={containerRef.current}
      >
        <Grid key={index}>{item}</Grid>
      </Slide>
    ) : null;
  });
};

let currentRef = 0;
let isFoucsEnabled = false;
// Main Component
const TypeForm = () => {
  const classes = useStyles();
  const [value, setValue] = useRecoilState(allValueSet); //Values Answer
  const [error, setError] = useRecoilState(errorSet); //Error
  const [focused, setFocused] = useRecoilState(focusedField); //Focused Field
  const [step, setStep] = React.useState(0); //Setting the step to the first step
  const [capturedValue, setCapturedValue] = React.useState(false);
  const keyPress = useKeyPress(); // Detech Key Press
  const containerRef = React.useRef();
  const inputRefs = document.getElementsByTagName("input"); // input focus
  let mouse = useMouse();

  const focusRef = (id) => {
    isFoucsEnabled =
      inputRefs.length &&
      inputRefs[currentRef]?.type &&
      !constants.disabledFocusFields.includes(inputRefs[currentRef]?.type);
    if (isFoucsEnabled) {
      currentRef = id;
      inputRefs[id].focus();
      if (inputRefs[id]?.required && inputRefs[id].value === "") {
        setError({ ...error, [inputRefs[id].id]: true });
      }
      if (!inputRefs[id]?.required && inputRefs[id].value === "") {
        setError({ ...error, [inputRefs[id].id]: false });
      }
      setFocused(inputRefs[id].id);
    }
  };

  //Changing the step
  const inc = () => {
    setStep(step + 1);
    if (step === questionsSchema.length - 1) {
      setCapturedValue(!capturedValue);
    }
    if (step === questionsSchema.length) {
      capturedValue && setCapturedValue(!capturedValue);
      setStep(0);
    }
  };

  const dec = () => {
    capturedValue && setCapturedValue(!capturedValue);
    setStep(step - 1);
    if (step === 0) {
      setStep(questionsSchema.length - 1);
    }
  };

  useEffect(() => {
    focusRef(currentRef);
  }, [value]);

  useEffect(() => {
    currentRef = 0;
    focusRef(currentRef);
  }, [step]);

  //Key Event handler
  useEffect(() => {
    // console.log("error?.[focused]", focused, error?.[`${focused}`]);
    if (constants.Navigation.resetKey.includes(keyPress)) {
      alert("Escape key pressed, Resetting Form");
      resetFrom();
    }
    if (constants.Navigation.forwardKey.includes(keyPress)) {
      if (!error?.[focused]) {
        if (isFoucsEnabled) {
          currentRef++;
          inputRefs.length > currentRef && focusRef(currentRef);
        } else {
          currentRef = inputRefs.length;
        }
        inputRefs.length === currentRef && inc();
      }
    }
    if (keyPress === constants.Navigation.backKey) {
      if (!error?.[focused]) {
        if (isFoucsEnabled && currentRef > -1) {
          currentRef--;
          currentRef >= 0 && focusRef(currentRef);
        } else {
          currentRef = -1;
        }
        currentRef === -1 && dec();
      }
    }
    if (keyPress === constants.Navigation.showKey) {
      show();
    }
  }, [keyPress]);
  //
  //Mouse Event handler
  useEffect(() => {
    if (mouse && mouse.split("/").includes("up")) {
      !isError(error) && inc();
    }
    if (mouse && mouse.split("/").includes("down")) {
      !isError(error) && dec();
    }
  }, [mouse]);
  //

  // Display answer or thank you screen
  const show = () => {
    setCapturedValue(!capturedValue);
  };

  // Reset the form
  const resetFrom = () => {
    setCapturedValue(false);
    setValue({});
    setStep(0);
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
      <Grid item xs={12}>
        <LinearProgress progressStep={getProgress(step, questionsSchema)} />
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        xs={12}
        className={classes.innerContainer}
        // ref={containerRef}
      >
        <Grid
          item
          container
          xs={12}
          // direction="column"
          alignItems="center"
          justifyContent="center"
          className={classes.formContainer}
          ref={containerRef}
        >
          {capturedValue ? (
            // <AnswerTab />
            <h1>
              Thank You {value?.["name"] || "Sir"} ☺!
              <br />
              Your feedback is importent for Us.
            </h1>
          ) : (
            <form>
              <SetForm
                step={step}
                classes={classes}
                list={questionsSchema}
                containerRef={containerRef}
              />
            </form>
          )}
        </Grid>
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
        <Button onClick={dec}>{`Prev [⬇]`}</Button>
        <Button onClick={inc}>{`Next [Enter Or ⬆]`}</Button>
      </Grid>
    </Grid>
  );
};;

export default TypeForm;
