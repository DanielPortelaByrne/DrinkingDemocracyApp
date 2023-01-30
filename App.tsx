import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import * as ScreenOrientation from "expo-screen-orientation";
import React from "react";
import { useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  const [orientationIsLandscape, setOrientation] = useState(true);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RootSiblingParent>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </RootSiblingParent>
    );
  }
}
