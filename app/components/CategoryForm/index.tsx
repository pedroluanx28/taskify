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
    name: string;
};

export function CategoryForm() {
    const navigation = useNavigation<NavigationScreens>()
    const { api } = useApi();

    const categoryFormValidationSchema = Yup.object().shape({
        name: Yup.string().required("O nome da categoria é obrigatório."),
    });

    const { control, handleSubmit, resetField, formState: { errors, isSubmitting } } = useForm<FormProps>({
        defaultValues: {
            name: ""
        },
        resolver: yupResolver(categoryFormValidationSchema),
    });

    const handleCreateCategory = handleSubmit(async function (values) {
        try {
            await api.post("/task-group", values);
            navigation.navigate("Home");
        } catch (error: any) {
            if (error.response.status === 422) {
                Alert.alert("Falha ao criar categoria", error.response.data.message);
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
                <Text style={styles.title}>Criar nova categoria</Text>
            </View>

            <View style={styles.form}>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <FormControl
                            label="Nome da categoria"
                            placeholder="ex: Escola"
                            onChangeText={onChange}
                            errorMessage={errors.name?.message}
                            value={value}
                            resetField={() => resetField("name")}
                        />
                    )}
                />

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleCreateCategory}
                    disabled={isSubmitting}
                >
                    <Text style={styles.submitButtonText}>
                        {isSubmitting ? "Criando categoria..." : "Criar cateogria"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}