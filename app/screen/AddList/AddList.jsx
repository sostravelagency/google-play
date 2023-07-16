import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";
// import ComponentSearch from '../../component/Search/ComponentSearch';
import { AppContext } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import moment from "moment/moment";

const generateUniqueKeys = () => {
  // const keys = [];

  // while (keys.length < 100) {
  //   const key = Math.floor(10000000 + Math.random() * 90000000).toString();
  //   if (!keys.includes(key)) {
  //     keys.push(key);
  //   }
  // }
  const keys = [
    "38737839",
    "64710935",
    "45255911",
    "93167258",
    "95561869",
    "32329132",
    "67091307",
    "23433206",
    "41899528",
    "69257036",
    "56918878",
    "90217092",
    "54146153",
    "25109156",
    "38117148",
    "34099951",
    "21318415",
    "85847727",
    "84834407",
    "55158877",
    "40256273",
    "78907352",
    "50478889",
    "78611676",
    "80479473",
    "15936353",
    "26299174",
    "70168440",
    "25833682",
    "75591307",
    "79004926",
    "19295483",
    "75572675",
    "97825432",
    "43250055",
    "58277284",
    "80623928",
    "80414302",
    "59173587",
    "59251948",
    "32006497",
    "82359761",
    "19019442",
    "32873872",
    "83177899",
    "35866332",
    "71272737",
    "91180444",
    "24554011",
    "33112910",
    "26418142",
    "41190841",
    "37039548",
    "99773915",
    "82015752",
    "74872210",
    "50842352",
    "93625419",
    "24769421",
    "18694998",
    "84526430",
    "62204360",
    "86386438",
    "10665243",
    "51948334",
    "63926455",
    "19412344",
    "17244178",
    "52865470",
    "55214228",
    "89399701",
    "33564563",
    "44836584",
    "11147294",
    "17831286",
    "90076971",
    "27457809",
    "64084042",
    "34257381",
    "89959299",
    "15346566",
    "69720082",
    "97060129",
    "87974138",
    "83884437",
    "49283295",
    "14786788",
    "34363090",
    "32977059",
    "89461779",
    "50617993",
    "37086311",
    "32051892",
    "15562567",
    "20868451",
    "78898966",
    "97019787",
    "72592917",
    "99811131",
    "97798027",
  ];

  return keys;
};

const AddList = () => {
  const navigation = useNavigation();
  const [coverPicture, setCoverPicture] = useState("");
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [storage, setStorage] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [linkApp, setLinkApp] = useState("");
  const [install, setInstall] = useState(false);
  const [uAvatar, setUAvatar] = useState("");
  const [available, setAvailable] = useState(0);
  const [editingIndex, setEditingIndex] = useState(-1);
  const { data, setData, setUserAvatar, setAvailabelHours, availableHours } =
    useContext(AppContext);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupVisible1, setIsPopupVisible1] = useState(false);
  const [isPopupVisible2, setIsPopupVisible2] = useState(false);
  const [isSetAvailable, setIsSetAvailable] = useState(false);
  const [passAdmin, setPassAdmin] = useState("");
  const [restTime, setRestTime] = useState();
  const restTimeRef = useRef();

  const renderItem = (data) => {
    return data?.map((item, index) => (
      <View key={index} style={styles.itemContainer}>
        {/* <Image source={{ uri: item.cover_picture }} style={styles.coverImage} /> */}
        <View style={styles.infoContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.storage}>{item.storage}</Text>
          <Text style={styles.genre}>{item.genre}</Text>
          <Text style={styles.author}>{item.author}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditModalOpen(index)}
          >
            <Text style={styles.buttonText}>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteData(index)}
          >
            <Text style={styles.buttonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    ));
  };

  const handleAddData = () => {
    const newData = {
      id: uuid.v4(),
      name: name?.trim(),
      rating: rating?.trim(),
      storage: storage?.trim(),
      genre: genre?.trim(),
      author: author?.trim(),
      cover_picture: coverPicture?.trim(),
      avatar: avatar?.trim(),
      link_app: linkApp?.trim(),
      install: 0
    };

    setData([...data, newData]);
    setName("");
    setRating("");
    setStorage("");
    setGenre("");
    setAuthor("");
    setCoverPicture("");
    setAvatar("");
    setLinkApp("");
  };

  const handleEditData = () => {
    const updatedData = [...data];
    updatedData[editingIndex] = {
      ...updatedData[editingIndex],
      name: name?.trim(),
      rating: rating?.trim(),
      storage: storage?.trim(),
      genre: genre?.trim(),
      author: author?.trim(),
      cover_picture: coverPicture?.trim(),
      avatar: avatar?.trim(),
      link_app: linkApp?.trim(),
    };
    setData(updatedData);
    setIsEditModalVisible(false);
    setEditingIndex(-1);
    setName("");
    setRating("");
    setStorage("");
    setGenre("");
    setAuthor("");
    setCoverPicture("");
    setAvatar("");
    setLinkApp("");

    const jsonValue = JSON.stringify(updatedData);
    AsyncStorage.setItem("data", jsonValue)
      .then(() => {
        //console.log("Lưu thành công")
      })
      .catch((e) => {
        //console.log("Thất bại lưu", e)
      });
  };

  const handleDeleteData = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    const jsonValue = JSON.stringify(updatedData);
    AsyncStorage.setItem("data", jsonValue)
      .then(() => {
        //console.log("Lưu thành công")
      })
      .catch((e) => {
        //console.log("Thất bại lưu", e)
      });
  };

  const handleAddMore = () => {
    const jsonValue = JSON.stringify(data);
    AsyncStorage.setItem("data", jsonValue)
      .then(() => {
        console.log("Lưu thành công")
      })
      .catch((e) => {
        console.log("Thất bại lưu", e)
      });
    navigation.navigate("Game");
  };

  const handleEditModalOpen = (index) => {
    const item = data[index];
    setName(item.name?.trim());
    setRating(item.rating?.trim());
    setStorage(item.storage?.trim());
    setGenre(item.genre?.trim());
    setAuthor(item.author?.trim());
    setCoverPicture(item.cover_picture?.trim());
    setAvatar(item.avatar?.trim());
    setLinkApp(item.link_app?.trim());
    setEditingIndex(index);
    setIsEditModalVisible(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    setEditingIndex(-1);
    // Reset input fields
    setName("");
    setRating("");
    setStorage("");
    setGenre("");
    setAuthor("");
    setCoverPicture("");
    setAvatar("");
    setLinkApp("");
  };

  useEffect(() => {
    AsyncStorage.getItem("available")
      .then((json) => {
        if (json) {
          setIsSetAvailable(true);
        } else {
          setIsSetAvailable(false);
        }
      })
      .catch((e) => {
        console.log("Thất bại lưu thời gian", e);
      });
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      AsyncStorage.getItem("point_time")
        .then((json) => {
          if (json !== null) {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - json;
            // console.log(startTime1)
            // console.log(Math.floor((parseInt(availableHours) * 1000 * 20 - Math.floor(elapsedTime)) / 1000))
            let fTime = Math.floor(
              (parseInt(availableHours) * 1000 * 60 - Math.floor(elapsedTime)) /
                1000
            );
            if (fTime <= 0) {
              fTime = 0;
            }
            // const formattedTime = moment()
            //   .startOf("day")
            //   .seconds(fTime)
            //   .format("HH:mm:ss");
              const formattedTime = moment().startOf('day').seconds(fTime);
            const currentTime1 = moment();

            const duration = moment.duration(formattedTime.diff(currentTime1));
            const days = duration.days();
            const formattedDuration = `${days}ngày ${formattedTime.format(
              "HH:mm:ss"
            )}`;
            setRestTime(formattedDuration);
          }
        })
        .catch((e) => {
          //console.log("Lấy thất bại", e);
        });
    }, 1000); // Kiểm tra mỗi giây

    return () => {
      clearInterval(interval); // Xóa interval khi component bị unmount
    };
  }, [availableHours]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/*  */}
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={styles.input}
            placeholder="User avatar"
            value={uAvatar}
            onChangeText={(text) => setUAvatar(text)}
          />
          <Button
            onPress={() => {
              setUserAvatar(uAvatar);
              setIsPopupVisible(true);
              const jsonValue = JSON.stringify(uAvatar);
              AsyncStorage.setItem("avatar", jsonValue)
                .then(() => {
                  //console.log("Lưu thành công")
                })
                .catch((e) => {
                  //console.log("Thất bại lưu", e)
                });
            }}
            title={"Set user avatar"}
            color={"#2e89ff"}
          >
            Set user avatar
          </Button>
        </View>
        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 17 }}>Thời gian còn lại: {restTime}</Text>
        </View>
        {isSetAvailable === false && (
          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Tính thời gian bản quyền(Phút)"
              value={available}
              onChangeText={(text) => setAvailable(parseInt(text))}
            />
            <Button
              onPress={() => {
                setAvailabelHours(available);
                setIsPopupVisible1(true);
                const jsonValue = JSON.stringify(available);
                AsyncStorage.setItem("available", jsonValue)
                  .then(() => {
                    // console.log("Lưu thành công thời gian");
                  })
                  .catch((e) => {
                    // console.log("Thất bại lưu thời gian", e);
                  });
                const jsonValue2 = JSON.stringify(generateUniqueKeys());
                AsyncStorage.setItem("list_key", jsonValue2)
                  .then(() => {
                    // console.log("Lưu thành công mảng key");
                  })
                  .catch((e) => {
                    // console.log("Thất bại lưu mảng key", e);
                  });
                const pointTime = new Date().getTime();
                const jsonValue3 = JSON.stringify(pointTime);
                AsyncStorage.setItem("point_time", jsonValue3)
                  .then(() => {
                    // console.log("Lưu thành công point time");
                  })
                  .catch((e) => {
                    // console.log("Thất bại lưu point time", e);
                  });
              }}
              title={"Đặt thời gian"}
              color={"#2e89ff"}
            >
              Đặt thời gian bản quyền
            </Button>
          </View>
        )}
        {isSetAvailable === true && (
          <View style={{ marginBottom: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu admin"
              value={passAdmin}
              onChangeText={(text) => setPassAdmin(text)}
              secureTextEntry={true}
            />
            <Button
              onPress={() => {
                AsyncStorage.getItem("pass_admin")
                  .then((json) => {
                    // console.log(JSON.parse(json), passAdmin.toString())
                    if (passAdmin == JSON.parse(json)) {
                      setIsSetAvailable(false);
                    } else {
                      setIsPopupVisible2(true);
                    }
                  })
                  .catch((e) => console.log(e));
              }}
              title={"Nhập mật khẩu admin"}
              color={"#2e89ff"}
            >
              Nhập mật khẩu Admin
            </Button>
          </View>
        )}
        {/* Existing data */}
        <View style={{ width: "100%", marginBottom: 8, marginTop: 8 }}>
          {renderItem(data)}
        </View>

        {/* Form to add new data */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Rating"
          value={rating}
          onChangeText={(text) => setRating(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Storage"
          value={storage}
          onChangeText={(text) => setStorage(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Genre"
          value={genre}
          onChangeText={(text) => setGenre(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={(text) => setAuthor(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Cover picture"
          value={coverPicture}
          onChangeText={(text) => setCoverPicture(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Avatar"
          value={avatar}
          onChangeText={(text) => setAvatar(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Link app"
          value={linkApp}
          onChangeText={(text) => setLinkApp(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddData}>
          <Text style={styles.buttonText}>Thêm</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 12 }}>
          {data.length > 0 && (
            <TouchableOpacity style={styles.addButton} onPress={handleAddMore}>
              <Text style={styles.buttonText}>Xong</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Edit Modal */}
        <Modal
          isVisible={isEditModalVisible}
          onBackdropPress={handleEditModalClose}
          onBackButtonPress={handleEditModalClose}
        >
          <View style={styles.editModalContainer}>
            <Text style={styles.editModalTitle}>Sửa thông tin</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Rating"
              value={rating}
              onChangeText={(text) => setRating(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Storage"
              value={storage}
              onChangeText={(text) => setStorage(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Genre"
              value={genre}
              onChangeText={(text) => setGenre(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Author"
              value={author}
              onChangeText={(text) => setAuthor(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Cover picture"
              value={coverPicture}
              onChangeText={(text) => setCoverPicture(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Avatar"
              value={avatar}
              onChangeText={(text) => setAvatar(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Link app"
              value={linkApp}
              onChangeText={(text) => setLinkApp(text)}
            />
            <TouchableOpacity
              style={styles.editModalButton}
              onPress={handleEditData}
            >
              <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editModalButton}
              onPress={handleEditModalClose}
            >
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          isVisible={isPopupVisible}
          onBackdropPress={() => setIsPopupVisible(false)}
        >
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>Thêm thành công</Text>
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
        <Modal
          isVisible={isPopupVisible1}
          onBackdropPress={() => setIsPopupVisible1(false)}
        >
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>
              Đặt thời gian bản quyền thành công
            </Text>
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
    marginBottom: 4,
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

export default AddList;
