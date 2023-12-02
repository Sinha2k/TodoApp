import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from "react-native";
import {
  Layout,
  Text,
  useTheme,
  useStyleSheet,
  StyleService,
  Avatar,
  Input,
  Icon,
  IconElement,
  Button,
} from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";

import TaskCard from "../../../components/TaskCard";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import CreateTask from "./components/CreateTask";
import { NavigationProp } from "@react-navigation/native";
import { tasks } from "../../../data/tasks";
import { Task } from "../../../types/types";
import { user } from "../../../data/user";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const scrollRef = useRef(null);
  const today = new Date();
  const day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const searchIcon = (): IconElement => (
    <Icon name="search" style={{ width: 32, height: 32 }} fill="gray" />
  );

  const plusIcon = (): IconElement => (
    <Icon name="plus" style={{ width: 32, height: 32 }} fill="#FFFFFF" />
  );

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = ["90%"];

  const handleOpenSheet = (index: number) => {
    sheetRef.current?.snapToIndex(index);
    setOpen(true);
  };

  const handleCloseSheet = () => {
    sheetRef.current?.close();
    setOpen(false);
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: "#FFFFFF", position: "relative", flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Layout style={[styles.greeting]}>
          <Layout style={styles.greetingUser}>
            <Text>Hello {user.username}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Account")}>
              <Avatar
                size="medium"
                source={{
                  uri: user.avatar
                    ? user.avatar
                    : "https://res.cloudinary.com/dwapyi65c/image/upload/v1698951441/profile_60c5a0cd5b.png",
                }}
              />
            </TouchableOpacity>
          </Layout>
          <Text category="h4">Ready to do your Daily Tasks ???</Text>
          <Layout style={styles.todayContainer}>
            <Layout style={styles.today}>
              <Text style={{}}>Today 's </Text>
              <Text style={{ color: theme["color-primary-500"] }}>
                {day[today.getDay() - 1]}
              </Text>
            </Layout>
            <Text style={{ fontSize: 10, color: "gray", marginTop: 5 }}>
              {today.toDateString().slice(4)}
            </Text>
          </Layout>
          <Input
            placeholder="Type title tasks to search..."
            value={value}
            onChangeText={(nextValue) => setValue(nextValue)}
            accessoryLeft={searchIcon}
            style={{ marginTop: 15 }}
          />
          <Layout style={styles.onGoing}>
            <Text category="h6">Ongoing</Text>
            <Icon
              name="calendar"
              fill={theme["color-primary-500"]}
              style={{ width: 30, height: 30 }}
            />
          </Layout>
        </Layout>
      </TouchableWithoutFeedback>
      <ScrollView
        ref={scrollRef}
        style={{ marginTop: 10, paddingHorizontal: 15, paddingBottom: 10 }}
      >
        {taskList.map((item) => (
          <TaskCard
            simultaneousHandlers={scrollRef}
            key={item.id}
            task={item}
            tasks={taskList}
            setTasks={setTaskList}
          />
        ))}
      </ScrollView>
      {!open && (
        <Button
          onPress={() => handleOpenSheet(0)}
          style={styles.buttonAdd}
          status="primary"
          accessoryLeft={plusIcon}
        ></Button>
      )}
      {open && <Layout style={styles.maskLayout}></Layout>}
      <BottomSheet
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        ref={sheetRef}
        index={-1}
        onClose={() => setOpen(false)}
      >
        <CreateTask
          closeSheet={handleCloseSheet}
          tasks={taskList}
          setTasks={setTaskList}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

const { height } = Dimensions.get("screen");

const themedStyles = StyleService.create({
  greeting: {
    paddingHorizontal: 15,
  },
  greetingUser: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  todayContainer: {
    marginTop: 15,
  },
  today: {
    display: "flex",
    flexDirection: "row",
  },
  onGoing: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonAdd: {
    position: "absolute",
    bottom: 30,
    right: 15,
    borderRadius: 100,
    width: 60,
    height: 60,
    zIndex: 100,
  },
  maskLayout: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: height,
  },
});

export default Home;
