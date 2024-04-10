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

export { screen1Styles };
