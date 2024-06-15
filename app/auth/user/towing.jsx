import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Towing() {
  const [schedule, setSchedule] = useState("Now");
  const [vehicle, setVehicle] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [optionalStop, setOptionalStop] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.welcomeText}>Towing</Text>
        <Text style={styles.subheading}>
          We ensure your vehicle receives the best care
        </Text>
        <Text style={styles.label}>Schedule this service:</Text>
        <View style={styles.scheduleContainer}>
          <TouchableOpacity
            style={schedule === "Now" ? styles.radioSelected : styles.radio}
            onPress={() => setSchedule("Now")}
          >
            <Text style={styles.radioText}>Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={schedule === "Later" ? styles.radioSelected : styles.radio}
            onPress={() => setSchedule("Later")}
          >
            <Text style={styles.radioText}>Later</Text>
          </TouchableOpacity>
        </View>
        {schedule === "Later" && (
          <>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Select date"
                placeholderTextColor="gray"
                value={date.toDateString()}
                editable={false}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Specify time"
                placeholderTextColor="gray"
                value={time.toLocaleTimeString()}
                editable={false}
              />
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={onChangeTime}
              />
            )}
          </>
        )}
        <Text style={styles.label}>Select Vehicle*</Text>
        <TextInput
          style={styles.input}
          placeholder="Select vehicle"
          placeholderTextColor="gray"
          value={vehicle}
          onChangeText={setVehicle}
        />
        {/* <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color="#FFA500" />
          <Text style={styles.addButtonText}>Add vehicle</Text>
        </TouchableOpacity> */}
        <Text style={styles.label}>Pick-up location*</Text>
        <TextInput
          style={styles.input}
          placeholder="Select location"
          placeholderTextColor="gray"
          value={pickupLocation}
          onChangeText={setPickupLocation}
        />
        <Text style={styles.label}>Drop-off location*</Text>
        <TextInput
          style={styles.input}
          placeholder="Select location"
          placeholderTextColor="gray"
          value={dropoffLocation}
          onChangeText={setDropoffLocation}
        />
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color="#FFA500" />
          <Text style={styles.addButtonText}>Optional stop</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.notesInput}
          placeholder="Add notes"
          placeholderTextColor="gray"
          value={optionalStop}
          onChangeText={setOptionalStop}
        />
        <Text style={styles.noteText}>
          For example: Leave it on the curb, inside the garage, etc.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  welcomeText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginTop: 30,
  },
  subheading: {
    fontSize: 16,
    color: "gray",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  scheduleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  radioSelected: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    borderColor: "#FFA500",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#333",
  },
  radioText: {
    color: "white",
    marginLeft: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333",
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#FFA500",
    marginLeft: 5,
  },
  notesInput: {
    width: "100%",
    backgroundColor: "#333",
    color: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  noteText: {
    color: "gray",
    fontSize: 12,
    marginTop: 5,
    alignSelf: "flex-start",
  },
});
