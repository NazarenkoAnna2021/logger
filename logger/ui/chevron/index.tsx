import React, { FC } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface IProps {
    width?: number;
    height?: number;
    color?: string;
    position?: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';
}

const TRANSFORM_DEGREE = {
    UP: '0deg',
    LEFT: '90deg',
    DOWN: '180deg',
    RIGHT: '270deg',
}

export const Chevron: FC<IProps> = ({ width, height, color, position = 'UP' }) => (
    <View style={{ transform: [{ rotate: TRANSFORM_DEGREE[position] }] }}>
        <Svg width={width || '24'} height={height || '24'} fill="none" viewBox="0 0 24 24"  >
            <Path d="M6 9L12 15L18 9" stroke={color || "white"} strokeWidth="2" />
        </Svg>
    </View>
);
