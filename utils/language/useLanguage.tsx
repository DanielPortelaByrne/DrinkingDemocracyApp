import { useState } from "react";
import { LanguageData } from "./LanguageData";
import en from "../../languages/en.json";
import ga from "../../languages/ga.json";
import pl from "../../languages/pl.json";
import es from "../../languages/es.json";

const languages: { [key: string]: Partial<LanguageData> } = {
  English: en,
  Irish: ga,
  Polish: pl,
  Spanish: es,
};

export const useLanguage = () => {
  const [subtitle, setSubTitle] = useState("WHO'S SESHING");
  const [toast, setToast] = useState("Enter at least 2 names!");
  const [player, setPlayer] = useState("Player");
  const [prinksText, setPrinksText] = useState("Let's get prinking");
  const [crazyText, setCrazyText] = useState("Let's get messy");
  const [flirtyText, setFlirtyText] = useState("Let's get flirty");
  const [sapText, setSapText] = useState("SUBMIT A PROMPT");
  const [title, setTitle] = useState("GAMES");

  const [addRuleButtonText, setAddRuleButtonText] = useState("ADD A RULE");
  const [addRuleFieldText, setAddRuleFieldText] = useState(
    "Gráinne is a dryshite, drink 15 sips"
  );
  const [addRuleButton2Text, setAddRuleButton2Text] = useState("ADD RULE");
  const [newRuleTitle, setNewRuleTitle] = useState("RULE");
  const [addRuleToastText, setAddRuleToastText] = useState("Rule added!");
  const [addPlayerButtonText, setAddPlayerButtonText] =
    useState("ADD A PLAYER");
  const [addPlayerFieldText, setAddPlayerFieldText] = useState(
    "Enter the new player's name"
  );
  const [addPlayerButton2Text, setAddPlayerButton2Text] =
    useState("ADD PLAYER");
  const [addPlayerToastText, setAddPlayerToastText] = useState("Player added!");
  const [firstCardText, setFirstCardText] = useState(
    "You're at the first card!"
  );
  const [quitGameTitle, setQuitGameTitle] = useState("Quit Game");
  const [quitGameText, setQuitGameText] = useState(
    "Are you sure you want to quit the game?"
  );
  const [quitGameOpt1, setQuitGameOpt1] = useState("Yes");
  const [quitGameOpt2, setQuitGameOpt2] = useState("No");
  const [enterPromptText, setEnterPromptText] = useState("ENTER YOUR PROMPT");
  const [customPromptText, setCustomPromptText] = useState(
    "Enter your custom prompt"
  );
  const [pickCatText, setPickCatText] = useState("PICK YOUR PROMPT CATEGORY");
  const [selectCatText, setSelectCatText] = useState("Select prompt category");
  const [gameModeText, setGameModeText] = useState(
    "PICK YOUR PROMPT GAME MODE"
  );
  const [selectGameModeText, setSelectGameModeText] = useState(
    "Select your game mode"
  );
  const [socialText, setSocialText] = useState(
    "ENTER YOUR SOCIAL MEDIA HANDLE TO BE CREDITED"
  );

  const [instruct1, setInstruct1] = useState(
    "- BE IN WITH A CHANCE OF HAVING YOUR CUSTOM PROMPT FEATURED PERMANENTLY IN THE GAME"
  );
  const [instruct2, setInstruct2] = useState(
    "- TYPE 'NAME' IF YOU WANT TO RANDOMISE YOUR NAME INPUT, AND 'NAME2' IF YOU WANT TO ADD A SECOND RANDOM NAME"
  );
  const [instruct3, setInstruct3] = useState(
    "- E.G. 'NAME HAS TO WHISPER TO NAME2 FOR THE REST OF THE GAME'"
  );
  const [instruct4, setInstruct4] = useState(
    "- ADD YOUR SOCIAL MEDIA HANDLE AND PLATFORM TO BE CREDITED ON THE APP (OPTIONAL)"
  );
  const [submitText, setSubmitText] = useState("SUBMIT YOUR PROMPT");
  const [toast1, setToast1] = useState("Enter prompt text!");
  const [toast2, setToast2] = useState("Choose a prompt category!");
  const [toast3, setToast3] = useState("Choose a game mode!");
  const [toast4, setToast4] = useState("Game prompt submitted!");
  const [cat1, setCat1] = useState("RULE");
  const [cat2, setCat2] = useState("GET IT DOWN YA");
  const [cat3, setCat3] = useState("CHALLENGE");
  const [cat4, setCat4] = useState("VOTE");
  const [cat5, setCat5] = useState("SEXY");
  const [cat6, setCat6] = useState("VIRUS");
  const [mode1, setMode1] = useState("PRINKS");
  const [mode2, setMode2] = useState("MESSY");
  const [mode3, setMode3] = useState("FLIRTY");
  const [gameOverText, setGameOverText] = useState("Game Over");
  const [moreGamesText, setMoreGamesText] = useState("More Games");

  const setLanguage = async (language: string) => {
    let languageData = languages[language];

    console.log("Reaching new function with language: " + language);

    // If the selected language is not available or not explicitly set, default to English
    if (!languageData) {
      languageData = languages["English"];
    }

    setSubTitle(languageData.subTitle || "WHO'S SESHING");
    setToast(languageData.toast || "Enter at least 2 names!");
    setPlayer(languageData.player || "Player");

    setTitle(languageData.title || "GAMES");
    setPrinksText(languageData.prinksText || "Let's get prinking");
    setCrazyText(languageData.crazyText || "Let's get messy");
    setFlirtyText(languageData.flirtyText || "Let's get flirty");
    setSapText(languageData.sapText || "SUBMIT A PROMPT");

    setAddRuleButtonText(languageData.addRuleButtonText || "ADD A RULE");
    setAddRuleFieldText(
      languageData.addRuleFieldText || "Gráinne is a dryshite, drink 15 sips"
    );
    setAddRuleButton2Text(languageData.addRuleButton2Text || "ADD RULE");
    setNewRuleTitle(languageData.newRuleTitle || "RULE");
    setAddRuleToastText(languageData.addRuleToastText || "Rule added!");
    setAddPlayerButtonText(languageData.addPlayerButtonText || "ADD A PLAYER");
    setAddPlayerFieldText(
      languageData.addPlayerFieldText || "Enter the new player's name"
    );
    setAddPlayerButton2Text(languageData.addPlayerButton2Text || "ADD PLAYER");
    setAddPlayerToastText(languageData.addPlayerToastText || "Player added!");
    setFirstCardText(languageData.firstCardText || "You're at the first card!");
    setQuitGameTitle(languageData.quitGameTitle || "Quit Game");
    setQuitGameText(
      languageData.quitGameText || "Are you sure you want to quit the game?"
    );
    setQuitGameOpt1(languageData.quitGameOpt1 || "Yes");
    setQuitGameOpt2(languageData.quitGameOpt2 || "No");

    setEnterPromptText(languageData.enterPromptText || "ENTER YOUR PROMPT");
    setPickCatText(languageData.pickCatText || "PICK YOUR PROMPT CATEGORY");
    setGameModeText(languageData.gameModeText || "PICK YOUR PROMPT GAME MODE");
    setSocialText(
      languageData.socialText || "ENTER YOUR SOCIAL MEDIA HANDLE TO BE CREDITED"
    );
    setSubmitText(languageData.submitText || "SUBMIT YOUR PROMPT");
    setSelectCatText(languageData.selectCatText || "Select prompt category");
    setSelectGameModeText(
      languageData.selectGameModeText || "Select your game mode"
    );
    setCustomPromptText(
      languageData.customPromptText || "Enter your custom prompt"
    );
    setInstruct1(
      languageData.instruct1 ||
        "- BE IN WITH A CHANCE OF HAVING YOUR CUSTOM PROMPT FEATURED PERMANENTLY IN THE GAME"
    );
    setInstruct2(
      languageData.instruct2 ||
        "- TYPE 'NAME' IF YOU WANT TO RANDOMISE YOUR NAME INPUT, AND 'NAME2' IF YOU WANT TO ADD A SECOND RANDOM NAME"
    );
    setInstruct3(
      languageData.instruct3 ||
        "- E.G. 'NAME HAS TO WHISPER TO NAME2 FOR THE REST OF THE GAME'"
    );
    setInstruct4(
      languageData.instruct4 ||
        "- ADD YOUR SOCIAL MEDIA HANDLE AND PLATFORM TO BE CREDITED ON THE APP (OPTIONAL)"
    );
    setToast1(languageData.toast1 || "Enter prompt text!");
    setToast2(languageData.toast2 || "Choose a prompt category!");
    setToast3(languageData.toast3 || "Choose a game mode!");
    setToast4(languageData.toast4 || "Game prompt submitted!");
    setCat1(languageData.cat1 || "RULE");
    setCat2(languageData.cat2 || "GET IT DOWN YA");
    setCat3(languageData.cat3 || "CHALLENGE");
    setCat4(languageData.cat4 || "VOTE");
    setCat5(languageData.cat5 || "SEXY");
    setCat6(languageData.cat6 || "VIRUS");
    setMode1(languageData.mode1 || "PRINKS");
    setMode2(languageData.mode2 || "MESSY");
    setMode3(languageData.mode3 || "FLIRTY");
    setGameOverText(languageData.gameOverText || "Game Over");
    setMoreGamesText(languageData.moreGamesText || "More Games");
  };

  return {
    subtitle,
    toast,
    player,
    prinksText,
    crazyText,
    flirtyText,
    sapText,
    title,
    addRuleButtonText,
    addRuleFieldText,
    addRuleButton2Text,
    newRuleTitle,
    addRuleToastText,
    addPlayerButtonText,
    addPlayerFieldText,
    addPlayerButton2Text,
    addPlayerToastText,
    firstCardText,
    quitGameTitle,
    quitGameText,
    quitGameOpt1,
    quitGameOpt2,
    enterPromptText,
    customPromptText,
    pickCatText,
    selectCatText,
    gameModeText,
    selectGameModeText,
    socialText,
    instruct1,
    instruct2,
    instruct3,
    instruct4,
    submitText,
    toast1,
    toast2,
    toast3,
    toast4,
    cat1,
    cat2,
    cat3,
    cat4,
    cat5,
    cat6,
    mode1,
    mode2,
    mode3,
    gameOverText,
    moreGamesText,
    setLanguage,
  };
};
