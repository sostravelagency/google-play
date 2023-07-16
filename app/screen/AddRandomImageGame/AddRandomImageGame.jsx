import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert, TextInput, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddRandomImageGame = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState({ id: '', imgUrl: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedImageList = await AsyncStorage.getItem('image_game');
      if (storedImageList) {
        setImageList(JSON.parse(storedImageList));
      }
    } catch (error) {
      console.log('Error retrieving data from AsyncStorage:', error);
    }
  };

  const saveData = async (updatedList) => {
    try {
      const jsonList = JSON.stringify(updatedList);
      await AsyncStorage.setItem('image_game', jsonList);
    } catch (error) {
      console.log('Error saving data to AsyncStorage:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addImage = async (image) => {
    const newImage = { id: uuid.v4(), imgUrl: image.imgUrl };
    const updatedList = [...imageList, newImage];
    setImageList(updatedList);
    toggleModal();
    showAlert('Thêm ảnh thành công!');
    await saveData(updatedList);
  };

  const updateImage = async (image) => {
    const updatedList = imageList.map((item) => {
      if (item.id === image.id) {
        return { ...item, imgUrl: image.imgUrl };
      }
      return item;
    });
    setImageList(updatedList);
    toggleModal();
    showAlert('Cập nhật ảnh thành công!');
    await saveData(updatedList);
  };

  const deleteImage = async (id) => {
    const filteredList = imageList.filter((item) => item.id !== id);
    setImageList(filteredList);
    showAlert('Xóa ảnh thành công!');
    await saveData(filteredList);
  };

  const showAlert = (message) => {
    Alert.alert('Thông báo', message);
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <Image source={{ uri: item.imgUrl }} style={{ width: 100, height: 100, marginRight: 10, borderRadius: 25 }} />
      <TouchableOpacity
        onPress={() => {
          setSelectedImage(item);
          toggleModal();
        }}
        style={{ paddingHorizontal: 10 }}
      >
        <Text style={{ color: 'blue' }}>Chỉnh sửa</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteImage(item.id)} style={{ paddingHorizontal: 10 }}>
        <Text style={{ color: 'red' }}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Danh sách ảnh:</Text>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={imageList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>Không có ảnh</Text>}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>

      <TouchableOpacity onPress={toggleModal} style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16, color: 'blue', padding: 10, borderRadius: 5, backgroundColor: 'lightblue' }}>
          Thêm ảnh
        </Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Form ảnh</Text>
          <Text>URL ảnh:</Text>
          <TextInput
            value={selectedImage.imgUrl}
            onChangeText={(text) => setSelectedImage({ ...selectedImage, imgUrl: text })}
            style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10, borderRadius: 5, padding: 10 }}
          />

          <TouchableOpacity onPress={() => addImage(selectedImage)}>
            <Text
              style={{
                fontSize: 16,
                color: 'blue',
                marginBottom: 10,
                padding: 10,
                borderRadius: 5,
                backgroundColor: 'lightblue',
              }}
            >
              Thêm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateImage(selectedImage)}>
            <Text
              style={{
                fontSize: 16,
                color: 'blue',
                marginBottom: 10,
                padding: 10,
                borderRadius: 5,
                backgroundColor: 'lightblue',
              }}
            >
              Cập nhật
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={{ fontSize: 16, color: 'red', padding: 10, borderRadius: 5, backgroundColor: 'pink' }}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default AddRandomImageGame;
