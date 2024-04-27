import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';

import { NavigationScreens } from "../../routes/app.routes";
import { useApi } from "../../utils/hooks/useApi";

import { FormControl } from "../../components/FormControl";
import { SvgImage } from "../../components/SvgImage";

import { styles } from "./styles";

import RegisterSvg from '../../assets/register.svg';
import { useAsyncStorage } from "../../utils/hooks/useAsyncStorage";

type FormProps = {
    email: string;
    password: string;
    name: string;
};

export function Register() {
    const navigation = useNavigation<NavigationScreens>();
    const { api } = useApi();
    const { setItem } = useAsyncStorage();

    const registerValidationSchema = Yup.object().shape({
        name: Yup.string().required("O nome de usuário é obrigatório"),
        email: Yup.string().email("O e-mail deve ser válido").required("O e-mail é obrigatório"),
        password: Yup.string().required("A senha é obrigatória").min(6, "A senha deve ter no mínimo 6 caracteres"),
    });

    const { control, handleSubmit, resetField, reset, formState: { errors, isSubmitting } } = useForm<FormProps>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: yupResolver(registerValidationSchema),
    });

    const { height } = useWindowDimensions();
    const containerHeight = { minHeight: height };

    const handleRegister = handleSubmit(async (values) => {
        try {
            await api.post("/auth/register", values);

            const loginData = {
                email: values.email,
                password: values.password,
            };

            const { data } =  await api.post("/auth/login", loginData);
            setItem("token", data.token);
            navigation.navigate("Home");
            
            reset();
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[styles.container, containerHeight]}
        >
            <Text style={styles.title}>Crie uma conta</Text>

            <SvgImage
                icon={RegisterSvg}
            />

            <Text style={styles.subTitle}>
                Crie uma conta para que você possa explorar o <Text style={styles.darkBlueText}>Taskify</Text>
            </Text>

            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                    <FormControl
                        label="Nome de usuário"
                        placeholder="exemplo"
                        onChangeText={onChange}
                        value={value}
                        errorMessage={errors.name?.message}
                        resetField={() => resetField("name")}
                    />
                )}
            />

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <FormControl
                        label="E-mail"
                        placeholder="exemplo@email.com"
                        onChangeText={onChange}
                        errorMessage={errors.email?.message}
                        value={value}
                        resetField={() => resetField("email")}
                        keyboardType="email-address"
                    />
                )}
            />

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <FormControl
                        label="Senha"
                        placeholder="exemplo123"
                        onChangeText={onChange}
                        errorMessage={errors.password?.message}
                        value={value}
                        isPassword
                    />
                )}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleRegister}
                    disabled={isSubmitting}
                >
                    <Text style={styles.registerButtonText}>
                        {isSubmitting ? "Registrando..." : "Registrar"}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.link}>
                    Já tem uma conta?{" "}
                    <Text style={styles.strongLink} onPress={() => navigation.navigate("Login")}>Realize o login</Text>
                </Text>
            </View>
        </ScrollView>
    )
}