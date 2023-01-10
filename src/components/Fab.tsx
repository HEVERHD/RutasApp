import {
    View,
    Text,
    StyleProp,
    ViewStyle,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconName: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function Fab({ iconName, onPress, style = {} }: Props) {
    return (
        <View style={{ ...(style as any) }}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.blackButton}>
                <Icon
                    name={iconName}
                    color="white"
                    size={30}
                    style={{ left: 1 }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    blackButton: {
        zIndex: 9999,
        height: 50,
        width: 50,
        backgroundColor: 'black',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.24,
        shadowRadius: 4.63,
        elevation: 6,
    },
});
