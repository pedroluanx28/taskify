import { useEffect, useState } from "react";
import { Animated, Modal, Text, TouchableOpacity, View } from "react-native";

import MenuIcon from "react-native-vector-icons/Entypo";
import { menuOptions } from "../../utils/options/menu";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

export function Menu() {
    const [showMenu, setShowMenu] = useState(false);
    const scale = new Animated.Value(0);

    const handleToggleMenu = () => setShowMenu(!showMenu);
    const handleCloseMenu = () => setShowMenu(false);

    useEffect(() => {
        Animated.timing(scale, {
            toValue: showMenu ? 1 : 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    }, [showMenu]);

    const menuScale = {
        transform: [{ scale }],
    }

    const menuOpacity = {
        opacity: scale.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        }),
    }

    const menuItemBorderBottom = {
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    }

    return (
        <>
            <View onTouchStart={handleToggleMenu}>
                <MenuIcon
                    name="menu"
                    size={25}
                    color="#989898"
                />
            </View>

            <Modal visible={showMenu} transparent>
                <SafeAreaView style={{ flex: 1 }} onTouchEnd={handleCloseMenu}>
                    <Animated.View
                        style={[
                            menuScale,
                            menuOpacity,
                            styles.menuContainer,
                        ]}
                    >
                        {menuOptions.map((option, index) => {
                            const isLastItem = index === menuOptions.length - 1;

                            return (
                                <TouchableOpacity
                                    key={`menu-item-${index}`}
                                    onPress={option.onPress}
                                    style={[
                                        styles.menuButton,
                                        !isLastItem && menuItemBorderBottom,
                                    ]}
                                >
                                    <Text>{option.title}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </Animated.View>
                </SafeAreaView>
            </Modal>
        </>
    )
}