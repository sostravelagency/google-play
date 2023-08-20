import React from "react";
import { Text, View } from "react-native";

const Navigation = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 54,
      }}
    >
      <View
        style={{
          padding: 10,
          marginRight: 12,
          borderBottomWidth: 2,
          borderStyle: "solid",
          borderColor: "#056449",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "600", color: "#056449" }}>
          Cho bạn
        </Text>
      </View>
      <View style={{ padding: 10, marginRight: 12 }}>
        <Text style={{ fontSize: 17, fontWeight: "600" }}>Bảng xếp hạng</Text>
      </View>
      <View style={{ padding: 10, marginRight: 12 }}>
        <Text style={{ fontSize: 17, fontWeight: "600" }}>Game hot</Text>
      </View>
      <View style={{ padding: 10, marginRight: 12 }}>
        <Text style={{ fontSize: 17, fontWeight: "600" }}>Được tải xuống nhiều nhất</Text>
      </View>
    </View>
  );
};

export default Navigation;
