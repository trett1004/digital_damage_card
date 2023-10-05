const generateWordDocument = async (dbArray) => {
    console.log("dbArray@word", dbArray);
    try {
      const sections = [];
      for (const row of dbArray) {
        // Read the image file as bytes
        const imageBytes = await FileSystem.readAsStringAsync(row.imagePath, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const section = {
          properties: {},
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
        };
        sections.push(section);
      }
      // console.log("sections@word", sections[0].children[0].root[1]);
      const doc = new Document({ sections });

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
        generateWordDocument(dbArray);
      }}
    />
  );
}
