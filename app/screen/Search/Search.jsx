import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  // Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Dimensions,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Navigation from "../../component/Search/Navigation";
import ComponentSearch from "../../component/Search/ComponentSearch";
import { AppContext } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function shuffle(array) {
  const shuffledArray = [...array];
  const length = shuffledArray.length;

  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    const temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[j];
    shuffledArray[j] = temp;
  }

  return shuffledArray;
}
function sortByProperty(array, property) {
  return array.sort((a, b) => {
    const valueA = parseFloat(a[property].replace(",", "."));
    const valueB = parseFloat(b[property].replace(",", "."));

    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });
}

const addRandomValue = (setArr, arr) => {
  const randomValue = { ads: true }; // Giá trị ngẫu nhiên mới
  const randomIndex = Math.floor(Math.random() * (arr.length - 2)) + 1; // Chọn một vị trí ngẫu nhiên từ 1 đến (arr.length - 2)
  // Tạo hai mảng con từ mảng ban đầu
  const firstPart = arr.slice(0, randomIndex);
  const secondPart = arr.slice(randomIndex);

  // Tạo mảng mới bằng cách thêm giá trị mới vào vị trí ngẫu nhiên và hợp nhất hai mảng con lại
  const newArr = [...firstPart, randomValue, ...secondPart];

  // Cập nhật mảng mới vào state
  setArr(newArr);
};

const removeDuplicatesAndKeepRandom = (setArr, arr) => {
  const uniqueObjects = arr.reduce((uniqueArr, obj) => {
    const isExist = uniqueArr.some((item) => item.ads === obj.ads);

    if (!isExist) {
      uniqueArr.push(obj);
    }

    return uniqueArr;
  }, []);

  const randomIndex = Math.floor(Math.random() * uniqueObjects.length);
  const randomObject = uniqueObjects[randomIndex];

  setArr([randomObject]);
};

const Search = () => {
  const { searchQuery } = useRoute().params;
  const navigation = useNavigation();
  const [searchData, setSearchData] = useState(searchQuery);
  const [activeInput, setActiveInput] = useState(false);
  const { data } = useContext(AppContext);
  const [adsData, setAdsData] = useState([]);
  function shuffleArray(array) {
    const shuffledArray = [...array]; // Tạo một bản sao của mảng ban đầu

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      // Chọn một vị trí ngẫu nhiên trong mảng còn lại
      const j = Math.floor(Math.random() * (i + 1));

      // Hoán đổi phần tử tại vị trí i và j
      const temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }

    return shuffledArray;
  }
  const [dataSearch, setDataSearch] = useState(
    sortByProperty(data, "rating").reverse()
  );
  const [filter, setFilter] = useState(0); // 0 is
  const renderItem = (data) => {
    return data?.map((item, key) => {
      if (item.ads === true) {
        return (
          <>
            <View
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                paddingBottom: 10,
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 15 }}>Quảng cáo</Text>
              <Text style={{ fontSize: 18, marginLeft: 10, marginRight: 10 }}>
                •
              </Text>
              <Text
                onPress={() => AsyncStorage.clear()}
                style={{ fontSize: 20, fontWeight: "600" }}
              >
                Được đề xuất cho bạn
              </Text>
            </View>
            <View style={{ width: "100%" }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {renderItem2(adsData)}
              </ScrollView>
            </View>
          </>
        );
      } else {
        return <ComponentSearch key={key} {...item} />;
      }
    });
  };
  const renderItem2 = (data) => {
    return data?.map((item, key) => (
      <ComponentGame
        key={key}
        imgUrl={item.imgUrl}
        name={item.name}
        rating={item.rating}
        download={item.download}
      />
    ));
  };

  useEffect(() => {
    if (filter == 1) {
      setDataSearch(shuffle(data));
    } else {
      setDataSearch(sortByProperty(data, "rating").reverse());
    }
  }, [data, filter]);

  useEffect(() => {
    addRandomValue(setDataSearch, dataSearch);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("ads_app").then((json) => {
      if (json) {
        setAdsData(JSON.parse(json));
      } else {
        setAdsData([]);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              paddingLeft: 10,
              paddingTop: 10,
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
                onBlur={() => setActiveInput(false)}
                onFocus={() => setActiveInput(true)}
                onChangeText={setSearchData}
                value={searchData}
                style={activeInput ? styles.activeInput : styles.nonactiveInput}
                caretHidden={false}
                selectionColor={"#000"}
                placeholder="Tìm kiếm ứng dụng"
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
          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderStyle: "solid",
              borderBottomColor: "#e7e7e7",
              paddingBottom: 8,
            }}
          >
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <Navigation setFilter={setFilter} filter={filter} />
              </ScrollView>
            </View>
          </View>
          <View style={{ paddingLeft: 10, paddingBottom: 10, flex: 1 }}>
            <ScrollView>
              <View style={{ width: "100%", marginBottom: 8, marginTop: 8 }}>
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      marginBottom: 12,
                    }}
                  >
                    Các tìm kiếm có liên quan
                  </Text>
                  <ResultSearchRelated />
                </View>
                {renderItem(shuffleArray(data).slice(0, 4))}
                {/* {renderItem(dataSearch)} */}
                <>
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      paddingBottom: 10,
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontSize: 15 }}>Quảng cáo</Text>
                    <Text
                      style={{ fontSize: 18, marginLeft: 10, marginRight: 10 }}
                    >
                      •
                    </Text>
                    <Text
                      onPress={() => AsyncStorage.clear()}
                      style={{ fontSize: 20, fontWeight: "600" }}
                    >
                      Được đề xuất cho bạn
                    </Text>
                  </View>
                  <View style={{ width: "100%" }}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {renderItem2(adsData)}
                    </ScrollView>
                  </View>
                </>
                {renderItem(shuffleArray(data).slice(0, 1))}
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      marginBottom: 12,
                    }}
                  >
                    Sự kiện trong thời gian có hạn
                  </Text>
                  {renderItem(shuffleArray(data).slice(0, 5))}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </>
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
    borderRadius: 80,
    height: 50,
    width: "100%",
    padding: 10,
    paddingLeft: 20,
    fontSize: 18,
  },
});

export default Search;

const ComponentGame = ({ imgUrl, name, rating, download }) => {
  const { iconSize } = useContext(AppContext);

  return (
    <View
      style={{
        width: (Dimensions.get("window").width * 1) / 3 - 20,
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
          objectFit: "contain",
        }}
        alt={""}
        source={{
          uri: imgUrl,
        }}
      />
      <Text numberOfLines={2} ellipsizeMode="tail" style={{ color: "#000" }}>
        {name}
      </Text>
      <Text>
        {rating}
        <Ionicons name="star" size={10} style={{ marginLeft: 2 }} />
      </Text>
      {download && (
        <Text>
          <MaterialCommunityIcons
            name="download-box-outline"
            size={14}
            style={{ marginLeft: 2 }}
          />
          {download}
        </Text>
      )}
    </View>
  );
};

const ResultSearchRelated = () => {
  const { searchQuery: searchTerm } = useRoute().params;
  const [dataSearchRelated, setDataSearchRelated] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear() - 2;

    const numberOfYears = 5;

    const searchResults = [];

    for (var i = 0; i < numberOfYears; i++) {
      const year = currentYear + i;
      const result = searchTerm + " " + year;
      searchResults.push(result);
    }
    setDataSearchRelated(searchResults);
  }, [searchTerm]);

  const renderItem = (data) => {
    return data.map((item, key) => (
      <View
        key={key}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="search" size={20} color={"#000"} />
        </View>
        <Text style={{ fontSize: 16, marginLeft: 16 }}>{item}</Text>
      </View>
    ));
  };

  return <View style={{ width: "100%" }}>{renderItem(dataSearchRelated)}</View>;
};
