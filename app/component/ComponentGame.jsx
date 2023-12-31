import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ComponentGame = ({cover_picture, avatar, name, genre, rating, storage}) => {
  return (
    <View
      style={{
        width: (Dimensions.get("window").width * 2) / 3,
        marginBottom: 12,
        marginRight: 16,
      }}
    >
      <Image
        style={{
          width: "100%",
          marginBottom: 10,
          aspectRatio: 16 / 9,
          borderRadius: 10,
        }}
        alt={""}
        source={{
          uri: cover_picture,
        }}
      />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Image
          style={{ width: 64, height: 64, borderRadius: 10 }}
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
            flex: 1
          }}
        >
          <Text numberOfLines={1} style={{ fontSize: 18, width: "100%" }}>{name}</Text>
          <Text numberOfLines={1} style={{ fontSize: 14, width: "100%"  }}>{genre}</Text>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text>{rating}</Text>
            <Ionicons name="star" size={14} style={{ marginLeft: 2 }} />
            <Text style={{ marginLeft: 8 }}>{storage}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ComponentGame;
