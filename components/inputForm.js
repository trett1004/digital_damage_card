import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import { useState } from "react";

import { ExpoCamera } from "./expoCamera";

export function InputForm({ setFormData }) {
  const [imgAndFormData, setImgAndFormData] = useState([]);
  const [picFromCam, setPicFromCam] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  // Send formdata to root
  const onSubmit = (data) => {
    data.img = picFromCam;
    setFormData(data);
    // console.log("data@Inputform", data);
  };

  return (
    <View style={styles.container}>
      <Controller
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
        name="name"
      />
      {errors.name && <Text>This is required.</Text>}

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
