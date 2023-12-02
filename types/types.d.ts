import { IndexPath, ThemeType } from '@ui-kitten/components';

export interface Account {
    id: number,
    email: string,
    password: string,
    avatar: string,
    username: string
}

export interface Task {
    id: number,
    title: string,
    description: string,
    priority: string,
    startTime: string,
    endTime: string,
    schedule: string,
    purpose: string,
    status: string
}

export interface Purpose {
    id: number,
    icon: string,
    name: string,
    color: string,
}

export interface TextInput {
    value: string,
    placeholder: string,
    method: (value: string) => void,
}

export interface DatePicker {
    value: Date,
    placeholder: string,
    method: (date: Date) => void,
}

export interface Select {
    dataSelect: Array<string>,
    selectIndex: IndexPath | IndexPath[],
    method: (index: IndexPath | IndexPath[]) => void
}