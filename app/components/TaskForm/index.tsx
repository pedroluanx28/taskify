import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";

import dayjs from "dayjs";
import * as Yup from 'yup';
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import DateTimePicker from "react-native-modal-datetime-picker";

import { useApi } from "../../utils/hooks/useApi";
import { useStorageVariables } from "../../utils/hooks/useStorageVariables";
import { useAsyncStorage } from "../../utils/hooks/useAsyncStorage";
import { priorityOptions } from "../../utils/options/priority";
import { NavigationScreens } from "../../routes/app.routes";

import { SvgImage } from "../../components/SvgImage";
import { FormControl } from "../../components/FormControl";
import { FormattedSelect } from "../../components/FormattedSelect";
import { RadioGroup } from "../../components/RadioGroup";

import { styles } from "./styles";

import ArrowBack from "../../assets/arrow-back.svg";

type FormProps = {
    title: string;
    body?: string;
    task_group_id?: string;
    limit_date?: string;
    priority_id?: string;
};

type Props = {
    fetchTasks: () => void;
}

export function TaskForm({ fetchTasks }: Props) {
    const [categories, setCategories] = useState<PaginatedCategories>({} as PaginatedCategories);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const navigation = useNavigation<NavigationScreens>()
    const { api } = useApi();
    const { TOKEN } = useStorageVariables();

    const taskFormValidationSchema = Yup.object().shape({
        title: Yup.string().required("O título é obrigatório"),
        body: Yup.string(),
        task_group_id: Yup.string(),
        limit_date: Yup.string(),
        priority_id: Yup.string(),
    });

    const { control, handleSubmit, resetField, formState: { errors, isSubmitting } } = useForm<FormProps>({
        defaultValues: {
            title: "",
            body: "",
            task_group_id: "",
            limit_date: "",
            priority_id: "",
        },
        resolver: yupResolver(taskFormValidationSchema),
    });

    async function fetchCategories() {
        try {
            const { data } = await api.get("/task-group");

            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    }

    const { results } = categories;

    const categoryOptions = results?.map((category) => (
        {
            label: category.name,
            value: String(category.id),
        }
    )) || [];

    useEffect(() => {
        if (TOKEN) {
            fetchCategories();
        }
    }, [TOKEN]);

    const handleCreateTask = handleSubmit(async function (values) {
        try {
            api.post("/task", values);

            fetchTasks();

            navigation.navigate("Home");
        } catch (error: any) {
            if (error.response.status === 422) {
                Alert.alert("Falha ao criar tarefa", error.response.data.message);
                return;
            }

            alert(error);
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.navigate("Home")}>
                    <SvgImage icon={ArrowBack} />
                </Pressable>
                <Text style={styles.title}>Criar nova tarefa</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputsContainer}>
                    <Controller
                        control={control}
                        name="title"
                        render={({ field: { onChange, value } }) => (
                            <FormControl
                                label="Título"
                                placeholder="ex: Fazer compras"
                                onChangeText={onChange}
                                errorMessage={errors.title?.message}
                                value={value}
                                resetField={() => resetField("title")}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="body"
                        render={({ field: { onChange, value } }) => (
                            <FormControl
                                label="Descrição"
                                placeholder="ex: Fazer compras no supermercado da avenida"
                                onChangeText={onChange}
                                multiline
                                numberOfLines={3}
                                errorMessage={errors.body?.message}
                                value={value}
                                resetField={() => resetField("body")}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="limit_date"
                        render={({ field: { onChange, value } }) => {
                            const formattedvalue = value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "";

                            return (
                                <>
                                    <Pressable onPress={() => setShowDatePicker(true)}>
                                        <FormControl
                                            value={formattedvalue}
                                            resetField={() => resetField("limit_date")}
                                            label="Data limite"
                                            placeholder="DD/MM/YYYY HH:mm"
                                            mode="date"
                                            readOnly
                                        />
                                    </Pressable>

                                    <DateTimePicker
                                        isVisible={showDatePicker}
                                        onConfirm={(value) => {
                                            onChange(dayjs(value).format("YYYY-MM-DD HH:mm:ss"));
                                            setShowDatePicker(false);
                                        }}
                                        onCancel={() => setShowDatePicker(false)}
                                        mode="datetime"
                                        is24Hour
                                    />
                                </>
                            )
                        }}
                    />

                    <Controller
                        control={control}
                        name="task_group_id"
                        render={({ field: { onChange } }) => (
                            <FormattedSelect
                                options={categoryOptions}
                                onValueChange={onChange}
                                placeholder="Selecione uma categoria"
                                label="Categoria"
                                errorMessage={errors.task_group_id?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="priority_id"
                        render={({ field: { onChange, value } }) => (
                            <RadioGroup
                                label="Prioridade"
                                onChange={onChange}
                                data={priorityOptions}
                                value={String(value)}
                            />
                        )}
                    />
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleCreateTask}
                    disabled={isSubmitting}
                >
                    <Text style={styles.submitButtonText}>
                        {isSubmitting ? "Criando tarefa..." : "Criar tarefa"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}