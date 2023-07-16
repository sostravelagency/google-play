import React, { useContext, useState } from "react";
import {
  Image,
  NativeModules,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Book = () => {
  const {userAvatar }= useContext(AppContext)
  const navigation= useNavigation()
  const [searchQuery, setSearchQuery]= useState("")
  const [data, setData]= useState(()=> ([
    {cover_picture: "https://books.google.com/books/publisher/content/images/frontcover/5L6HEAAAQBAJ?fife=w256-h256", name: "Los Siete Malditos. Parte 2.", rating: "3,4", storage: "1,25GB", genre: "Nhập vai • Moba"},
    {cover_picture: "https://books.google.com/books/publisher/content/images/frontcover/D1VmEAAAQBAJ?fife=w256-h256", avatar: "https://play-lh.googleusercontent.com/S6jJOnBBC1qGmbgW3x15JykBS_6WmwBkP6ub_Iiga6FEIZqgjfX__5fA8y_kSp1CBJc=w240-h480-rw", name: "Plants vs. Zombies", rating: "4,2", storage: "124MB" , genre: "Chiến đâu • Giải trí"},
    {cover_picture: "https://books.google.com/books/publisher/content/images/frontcover/9zGGEAAAQBAJ?fife=w256-h256", avatar: "https://play-lh.googleusercontent.com/bVJdXNp1sOW-ZvsEmaabQO3-2VeXNYEjLUtm8Gc8er7ZUM-J8w_snvWQv30AFAgrNUk=w240-h480-rw", name: "La Cazadora de Héroes Parte 14.", rating: "4,0", storage: "852MB", genre: "Giải trí • Cạnh tranh"},
    {cover_picture: "https://play-lh.googleusercontent.com/qU3VnAzSmDG3Vl3nEWM3SOwKSdmNwPzbDh7-q8_cpqjURuNmvq2MU5Zlm3bjX02UGTM=w526-h296-rw", avatar: "https://play-lh.googleusercontent.com/Ni0S2Ltuia1l8n1aO1QF2MstwlNbGbDrApYlj-nFYZvkVKspUrKvUxGEirs1YKsuVmM=w240-h480-rw", name: "Real Racing 3", rating: "4,1", storage: "2,34GB", genre: "Đua xe"},
    {cover_picture: "https://play-lh.googleusercontent.com/rt6WABVofTa7eYWFkUAll8En4YwqfBuNZLTP6gGwwbP3umso-gkC1ebLG5V0e8UqWTxp=w526-h296-rw", avatar: "https://play-lh.googleusercontent.com/LSNNEr_f-M5oFDn-pPGyTBYK8os8aVzI7M3lKMT66f6Q4ojYQb0HIMfEt6mBNAEBHcU=w240-h480-rw", name: "NBA LIVE Mobile Basketball", rating: "3,9", storage: "529MB", genre: "Thể thao • Tư duy"},
    {cover_picture: "https://play-lh.googleusercontent.com/07fV64SLmcQrM-rYb4IZK5HtB4WbUFLl7tmRIqHIHHHbCnFAAZtc5uZUOe2Y-BAf5A=w526-h296-rw", avatar: "https://play-lh.googleusercontent.com/t0feNSbDuJYiw0nBeIxMoW6PuW1oth_5PUcxzHH8eJTMor-Hb803IINBPT31fqXVjSWs=w240-h480-rw", name: "MLB 9 Innings 23", rating: "3,8", storage: "1,04GB", genre: "Thể thao"}
  ]))

  const renderItem= (data)=> {
    return data?.map((item, key)=> <ComponentGame key={key} {...item} />)
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingLeft: 10,
            paddingTop: 10,
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
              }}
            >
              <Ionicons
                name={"search"}
                onPress={()=> navigation.navigate("Search", {searchQuery: searchQuery})}
                size={20}
                style={{
                  position: "absolute",
                  zIndex: 99,
                  top: "50%",
                  left: 15,
                  zIndex: 10,
                  transform: [{ translateY: -10 }],
                }}
              />
              <TextInput
                onChangeText={(e)=> {
                  setSearchQuery(e)
                  
                }}
                style={{
                  borderRadius: 80,
                  backgroundColor: "#e5f1f9",
                  height: 50,
                  width: "100%",
                  padding: 10,
                  paddingLeft: 45,
                  fontSize: 18,
                }}
                caretHidden={false}
                selectionColor={"#000"}
                placeholder="Tìm kiếm ứng dụng"
                returnKeyType="search"
                onSubmitEditing={()=> navigation.navigate("Search", {searchQuery})}
              />
              <TouchableOpacity 
                onPress={() => NativeModules.Open3rdModule.openApp(searchQuery)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 15,
                  zIndex: 10,
                  transform: [{ translateY: -10 }],
                }}>
                <Ionicons
                  name={"mic-outline"}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <Ionicons
              name={"notifications-outline"}
              size={32}
              style={{ marginLeft: 12 }}
            />
            <Image
              style={{
                width: 32,
                height: 32,
                borderRadius: 15,
                marginLeft: 12,
              }}
              alt={"Không thể mở"}
              source={{
                uri: userAvatar || ""
              }}
            />
          </View>
          {/*  */}
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 10,
              paddingBottom: 10,
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Sách điện tử khoa học viễn tưởng và giả tưởng
            </Text>
          </View>
          {/*  */}
          <View style={{ width: "100%", marginBottom: 16 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {renderItem(data?.slice(0, 3))}
            </ScrollView>
          </View>
          {/*  */}
          <View
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              paddingTop: 10,
              paddingBottom: 10,
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 15 }}>Quảng cáo</Text>
            <Text style={{ fontSize: 18, marginLeft: 10, marginRight: 10 }}>
              •
            </Text>
            <Text onPress={()=> AsyncStorage.clear()} style={{ fontSize: 20, fontWeight: "600" }}>
              Được đề xuất cho bạn
            </Text>
          </View>
          {/*  */}
          <View style={{ width: "100%", marginBottom: 16 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
             {renderItem(data?.slice(2, 4))}
            </ScrollView>
          </View>
          {/*  */}
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 10,
              paddingBottom: 10,
              flexDirection: "row",
            }}
          >
            <Text onPress={()=> navigation.navigate("AddList3")} style={{ fontSize: 20, fontWeight: "600" }}>
              Đề xuất cho bạn
            </Text>
            <Ionicons
              onPress={()=> navigation.navigate("AddList2")}
              name={"arrow-forward"}
              size={30}
              style={{ marginRight: 20 }}
            />
          </View>
          {/*  */}
          <View style={{ width: "100%", marginBottom: 16 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
             {renderItem(data?.slice(4, 6))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};



const ComponentGame = ({cover_picture, avatar, name, genre, rating, storage}) => {
  return (
    <View
      style={{
        width: (Dimensions.get("window").width * 1) / 3,
        marginBottom: 12,
        marginRight: 16,
      }}
    >
      <Image
        style={{
          width: "100%",
          marginBottom: 10,
          aspectRatio: 3 / 4,
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


export default Book;
