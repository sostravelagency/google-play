import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const Searching = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const [historyData, setHistoryData]= useState(["google", "youtube", "facebook", "tiktok"])
  const renderItem = (data) => {
    return data?.map((item, key) => <View style={{width: "100%", marginBottom: 29}} key={key}>
      <View style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
        <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row"}}>
          <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginRight: 12}}>
            <MaterialCommunityIcons name={"history"} size={20} />
          </View>
          <Text style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", fontSize: 17}}>{item}</Text>
        </View>
        <View  style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
          <MaterialCommunityIcons size={20} name={"arrow-top-left"} />
        </View>
      </View>
    </View>);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                borderBottomColor: "#e7e7e7",
                borderStyle: "solid",
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10
              }}
            >
              <Ionicons
                name={"arrow-back"}
                onPress={() =>
                  navigation.goBack()
                }
                size={20}
                style={{
                  position: "absolute",
                  zIndex: 99,
                  top: "50%",
                  left: 15,
                  zIndex: 10,
                  transform: [{ translateY: -10 }],
                  paddingTop: 10,
                paddingBottom: 10
                }}
              />
              <TextInput
                onChangeText={(e) => {
                  setSearchQuery(e);
                }}
                style={{
                  borderRadius: 80,
                  backgroundColor: "transparent",
                  height: 50,
                  width: "100%",
                  padding: 10,
                  paddingLeft: 45,
                  fontSize: 18,
                }}
                caretHidden={false}
                selectionColor={"#000"}
                placeholder="Tìm kiếm ứng dụng và trò chơi"
                returnKeyType={"search"}
                onSubmitEditing={() =>
                    navigation.navigate("Search", { searchQuery: searchQuery })
                }
                enablesReturnKeyAutomatically={true}
                autoFocus
              />
              <TouchableOpacity
                // onPress={() => NativeModules.Open3rdModule.openApp(searchQuery)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 15,
                  zIndex: 10,
                  transform: [{ translateY: -10 }],
                  paddingTop: 10,
                    paddingBottom: 10
                }}
              >
                <Ionicons name={"mic-outline"} size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1, padding: 10, marginLeft: 20, marginRight: 20}}>
            {renderItem(historyData)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Searching;
