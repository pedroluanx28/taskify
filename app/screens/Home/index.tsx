import { useContext, useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";

import { useApi } from "../../utils/hooks/useApi";
import { useStorageVariables } from "../../utils/hooks/useStorageVariables";

import { SvgImage } from "../../components/SvgImage";
import { AddTaskButton } from "../../components/AddTaskButton";
import { Task } from "../../components/Task";
import { FormControl } from "../../components/FormControl";
import SearchIcon from "react-native-vector-icons/FontAwesome";

import { styles } from "./style";

import WithouTasks from "../../assets/home.svg";
import { Menu } from "../../components/Menu";
import { UserContext } from "../../contexts/userContext";

export function Home() {
    const [tasks, setTasks] = useState<PaginatedTasks>({} as PaginatedTasks);
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const { api } = useApi();
    const { TOKEN, TASKS } = useStorageVariables();
    const context = useContext(UserContext);

    async function fetchTasks() {
        try {
            const { data } = await api.get("/task", {
                params: {
                    search: search || null,
                }
            });

            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (TOKEN) {
            fetchTasks();
        }
    }, [TOKEN, TASKS]);

    useEffect(() => {
        if (TOKEN) {
            fetchTasks();
        }
    }, [search]);

    const { results } = tasks;

    const handleCleanSearch = () => setSearch("");

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>{context?.user.name}</Text>
                <View style={styles.headerButtons}>
                    <TouchableOpacity onPress={() => {
                        setShowSearch(!showSearch);
                    }}>
                        <SearchIcon
                            name="search"
                            size={18}
                            color="#989898"
                        />
                    </TouchableOpacity>

                    <Menu />
                </View>
            </View>

            <View style={{ marginBottom: 15 }}>
                {showSearch && (
                    <FormControl
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Pesquisar tarefa"
                        resetField={handleCleanSearch}
                        autoFocus={showSearch}
                    />
                )}
            </View>

            {results?.length > 0 ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {results.map((task, index) => (
                        <Task
                            key={`task-${index}`}
                            task={task}
                        />
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.noTasksContainer}>
                    <SvgImage
                        icon={WithouTasks}
                    />

                    <Text style={styles.noTasksTitle}>Nenhuma tarefa encontrada</Text>
                    <Text style={styles.noTasksSubtitle}>Clique no botão de “+” para criar uma tarefa</Text>
                </View>
            )}
            <AddTaskButton fetchTasks={fetchTasks} />
        </View>
    )
}