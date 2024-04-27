import { Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import OnboardingSvg from '../../assets/onboarding.svg';
import { NavigationScreens } from "../../routes/app.routes";
import { useAsyncStorage } from "../../utils/hooks/useAsyncStorage";
import { SvgImage } from "../../components/SvgImage";

import { styles } from "./styles";

import Logo from '../../assets/logo.svg';

export function Onboarding() {
    const navigation = useNavigation<NavigationScreens>();
    const { width, height } = useWindowDimensions();
    const { setItem } = useAsyncStorage();

    const buttonWidth = {
        width: width * 0.9,
    } as const;

    function handleStartNow() {
        navigation.navigate("Register");

        setItem("onboarding", "onboarding");
    }

    return (
        <View style={styles.container}>
            <SvgImage
                icon={Logo}
                width={width * 0.5}
                height={height * 0.043}
            />

            <SvgImage
                icon={OnboardingSvg}
                width={width * 0.9}
                height={height * 0.33}
            />

            <View style={styles.content}>
                <Text style={styles.onboardingTitle}>
                    Simplificar, organizar e conquiste o <Text style={styles.darkBlueText}>seu dia</Text>
                </Text>

                <Text style={styles.onboardingText}>
                    Organize e planeje, sua vida agitada merece isso. Você pode gerenciar a lista de verificação e seu objetivo.
                </Text>
            </View>

            <TouchableOpacity style={[styles.startNowButton, buttonWidth]} onPress={handleStartNow}>
                <Text style={styles.startNowButtonText}>Começar agora</Text>
            </TouchableOpacity>
        </View>
    )
}