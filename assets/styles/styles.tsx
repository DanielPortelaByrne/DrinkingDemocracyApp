/* Screen 1 */
const screen1Styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  innerContainer: {
    position: "absolute",
    top: 70,
    right: 30,
    zIndex: 2,
  },
  logo: {
    position: "absolute",
    width: "100%",
    height: "25%",
    top: "1%",
  },
  backgroundImage: {
    width: "100%",
    height: "35%",
    position: "absolute",
    top: "26%",
    zIndex: -1,
  },
  flagButton: {
    marginBottom: 5,
  },
  flagImage: {
    height: 32,
    width: 32,
  },
  dropdownContainer: {
    position: "absolute",
    top: 50,
    zIndex: 2,
  },
  button: {
    backgroundColor: "#ed1e26",
    borderRadius: 25,
  },
  textInput: {
    backgroundColor: "white",
    width: 250,
    fontStyle: "bold",
    borderRadius: 25,
  },
  imageButton: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0)",
    zIndex: -1,
  },
  bottomImage: {
    position: "absolute",
    bottom: -80,
    right: -20,
    width: "105%",
    height: "55%",
    zIndex: -1,
  },
  outerScrollViewContentContainer: {
    top: -60,
    flex: 0.25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  scrollViewContentContainer: {
    flexGrow: 0.35,
    justifyContent: "center",
    paddingRight: "15%",
    paddingLeft: "15%",
  },
  subtitleTextContainer: {
    justifyContent: "center",
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  subtitleText: {
    fontFamily: "Konstruktor",
    fontSize: 18,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 10,
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
};

// Screen 2 styles
const screen2Styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  homeButton: {
    position: "absolute",
    top: 70,
    left: 30,
  },
  titleView: {
    alignSelf: "center",
    position: "absolute",
    top: 60,
  },
  screenTitle: {
    fontFamily: "Konstruktor",
    fontSize: 48,
    textAlign: "center",
  },
  adBanner: {
    position: "absolute",
    top: 70,
    left: -90,
  },
  adBannerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -100,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  chainImage: {
    width: "100%",
    height: "40%",
    position: "absolute",
    top: "25%",
    zIndex: -1,
  },
  haloImage: {
    width: "100%",
    height: "40%",
    position: "absolute",
    bottom: -80,
    zIndex: -1,
  },
  playerIconsContainer: {
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  playerIconsInnerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  playerIconsInnerMostContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    zIndex: 2,
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  playerIcon: {
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    zIndex: 2,
  },
  playerIconText: {
    fontFamily: "Konstruktor",
    color: "#ffff",
    textAlign: "center",
    fontSize: 13,
    zIndex: 2,
  },
  gameModesContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  gameModeSectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  gameModeSectionImage: {
    width: "20%",
    height: "100%",
    marginRight: 10,
  },
  prinksButton: {
    backgroundColor: "#f3ce06",
    width: "55%",
    height: "100%",
  },
  messyButton: {
    backgroundColor: "#ed6c1e",
    width: "55%",
    height: "100%",
  },
  flirtyButton: {
    backgroundColor: "#ed1e26",
    width: "55%",
    height: "100%",
  },
  gameModeSectionText: {
    fontFamily: "Konstruktor",
    color: "#111111",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 80,
  },
  promptSubmitButton: {
    backgroundColor: "#1c1c1c",
    width: "77%",
    height: "100%",
    borderWidth: 2,
    borderColor: "white",
  },
  promptSubmitText: {
    fontFamily: "Konstruktor",
    color: "white",
    fontSize: 26,
    textAlign: "center",
    lineHeight: 80,
  },
};

/* Name Input Component */
const nameInputComponentStyles = {
  container: {
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  nameItem: {
    marginTop: 2.5,
    marginBottom: 2.5,
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  textInput: {
    textAlign: "center",
    // Add other text input styles as needed
  },
  buttonContainer: {
    marginTop: 5,
    flexDirection: "row",
    backgroundColor: "rgba(52, 52, 52, 0)",
  },
  button: {
    fontWeight: "bold",
    textAlign: "center",
    // Add other button styles as needed
  },
};

/* Game One Screen */
const gameOneScreenStyles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gameText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
  },
  textInput: {
    position: "absolute",
    top: "45%",
    left: "10%",
    right: "10%",
    height: 50,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    zIndex: 11,
    backgroundColor: "#ffff",
  },
  submitButton: {
    position: "absolute",
    top: "55%",
    left: "10%",
    right: "10%",
    height: 50,
    marginTop: 15,
    backgroundColor: "#ed1e26",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 12,
    padding: 10,
  },
  ruleButton: {
    position: "absolute",
    top: 45,
    right: 15,
    height: 50,
    width: 130,
    backgroundColor: "#ed1e26",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 12,
    padding: 8,
  },
  playerButton: {
    position: "absolute",
    top: 100,
    right: 15,
    height: 50,
    width: 130,
    backgroundColor: "#ed1e26",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 12,
    padding: 8,
  },
  submitButtonText: {
    fontFamily: "Konstruktor",
    color: "#fff",
    fontSize: 25,
  },
  veryBoldText: {
    fontFamily: "Konstruktor",
    fontSize: 16,
  },
  topLeftButtonContainer: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  topLeftButton: {
    height: 48,
    width: 48,
    top: 30,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  topRightButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  topRightButton: {
    position: "absolute",
    right: 20,
    top: 50,
  },
  topRightBeerContainer: {
    position: "absolute",
    top: 150,
    right: 30,
    left: 120,
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

/* Prompt Submit Screen */
const promptSubmitScreenStyles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#ed1e26",
  },
  textInput: {
    backgroundColor: "white",
    fontStyle: "bold",
    borderRadius: 25,
    marginBottom: 10,
  },
  overlay: {
    position: "absolute",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 10,
  },
  overlayView: {
    top: "30%",
    justifyContent: "center",
    height: "40%",
    width: "90%",
    backgroundColor: "rgba(0,0,0,1)",
    zIndex: 10,
  },
  innerView: {
    backgroundColor: "rgba(0,0,0,1)",
    zIndex: 10,
    borderWidth: 1,
    borderColor: "white",
  },
};

export {
  screen1Styles,
  screen2Styles,
  nameInputComponentStyles,
  gameOneScreenStyles,
  promptSubmitScreenStyles,
};
