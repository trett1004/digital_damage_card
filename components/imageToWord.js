import * as FileSystem from "expo-file-system";
import {
  Document,
  Packer,
  Paragraph,
  Media,
  HeadingLevel,
  ImageRun,
  TextRun,
} from "docx";
import { Button } from "react-native";
import * as Sharing from "expo-sharing";

export default function ImageToWord({ dbArray }) {
  // console.info("dbArray", dbArray);
  const generateWordDocument = async () => {
    const children = [];
    for (const row of dbArray) {
      const imageBytes = await FileSystem.readAsStringAsync(row.imagePath, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const imageRun = new Paragraph({
        children: [
          new ImageRun({
            data: imageBytes,
            transformation: {
              width: 200,
              height: 200,
            },
          }),
        ],
      });

      children.push(imageRun);
      const name = new Paragraph({
        children: [new TextRun(row.name)],
      });
      children.push(name);
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: children,
        },
      ],
    });

    try {
      // Await the result of buildParagraph

      // Generate and save the document
      const base64 = await Packer.toBase64String(doc);
      const filename = FileSystem.documentDirectory + "MyWordDocument.docx";
      await FileSystem.writeAsStringAsync(filename, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log(`Saved file: ${filename}`);
      Sharing.shareAsync(filename);
    } catch (error) {
      console.log("word", error);
    }
  };

  return (
    <Button
      title="Make Word"
      onPress={() => {
        generateWordDocument();
      }}
    />
  );
}
