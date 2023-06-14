import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  // Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Navigation from "../../component/Search/Navigation";
import ComponentSearch from "../../component/Search/ComponentSearch";
import { AppContext } from "../../../App";

const Search = () => {
  const { searchQuery } = useRoute().params;
  const navigation = useNavigation();
  const [searchData, setSearchData] = useState(searchQuery);
  const [activeInput, setActiveInput]= useState(false)
  const {data }= useContext(AppContext)
  const renderItem = (data) => {
    return data?.map((item, key) => <ComponentSearch key={key} {...item} />);
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
                autoFocus
                onBlur={()=> setActiveInput(false)}
                onFocus={()=> setActiveInput(true)}
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Navigation />
          </ScrollView>
          <View style={{ width: "100%", marginBottom: 8, marginTop: 8 }}>
            {renderItem(data.slice(0, 3))}
          </View>
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
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Sự kiện trong thời gian có hạn
            </Text>
          </View>
          <View style={{ width: "100%", marginBottom: 8, marginTop: 8 }}>
            {renderItem(data.slice(3, 6))}
          </View>
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
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Kết quả khác
            </Text>
          </View>
          <View style={{ width: "100%", marginBottom: 8, marginTop: 8 }}>
            {renderItem(data.slice(3, 6))}
          </View>
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

export default Search;
