import React from "react";
import { Text, View, StyleSheet } from "react-native";

const data = [
  { windFarm: 1, turbine: "John", bladeNumber: "john@gmail.com" },
  { windFarm: 2, turbine: "Bob", bladeNumber: "bob@gmail.com" },
];

const TableSummary = ({ dbArray }) => {
  const data_ = dbArray.map((element) => ({
    windFarm: element.windFarm,
    turbine: element.turbine,
    bladeNumber: element.bladeNumber,
    damageNumber: element.damageNumber,
  }));

  const header = {
    windFarm: "Wind farm",
    turbine: "Turbine",
    bladeNumber: "Blade Nr.",
    damageNumber: "Damage Nr.",
  };

  data_.unshift(header);

  const renderItems = data_.map((item) => (
    <View key={item.windFarm} style={{ flexDirection: "row" }}>
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
