import React, { useState, useEffect } from "react";
import { View, Text, Button, Image } from "react-native";
import * as FileSystem from "expo-file-system";

export function ChildComponent(props) {
  const [imageDataUri, setImageDataUri] = useState(null);
  const [filesList, setFilesList] = useState([]);

  useEffect(() => {
    async function checkDir() {
      try {
        const documentDirectory = FileSystem.documentDirectory;
        const dirInfo = await FileSystem.getInfoAsync(documentDirectory);
        const files = await FileSystem.readDirectoryAsync(documentDirectory);
        setFilesList(files);
        console.log("dirInfo", dirInfo);
        console.log("files", files);
      } catch (error) {
        console.log("Error checking Directory existence:", error);
      }
    }
    checkDir();
  }, []);
  useEffect(() => {
    // Check if the file exists when the component mounts
    checkFileExists();
  }, []);

  const checkFileExists = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + "capturedImage.jpg"
      );
      console.log("fileInfo", fileInfo);
      if (fileInfo.exists) {
        // If the file exists, read its content
        // const content = await FileSystem.readAsStringAsync(fileInfo.uri);
        // setFileContent(content);
        console.log("file exists");
      }
    } catch (error) {
      console.error("Error checking file existence:", error);
    }
  };

  // const imageData = await FileSystem.readFile(docDir + '/image.jpg');
  // Display the image
  if (imageDataUri) {
    return (
      <Text> Taktak </Text>
      // <Image
      //   source={{ uri: imageDataUri }}
      //   style={{ width: 100, height: 100 }}
      // />
    );
  }
}
