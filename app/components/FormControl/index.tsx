import { useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

import { SvgImage } from "../SvgImage";

import { styles } from "./styles";

import Eye from '../../assets/password.svg';
import OpenEye from '../../assets/open-eye.svg';
import Xicon from '../../assets/input.svg';
import Calendar from '../../assets/calendar.svg';

type InputModes = "text" | "password" | "date";

type InputProps = TextInputProps & {
    errorMessage?: string;
    label?: string;
    mode?: InputModes;
    resetField?: () => void;
    value?: string;
}

export function FormControl({ errorMessage, label, mode = "text", resetField, value, ...rest }: InputProps) {
    const isPassword = mode === "password";
    const isDate = mode === "date";

    const [passwordVisible, setPasswordVisible] = useState(isPassword);

    const inputBorderColor = errorMessage ? {
        borderColor: "#C62828",
    } : {
        borderColor: "#E0E0E0",
    };

    function getInputHeightWithMultiline() {
        if (rest.multiline) {
            if (rest.numberOfLines && rest.numberOfLines === 1) {
                return 50;
            }

            if (rest.numberOfLines && rest.numberOfLines > 1) {
                return rest.numberOfLines * 25;
            }
        }

        return 50;
    }

    const formattedInputHeight = getInputHeightWithMultiline();

    const inputHeight = rest.multiline ? {
        height: formattedInputHeight,
        paddingTop: 8,
    } : {
        height: 50,
    }

    const inputPadding = isDate ? {
        paddingHorizontal: 40,
    } : {
        paddingLeft: 10,
        paddingRight: 40,
    }

    const inputTextColor = (isDate && rest.readOnly) && {
        color: "#0E0B16",
    }

    return (
        <View style={styles.inputContainer}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View>
                {isDate && (
                    <View
                        style={styles.calendarIcon}
                    >
                        <SvgImage
                            icon={Calendar}
                        />
                    </View>
                )}
                <TextInput
                    style={[
                        inputBorderColor,
                        inputHeight,
                        inputPadding,
                        inputTextColor,
                        styles.input,
                    ]}
                    textAlignVertical={rest.multiline ? "top" : "center"}
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