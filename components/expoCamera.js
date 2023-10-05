import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Text, View, Button, Image } from "react-native";

export function ExpoCamera(props) {
  const [imageUri, setImageUri] = useState(null);

  const takePictureAndSave = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.error("Camera permission not granted");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0,
        base64: true,
      });

      // If image is saved ...
      if (!result.cancelled) {
        // The image was taken, and `result.assets[0]["uri"]` contains the URI of the captured image.
        // Get date for image name
        const currentDate = new Date();
        // Extract date components (year, month, day, hours, minutes, seconds)
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const hours = String(currentDate.getHours()).padStart(2, "0");
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");
        const seconds = String(currentDate.getSeconds()).padStart(2, "0");
        // Create the formatted date and time string
        const formattedDateTime = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

        // Save the image to the documents directory
        const fileName = `${formattedDateTime}.jpg`;
        const documentDirectory = FileSystem.documentDirectory;
        const destinationUri = `${documentDirectory}${fileName}`;
        await FileSystem.moveAsync({
          from: result.assets[0]["uri"],
          to: destinationUri,
        });
        // Saved img-filepath
        setImageUri(destinationUri);

        // Use callback to send image filepath up to parent (root)
        const sendImgUp = (imagePath) => {
          props.setPicFromCam(imagePath);
        };
        sendImgUp(destinationUri);
      }
    } catch (error) {
      console.error("Error taking picture and saving:", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 400, height: 600, marginVertical: 20 }}
        />
      )}

      <Button title="Take Picture and Save" onPress={takePictureAndSave} />
    </View>
  );
}
