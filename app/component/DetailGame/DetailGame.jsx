import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeModules,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
// import * as Linking from "expo-linking";
import ComponentSearch from "../Search/ComponentSearch";
import ProgressCircle from "react-native-progress-circle";
import { AppContext } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Dimensions } from "react-native";
function generateRandomNumbers(min, max, step) {
  var num = Math.floor((max - min) / step) + 1;
  var randomIndex = Math.floor(Math.random() * num);
  var randomNumber = min + (randomIndex * step);
  
  return randomNumber;
}
function getRandomString() {
  var randomNum = Math.random(); // Tạo một số ngẫu nhiên từ 0 đến 1
  
  if (randomNum < 0.5) {
    return "Hơn 5N";
  } else if (randomNum < 0.8) {
    return "Hơn 10N";
  } else {
    return "Hơn 1Tr";
  }
}

function randomObjectsFromArray(arr) {
  const newArray = [];
  const minObjects = 3;
  const maxObjects = 5;

  // Kiểm tra xem mảng đã cho có đủ đối tượng không
  if (arr.length <= minObjects) {
    return arr;
  }

  // Tạo một mảng ngẫu nhiên với số lượng đối tượng từ minObjects đến maxObjects
  const numObjects = Math.floor(Math.random() * (maxObjects - minObjects + 1)) + minObjects;

  // Lặp qua mảng đã cho và lấy ngẫu nhiên các đối tượng
  for (let i = 0; i < numObjects; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    newArray.push(arr[randomIndex]);
  }
  return newArray;
}
const DetailGame = () => {
  const renderItem = (data) => {
    return data?.map((item, key) => <ComponentSearch key={key} {...item} />);
  };
  const renderItem2= (data)=> {
    return data?.map((item, key) => <ComponentGame key={key} imgUrl={item.imgUrl} name={item.name} rating={item.rating} />);
    
  }
  const [dataRandomGame, setDataRandomGame]= useState([])
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
  const [textDownload, setTextDownload]= useState("")
  
  const [iData, setIData]= useState([
    "https://play-lh.googleusercontent.com/Ar3iQ47jpDq34LApOQWPjPpw-RMPmqGyR0EAMai8Q8rgCyDAZ_q0RdfCbB9kJaUpyC4=w526-h296",
    "https://play-lh.googleusercontent.com/K4dUMb_Ww4K3QawGYxJCxtnN003UHeJAVyqMp1D1oM_Cvdoe-_MrqIYP-Sh1CWzoWuc=w526-h296",
    "https://play-lh.googleusercontent.com/J1bqN1ObHr5YGKK9Na--FyuQl0Jcme1ysHYRV8M_lht6HFtdAmUaZSxf_YUuev8KHBU=w526-h296"
  ])
  const { setData, data, iconSize } = useContext(AppContext);
  const [progress, setProgress] = useState(0);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [random, setRandom] = useState(false);
  const navigation = useNavigation();
  const { gameData } = useRoute().params;
  // useEffect(() => {
  //   if (gameData?.install === 1) {
  //     setInstalled(true);
  //   } else {
  //     setInstalled(false);
  //   }
  // }, [gameData]);
  useEffect(()=> {
    AsyncStorage.getItem("random_image")
    .then(json=> {
      if(json) {
        setDataRandomGame(JSON.parse(json))
      }
      else {
        setDataRandomGame([])
      }
    })
    .catch(e=> console.log("Lỗi"))
  }, [])

  useEffect(()=> {
    setTextDownload(getRandomString)
  }, [])

  const showRandomElement = () => {
    const random = Math.random();
    const show = random > 0.5; // 50% xác suất hiển thị

    setRandom(show);
  };
  useEffect(() => {
    showRandomElement();
  }, []);

  const installApp = () => {
    const randomNumbers = generateRandomNumbers(100, 300, 1);
    let percent = 0;
    const intervalId = setInterval(() => {
      const r= generateRandomNumbers(1, 3, 1)
      percent += r;
      if(percent >= 100) {
        setProgress(100)
      }
      else {
        setProgress((prev) => parseInt(prev) + r);
      }
      if (percent >= 100) {
        percent= 100
      }
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
        setProgress(0);
        clearInterval(intervalId);
      }
      
    }, randomNumbers);
  };
  const newLocal = <View
    style={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text
      style={{ fontWeight: "600", marginBottom: 8, opacity: 1, position: "relative" }}
    >
      <MaterialCommunityIcons name={"download-box-outline"} size={14} />
    </Text>
    <Text>{gameData?.storage}</Text>
  </View>;
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
                  borderRadius: installing === true ? 38 : 20,
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
            {random === true && (
              <View
                style={{ display: "flex", flexDirection: "row", marginTop: 12 }}
              >
                <Text style={{ color: "#00000080" }}>Chứa quảng cáo</Text>
                <Text style={{ color: "#00000080" }}>•</Text>
                <Text style={{ color: "#00000080" }}>
                  Mua hàng trong ứng dụng
                </Text>
              </View>
            )}
            {
              installing=== true &&
              <>

                <Text style={{marginTop: 6, fontSize: 17, fontWeight: 600}}>{progress}% của {gameData?.storage}</Text>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 4}}>
                  <MaterialCommunityIcons name={"shield-check"} size={10} color={"#01875f"} />
                  <Text style={{marginLeft: 8}}>Play Protect đã xác minh</Text>
                </View>
              </>
            }
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
            <Text style={{  marginBottom: 8 }}>
              {gameData?.rating}
              <Ionicons name="star" size={10} style={{ marginLeft: 2 }} />
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{textAlign: "center"}}>292 N bài đánh giá</Text>
          </View>
          <Text
            style={{ verticalAlign: "middle", marginLeft: 8, marginRight: 8 }}
          >
            |
          </Text>
          {newLocal}
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
            
            <Image source={{uri: "https://play-lh.googleusercontent.com/yQChfa9XKlaXMIYTk8w8QwChjT8_SH-_2d2SS-kesw0TLQK1nxtw54bDcoZ09freZJgKrtg4f__is-31Vg=w48-h16-rw"}} style={{width: 24, height: 17, marginBottom: 8}} />
            <Text numberOfLines={1} ellipsizeMode="tail">
              Không phù hợp với trẻ 12 tuổi
            </Text>
          </View>
          {/* <Text
            style={{ verticalAlign: "middle", marginLeft: 8, marginRight: 8 }}
          >
            |
          </Text> */}
          {/* <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
            <Text style={{height: 30}}>{textDownload}+</Text>
            <Text numberOfLines={1} ellipsizeMode="tail">
              Tải xuống
            </Text>
          </View> */}
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
                borderRadius: 10,
                display: "flex", 
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                
              }}
            >
              {
                installing=== true && <View
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  overflow: "hidden",
                  marginRight: 12,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#e7e7e7"
                }}
              >
                <TouchableHighlight
                  onPress={ () => {
                    setInstalling(false);
                    setInstalled(false);
                    setProgress(0);
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
                    style={{ fontSize: 14, fontWeight: "600", color: "#01875f" }}
                  >
                    Hủy
                  </Text>
                </TouchableHighlight>
              </View>
              }
              <View
                style={{
                  flex: 1,
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
                    flex: 1,
                  }}
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}
                  >
                    {installing === true ? "Đang cài đặt" : "Cài đặt"}
                  </Text>
                </TouchableHighlight>
              </View>
              
            </View>
          )}

          {installed === true && (
            <View
              style={{
                width: "100%",
                borderRadius: 10,
                display: "flex", 
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                
              }}
            >
            <View
                style={{
                  flex: 1,
                  backgroundColor: "#555",
                  borderRadius: 10,
                  overflow: "hidden",
                  marginRight: 12,
                }}
              >
                <TouchableHighlight
                  onPress={ () => {
                    setInstalled(false)
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
                    Gỡ cài đặt
                  </Text>
                </TouchableHighlight>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#01875f",
                  borderRadius: 10,
                  overflow: "hidden",
                  
                }}
              >
                <TouchableHighlight
                  onPress={async () => {
                    try {
                      NativeModules.Open3rdModule.openApp(gameData?.link_app);
                    } catch (error) {
                      console.log(error);
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
                    Phát
                  </Text>
                </TouchableHighlight>
              </View>
              
            </View>
          )}
        </View>
        <View style={{ width: "100%", marginBottom: 16, padding: 10 }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {renderItem2(randomObjectsFromArray(dataRandomGame))}
          </ScrollView>
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
            Về trò chơi này
          </Text>
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

const ComponentGame = ({imgUrl, name, rating}) => {
  const {iconSize}= useContext(AppContext)

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
          aspectRatio: 1 / 1,
          borderRadius: 10,
          objectFit: "contain"
        }}
        alt={""}
        source={{
          uri: imgUrl,
        }}
      />
      <Text numberOfLines={2}
              ellipsizeMode="tail" style={{color: "#000"}}>{name}</Text>
              <Text>{rating}<Ionicons name="star" size={10} style={{ marginLeft: 2 }} /></Text>
    </View>
  );
};


const ComponentGame2 = ({imgUrl}) => {
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
          aspectRatio: 1 / 3,
          borderRadius: 10,
          objectFit: "contain"
        }}
        alt={""}
        source={{
          uri: imgUrl,
        }}
      />
    </View>
  );
};


export default DetailGame;
