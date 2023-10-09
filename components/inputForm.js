import { View, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import RadioGroup from "react-native-radio-buttons-group";
import { Button, TextInput, Text, Provider } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

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

export function InputForm({ setFormData }) {
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

  // Blade Number dropdown
  const [bladeNumberDd, setBladeNumberDd] = useState("1");
  const [showDropDown, setShowDropDown] = useState(false);

  bladeNumbers = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];

  const selectedItem = {
    title: "Selected Blade Number",
    description: "Secondary long descriptive text ...",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      damageNumber: null,
      technician: "",
      // date: currentDate,
      // windFarm: "",
      turbine: "",
      Number: "",
      z: "",
      profileDepth: 0,
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
            style={styles.input}
            placeholder="Damage Number"
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
            style={styles.input}
            placeholder="Technician"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text>This is required.</Text>}
      {/*////////////////////// Date //////////////////////*/}
      {/* <View style={styles.input}>
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
      </View> */}
      {/*////////////////////// Windfarm //////////////////////*/}
      <Controller
        name="windFarm"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Wind farm"
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
            style={styles.input}
            placeholder="Turbine"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.turbine && <Text>This is required.</Text>}

      {/*////////////////////// Blade //////////////////////*/}
      {/* <Provider>
        <DropDown
          label={"Blade"}
          mode={"outlined"}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={bladeNumberDd}
          setValue={setBladeNumberDd}
          list={bladeNumbers}
        />
      </Provider> */}

      <View style={styles.input}>
        {/* <Text style={styles.label}>Select Blade Number</Text> */}
        <Controller
          name="bladeNumber"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <RNPickerSelect
              placeholder={{
                label: "Select Blade Number",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => onChange(value)}
              items={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
              ]}
            />
          )}
        />
        {errors.bladeNumber && <Text>This is required.</Text>}
      </View>

      {/*////////////////////// Z [mm] //////////////////////*/}
      <Controller
        name="z"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Z [mm]"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.z && <Text>This is required.</Text>}

      {/*////////////////////// Profile Depth//////////////////////*/}
      <View style={styles.input}>
        <Controller
          name="profileDepth"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <RNPickerSelect
              placeholder={{
                label: "Select Profile Depth",
                value: null,
              }}
              style={pickerSelectStyles}
              onValueChange={(value) => onChange(value)}
              value={value}
              items={[
                { label: "0%", value: 0 },
                { label: "10%", value: 10 },
                { label: "20%", value: 20 },
                { label: "30%", value: 30 },
                { label: "40%", value: 40 },
                { label: "50%", value: 50 },
                { label: "60%", value: 60 },
                { label: "70%", value: 70 },
                { label: "80%", value: 80 },
                { label: "90%", value: 90 },
                { label: "100%", value: 100 },
              ]}
            />
          )}
        />
        {errors.profileDepth && <Text>This is required.</Text>}
      </View>

      {/*////////////////////// Leading/Trailing Edge //////////////////////*/}
      <View>
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
      <View>
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
            style={styles.input}
            placeholder="Amount"
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
            style={styles.input}
            placeholder="Dimensions Length x Width [mm]"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <ExpoCamera setPicFromCam={setPicFromCam} picFromCam={picFromCam} />
      <Button icon="camera" mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    color: "black",
    backgroundColor: "white",
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
  },
  submitButton: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
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
