import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
} from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import IP from "../ip";


const Register2 = (props) => {
  const { navigation, route } = props;
  const { username, password, name, lastname } = route.params;
  // const [username, setUsername] = useState([]);
  // const [password, setPassword] = useState([]);
  // const [name, setName] = useState([]);
  // const [lastname, setLastname] = useState([]);
  const [cellphone, setCellphone] = useState([]);
  const [mail, setmail] = useState([]);
  const [description, setDescription] = useState([]);
  const [premium, setPremium] = useState(true);
  const [occupation, setOccupation] = useState([]);
  const [user, setUser] = useState({});

  const toggleSwitch = () => setPremium((premium) => !premium);

  console.log("route", route.params);

  const handleRegister = async () => {
    // if (
    //   username.length < 1 ||
    //   password.length < 1 ||
    //   mail.length < 1 ||
    //   premium.length < 1
    // ) {
    //   return alert(
    //     "los campos username, password, mail y premium son obilgatorios, complételos"
    //   );
    // } else {
    //   console.log("holaaaa");
    //   const body = {
    //     username: username,
    //     password: password,
    //     name: name,
    //     lastname: lastname,
    //     cellphone: cellphone,
    //     mail: mail,
    //     description: description,
    //     premium: premium,
    //     occupation: occupation,
    //   };
    //   setUser(body);
    //   await register(body);
    // }
    if(cellphone === "" || mail === "" || occupation === "" || description === ""){
      return alert("Fill all the fields before continue")
    } else{
      const body = {
        username: username,
        password: password,
        name: name,
        lastname: lastname,
        cellphone: cellphone,
        mail: mail,
        description: description,
        premium: premium,
        occupation: occupation,
      };
      console.log('este es el usuario registrado: ', body)
      setUser(body);
      await register(body);
    }
  };

  const register = async (body) => {
    console.log("este", body);
    const res = await axios
      .post(`http://${IP}:4000/usuarios/register`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        navigation.navigate("Login");
      });
  };

  return (
    <>
      <ImageBackground
        source={require("../img/LogIn.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView>
          <View style={styles.container}>
            {/* <TextInput style={styles.input} placeholder="     Username" onChangeText={(value) => setUsername(value)} />
            <TextInput style={styles.input} placeholder="     Password" secureTextEntry={true} onChangeText={(value) => setPassword(value)} /> */}

            {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TextInput style={styles.input2} placeholder="     Name" onChangeText={(value) => setName(value)} />
              <TextInput style={styles.input2} placeholder="     Lastname" onChangeText={(value) => setLastname(value)} />
            </View> */}
            <View style={{ marginTop: "30%" }}>
              <TextInput
                style={styles.input}
                placeholder="Cellphone"
                keyboardType="phone-pad"
                onChangeText={(value) => setCellphone(value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Mail"
                keyboardType="email-address"
                onChangeText={(value) => setmail(value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                onChangeText={(value) => setDescription(value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Occupation"
                onChangeText={(value) => setOccupation(value)}
              />
            </View>
            <View
              style={{
                backgroundColor: "#FBC02D",
                borderRadius: 10,
                marginTop: 10,
                alignItems: "center",
                padding: 4,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {" "}
                Wanna try premiun?{" "}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                marginTop: 10,
                padding: 2,
              }}
            >
              <Switch
                trackColor={{ false: "#BDBDBD", true: "#BDBDBD" }}
                thumbColor={premium ? "#FBC02D" : "#9D2932"}
                ios_backgroundColor="#fff"
                onValueChange={toggleSwitch}
                value={premium}
              />
            </View>
            <Pressable
              style={styles.button}
              title="Log in"
              borderRadius={30}
              onPress={handleRegister}
            >
              <Text style={{ color: "#733A26", fontWeight: "bold" }}>
                Sign up
              </Text>
            </Pressable>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.texto}> I have an account </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundImage: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#F4F3F1",
    marginRight: 110,
    borderRadius: 14,
    height: 60,
    width: 300,
    marginLeft: 120,
    marginTop: "5%",
    padding: 10,
  },
  input2: {
    backgroundColor: "#F4F3F1",
    borderRadius: 14,
    height: 60,
    width: 150,
    marginTop: "5%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#F6E2D3",
    height: 60,
    width: 150,
    marginTop: 20,
  },
  image: {
    height: "105%",
    width: "105%",
    flex: 1,
    justifyContent: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  texto: {
    marginTop: "3%",
    color: "#FFF",
    fontSize: 17,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 7,
    padding: 2,
    marginTop: "5%",
  },
});

export default Register2;
