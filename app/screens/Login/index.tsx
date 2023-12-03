import { Button, Icon, Input, Text } from "@ui-kitten/components";
import {
  SafeAreaView,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { NavigationProp } from "@react-navigation/native";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

interface dataLogin {
  email: string;
  password: string;
}

const Login = ({ navigation }: RouterProps) => {
  const [account, setAccount] = useState<dataLogin>({
    email: "",
    password: "",
  });

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon
        style={{ width: 30, height: 30 }}
        fill="gray"
        name={secureTextEntry ? "eye-off" : "eye"}
      />
    </TouchableWithoutFeedback>
  );

  const handleSubmit = (data: dataLogin) => {
    if (data.email && data.password) {
      alert("Login success !!!")
      navigation.navigate("Home");
    } else {
      alert("You must enter your email or password");
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#FFFFFF", flex: 1, justifyContent: "center" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={() => Keyboard.dismiss()}
        >
          <Text style={{ textAlign: "center" }} category="h3">
            Login
          </Text>
          <Input
            style={styles.textInputContainer}
            label="Email"
            placeholder="Enter your email"
            value={account.email}
            keyboardType="email-address"
            onChangeText={(value) => setAccount({ ...account, email: value })}
          />
          <Input
            style={styles.textInputContainer}
            value={account.password}
            label="Password"
            placeholder="Enter your password"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(value) =>
              setAccount({ ...account, password: value })
            }
          />
          <Button
            style={{ marginTop: 30 }}
            onPress={() => handleSubmit(account)}
          >
            Submit
          </Button>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 20,
  },
  textInputContainer: {
    marginTop: 20,
  },
});

export default Login;
