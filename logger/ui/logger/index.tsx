import { observer } from 'mobx-react';
import React, { FC, useCallback } from 'react'
import { TouchableOpacity } from 'react-native';
import { loggerModel } from '../../entity/loggerModel';
import { LoggerIcon } from '../loggerIcon';
import { ModalLogger } from '../modalLogger';
import { styles } from './styles';


export const Logger: FC = observer(({ }) => {
    const onOpen = useCallback(() => {
        loggerModel.isVisibleLogs = true;
    }, [])

    return (loggerModel.mod === 'dev'
        ? <>
            <TouchableOpacity style={styles.button} onPress={onOpen} >
                <LoggerIcon color={'gray'} />
            </TouchableOpacity >
            <ModalLogger />
        </>
        : null
    );
});