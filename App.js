import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
// import { createAppContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabContainer from "./app/container/TabContainer";
import Search from "./app/screen/Search/Search";
import DetailGame from "./app/component/DetailGame/DetailGame";
import AddList from "./app/screen/AddList/AddList";
import { createContext, useEffect, useState } from "react";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { TextInput } from "react-native";
import { Button } from "react-native";
LogBox.ignoreAllLogs();
const RootStack = createStackNavigator();

const a = [
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
];

export const AppContext = createContext();

export default function App() {
  const [listKey, setListKey] = useState([]);
  const [availableHours, setAvailabelHours] = useState(0);
  const [data, setData] = useState(() => []);
  const [userAvatar, setUserAvatar] = useState(() => "");
  const [showPopup, setShowPopup] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("data")
      .then((json) => {
        if (json !== null) {
          const myData = JSON.parse(json);
          setData(myData);
        }
      })
      .catch((e) => {
        //console.log("Lấy thất bại", e);
      });
    //
    AsyncStorage.getItem("available")
      .then((json) => {
        if (json !== null) {
          const myData = JSON.parse(json);
          //console.log("josn", myData)
          setAvailabelHours(myData);
        }
      })
      .catch((e) => {
        //console.log("Lấy thất bại", e);
      });
    //
    AsyncStorage.getItem("avatar")
      .then((json) => {
        if (json !== null) {
          const myData = JSON.parse(json);
          setUserAvatar(myData);
        }
      })
      .catch((e) => {
        //console.log("Lấy thất bại", e);
      });
    //
    AsyncStorage.getItem("list_key")
      .then((json) => {
        if (json !== null) {
          //console.log(json)
          setListKey(json);
        }
      })
      .catch((e) => {
        //console.log("Lấy thất bại", e);
      });
  }, []);
  //
  useEffect(() => {
    let startTime1;
    AsyncStorage.getItem("point_time")
      .then((json) => {
        if (json !== null) {
          setStartTime(json);
          startTime1 = json;
        }
      })
      .catch((e) => {
        //console.log("Lấy thất bại", e);
      });

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime1;
      if (elapsedTime >= parseInt(availableHours) * 3600 * 1000) {
        // //console.log("test");
        setShowPopup(true); // Hiển thị popup sau 1 giờ
        clearInterval(interval);
      }
    }, 1000); // Kiểm tra mỗi giây

    return () => {
      clearInterval(interval); // Xóa interval khi component bị unmount
    };
  }, [availableHours]);
  //
  const checkPassword = (password, keysArray) => {
    if (keysArray.includes(password) == true) {
      const pointTime = new Date().getTime();
      const jsonValue = JSON.stringify(pointTime);
      AsyncStorage.setItem("point_time", jsonValue)
        .then(() => {
          //console.log("Lưu thành công");
        })
        .catch((e) => {
          //console.log("Thất bại lưu", e);
        });
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        userAvatar,
        setUserAvatar,
        setAvailabelHours,
        availableHours,
      }}
    >
      <StatusBar />
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="TabContainer"
            component={TabContainer}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Search"
            component={Search}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="DetailGame"
            component={DetailGame}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen name="AddList" component={AddList} options={{}} />
        </RootStack.Navigator>
      </NavigationContainer>
      {showPopup === true && (
        <View>
          <Modal isVisible={showPopup} backdropOpacity={0.5}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Nhập mật khẩu</Text>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
                <Button
                  title="Xác nhận"
                  onPress={() => checkPassword(password, listKey)}
                />
              </View>
            </View>
          </Modal>
        </View>
      )}
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
  },
  passwordInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
});
