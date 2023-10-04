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

export default function App() {
  const [openCam, setOpenCam] = useState(false);

  const openCamera = () => {
    setOpenCam(true);
  };
  const closeCamera = () => {
    setOpenCam(false);
  };

  const [picFromCam, setPicFromCam] = useState(null);
  console.log("picFromCam@root", picFromCam);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <StatusBar style="auto" />

        {picFromCam && <DataBase img={picFromCam} />}
        <Text>Bild: {picFromCam}</Text>

        <Text style={{ fontSize: 42 }}>PlaceHolder</Text>
        <Text style={{ fontSize: 42 }}>PlaceHolder</Text>

        {/* <DataBase styles={styles} /> */}
        {/* <ImageToWord imageId={imageId} /> */}
        <ExpoCamera setPicFromCam={setPicFromCam} />
        {/* <ChildComponent img={picFromCam} /> */}

        {/* <CreateDocx styles={styles.container} /> */}
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
    backgroundColor: "pink",
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