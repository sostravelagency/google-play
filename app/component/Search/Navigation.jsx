import React from "react";
import { TouchableHighlight } from "react-native";
import { Text, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Navigation = ({ filter, setFilter }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 54,
        marginTop: 16,
      }}
    >
      <TouchableHighlight underlayColor={"unset"} onPress={() => setFilter(0)}>
        <View
          style={{
            padding: 10,
            marginRight: 12,
            backgroundColor: filter == 0 ? "#e6f3ef" : "#fff",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <AntDesign
            name={"tablet1"}
            color={"#056449"}
            size={16}
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#056449" }}>
            Xếp hạng
          </Text>
          <MaterialIcons
            name="arrow-drop-down"
            color={"#056449"}
            style={{ marginLeft: 5 }}
            size={17}
          />
        </View>
      </TouchableHighlight>

      <TouchableHighlight underlayColor={"unset"} onPress={() => setFilter(1)}>
        <View
          style={{
            
            backgroundColor: filter == 1 ? "#e6f3ef" : "#fff",
            padding: 10,
            marginRight: 12,
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#056449" }}>
            Mới
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default Navigation;
