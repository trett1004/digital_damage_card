import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import RadioGroup from "react-native-radio-buttons-group";

import { ExpoCamera } from "./expoCamera";

export function InputForm({ setFormData }) {
  const [imgAndFormData, setImgAndFormData] = useState([]);
  const [picFromCam, setPicFromCam] = useState("");

  // Datepicker hooks
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Radio Buttons
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

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
      name: "",
      date: currentDate,
      windFarm: "",
      turbine: "",
      blade: null,
      z: "",
      profileDepth: 0,
    },
  });

  // Send formdata to root
  const onSubmit = (data) => {
    data.img = picFromCam;
    setFormData(data);
    console.log("data@Form", data);
  };

  return (
    <View style={styles.container}>
      {/* <View>
        <Controller
          name="radioOption"
          control={control}
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              layout="row"
            />
          )}
        />

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View> */}

      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text>This is required.</Text>}
      {/*////////////////////// Date //////////////////////*/}
      <View style={styles.input}>
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
      </View>
      {/*////////////////////// Windfarm //////////////////////*/}
      <Controller
        name="windfarm"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Windfarm"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.windfarm && <Text>This is required.</Text>}

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
      <View style={styles.input}>
        <Text style={styles.label}>Select Blade Number</Text>
        <Controller
          name="blade"
          control={control}
          rules={{
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={(value) => onChange(value)}
              items={[
                { label: "1", value: 1 },
                { label: "2", value: 2 },
                { label: "3", value: 3 },
              ]}
            />
          )}
        />
        {errors.blade && <Text>This is required.</Text>}
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
        <Text style={styles.label}>Select Profile Depth in % from LE:</Text>
        <Controller
          name="profileDepth"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <RNPickerSelect
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
      <ExpoCamera setPicFromCam={setPicFromCam} />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    color: "black",
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
    borderWidth: 1,
    borderColor: "gray",
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
