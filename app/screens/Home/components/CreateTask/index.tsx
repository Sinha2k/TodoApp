import {
  Layout,
  Text,
  Datepicker,
  Icon,
  IconElement,
  IndexPath,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Button,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useState, Dispatch, SetStateAction } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import moment from "moment";

import TextInputBase from "../../../../../components/TextInput";
import { Task, TextInput } from "../../../../../types/types";

const purposeData = ["Exercise", "Cooking", "Study"];

const priorityData = ["Low", "Medium", "High"];

interface propsCreateTask {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  closeSheet: () => void;
}

const CreateTask = ({ tasks, setTasks, closeSheet }: propsCreateTask) => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
    new IndexPath(0)
  );
  const displayValue = purposeData[selectedIndex.row];
  const [selectedIndexRadio, setSelectedIndexRadio] = useState(0);
  const CalendarIcon = (): IconElement => (
    <Icon name="calendar" style={{ width: 30, height: 30 }} fill="gray" />
  );

  const [task, setTask] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    priority: "",
    startTime: "",
    endTime: "",
    schedule: "",
    purpose: "",
    status: "In Progress",
  });

  let textInputTitleObject: TextInput = {
    value: task.title,
    placeholder: "Place your task title",
    method: (value: string) => setTask({ ...task, title: value }),
  };

  let textInputDescObject: TextInput = {
    value: task.description,
    placeholder: "Place your task description",
    method: (value: string) => setTask({ ...task, description: value }),
  };

  const styles = useStyleSheet(themeStyled);

  const onChangeStartTime = (
    e: DateTimePickerEvent,
    selectedTime: Date | undefined
  ) => {
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const onChangeEndTime = (
    e: DateTimePickerEvent,
    selectedTime: Date | undefined
  ) => {
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };

  const handleCreateTask = (taskData: Task, startTime: Date, endTime: Date) => {
    if (taskData.title && taskData.description) {
      let newTask: Task = {
        id: tasks.length + 1,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        purpose: displayValue,
        priority: priorityData[selectedIndexRadio],
        schedule: date.toDateString(),
        startTime: moment(startTime).format("LT"),
        endTime: moment(endTime).format("LT"),
      };
      setTasks([...tasks, newTask]);
      closeSheet();
    } else {
      alert("You must enter title or description task");
    }
  };

  return (
    <Layout style={styles.container}>
      <Text style={{ textAlign: "center" }} category="h5">
        Create New Task
      </Text>
      <Layout>
        <Text style={styles.marginText} category="p1">
          Schedule
        </Text>
        <Datepicker
          placeholder="Pick Date"
          date={date}
          onSelect={(nextDate) => setDate(nextDate)}
          accessoryRight={CalendarIcon}
        />
      </Layout>
      <Layout>
        <Text style={styles.marginText} category="p1">
          Title
        </Text>
        <TextInputBase textInputProps={textInputTitleObject} />
      </Layout>
      <Layout>
        <Text style={styles.marginText} category="p1">
          Description
        </Text>
        <TextInputBase textInputProps={textInputDescObject} />
      </Layout>
      <Layout>
        <Text style={styles.marginText} category="p1">
          Purpose
        </Text>
        <Select
          placeholder="Default"
          value={displayValue}
          multiSelect={false}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {purposeData.map((item, index) => (
            <SelectItem key={index} title={item} />
          ))}
        </Select>
      </Layout>
      <Layout style={styles.timeContainer}>
        <Layout
          style={{ width: "45%", display: "flex", alignItems: "flex-start" }}
        >
          <Text style={styles.marginText} category="p1">
            Start Time
          </Text>
          <DateTimePicker
            mode="time"
            onChange={onChangeStartTime}
            value={startTime}
          />
        </Layout>
        <Layout
          style={{ width: "45%", display: "flex", alignItems: "flex-start" }}
        >
          <Text style={styles.marginText} category="p1">
            End Time
          </Text>
          <DateTimePicker
            mode="time"
            onChange={onChangeEndTime}
            value={endTime}
          />
        </Layout>
      </Layout>
      <Layout>
        <Text>Priority</Text>
        <RadioGroup
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
          selectedIndex={selectedIndexRadio}
          onChange={(index) => setSelectedIndexRadio(index)}
        >
          {priorityData.map((item, index) => (
            <Radio key={index}>{item}</Radio>
          ))}
        </RadioGroup>
      </Layout>
      <Button onPress={() => handleCreateTask(task, startTime, endTime)}>
        Create Task
      </Button>
    </Layout>
  );
};

const themeStyled = StyleService.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: "95%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "100%",
  },
  marginText: {
    marginBottom: 10,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CreateTask;
