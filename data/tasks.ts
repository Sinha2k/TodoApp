import { Task } from "../types/types";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Do exercise",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    priority: "Normal",
    startTime: "08:00 AM",
    endTime: "09:00 AM",
    schedule: new Date().toDateString(),
    status: "In Progress",
    purpose: "Exercise",
  },
  {
    id: 2,
    title: "Cooking for lunch",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    priority: "High",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    schedule: new Date().toDateString(),
    status: "In Progress",
    purpose: "Cooking",
  },
  {
    id: 3,
    title: "Learning React Native",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    priority: "High",
    startTime: "00:00 PM",
    endTime: "03:00 PM",
    schedule: new Date().toDateString(),
    status: "In Progress",
    purpose: "Study",
  },
  {
    id: 4,
    title: "Gym",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    priority: "Medium",
    startTime: "03:00 PM",
    endTime: "04:00 PM",
    schedule: new Date().toDateString(),
    status: "Canceled",
    purpose: "Exercise",
  },
  {
    id: 5,
    title: "Cooking for dinner",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    priority: "High",
    startTime: "05:00 PM",
    endTime: "06:00 PM",
    schedule: new Date().toDateString(),
    status: "In Progress",
    purpose: "Cooking",
  },
];
