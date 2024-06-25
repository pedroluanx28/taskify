import { useState } from "react";
import { useAsyncStorage } from "./useAsyncStorage";

export function useStorageVariables() {
    const [token, setToken] = useState<string | null>(null);
    const [onboarding, setOnboarding] = useState<string | null>(null);
    const [tasks, setTasks] = useState<string | null>(null);
    const { getItem } = useAsyncStorage();

    getItem('token').then((value) => {
        if (value) {
            setToken(value);
        }
    });

    getItem('onboarding').then((value) => {
        if (value) {
            setOnboarding(value);
        }
    });

    getItem('tasks').then((value) => {
        if (value) {
            setTasks(value);
        }
    });

    return {
        TOKEN: token,
        ONBOARDING: onboarding,
        TASKS: tasks,
    }
}