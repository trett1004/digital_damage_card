import React, { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { Document, Packer, Paragraph, Media } from "docx";

const WordDocumentGenerator = ({ imageId }) => {
  const db = SQLite.openDatabase("example.db");
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    const getImageFilePathFromDatabase = () => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT imagePath FROM names WHERE id = ?",
            [imageId],
            (txObj, resultSet) => {
              if (resultSet.rows.length > 0) {
                const imagePath = resultSet.rows.item(0).imagePath;
                resolve(imagePath);
              } else {
                reject("Image path not found in the database.");
              }
            },
            (txObj, error) => {
              reject(error);
            }
          );
        });
      });
    };

    const generateDocument = async () => {
      try {
        const path = await getImageFilePathFromDatabase();

        const doc = new Document();
        doc.addSection({
          properties: {},
          children: [
            new Paragraph({
              children: [
                new Media({
                  type: "image",
                  data: path,
                  extension: "jpg", // Adjust the extension based on your image type
                }),
              ],
            }),
          ],
        });

        const buffer = await Packer.toBuffer(doc);
        // Do something with the generated document buffer, e.g., save or share it.
      } catch (error) {
        console.error("Error generating Word document:", error);
      }
    };

    generateDocument();
  }, [db, imageId]);

  return null; // This component doesn't render anything in the UI.
};

export default WordDocumentGenerator;

//imagePath file:///var/mobile/Containers/Data/Application/9AB1F793-2D2A-44F5-BB67-0E9496948B30/Library/Caches/ExponentExperienceData/%2540anonymous%252FExpoPorject-66c0bf17-2dac-4599-a183-d35656d9f7da/Camera/3B4456DE-821F-4DE6-BD65-A91BF95EA34D.jpg
