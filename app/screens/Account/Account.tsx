import {
  Layout,
  Text,
  Avatar,
  Button,
  IconElement,
  Icon,
  StyleService,
  useStyleSheet,
  Divider,
} from "@ui-kitten/components";
import { SafeAreaView, Dimensions } from "react-native";
import { useState } from "react";
import { ModalWithBackdropShowcase } from "./components/Modal";
import { NavigationProp } from "@react-navigation/native";
import { user } from "../../../data/user";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Account = ({ navigation }: RouterProps) => {
  const logoutIcon = (): IconElement => (
    <Icon name="log-out" style={{ width: 32, height: 32 }} fill="#FFFFFF" />
  );

  const [visible, setVisible] = useState<boolean>(false);

  const styles = useStyleSheet(themeStyled);
  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <Layout style={styles.container}>
        <Avatar
          size="giant"
          source={{
            uri: user.avatar
              ? user.avatar
              : "https://res.cloudinary.com/dwapyi65c/image/upload/v1698951441/profile_60c5a0cd5b.png",
          }}
        />
        <Layout>
          <Text category="s1">Username</Text>
          <Text style={{ marginTop: 10 }} category="p2">
            {user.username}
          </Text>
        </Layout>
        <Divider />
        <Layout>
          <Text category="s1">Email</Text>
          <Text style={{ marginTop: 10 }} category="p2">
            {user.email}
          </Text>
        </Layout>
      </Layout>
      <Button
        onPress={() => setVisible(true)}
        style={styles.buttonLogout}
        status="primary"
        accessoryRight={logoutIcon}
      >
        Logout
      </Button>
      <ModalWithBackdropShowcase
        navigation={navigation}
        visible={visible}
        setVisible={setVisible}
      />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("screen");

const themeStyled = StyleService.create({
  container: {
    padding: 15,
    height: "33%",
    display: "flex",
    justifyContent: "space-between",
  },
  buttonLogout: {
    width: width - 20,
    marginTop: 20,
    marginLeft: 10,
  },
});

export default Account;
