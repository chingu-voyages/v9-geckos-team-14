import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    height: "100%",
    backgroundColor: "#f7f2c5",
    border: "1px solid #000",
    borderRadius: "5%",
    // padding: "0.5rem",
    overflow: "hidden",
    position: "relative",
    "&:hover": {
      cursor: "pointer"
    }
  },
  colors: {
    backgroundColor: "grey",
    height: "170px",
    width: "126%",
    borderRadius: "5px",
    overflow: "hidden"
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
    textTransform: "capitalize",
    fontWeight: "500",
    wordSpacing: "1"
  },
  miniColorBox: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-4px",
    border: "0.1px groove #000"
  }
};

const HomePalettes = props => {
  const { classes, paletteName, colorShades, clickHandler } = props;
  const miniColorBoxes = colorShades.map(color => (
    <div
      className={classes.miniColorBox}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));
  return (
    <div className={classes.root} onClick={clickHandler}>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <p className={classes.title}>{paletteName}</p>
    </div>
  );
};

export default withStyles(styles)(HomePalettes);
