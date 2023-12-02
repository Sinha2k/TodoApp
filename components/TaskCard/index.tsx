import React, { Dispatch, SetStateAction } from "react";
import {
  Icon,
  Layout,
  Text,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import { TouchableOpacity, Dimensions } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";

import { Task } from "../../types/types";
import { purposes } from "../../data/purposes";

interface propsTask
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  task: Task;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

const { width, height } = Dimensions.get("screen");

const TaskCard = ({
  task,
  simultaneousHandlers,
  tasks,
  setTasks,
}: propsTask) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const statusData = [
    { id: 1, name: "In Progress", color: theme["color-primary-500"] },
    { id: 2, name: "Canceled", color: theme["color-danger-500"] },
  ];

  const purpose = purposes.find((item) => item.name === task.purpose);

  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      if (
        event.translationX <= (width - 20) * 0.3 &&
        event.translationX >= -(width - 20) * 0.3
      ) {
        translateX.value = event.translationX;
      }
    },
    onEnd: () => {
      if (translateX.value > 0) {
        let shouldBeDismissed = translateX.value < (width - 20) * 0.25;
        if (shouldBeDismissed) {
          translateX.value = withTiming(0);
        } else {
          translateX.value = withTiming((width - 20) * 0.3);
        }
      } else {
        let shouldBeDismissed = translateX.value > -(width - 20) * 0.25;
        if (shouldBeDismissed) {
          translateX.value = withTiming(0);
        } else {
          translateX.value = withTiming(-(width - 20) * 0.3);
        }
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const handleCancelTask = (id: number) => {
    let newArray = [...tasks];
    let itemIndex = newArray.findIndex((item) => item.id === id);
    if (itemIndex > -1) {
      let taskItem = newArray[itemIndex];
      if (taskItem?.status === "In Progress") {
        newArray[itemIndex].status = "Canceled";
      }
    }
    setTasks(newArray);
  };

  const handleInProgressTask = (id: number) => {
    let newArray = [...tasks];
    let itemIndex = newArray.findIndex((item) => item.id === id);
    if (itemIndex > -1) {
      let taskItem = newArray[itemIndex];
      if (taskItem?.status === "Canceled") {
        newArray[itemIndex].status = "In Progress";
      }
    }
    setTasks(newArray);
  };

  const handleCompleteTask = (id: number) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <TouchableOpacity>
      <PanGestureHandler
        onGestureEvent={panGesture}
        simultaneousHandlers={simultaneousHandlers}
      >
        <Animated.View style={[styles.cardContainer, rStyle, { zIndex: 10 }]}>
          <Layout style={styles.cardLeft}>
            <Layout
              style={[
                styles.purposeContainer,
                { backgroundColor: purpose?.color },
              ]}
            >
              <Icon
                name={purpose?.icon}
                fill="#FFFFFF"
                style={{ width: 32, height: 32 }}
              />
            </Layout>
            <Layout style={styles.cardContent}>
              <Text category="s1">
                {task.title.length > 15
                  ? task.title.slice(0, 15) + "..."
                  : task.title}
              </Text>
              <Layout style={styles.timeContainer}>
                <Icon
                  name="clock"
                  fill="#B5B5B5"
                  style={{ width: 16, height: 16 }}
                />
                <Text style={styles.text}>{task.startTime} - </Text>
                <Text style={styles.text}>{task.endTime}</Text>
              </Layout>
              <Text style={styles.text}>{task.schedule}</Text>
            </Layout>
          </Layout>
          <Layout style={styles.cardRight}>
            <Layout style={styles.priorityContainer}>
              <Text style={{ fontSize: 10 }}>{task.priority}</Text>
            </Layout>
            <Text
              style={{
                fontSize: 10,
                color: statusData.find((item) => item.name === task.status)
                  ?.color,
              }}
              category="s2"
            >
              {task.status}
            </Text>
          </Layout>
        </Animated.View>
      </PanGestureHandler>
      <Layout style={[styles.cardActionContainer]}>
        {task.status === "In Progress" ? (
          <TouchableOpacity
            style={[
              styles.actionContainer,
              { backgroundColor: theme["color-danger-500"] },
            ]}
            onPress={() => handleCancelTask(task.id)}
          >
            <Text style={{ color: "#FFFFFF" }} category="s2">
              {" "}
              Canceled
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.actionContainer,
              { backgroundColor: theme["color-primary-500"] },
            ]}
            onPress={() => handleInProgressTask(task.id)}
          >
            <Text style={{ color: "#FFFFFF" }} category="s2">
              {" "}
              In Progress
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.actionContainer,
            { backgroundColor: theme["color-success-500"] },
          ]}
          onPress={() => handleCompleteTask(task.id)}
        >
          <Text style={{ color: "#FFFFFF" }} category="s2">
            {" "}
            Completed
          </Text>
        </TouchableOpacity>
      </Layout>
    </TouchableOpacity>
  );
};

const themedStyles = StyleService.create({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  cardActionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    width: "100%",
    height: "90%",
    overflow: "hidden",
  },
  cardLeft: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  purposeContainer: {
    height: 40,
    width: 40,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    height: 70,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 11,
    color: "#B5B5B5",
  },
  cardRight: {
    display: "flex",
    justifyContent: "space-between",
    height: 70,
    alignItems: "flex-end",
  },
  priorityContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#F2EDED",
    borderRadius: 20,
  },
  actionContainer: {
    width: "30%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TaskCard;
