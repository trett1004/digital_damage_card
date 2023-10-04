import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Dimensions,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as fs from "expo-file-system";

export function CameraComp(props) {
  const [picToSend, setPicToSend] = useState("Shadow");

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [capturedImageUri, setCapturedImageUri] = useState(null);

  const [testFoto, setTestFoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  // Take picture
  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    setCapturedImageUri(newPhoto.uri);
  };

  // Save to library
  if (photo) {
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setTestFoto(photo.uri);
        setPhoto(undefined);
      });
    };

    // Send pic to App.js to pass it down to Database
    const sendUp = (input) => {
      console.log("i ran @ callback send pic to Root");
      props.sendPicToParent(input);
    };
    sendUp(testFoto);

    // After clicking on Take Picture following render logic
    return (
      <View style={styles.containerCaptured}>
        <Image style={styles.preview} source={{ uri: photo.uri }} />
        {capturedImageUri && (
          <Image
            source={{ uri: capturedImageUri }}
            style={styles.capturedImgageView}
          />
        )}
        <View style={{ flexDirection: "row" }}>
          {hasMediaLibraryPermission ? (
            <Button title="Save" onPress={savePhoto} />
          ) : undefined}
          <Button title="Discard" onPress={() => setPhoto(undefined)} />
        </View>
      </View>
    );
  }

  // Render the camera
  return (
    <>
      <Camera style={styles.containerCam} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Button title="Take Pic" onPress={takePic} />
        </View>
      </Camera>
    </>
  );
}

const styles = StyleSheet.create({
  containerCaptured: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "brown",
  },
  containerCam: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "purple",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  // Camera
  preview: {
    backgroundColor: "purple",
    borderWidth: 2,
    borderColor: "yellow",
  },
  // Captured Image
  capturedImgageView: {
    borderWidth: 2,
    borderColor: "red",
    width: "90%",
    height: "90%",
  },
});
