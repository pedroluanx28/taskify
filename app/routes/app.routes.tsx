import { useEffect, useState } from "react";

import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useStorageVariables } from "../utils/hooks/useStorageVariables";

import { Form } from "../screens/Form";
import { Home } from "../screens/Home";
import { Onboarding } from "../screens/Onboarding";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { UserContextProvider } from "../contexts/userContext";

export type RootStackProps = {
    Home: undefined;
    Onboarding: undefined;
    Login: undefined;
    Register: undefined;
    Form: {
        fetchTasks: () => void;
    };
};

export type NavigationScreens = NativeStackNavigationProp<RootStackProps>;

export function AppRoutes() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [alreadyOnboarded, setAlreadyOnboarded] = useState(false);

    const Stack = createNativeStackNavigator<RootStackProps>();
    const { TOKEN, ONBOARDING } = useStorageVariables();

    useEffect(() => {
        if (TOKEN) {
            setIsLoggedIn(true);
        }

        if (ONBOARDING) {
            setAlreadyOnboarded(true);
        }
    }, [TOKEN, ONBOARDING]);
    return (
        <UserContextProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isLoggedIn && (
                    <>
                        {!alreadyOnboarded && <Stack.Screen name="Onboarding" component={Onboarding} />}
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                    </>
                )}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Form" component={Form} />
            </Stack.Navigator>
        </UserContextProvider>
    )
}