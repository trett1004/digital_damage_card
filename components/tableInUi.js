import React from "react";
import { Text, View, StyleSheet } from "react-native";

const TableSummary = ({ dbArray }) => {
  const data_ = dbArray.map((element) => ({
    windFarm: element.windFarm,
    turbine: element.turbine,
    bladeNumber: element.bladeNumber,
    damageNumber: element.damageNumber,
    date: element.date,
  }));

  const header = {
    windFarm: "Wind farm",
    turbine: "Turbine",
    bladeNumber: "Blade Nr.",
    damageNumber: "Damage Nr.",
    date: new Date(),
  };

  data_.unshift(header);
  console.log("date@table", data_.date);

  const renderItems = data_.map((item, idx) => (
    <View key={idx} style={{ flexDirection: "row" }}>
      <View style={styles.cell}>
        <Text style={styles.text}>{item.windFarm}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{item.turbine}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{item.bladeNumber}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.text}>{item.damageNumber}</Text>
      </View>
    </View>
  ));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
      }}>
      {renderItems}
    </View>
  );
};
export default TableSummary;

const styles = StyleSheet.create({
  cell: {
    width: 100,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
  },
});
