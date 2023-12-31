import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import * as React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

// Components

import { DataBase } from "./components/dataBase";
import { InputForm } from "./components/inputForm";
import { Delete } from "./components/deleteDocuments";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  const [formData, setFormData] = useState([]);
  // console.log("data@root", formData);
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <StatusBar style="auto" />
          <InputForm setFormData={setFormData} />
          <DataBase formData={formData} />
          <Delete />
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    flexDirection: "column",
  },
});
