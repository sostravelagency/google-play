import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Game from "../screen/Game/Game";
import Application from "../screen/Application/Application";
import Book from "../screen/Book/Book";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

const Tab = createBottomTabNavigator();

const TabContainer = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#01875f", // Màu sắc khi tab được chọn
        tabBarStyle: {
          backgroundColor: "#000", // Màu nền của Bottom Tab
        },
      }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#e5f1f9",
          paddingTop: 10,
          paddingBottom: 10,
          height: 70
        },
      })}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? color : "#000",
                fontSize: 16,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Trò chơi
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="game-controller-sharp" size={size} color={color} /> // Biểu tượng (icon) của tab
          ),
        }}
        name="Game"
        component={Game}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? color : "#000",
                fontSize: 16,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Ứng dụng
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
        }}
        name="Application"
        component={Application}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? color : "#000",
                fontSize: 16,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Sách
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" size={size} color={color} />
          ),
        }}
        name="Book"
        component={Book}
      />
    </Tab.Navigator>
  );
};

export default TabContainer;
