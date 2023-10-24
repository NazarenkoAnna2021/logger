import React, { FC, useCallback, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { ILog } from '../../entity/loggerModel';
import { styles } from './styles';
import { Chevron } from '../chevron';
import Clipboard from '@react-native-clipboard/clipboard';
import { CopyIcon } from '../copyIcon';

interface IProps {
    item: ILog;
}

export const LoggerItem: FC<IProps> = ({ item }) => {
    const [show, setShow] = useState(false);
    const spinValue = useRef(new Animated.Value(0)).current;

    const onShow = useCallback(() => {
        Animated.timing(
            spinValue,
            { toValue: show ? 0 : 1, duration: 100, easing: Easing.linear, useNativeDriver: true }
        ).start();
        setShow(prev => !prev)
    }, [show]);

    const copyToClipboard = () => {
        Clipboard.setString(item.message);
    };

    const titleStyle = {
        error: styles.titleError,
        request: styles.titleRequest,
        response: styles.titleResponse,
        library: styles.titleLibrary,
    }

    const rotate = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={onShow} style={styles.button}>
                <View style={styles.top}>
                    <Text style={[styles.text, titleStyle[item.type]]}>{item.type}</Text>
                    <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={styles.buttonsRow}>
                    <TouchableOpacity style={[styles.chevronContainer]} onPress={copyToClipboard}>
                        <CopyIcon width={24} height={26} />
                    </TouchableOpacity>
                    <Animated.View style={[styles.chevronContainer, { transform: [{ rotate }] }]}>
                        <Chevron color={'black'} width={32} height={32} />
                    </Animated.View>
                </View>
            </TouchableOpacity>
            {show && <View style={styles.description}>
                <View style={styles.separator} />
                <Text style={styles.text} selectable={true}>{item.message}</Text>
            </View>}
        </View >
    );
};