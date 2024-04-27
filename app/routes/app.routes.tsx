import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAsyncStorage } from "../utils/hooks/useAsyncStorage";

import { Home } from "../screens/Home";
import { Onboarding } from "../screens/Onboarding";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { useState } from "react";

export type RootStackProps = {
    Home: undefined;
    Onboarding: undefined;
    Login: undefined;
    Register: undefined;
};

export type NavigationScreens = NativeStackNavigationProp<RootStackProps>;

export function AppRoutes() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [alreadyOnboarded, setAlreadyOnboarded] = useState(false);

    const Stack = createNativeStackNavigator<RootStackProps>();
    const { getItem } = useAsyncStorage();
    const token = getItem("token");
    const onboarding = getItem("onboarding");

    token.then((value) => {
        if (value) {
            setIsLoggedIn(true);
        }
    });

    onboarding.then((value) => {
        if (value) {
            setAlreadyOnboarded(true);
        }
    });

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn && (
                <>
                    {!alreadyOnboarded && <Stack.Screen name="Onboarding" component={Onboarding} />}
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                </>
            )}
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}