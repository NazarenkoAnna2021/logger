import AsyncStorage from "@react-native-async-storage/async-storage";
import { action, makeAutoObservable, toJS } from "mobx";

export interface ILog {
    type: 'request' | 'response' | 'error' | 'library';
    name: string;
    message: string;
    id: string;
}

interface IRepository<T> {
    readonly data: T | null;
    save(data: T | null): void;
}

class MobXRepository<T> implements IRepository<T> {
    constructor(private initialValue?: T) {
        makeAutoObservable(this);
        if (typeof initialValue !== 'undefined') {
            this._data = this.initialValue as T;
        }
    }

    private _data: T | null = null;

    get data() {
        return toJS(this._data) ?? null;
    }

    @action save = (data: T | null): void => {
        this._data = data;
    }
}

interface ILoggerModel {
    isVisibleLogs: boolean;
    readonly logs: ILog[];
    mod: 'dev' | 'prod';
}

class LoggerModel implements ILoggerModel {
    private _key = 'LOGGER_MOD';
    private logsRepository = new MobXRepository<ILog[]>([]);
    private modRepository = new MobXRepository<'dev' | 'prod'>('dev');
    private isVisibleLogsRepository = new MobXRepository<boolean>(false);

    constructor() {
        this.loadMode();
    }

    private loadMode = async () => {
        try {
            const payload = await AsyncStorage.getItem(this._key) as 'dev' | 'prod';
            this.modRepository.save(payload);
        } catch (error) {
            console.warn('LoggerModel -> loadMode: ', error);
        }
    }

    private persistMode = async (payload: 'dev' | 'prod') => {
        try {
            await AsyncStorage.setItem(this._key, payload);
        } catch (error) {
            console.warn(`LoggerModel -> persistMode: `, error);
        }
    }

    get logs() {
        return this.logsRepository.data ?? [];
    }

    get mod() {
        return this.modRepository.data ?? 'dev';
    }

    set mod(value: 'dev' | 'prod') {
        this.modRepository.save(value);
        this.persistMode(value);
    }

    get isVisibleLogs() {
        return this.isVisibleLogsRepository.data ?? false;
    }

    set isVisibleLogs(data: boolean) {
        this.isVisibleLogsRepository.save(data);
    }

    add = (type: 'request' | 'response' | 'error' | 'library', name: string, message: any) => {
        this.logsRepository.save([{ type, name, message: JSON.stringify(message, null, ' '), id: Date.now().toString() }, ...this.logs]);
    }

    clear = () => {
        this.logsRepository.save(null);
    }
}

export const loggerModel = new LoggerModel();