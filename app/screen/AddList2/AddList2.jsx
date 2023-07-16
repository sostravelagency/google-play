import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
// import ComponentSearch from '../../component/Search/ComponentSearch';
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddList2 = () => {
  const navigation = useNavigation();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupVisible1, setIsPopupVisible1] = useState(false);
  const [isPopupVisible2, setIsPopupVisible2] = useState(false);
  const [isSetAvailable, setIsSetAvailable] = useState(false);
  const [passAdmin, setPassAdmin] = useState("");
  const [passOldAdmin, setPassOldAdmin]= useState("")
  const [checkAdmin, setCheckAdmin] = useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/*  */}
        {
          checkAdmin=== false && 
          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu admin"
              value={passOldAdmin}
              onChangeText={(text) => setPassOldAdmin(text)}
              secureTextEntry={true}
            />
            <Button
              onPress={() => {
                AsyncStorage.getItem("pass_admin")
                  .then((json) => {
                    const f= JSON.parse(json)
                    if(f== passOldAdmin) {
                      setCheckAdmin(true)
                      setPassOldAdmin("")
                    }
                    else {
                    setIsPopupVisible2(true);
                    }
                  })
                  .catch((e) => {
                    // console.log("Thất bại thiết lập", e);
                  });
              }}
              title={"Nhập mật khẩu admin"}
              color={"#2e89ff"}
            />
          </View>
        }
        {
          checkAdmin=== true && 
          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Thiết lập mật khẩu admin"
              value={passAdmin}
              onChangeText={(text) => setPassAdmin(text)}
              secureTextEntry={true}
            />
            <Button
              onPress={() => {
                const jsonValue = JSON.stringify(passAdmin);
                AsyncStorage.setItem("pass_admin", jsonValue)
                  .then(() => {
                    // console.log("Thiết lập thành công mật khẩu admin");
                    setIsPopupVisible(true);
                    setCheckAdmin(false)
                    setPassAdmin("")
                    setPassOldAdmin("")
                  })
                  .catch((e) => {
                    // console.log("Thất bại thiết lập", e);
                  });
              }}
              title={"Thiết lập mật khẩu admin"}
              color={"#2e89ff"}
            />
          </View>
        }
        {/* Edit Modal */}
        <Modal
          isVisible={isPopupVisible}
          onBackdropPress={() => setIsPopupVisible(false)}
        >
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>Đặt mật khẩu thành công</Text>
          </View>
        </Modal>
        <Modal
          isVisible={isPopupVisible2}
          onBackdropPress={() => setIsPopupVisible2(false)}
        >
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>Sai mật khẩu admin</Text>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  coverImage: {
    width: 100,
    height: 56,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
  },
  avatar: {
    width: 40,
    height: 80,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4
  },
  rating: {
    marginBottom: 4,
  },
  storage: {
    marginBottom: 4,
  },
  genre: {
    marginBottom: 4,
  },
  author: {
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  editModalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  editModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  editModalButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  editButton: {
    backgroundColor: "#2e89ff",
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  popupContainer: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  popupText: {
    textAlign: "center",
  },
});

export default AddList2;
