import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { View, Button, Image } from "react-native";

import { getDateString, getTimeString } from "../helpers/currentDate";

export function ExpoCamera({ setPicFromCam, picFromCam }) {
  const takePictureAndSave = async () => {
    try {
      // request camera permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.error("Camera permission not granted");
        return;
      }

      // define spec of image
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0,
        base64: true,
      });

      // If image is saved ...
      if (!result.canceled) {
        // The image was taken, and `result.assets[0]["uri"]` contains the URI of the captured image.

        // Create the formatted date and time string
        const date = getDateString();
        const time = getTimeString();
        const formattedDateTime = `${date}_${time}`;

        // Save the image to the documents directory of expo sandbox
        const fileName = `${formattedDateTime}.jpg`;
        const documentDirectory = FileSystem.documentDirectory;
        const destinationUri = `${documentDirectory}${fileName}`;
        await FileSystem.moveAsync({
          from: result.assets[0]["uri"],
          to: destinationUri,
        });

        // set image path in parent (root) send image filepath
        setPicFromCam(destinationUri);
      }
    } catch (error) {
      console.error("Error taking picture and saving:", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {picFromCam && (
        <Image
          source={{ uri: picFromCam }}
          style={{ width: 400, height: 533, marginVertical: 20 }}
        />
      )}

      <Button title="Make Photo" onPress={takePictureAndSave} />
    </View>
  );
}
