import React from "react";
import { StyleSheet, View, Image, StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

const ImgDetail = (foto) => {
  const IP = "192.168.0.56";
  console.log("foto: ", foto);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#6e0a03"
        translucent={true}
      />
      <View style={{ backgroundColor: "#6e0a03" }}></View>
      <View style={styles.container}>
        <ReactNativeZoomableView
          zoomEnabled={true}
          maxZoom={1.5}
          minZoom={0.9}
          zoomStep={0.25}
          initialZoom={0.9}
          bindToBorders={true}
          style={styles.zoomableView}
        >
          <Image
            style={styles.img}
            source={{ uri: `${foto.route.params.foto}` }}
          />
          {/* <Image source={{uri:`${usuario.profilePicture}`}}/> */}
        </ReactNativeZoomableView>
        <View
          style={{ flexDirection: "row", marginLeft: "60%", marginBottom: 20 }}
        >
          <Ionicons name="heart" color="#fff" size={50} />
          <Ionicons
            name="heart-dislike"
            color="#fff"
            size={50}
            style={{ marginLeft: "10%" }}
          />
        </View>
      </View>
    </>
  );
};

export default ImgDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6e0a03",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 540,
    height: 540,
  },
});
