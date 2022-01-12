import React from "react";
import WatchCard from "./WatchCard";
import { Grid } from "@material-ui/core";
import coffeMakerList from "./constants";

const Content = () => {
  const getCoffeMakerCard = coffeMakerObj => {
    return (
      <Grid item xs={12} sm={4}>
        <WatchCard {...coffeMakerObj} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      {coffeMakerList.map(coffeMakerObj => getCoffeMakerCard(coffeMakerObj))}
    </Grid>
  );
};

export default Content;
