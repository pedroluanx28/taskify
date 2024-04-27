import { Button, Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { SvgImage } from "../SvgImage";
import Eye from '../../assets/password.svg';
import OpenEye from '../../assets/open-eye.svg';
import Xicon from '../../assets/input.svg';

type InputProps = TextInputProps & {
    errorMessage?: string;
    label?: string;
    isPassword?: boolean;
    resetField?: () => void;
    value: string;
}

export function FormControl({ errorMessage, label, isPassword, resetField, value, ...rest }: InputProps) {
    const [passwordVisible, setPasswordVisible] = useState(isPassword);

    const inputBorderColor = errorMessage ? {
        borderColor: "#C62828",
    } : {
        borderColor: "#E0E0E0",
    };

    return (
        <View style={styles.inputContainer}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View>
                <TextInput
                    style={[
                        inputBorderColor,
                        styles.input
                    ]}
                    value={value}
                    secureTextEntry={passwordVisible ? true : false}
                    {...rest}
                />
                {isPassword ? (
                    <Pressable
                        style={styles.icon}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <SvgImage
                            icon={passwordVisible ? Eye : OpenEye}
                        />
                    </Pressable>
                ) : value && (
                    <Pressable
                        style={styles.icon}
                        onPress={resetField}
                    >
                        <SvgImage
                            icon={Xicon}
                        />
                    </Pressable>
                )}
            </View>
            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
    )
}