import React, { useContext, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ComponentGame from "../../component/ComponentGame";
import Navigation from "../../component/Game/Navigation";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../../App";

const Game = () => {
  const {userAvatar }= useContext(AppContext)
  const navigation= useNavigation()
  const [searchQuery, setSearchQuery]= useState("")
  const [data, setData]= useState(()=> ([
    {cover_picture: "https://play-lh.googleusercontent.com/4W4B3NXDXDnKAaM7-IkJrNOkpHkFFzyFiVmZprJ_yxKWR_gpA-nSMi1RDPyG00vuhewv=w526-h296-rw", avatar: "https://play-lh.googleusercontent.com/S3GPwY1-mc5876ZnMk65-VrG3Xlh1R8zgK-Q_LlnbjZ7llyyv0ZGWIlNnBM7LckMMzYy=w240-h480-rw", name: "Liên quân mobile", rating: "3,4", storage: "1,25GB", genre: "Nhập vai • Moba"},
    {cover_picture: "https://play-lh.googleusercontent.com/8WKe8Rl1s0eQnFRmYclwkKMQxRHyktBSYaeWmGUERgHEYquf_cuTS3OkVPnAHQjETg=w526-h296-rw", avatar: "https://play-lh.googleusercontent.com/S6jJOnBBC1qGmbgW3x15JykBS_6WmwBkP6ub_Iiga6FEIZqgjfX__5fA8y_kSp1CBJc=w240-h480-rw", name: "Plants vs. Zombies", rating: "4,2", storage: "124MB" , genre: "Chiến đâu • Giải trí"},
    {cover_picture: "https://play-lh.googleusercontent.com/oqFtrAS632yVeEbGxNcw84G65xH3xdlUtbw_Rs0EquUl9dCNHgWWxNIUzW_Do1iiEls=w526-h296-rw", avatar: "https://play-lh.googleusercontent.com/bVJdXNp1sOW-ZvsEmaabQO3-2VeXNYEjLUtm8Gc8er7ZUM-J8w_snvWQv30AFAgrNUk=w240-h480-rw", name: "Need for Speed™ No Limits", rating: "4,0", storage: "852MB", genre: "Giải trí • Cạnh tranh"},
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
              {console.log(searchQuery)}
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
                onChangeText={setSearchQuery}
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
              />
              <Ionicons
                name={"mic-outline"}
                size={20}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 15,
                  zIndex: 10,
                  transform: [{ translateY: -10 }],
                }}
              />
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
              alt={"Can't open"}
              source={{
                uri: userAvatar || ""
              }}
            />
          </View>
          <View
            style={{
              height: 50,
              borderBottomWidth: 1,
              borderStyle: "solid",
              borderColor: "#e7e7e7",
            }}
          >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <Navigation />
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
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Trò chơi mới ra mắt
            </Text>
            <Ionicons
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
              {renderItem(data?.slice(0, 2))}
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
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
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
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Đề xuất cho bạn
            </Text>
            <Ionicons
              onPress={()=> navigation.navigate("AddList")}
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

export default Game;
