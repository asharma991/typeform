import React from "react";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const BasicRating = () => {
  const [value, setValue] = React.useState(2);
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend">Controlled</Typography>
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

const Form1 = ({ style }) => {
  return (
    <Grid style={{ ...style }}>
      <Typography>Form1</Typography>
      <BasicRating />
    </Grid>
  );
};

export default Form1;
