import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { storeData } from "@/services";
import { useIsFocused } from "@react-navigation/native";

export default function TabTwoScreen() {
  const isFocused = useIsFocused();
  const [text, onChangeText] = React.useState("");

  const handlerPress = () => {
    storeData(text);
    Alert.alert("Todo Added", "Success", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
    onChangeText("");
  };

  React.useEffect(() => {
    onChangeText("");
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Todo</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Add Todo Title"
        />
        <Button onPress={() => handlerPress()} title="Add" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "rgb(248 250 252)",
  },
});
