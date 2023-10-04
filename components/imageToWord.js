import * as FileSystem from "expo-file-system";
import {
  Document,
  Packer,
  Paragraph,
  Media,
  HeadingLevel,
  ImageRun,
} from "docx";
import { Button } from "react-native";
import * as Sharing from "expo-sharing";

export default function ImageToWord(props) {
  const generateDocument = async () => {
    console.log("props.img", props.img);

    // Check content of path

    const listDirectoryContents = async (directoryPath) => {
      try {
        const dirInfo = await FileSystem.getInfoAsync(directoryPath);

        if (dirInfo.exists && dirInfo.isDirectory) {
          const items = await FileSystem.readDirectoryAsync(directoryPath);
          return items;
        } else {
          return [];
        }
      } catch (error) {
        console.error("Error listing directory contents:", error);
        return [];
      }
    };

    // Usage
    const directoryPath = FileSystem.documentDirectory;
    const contents = await listDirectoryContents(directoryPath);

    console.log("Directory Contents:", contents);

    // Check Image Path
    const imagePath = props.img;
    const checkImagePath = async (imagePath) => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(imagePath);
        return fileInfo.exists;
      } catch (error) {
        console.error("Error checking image path:", error);
        return false;
      }
    };

    const isImageValid = await checkImagePath(imagePath);

    if (isImageValid) {
      console.log("Image path is valid.");
    } else {
      console.log("Image path is not valid.");
    }
    try {
      generateWordDocument();
    } catch (error) {
      console.error("Error generating Word document:", error);
    }
  };

  // Read the image file as bytes

  const generateWordDocument = async () => {
    try {
      // Read the image file as bytes
      const imageBytes = await FileSystem.readAsStringAsync(props.img, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: imageBytes,
                    transformation: {
                      width: [200],
                      height: [200],
                    },
                  }),
                ],
              }),
            ],
          },
        ],
      });

      Packer.toBase64String(doc).then((base64) => {
        const filename = FileSystem.documentDirectory + "MyWordDocument.docx";
        FileSystem.writeAsStringAsync(filename, base64, {
          encoding: FileSystem.EncodingType.Base64,
        }).then(() => {
          console.log(`Saved file: ${filename}`);
          Sharing.shareAsync(filename);
        });
      });
    } catch (error) {
      console.log("word", error);
    }
  };

  return <Button title="Make Word" onPress={generateDocument} />;
}
