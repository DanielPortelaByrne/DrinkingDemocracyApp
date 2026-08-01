/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import GameOneScreen from "../screens/GameOneScreen";
import PersonalisedGameScreen from "../screens/PersonalisedGameScreen";
import GameOverScreen from "../screens/GameOverScreen";
import PromptSubmitScreen from "../screens/PromptSubmitScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { DEFAULT_LANGUAGE } from "../constants/Languages";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabOne"
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{ headerShown: false }}
        initialParams={{
          language: DEFAULT_LANGUAGE,
        }}
      />
      <Stack.Screen
        name="GameOne"
        component={GameOneScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PromptSubmit"
        component={PromptSubmitScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalisedGame"
        component={PersonalisedGameScreen}
        options={{ headerShown: false }}
        initialParams={{ language: DEFAULT_LANGUAGE }}
      />
      <Stack.Screen
        name="GameOver"
        component={GameOverScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
