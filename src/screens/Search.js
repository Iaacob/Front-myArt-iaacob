import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  StatusBar,
  Alert,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  TextInput,
} from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import TokenContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import GridImageView from "react-native-grid-image-viewer";

export default function Search() {
  const IP = "192.168.0.56";
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    if (name !== "") {
      searchPublications();
    }
    console.log("resultados: ", results);
  }, [name]);

  const searchPublications = async () => {
    console.log("este es el valor del name al principio: ", name);
    console.log("el name vale en el else: ", name);
    await axios
      .get(`http://${IP}:4000/publicaciones/search/${name}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setResults(res.data);
        console.log("el name en el axios: ", name);
      })
      .catch((err) => console.log(err));
    setName("");
  };

  return (
    <>
      <View style={styles.cuadrado}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="search"
            color="#fff"
            size={20}
            style={{ padding: "2%" }}
          />
          <TextInput
            style={styles.input}
            placeholder="What're you looking for?"
            onChangeText={(value) => {
              setName(value);
            }}
          />
          <Ionicons
            name="funnel"
            color="#fff"
            size={20}
            style={{ padding: "2%", marginLeft: "1.5%" }}
          />
        </View>
      </View>
      {
        <View style={styles.app}>
          <Text style={{color: 'black', padding:10, fontWeight: 'bold'}}>Search by image name</Text>
          <GridImageView
            data={results.map((publicacion) => {
              const url = publicacion.image;
              return url;
            })}
        />
        </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  cuadrado: {
    justifyContent: "flex-start",
    marginTop: "10%",
    width: 435,
    zIndex: 2,
    height: 50,
    backgroundColor: "#80341E",
    borderBottomWidth: 7,
    borderColor: "#9D2932",
  },
  picture: {
    width: "100%",
    height: "100%",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "75%",
    height: 25,
    marginTop: "2.5%",
    paddingLeft: 10
  },
  app: {
    backgroundColor: "#E49C7A",
    flex: 1,
  },
});
