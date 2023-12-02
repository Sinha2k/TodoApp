import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Modal, Text, Layout } from "@ui-kitten/components";
import { NavigationProp } from "@react-navigation/native";

interface ModalProps {
    visible: boolean,
    setVisible: (props: boolean) => void,
    navigation: NavigationProp<any, any>
}

export const ModalWithBackdropShowcase = ({visible, setVisible, navigation}: ModalProps): React.ReactElement => {

    const handleLogout = () => {
        setVisible(false);
        navigation.navigate('Login');
    }

  return (
    <View style={styles.container}>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Text>Do you really want to logout???</Text>
          <Layout style={styles.actionContainer}>
             <Button onPress={() => setVisible(false)} style={{width: '40%'}} appearance="outline">Cancel</Button>
             <Button onPress={() => handleLogout()} style={{width: '40%'}} appearance="filled">Yes</Button>
          </Layout>
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  }
});
