import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import ImageToWord from "./imageToWord";

export function DataBase(props) {
  const [db, setDb] = useState(SQLite.openDatabase("example.db"));
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState(undefined);
  const [imagePath, setImagePath] = useState();

  useEffect(() => {
    // // Delete Tabe only in Dev Phase
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     "DROP TABLE IF EXISTS names",
    //     [],
    //     (txObj, resultSet) => {
    //       // Table has been successfully dropped.
    //       console.log("Table dropped.");
    //     },
    //     (txObj, error) => {
    //       // Handle any errors that occur during the drop operation.
    //       console.log("Error dropping table: ", error);
    //     }
    //   );
    // });

    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, imagePath TEXT)"
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM names",
        null,
        (txObj, resultSet) => {
          setNames(resultSet.rows._array);
        },
        (txObj, error) => console.log(error)
      );
    });

    // If database is loading to long
    setIsLoading(false);
  }, [db]);

  useEffect(() => {
    setImagePath(props.img);
    console.log("imagePath@db", imagePath);
  }, [props.img]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading data...</Text>
      </View>
    );
  }

  // Use callback to send image filepath up to parent (root)
  // const resetPreviewInCamera = () => {
  //   props.setPicFromCam(null);
  // };

  // Make database entry and update the array
  const submitInputformAndPic = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO names (name, imagePath) values (?, ?)",
        [currentName, imagePath],
        (txObj, resultSet) => {
          const existingNames = [
            ...names,
            { id: resultSet.insertId, name: currentName, imagePath: imagePath },
          ];
          setNames(existingNames);
          setCurrentName(undefined);
        },
        (txObj, error) => console.log(error)
      );
      // resetPreviewInCamera();
    });
  };

  const deleteName = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM names WHERE id = ?",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingNames = [...names].filter((name) => name.id !== id);
            setNames(existingNames);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const showNames = () => {
    // console.log("names@db", names);
    return names.map((name, index) => {
      const pic = name.imagePath ? name.imagePath.slice(-20) : name.imagePath;

      return (
        <View key={index} style={styles.row}>
          <Text>{name.name}</Text>
          <Text>{pic}</Text>
          <Button title="Delete" onPress={() => deleteName(name.id)} />
          <Button title="Update" onPress={() => updateName(name.id)} />
        </View>
      );
    });
  };

  console.info({ names });
  return (
    <View style={styles.container}>
      <TextInput
        value={currentName}
        placeholder="name"
        onChangeText={setCurrentName}
      />
      <Button title="Add Name" onPress={submitInputformAndPic} />
      {showNames()}
      <ImageToWord dbArray={names} img={imagePath} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    // justifyContent: "space-between",
    margin: 8,
  },
});

// expo add expo-sqlite
// expo add expo-file-system
// expo add expo-document-picker
// expo add expo-sharing
// expo add expo-dev-client

/*
  For testing expo-document-picker on iOS we need a standalone app
  which is why we install expo-dev-client

  If you don't have eas installed then install using the following command:
  npm install -g eas-cli

  eas login
  eas build:configure

  Build for local development on iOS or Android:
  eas build -p ios --profile development --local
  OR
  eas build -p android --profile development --local

  May need to install the following to build locally (which allows debugging)
  npm install -g yarn
  brew install fastlane

  After building install on your device:
  For iOS (simulator): https://docs.expo.dev/build-reference/simulators/
  For Android: https://docs.expo.dev/build-reference/apk/

  Run on installed app:
  expo start --dev-client
*/

// //  const updateName = (id) => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       "UPDATE names SET name = ? WHERE id = ?",
//       [currentName, id],
//       (txObj, resultSet) => {
//         if (resultSet.rowsAffected > 0) {
//           let existingNames = [...names];
//           const indexToUpdate = existingNames.findIndex(
//             (name) => name.id === id
//           );
//           existingNames[indexToUpdate].name = currentName;
//           setNames(existingNames);
//           setCurrentName(undefined);
//         }
//       },
//       (txObj, error) => console.log(error)
//     );
//   });
// };
