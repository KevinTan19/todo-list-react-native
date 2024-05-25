import { Data } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (text: string) => {
  const id = "id" + Math.random().toString(16).slice(2);
  const data = {
    id: id,
    title: text,
    is_done: false,
  };
  try {
    const value = await AsyncStorage.getItem("todo-list");
    if (value === null) {
      const initialValue = [data];
      const jsonValue = JSON.stringify(initialValue);
      await AsyncStorage.setItem("todo-list", jsonValue);
    } else {
      const latestData = JSON.parse(value);
      const updatedData = [...latestData, data];
      const jsonValue = JSON.stringify(updatedData);
      await AsyncStorage.setItem("todo-list", jsonValue);
    }
  } catch (e) {
    // saving error
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("todo-list");
    if (value !== null) {
      const latestData = JSON.parse(value);
      return latestData;
    }
  } catch (e) {
    // error reading value
  }
};

export const deleteData = async (id: string) => {
  try {
    const todoList = await getData();
    const filteredData = todoList.filter((todo: Data) => todo.id !== id);
    const jsonValue = JSON.stringify(filteredData);
    await AsyncStorage.setItem("todo-list", jsonValue);
  } catch (e) {}
};

export const updateData = async (id: string) => {
  try {
    const todoList = await getData();
    const filteredState = todoList.filter((data: Data) => data.id !== id);
    const targetData = todoList.filter((data: Data) => data.id === id);

    if (targetData[0]) {
      const modifiedData = { ...targetData[0], is_done: true };
      const jsonValue = JSON.stringify([...filteredState, modifiedData]);
      await AsyncStorage.setItem("todo-list", jsonValue);
    }
  } catch (e) {}
};
