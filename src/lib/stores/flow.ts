import { writable } from 'svelte/store';

export interface FlowState {
    modelNumber: string;
    productType: string;
    selectedUsage: string;
    newDeviceSmartMovingSupported: string; // 新機器のスマート引っ越し対応状況
    oldDeviceSmartMovingSupported: string; // 旧機器のスマート引っ越し対応状況
    previouslyUsedSmartMoving: boolean | null;
    oldDeviceType: string; // 旧機器のタイプ ('buffalo-with-model' | 'buffalo-unknown' | 'other')
    oldModelNumber: string; // 旧機器の型番
}

const STORAGE_KEY = 'support-flow-state';

// localStorageから初期状態を読み込む
function loadState(): FlowState {
    if (typeof window === 'undefined') {
        // SSR時のデフォルト値
        return {
            modelNumber: '',
            productType: '',
            selectedUsage: '',
            newDeviceSmartMovingSupported: '',
            oldDeviceSmartMovingSupported: '',
            previouslyUsedSmartMoving: null,
            oldDeviceType: '',
            oldModelNumber: ''
        };
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to load state from localStorage:', error);
    }

    return {
        modelNumber: '',
        productType: '',
        selectedUsage: '',
        newDeviceSmartMovingSupported: '',
        oldDeviceSmartMovingSupported: '',
        previouslyUsedSmartMoving: null,
        oldDeviceType: '',
        oldModelNumber: ''
    };
}

// localStorageに状態を保存
function saveState(state: FlowState) {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Failed to save state to localStorage:', error);
        }
    }
}

function createFlowStore() {
    const { subscribe, set, update } = writable<FlowState>(loadState());

    return {
        subscribe,
        setModelNumber: (modelNumber: string) =>
            update((state) => {
                const newState = { ...state, modelNumber };
                saveState(newState);
                return newState;
            }),
        setProductType: (productType: string) =>
            update((state) => {
                const newState = { ...state, productType };
                saveState(newState);
                return newState;
            }),
        setUsage: (usage: string) =>
            update((state) => {
                const newState = { ...state, selectedUsage: usage };
                saveState(newState);
                return newState;
            }),
        setNewDeviceSmartMovingSupported: (supported: string) =>
            update((state) => {
                const newState = { ...state, newDeviceSmartMovingSupported: supported };
                saveState(newState);
                return newState;
            }),
        setOldDeviceSmartMovingSupported: (supported: string) =>
            update((state) => {
                const newState = { ...state, oldDeviceSmartMovingSupported: supported };
                saveState(newState);
                return newState;
            }),
        setPreviousSmartMoving: (used: boolean) =>
            update((state) => {
                const newState = { ...state, previouslyUsedSmartMoving: used };
                saveState(newState);
                return newState;
            }),
        setOldDevice: (deviceType: string, modelNumber: string) =>
            update((state) => {
                const newState = { ...state, oldDeviceType: deviceType, oldModelNumber: modelNumber };
                saveState(newState);
                return newState;
            }),
        reset: () => {
            const defaultState = {
                modelNumber: '',
                productType: '',
                selectedUsage: '',
                newDeviceSmartMovingSupported: '',
                oldDeviceSmartMovingSupported: '',
                previouslyUsedSmartMoving: null,
                oldDeviceType: '',
                oldModelNumber: ''
            };
            set(defaultState);
            saveState(defaultState);
        }
    };
}

export const flowStore = createFlowStore();
