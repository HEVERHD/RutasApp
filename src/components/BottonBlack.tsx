import {
    StyleProp,
    Text,
    TouchableOpacity,
    ViewStyle,
    StyleSheet,
    View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    Icons?: any;
}

export default function BottonBlack({ Icons, onPress, title, style }: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.9}
            style={{
                ...(style as any),
                ...styles.backButton,
            }}>
            <View style={styles.containerPermiso}>
                <Text style={styles.buttonText}>{title}</Text>
                <Icon name="navigate-circle-outline" color="white" size={22} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
        height: 40,
        width: 300,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '400',
        justifyContent: 'center',
        marginHorizontal: 5,
    },

    containerPermiso: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
