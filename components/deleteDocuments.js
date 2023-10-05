import * as FileSystem from "expo-file-system";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";

export function Delete() {
  const deleteAllFilesInDocumentsDirectory = async () => {
    try {
      const documentDirectory = FileSystem.documentDirectory;
      const files = await FileSystem.readDirectoryAsync(documentDirectory);

      for (const file of files) {
        const fileUri = `${documentDirectory}${file}`;
        await FileSystem.deleteAsync(fileUri);
        console.log(`File deleted: ${fileUri}`);
      }

      console.log("All files in the documents directory have been deleted.");
    } catch (error) {
      console.error("Error deleting files:", error);
    }
  };

  return (
    <Button title="Delete All" onPress={deleteAllFilesInDocumentsDirectory} />
  );
}
