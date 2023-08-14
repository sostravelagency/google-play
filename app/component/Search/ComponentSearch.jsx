import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { AppContext } from "../../../App";

const ComponentSearch = ({ author, avatar, name, genre, rating, storage, link_app, id, install, download }) => {
  const navigation = useNavigation();
  const {iconSize }= useContext(AppContext)

  return (
    <View
      style={{
        width: "100%",
        marginBottom: 16,
        marginTop: 16,
        marginRight: 20,
      }}
    >
      <TouchableHighlight underlayColor={"unset"} onPress={()=> navigation.navigate("DetailGame", {gameData: {author, avatar, name, genre, rating, storage, link_app, id, install}})}>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Image
            style={{ width: iconSize, height: iconSize, borderRadius: 10 }}
            alt={""}
            source={{
              uri: avatar,
            }}
          />
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: 12,
              
            }}
          >
            <Text numberOfLines={1} style={{ fontSize: 16, width: "100%", fontWeight: "600" }}>
              {name}
            </Text>
            <View style={styles.row}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text1}>
                {author} •
              </Text>
              <Text numberOfLines={1} style={{ fontSize: 13, marginLeft: 10 }}>
                {genre}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 13 }}>{rating}</Text>
              <Ionicons name="star" size={10} style={{ marginLeft: 2 }} />
              <Text style={{ marginLeft: 8, fontSize: 13 }}>{storage}</Text>
              <MaterialCommunityIcons name="download-box-outline" size={14} style={{ marginLeft: 12 }} />
              <Text style={{ fontSize: 13, marginLeft: 4 }}>{download}</Text>
            </View>
            {/*  */}
            
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text1: {
    flexShrink: 1,
    overflow: "hidden",
    fontSize: 13
  },
  text2: {
    marginLeft: 10, // Điều chỉnh khoảng cách giữa text1 và text2
  },
});

export default ComponentSearch;
