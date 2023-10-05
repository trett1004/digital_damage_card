const generateWordDocument = async (dbArray) => {
    console.log("dbArray@word", dbArray);
    try {
      let pathArray = dbArray.map((el) => el.imagePath);

      const buildParagraph = async (arr) => {
        let paragraphArray = [];
        arr.map((cur, index) => {
          paragraphArray.push(new Paragraph(cur));
        });
        return paragraphArray;
      };
      buildParagraph(pathArray);
      const paragraphArray = await buildParagraph(pathArray);

      const doc = new Document({
        sections: [
          {
            children: paragraphArray, // Use the paragraphArray here
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

  return (
    <Button
      title="Make Word"
      onPress={() => {
        generateWordDocument(dbArray);
      }}
    />
  );
}