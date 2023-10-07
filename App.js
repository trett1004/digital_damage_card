import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";

// Components

import { DataBase } from "./components/dataBase";
import { InputForm } from "./components/inputForm";
import { Delete } from "./components/deleteDocuments";

export default function App() {
  const [formData, setFormData] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="auto" />
        <InputForm setFormData={setFormData} />
        <DataBase formData={formData} />
        <Delete />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    // alignItems: "center",
    // justifyContent: "center",
    borderColor: "black",
    // marginVertical: 32,
    borderWidth: 3,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "ghostwhite",
    flexDirection: "column",
  },
});
