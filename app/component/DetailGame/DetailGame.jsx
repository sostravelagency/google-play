import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Linking as LinkingRN,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
// import * as Linking from "expo-linking";
import ComponentSearch from "../Search/ComponentSearch";
import ProgressCircle from "react-native-progress-circle";
import { AppContext } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { startActivityAsync } from 'expo-intent-launcher';

const DetailGame = () => {
  const renderItem = (data) => {
    return data?.map((item, key) => <ComponentSearch key={key} {...item} />);
  };
  const [data1, setData1] = useState(() => [
    {
      cover_picture:
        "https://play-lh.googleusercontent.com/4W4B3NXDXDnKAaM7-IkJrNOkpHkFFzyFiVmZprJ_yxKWR_gpA-nSMi1RDPyG00vuhewv=w526-h296-rw",
      avatar:
        "https://play-lh.googleusercontent.com/S3GPwY1-mc5876ZnMk65-VrG3Xlh1R8zgK-Q_LlnbjZ7llyyv0ZGWIlNnBM7LckMMzYy=w240-h480-rw",
      name: "Liên quân mobile",
      rating: "3,4",
      storage: "1,25GB",
      genre: "Nhập vai • Moba",
      author: "Garena Mobile Private",
    },
    {
      cover_picture:
        "https://play-lh.googleusercontent.com/8WKe8Rl1s0eQnFRmYclwkKMQxRHyktBSYaeWmGUERgHEYquf_cuTS3OkVPnAHQjETg=w526-h296-rw",
      avatar:
        "https://play-lh.googleusercontent.com/S6jJOnBBC1qGmbgW3x15JykBS_6WmwBkP6ub_Iiga6FEIZqgjfX__5fA8y_kSp1CBJc=w240-h480-rw",
      name: "Plants vs. Zombies",
      rating: "4,2",
      storage: "124MB",
      genre: "Chiến đâu • Giải trí",
      author: "ELECTRONIC ARTS",
    },
    {
      cover_picture:
        "https://play-lh.googleusercontent.com/oqFtrAS632yVeEbGxNcw84G65xH3xdlUtbw_Rs0EquUl9dCNHgWWxNIUzW_Do1iiEls=w526-h296-rw",
      avatar:
        "https://play-lh.googleusercontent.com/bVJdXNp1sOW-ZvsEmaabQO3-2VeXNYEjLUtm8Gc8er7ZUM-J8w_snvWQv30AFAgrNUk=w240-h480-rw",
      name: "Need for Speed™ No Limits",
      rating: "4,0",
      storage: "852MB",
      genre: "Giải trí • Cạnh tranh",
      author: "ELECTRONIC ARTS",
    },
    {
      cover_picture:
        "https://play-lh.googleusercontent.com/qU3VnAzSmDG3Vl3nEWM3SOwKSdmNwPzbDh7-q8_cpqjURuNmvq2MU5Zlm3bjX02UGTM=w526-h296-rw",
      avatar:
        "https://play-lh.googleusercontent.com/Ni0S2Ltuia1l8n1aO1QF2MstwlNbGbDrApYlj-nFYZvkVKspUrKvUxGEirs1YKsuVmM=w240-h480-rw",
      name: "Real Racing 3",
      rating: "4,1",
      storage: "2,34GB",
      genre: "Đua xe",
      author: "ELECTRONIC ARTS",
    },
    {
      cover_picture:
        "https://play-lh.googleusercontent.com/rt6WABVofTa7eYWFkUAll8En4YwqfBuNZLTP6gGwwbP3umso-gkC1ebLG5V0e8UqWTxp=w526-h296-rw",
      avatar:
        "https://play-lh.googleusercontent.com/LSNNEr_f-M5oFDn-pPGyTBYK8os8aVzI7M3lKMT66f6Q4ojYQb0HIMfEt6mBNAEBHcU=w240-h480-rw",
      name: "NBA LIVE Mobile Basketball",
      rating: "3,9",
      storage: "529MB",
      genre: "Thể thao • Tư duy",
      author: "ELECTRONIC ARTS",
    },
    {
      cover_picture:
        "https://play-lh.googleusercontent.com/07fV64SLmcQrM-rYb4IZK5HtB4WbUFLl7tmRIqHIHHHbCnFAAZtc5uZUOe2Y-BAf5A=w526-h296-rw",
      avatar:
        "https://play-lh.googleusercontent.com/t0feNSbDuJYiw0nBeIxMoW6PuW1oth_5PUcxzHH8eJTMor-Hb803IINBPT31fqXVjSWs=w240-h480-rw",
      name: "MLB 9 Innings 23",
      rating: "3,8",
      storage: "1,04GB",
      genre: "Thể thao",
      author: "Com2uS",
    },
  ]);
  const { setData, data } = useContext(AppContext);
  const [progress, setProgress] = useState(0);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [borderWidth, setBorderWidth] = useState(10);
  const navigation = useNavigation();
  const { gameData } = useRoute().params;
  useEffect(() => {
    if (gameData?.install === 1) {
      setInstalled(true);
    } else {
      setInstalled(false);
    }
  }, [gameData]);

  const installApp = () => {
    let percent = 0;
    const intervalId = setInterval(() => {
      percent += 1;
      setProgress((prev) => parseInt(prev) + 1);
      if (percent === 100) {
        setData(
          data
            ?.filter((item) => item?.id !== gameData?.id)
            .concat([{ ...gameData, install: 1 }])
        );
        const jsonValue = JSON.stringify(
          data
            ?.filter((item) => item?.id !== gameData?.id)
            .concat([{ ...gameData, install: 1 }])
        );
        AsyncStorage.setItem("data", jsonValue)
          .then(() => {
            //console.log("Lưu thành công")
          })
          .catch((e) => {
            //console.log("Thất bại lưu", e)
          });

        setInstalling(false);
        setInstalled(true);
        clearInterval(intervalId);
      }
    }, 100);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
            <TouchableHighlight
              onPress={() => navigation.goBack()}
              underlayColor={"#f2f0f5"}
              style={{
                borderRadius: 25,
                height: 50,
                width: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name={"arrow-back"} size={32} />
            </TouchableHighlight>
            <View
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <TextInput
                style={styles.nonactiveInput}
                caretHidden={false}
                selectionColor={"#000"}
                // placeholder="Tìm kiếm ứng dụng"
              />
            </View>
            <Ionicons
              name={"search"}
              size={20}
              style={{ marginLeft: 12, marginRight: 12 }}
            />
            <Ionicons
              name={"mic-outline"}
              size={24}
              style={{ marginLeft: 12, marginRight: 12 }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            marginRight: 20,
            padding: 10,
            marginTop: 12,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <ProgressCircle
            percent={progress}
            radius={50}
            borderWidth={4}
            color={installing === true ? "#01875f" : "#fff"}
            shadowColor="#fff"
            bgColor="#fff"
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 76,
                  height: 76,
                  aspectRatio: 1 / 1,
                  borderRadius: installing === true ? 38 : 10,
                }}
                source={{ uri: gameData?.avatar }}
              />
            </View>
          </ProgressCircle>

          <View style={{ marginLeft: 16 }}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}
            >
              {gameData?.name}
            </Text>
            <Text
              style={{
                textTransform: "uppercase",
                color: "#01875f",
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              {gameData?.author}
            </Text>
            <View
              style={{ display: "flex", flexDirection: "row", marginTop: 12 }}
            >
              <Text style={{ color: "#00000080" }}>Chứa quảng cáo</Text>
              <Text style={{ color: "#00000080" }}>•</Text>
              <Text style={{ color: "#00000080" }}>
                Mua hàng trong ứng dụng
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            marginRight: 20,
            padding: 10,
            marginTop: 12,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "600", marginBottom: 8 }}>
              {gameData?.rating}
            </Text>
            <Text>292 N bài đánh giá</Text>
          </View>
          <Text
            style={{ verticalAlign: "middle", marginLeft: 8, marginRight: 8 }}
          >
            |
          </Text>
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontWeight: "600", marginBottom: 8, opacity: 0 }}
            ></Text>
            <Text>{gameData?.storage}</Text>
          </View>
          <Text
            style={{ verticalAlign: "middle", marginLeft: 8, marginRight: 8 }}
          >
            |
          </Text>
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontWeight: "600", marginBottom: 8, opacity: 0 }}
            ></Text>
            <Text numberOfLines={1} ellipsizeMode="tail">
              Không phù hợp với trẻ 12 tuổi
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          {installed === false && (
            <View
              style={{
                width: "100%",
                backgroundColor: installing === true ? "#555" : "#01875f",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <TouchableHighlight
                onPress={() => {
                  setInstalling(true);
                  installApp();
                }}
                style={{
                  height: 48,
                  borderRadius: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}
                >
                  {installing === true ? "Installing" : "Install"}
                </Text>
              </TouchableHighlight>
            </View>
          )}
          {installed === true && (
            <View
              style={{
                width: "100%",
                backgroundColor: "#01875f",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: "100%",
                  backgroundColor: "#01875f",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <TouchableHighlight
                  onPress={async () => {
                    try {
                      startActivityAsync(gameData?.link_app);
                    } catch (error) {
                      console.log(error)
                    }
                  }}
                  style={{
                    height: 48,
                    borderRadius: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}
                  >
                    Open
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          )}
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 10,
            flexDirection: "row",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            Bạn có thể thích
          </Text>
        </View>
        <View
          style={{ width: "100%", marginBottom: 8, marginTop: 8, padding: 10 }}
        >
          {renderItem(data1.slice(3, 6))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  activeInput: {
    borderRadius: 80,
    backgroundColor: "#e5f1f9",
    height: 50,
    width: "100%",
    padding: 10,
    paddingLeft: 20,
    fontSize: 18,
  },
  nonactiveInput: {
    height: 50,
    width: "100%",
    padding: 10,
    paddingLeft: 20,
    fontSize: 18,
  },
});
export default DetailGame;
