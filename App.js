import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";

// Components
import { CreateDocx } from "./components/createDocx";
import { DataBase } from "./components/dataBase";
import { CameraComp } from "./components/camera";
import { ChildComponent } from "./components/child";
import WordDocumentGenerator from "./components/dbToWord";
import ImageToWord from "./components/imageToWord";
import { ExpoCamera } from "./components/expoCamera";
import { InputForm } from "./components/inputForm";
import { Delete } from "./components/deleteDocuments";

export default function App() {
  const [openCam, setOpenCam] = useState(false);
  const [displayPreview, setDisplayPreview] = useState(false);
  const [picFromCam, setPicFromCam] = useState("");
  const [formData, setFormData] = useState([]);

  // console.info("formdata@root", formData);

  // if (displayPreview) {
  //   setPicFromCam(null);
  //   setDisplayPreview(false);
  // }

  const openCamera = () => {
    setOpenCam(true);
  };
  const closeCamera = () => {
    setOpenCam(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="auto" />
        <InputForm setFormData={setFormData} />
        <DataBase formData={formData} />
        <Text style={{ fontSize: 42 }}>PI</Text>
        {/* <Delete /> */}
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

/*
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 16,
            paddingHorizontal: 30,
            borderWidth: 2,
            borderColor: "yellow",
          }}>
          {/* <Button title="Open Cam" onPress={openCamera} />
          <Button title="Close Cam" onPress={closeCamera} /> */
// </View>
// <View style={{ height: 600 }}>{openCam && <CameraComp style={{}} sendPicToParent={setPicFromCam} />}</View>
// */
