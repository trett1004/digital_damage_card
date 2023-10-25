import * as React from "react";
import { View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import RadioGroup from "react-native-radio-buttons-group";
import { Button, TextInput, Text } from "react-native-paper";

import { ExpoCamera } from "./expoCamera";

const radioButtonsDataEdge = [
  {
    id: "leadingEdge",
    label: "Leading Edge",
    value: "leadingEdge",
    color: "black",
    selected: true,
  },
  {
    id: "trailingEdge",
    label: "Trailing Edge",
    value: "trailingEdge",
    color: "black",
    selected: false,
  },
];

const radioButtonsDataSide = [
  {
    id: "suctionSide",
    label: "Suction Side  ",
    value: "option1",
    color: "black",
    selected: true,
  },
  {
    id: "pressureSide",
    label: "Pressure Side",
    value: "option2",
    color: "black",
    selected: false,
  },
];

export function InputForm({ setFormData, theme }) {
  const [imgAndFormData, setImgAndFormData] = useState([]);
  const [picFromCam, setPicFromCam] = useState("");

  // Datepicker hooks
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios"); // Hide the date picker on iOS when the user selects a date
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      damageNumber: "",
      technician: "",
      // date: currentDate,
      // windFarm: "",
      turbine: "",
      Number: "",
      z: "",
      profileDepth: "",
      bladeEdge: "",
      bladeSide: "",
      amount: null,
      dimensions: "",
    },
  });

  // Send formdata to root
  const onSubmit = (data) => {
    data.img = picFromCam;
    data.date = new Date();
    setFormData(data);
    setPicFromCam("");
  };

  return (
    <View style={styles.container}>
      {/*////////////////////// Damage Number //////////////////////*/}
      <Controller
        name="damageNumber"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="Damage Number"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text>This is required.</Text>}
      {/*////////////////////// Name //////////////////////*/}
      <Controller
        name="technician"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Technician"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text>This is required.</Text>}

      {/*////////////////////// Windfarm //////////////////////*/}
      <Controller
        name="windFarm"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Wind farm"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.windFarm && <Text>This is required.</Text>}

      {/*////////////////////// Turbine //////////////////////*/}
      <Controller
        name="turbine"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Turbine"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.turbine && <Text>This is required.</Text>}

      {/*////////////////////// Blade Number//////////////////////*/}

      <Controller
        name="bladeNumber"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Blade Number"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.bladeNumber && <Text>This is required.</Text>}

      {/*////////////////////// Z [mm] //////////////////////*/}
      <Controller
        name="z"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Z [mm]"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.z && <Text>This is required.</Text>}

      {/*////////////////////// Profile Depth//////////////////////*/}

      <Controller
        name="profileDepth"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Profile depth in % of LE"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {errors.profileDepth && <Text>This is required.</Text>}

      {/*////////////////////// Leading/Trailing Edge //////////////////////*/}
      <View style={[styles.radioButton, { marginTop: 10, marginBottom: 10 }]}>
        <Controller
          name="bladeEdge"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroup
              layout="row"
              radioButtons={radioButtonsDataEdge}
              onPress={onChange}
              selectedId={value}
            />
          )}
        />
      </View>

      {/*////////////////////// Suction/Pressure Side //////////////////////*/}
      <View style={styles.radioButton}>
        <Controller
          name="bladeSide"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroup
              layout="row"
              radioButtons={radioButtonsDataSide}
              onPress={onChange}
              selectedId={value}
            />
          )}
        />
      </View>
      {/*////////////////////// Amount //////////////////////*/}
      <Controller
        name="amount"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Amount"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {/*////////////////////// Dimenstions LengthxWidth in mm //////////////////////*/}
      <Controller
        name="dimensions"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            style={[styles.input, { marginBottom: 20 }]}
            label="Dimensions Length x Width [mm]"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <ExpoCamera setPicFromCam={setPicFromCam} picFromCam={picFromCam} />
      <View style={styles.buttonContainer}>
        <Button
          style={{ width: 200 }}
          icon="content-save-outline"
          mode="contained"
          onPress={handleSubmit(onSubmit)}>
          Save Data
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    justifyContent: "center",
  },
  input: {
    marginTop: 3,
    marginBottom: 3,
  },
  errorText: {
    color: "red",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally},
  },
  submitButton: {},
  radioButton: {
    borderWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {},
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

/*
<Controller
control={control}
rules={{
  maxLength: 100,
}}
render={({ field: { onChange, onBlur, value } }) => (
  <TextInput
    style={styles.input}
    placeholder="Last name"
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
  />
)}
name="lastName"
/>
*/

{
  /*////////////////////// Date //////////////////////*/
}
{
  /* <View style={styles.input}>
        <Controller
          name="date"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DateTimePicker
              style={styles.input}
              value={selectedDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
        />
      </View> */
}
