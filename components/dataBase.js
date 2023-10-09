import { StyleSheet, Text, View, Button } from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import { ImageToWord } from "./imageToWord";
import TableSummary from "./tableInUi";

export function DataBase({ formData }) {
  const [db, setDb] = useState(SQLite.openDatabase("example.db"));
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState([]);
  const submitInputformAndPic = () => {
    if (!formData || !formData.bladeNumber) {
      return;
    }

    //////////////////////////// Write to Table ////////////////////////////
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO names (amount, bladeNumber, bladeEdge, bladeSide, damageNumber, date, dimensions, imagePath, profileDepth, technician, turbine, windFarm, z) values (?, ?, ?, ?, ? ,? ,?, ?, ?, ?, ?, ?, ?)",
        [
          formData.amount,
          formData.bladeNumber,
          formData.bladeEdge,
          formData.bladeSide,
          formData.damageNumber,
          formData.date,
          formData.dimensions,
          formData.img,
          formData.profileDepth,
          formData.technician,
          formData.turbine,
          formData.windFarm,
          formData.z,
        ],
        (txObj, resultSet) => {
          const existingNames = [
            ...names,
            {
              id: resultSet.insertId,
              amount: formData.amount,
              bladeNumber: formData.bladeNumber,
              bladeEdge: formData.bladeEdge,
              bladeSide: formData.bladeSide,
              damageNumber: formData.damageNumber,
              date: formData.date,
              dimensions: formData.dimensions,
              imagePath: formData.img,
              profileDepth: formData.profileDepth,
              technician: formData.technician,
              turbine: formData.turbine,
              windFarm: formData.windFarm,
              z: formData.z,
            },
          ];
          setNames(existingNames);
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  useEffect(() => {
    //////////////////////////// CREATE TABLE ////////////////////////////
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, amount TEXT, bladeNumber TEXT, bladeEdge TEXT, bladeSide TEXT, damageNumber Text, date TEXT, dimensions TEXT, imagePath TEXT, profileDepth TEXT, technician TEXT, turbine TEXT, windFarm TEXT, z TEXT)"
      );
    });
    //////////////////////////// READ TABLE ////////////////////////////
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

    //////////////////////////// WRITE TO TABLE ////////////////////////////
    // Make database entry and update the array
    if (formData) {
      submitInputformAndPic();
    }

    // If database is loading to long
    setIsLoading(false);
  }, [formData]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading data...</Text>
      </View>
    );
  }

  //////////////////////////// DELETE ROWS IN TABLE ////////////////////////////
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
  //////////////////////////// RENDER TABLE TO UI ////////////////////////////
  const showNames = () => {
    return names.map((name, index) => {
      const pic = name.imagePath ? name.imagePath.slice(-21) : name.imagePath;

      return (
        <View key={index} style={styles.row}>
          <Text>{name.technician}</Text>
          <Text>{pic}</Text>
          <Button title="Delete" onPress={() => deleteName(name.id)} />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ImageToWord dbArray={names} />
      {showNames()}
      <TableSummary dbArray={names} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    margin: 8,
  },
});
