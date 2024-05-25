import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
  Alert,
} from "react-native";

import { Text, View } from "@/components/Themed";
import React from "react";
import { deleteData, getData, updateData } from "@/services";
import { Data } from "@/types";
import { FadeInView } from "@/components/FadeInView";
import { useIsFocused } from "@react-navigation/native";

type ItemProps = {
  id: string;
  title: string;
  is_done: boolean;
  onClickDone: Function;
  onClickDelete: Function;
};

const Item = ({
  title,
  is_done,
  id,
  onClickDone,
  onClickDelete,
}: ItemProps) => (
  <FadeInView style={{ marginTop: 16 }}>
    <View
      style={{
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <View style={{ gap: 8 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={is_done ? styles.badgegreen : styles.badgered}>
          {is_done ? "done" : "not yet"}
        </Text>
      </View>
      <View style={{ gap: 8 }}>
        <View style={!is_done ? styles.buttonslate : {}}>
          <Button
            onPress={() => onClickDone(id)}
            title={!is_done ? "marked as done" : "done"}
            disabled={is_done}
          />
        </View>
        <Button
          onPress={() => onClickDelete(id)}
          title="Delete"
          color={"rgb(239 68 68)"}
        />
      </View>
    </View>
  </FadeInView>
);

export default function TabOneScreen() {
  const isFocused = useIsFocused();
  const [state, setState] = React.useState<Data[]>([]);

  const handlerDone = async (id: string) => {
    try {
      const filteredState = state.filter((data: Data) => data.id !== id);
      const targetData = state.filter((data: Data) => data.id === id);

      if (targetData[0]) {
        const modifiedData = { ...targetData[0], is_done: true };
        setState([...filteredState, modifiedData]);
        await updateData(id);
      }
    } catch {
      // handler error
    }
  };

  const handlerDelete = async (id: string) => {
    try {
      const filteredState = state.filter((data: Data) => data.id !== id);
      setState(filteredState);
      await deleteData(id);
    } catch {
      // handler error
    }
  };

  React.useEffect(() => {
    getData().then((res) => setState(res));
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo list</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={state}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              title={item.title}
              is_done={item.is_done}
              onClickDone={handlerDone}
              onClickDelete={handlerDelete}
            />
          )}
          keyExtractor={(item) => item.id}
          style={styles.flatlist}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  flatlist: {
    width: "100%",
    paddingHorizontal: 16,
  },
  badgered: {
    backgroundColor: "rgb(239 68 68)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
    borderRadius: 16,
    color: "rgb(248 250 252)",
  },
  badgegreen: {
    backgroundColor: "rgb(34 197 94)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 16,
    borderRadius: 16,
    color: "rgb(248 250 252)",
  },
  buttonred: {
    backgroundColor: "rgb(239 68 68)",
  },
  buttonslate: {
    backgroundColor: "rgb(241 245 249)",
  },
});
