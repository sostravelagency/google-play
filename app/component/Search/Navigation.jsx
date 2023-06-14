import React from "react";
import { Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Navigation = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 54,
        marginTop: 16
      }}
    >
      <View
        style={{
          padding: 10,
          marginRight: 12,
          backgroundColor: "#e6f3ef",
        borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"
        }}
      >
        <AntDesign name={"tablet1"} color={"#056449"} size={16} style={{marginRight: 10}} />
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#056449" }}>
          Thiết bị này
        </Text>
        <MaterialIcons name="arrow-drop-down" color={"#056449"} style={{marginLeft: 5}} size={17} />
      </View>
      <View style={{ padding: 10, marginRight: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#056449" }}>Bảng xếp hạng</Text>
      </View>
      <View style={{ padding: 10, marginRight: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#056449" }}>Game hot</Text>
      </View>
    </View>
  );
};

export default Navigation;
