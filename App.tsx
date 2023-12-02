import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./app/screens/Home/Home";
import Account from "./app/screens/Account/Account";
import Login from "./app/screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                options={{ headerShown: false }}
                component={Login}
                name="Login"
              />
              <Stack.Screen
                options={{ headerShown: false }}
                component={Home}
                name="Home"
              />
              <Stack.Screen
                options={{ headerShown: true }}
                component={Account}
                name="Account"
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </ApplicationProvider>
    </>
  );
}
