export const getCategoryAssets = (language: string) => {
  const assets = {
    categoryImages: {},
  };

  switch (language) {
    case "English": {
      assets.categoryImages = {
        CHALLENGE: require("../../assets/images/CHALLENGE.png") as any,
        RULE: require("../../assets/images/RULE.png") as any,
        VIRUS: require("../../assets/images/VIRUS.png") as any,
        "VIRUS END": require("../../assets/images/VIRUS.png") as any,
        "GET IT DOWN YA": require("../../assets/images/GIDY.png") as any,
        VOTE: require("../../assets/images/VOTE.png") as any,
        SEXY: require("../../assets/images/SEXY.png") as any,
      };
      break;
    }
    case "Irish": {
      assets.categoryImages = {
        DÚSHLÁN: require("../../assets/images/CHALLENGE.png") as any,
        RIALACHÁN: require("../../assets/images/RULE.png") as any,
        VÍREAS: require("../../assets/images/VIRUS.png") as any,
        "DEIREADH AN VÍREAS": require("../../assets/images/VIRUS.png") as any,
        "GABH I SÍORRÚD É": require("../../assets/images/GIDY.png") as any,
        VÓTA: require("../../assets/images/VOTE.png") as any,
        GNÉASÚIL: require("../../assets/images/SEXY.png") as any,
      };
      break;
    }
    case "Polish": {
      assets.categoryImages = {
        CHALLENGE: require("../../assets/images/CHALLENGE.png") as any,
        RULE: require("../../assets/images/RULE.png") as any,
        VIRUS: require("../../assets/images/VIRUS.png") as any,
        "VIRUS END": require("../../assets/images/VIRUS.png") as any,
        "GET IT DOWN YA": require("../../assets/images/GIDY.png") as any,
        VOTE: require("../../assets/images/VOTE.png") as any,
        SEXY: require("../../assets/images/SEXY.png") as any,
      };
      break;
    }
    case "Spanish": {
      assets.categoryImages = {
        CHALLENGE: require("../../assets/images/CHALLENGE.png") as any,
        RULE: require("../../assets/images/RULE.png") as any,
        VIRUS: require("../../assets/images/VIRUS.png") as any,
        "VIRUS END": require("../../assets/images/VIRUS.png") as any,
        "GET IT DOWN YA": require("../../assets/images/GIDY.png") as any,
        VOTE: require("../../assets/images/VOTE.png") as any,
        SEXY: require("../../assets/images/SEXY.png") as any,
      };
      break;
    }
    default: {
      break;
    }
  }
  return assets;
};

export const getGameModeAssets = (gameMode: string) => {
  const assets = {
    categoryColors: {},
    playedArray: "",
  };

  switch (gameMode) {
    case "prinkGamePrompts": {
      // Generate a random color
      assets.categoryColors = {
        CHALLENGE: "#d70057",
        RULE: "#8e0045",
        VIRUS: "#008e72",
        "VIRUS END": "#008e72",
        "GET IT DOWN YA": "#00badc",
        QUIZ: "#00428f",
        VOTE: "#00428f",
        SEXY: "#008e72",
        DÚSHLÁN: "#d70057",
        RIALACHÁN: "#8e0045",
        VÍREAS: "#008e72",
        "DEIREADH AN VÍREAS": "#008e72",
        "GABH I SÍORRÚD É": "#00badc",
        CEISTEACHÁN: "#00428f",
        VÓTA: "#00428f",
      };
      assets.playedArray = "playedPrinksPrompts";
      // console.log("Played array var set to: " + assets.playedArray);
      break;
    }
    case "crazyGamePrompts": {
      // Generate a random color
      assets.categoryColors = {
        CHALLENGE: "#e39600",
        RULE: "#964cad",
        VIRUS: "#fa563c",
        "VIRUS END": "#fa563c",
        "GET IT DOWN YA": "#2e2f48",
        QUIZ: "#162a30",
        VOTE: "#162a30",
        DÚSHLÁN: "#e39600",
        RIALACHÁN: "#964cad",
        VÍREAS: "#fa563c",
        "DEIREADH AN VÍREAS": "#fa563c",
        "GABH I SÍORRÚD É": "#2e2f48",
        CEISTEACHÁN: "#162a30",
        VÓTA: "#162a30",
      };
      assets.playedArray = "playedCrazyPrompts";
      break;
    }
    case "flirtyGamePrompts": {
      // Generate a random color
      assets.categoryColors = {
        CHALLENGE: "#e97e74",
        RULE: "#fcad8e",
        VIRUS: "#57316b",
        "VIRUS END": "#57316b",
        "GET IT DOWN YA": "#575a8d",
        QUIZ: "#bd2841",
        VOTE: "#fc8759",
        SEXY: "#ba3564",
        DÚSHLÁN: "#e97e74",
        RIALACHÁN: "#fcad8e",
        VÍREAS: "#57316b",
        "DEIREADH AN VÍREAS": "#57316b",
        "GABH I SÍORRÚD É": "#575a8d",
        CEISTEACHÁN: "#bd2841",
        VÓTA: "#fc8759",
        GNÉASÚIL: "#ba3564",
      };
      assets.playedArray = "playedFlirtyPrompts";
      break;
    }
    default: {
      // Generate a random color
      assets.categoryColors = {
        CHALLENGE: "#d70057",
        RULE: "#8e0045",
        VIRUS: "#008e72",
        "VIRUS END": "#008e72",
        "GET IT DOWN YA": "#00badc",
        QUIZ: "#00428f",
        VOTE: "#00428f",
        DÚSHLÁN: "#d70057",
        RIALACHÁN: "#8e0045",
        VÍREAS: "#008e72",
        "DEIREADH AN VÍREAS": "#008e72",
        "GABH I SÍORRÚD É": "#00badc",
        CEISTEACHÁN: "#00428f",
        VÓTA: "#00428f",
      };
      break;
    }
  }
  return assets;
};
