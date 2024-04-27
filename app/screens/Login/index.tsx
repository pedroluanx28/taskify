import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import * as Yup from 'yup';

import { useApi } from "../../utils/hooks/useApi";
import { NavigationScreens } from "../../routes/app.routes";

import { FormControl } from "../../components/FormControl";
import { SvgImage } from "../../components/SvgImage";

import { styles } from "./styles";

import LoginSvg from '../../assets/login.svg';
import { useAsyncStorage } from "../../utils/hooks/useAsyncStorage";

type FormProps = {
    email: string;
    password: string;
};

export function Login() {
    const navigation = useNavigation<NavigationScreens>();
    const { api } = useApi();
    const { setItem } = useAsyncStorage();

    const loginValidationSchema = Yup.object().shape({
        email: Yup.string().email("O e-mail deve ser válido").required("O e-mail é obrigatório"),
        password: Yup.string().required("A senha é obrigatória").min(6, "A senha deve ter no mínimo 6 caracteres"),
    });

    const { control, handleSubmit, resetField, reset, formState: { errors, isSubmitting } } = useForm<FormProps>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginValidationSchema),
    });

    const { height } = useWindowDimensions();
    const containerHeight = { minHeight: height };

    const handleLogin = handleSubmit(async (values) => {
        try {
            const { data } = await api.post("/auth/login", values);

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
            <Text style={styles.title}>Bem vindo de volta</Text>

            <SvgImage
                icon={LoginSvg}
            />

            <Text style={styles.subTitle}>
                Por favor, preencha seus dados para acessar sua conta.
            </Text>

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
                    style={styles.loginButton}
                    onPress={handleLogin}
                    disabled={isSubmitting}
                >
                    <Text style={styles.loginButtonText}>
                        {isSubmitting ? "Entrando..." : "Entrar"}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.link}>
                    Não tem uma conta?{" "}
                    <Text style={styles.strongLink} onPress={() => navigation.navigate("Register")}>Registre-se</Text>
                </Text>
            </View>
        </ScrollView>
    )
}