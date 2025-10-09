import { writable } from 'svelte/store';

export interface FlowState {
    modelNumber: string;
    productType: string;
    selectedProduct: string;
    selectedUsage: string;
    smartMovingSupported: boolean | null;
    previouslyUsedSmartMoving: boolean | null;
}

function createFlowStore() {
    const { subscribe, set, update } = writable<FlowState>({
        modelNumber: '',
        productType: '',
        selectedProduct: '',
        selectedUsage: '',
        smartMovingSupported: null,
        previouslyUsedSmartMoving: null
    });

    return {
        subscribe,
        setModelNumber: (modelNumber: string) =>
            update((state) => ({ ...state, modelNumber })),
        setProductType: (productType: string) =>
            update((state) => ({ ...state, productType })),
        setProduct: (product: string) =>
            update((state) => ({ ...state, selectedProduct: product })),
        setUsage: (usage: string) => update((state) => ({ ...state, selectedUsage: usage })),
        setSmartMovingSupported: (supported: boolean) =>
            update((state) => ({ ...state, smartMovingSupported: supported })),
        setPreviousSmartMoving: (used: boolean) =>
            update((state) => ({ ...state, previouslyUsedSmartMoving: used })),
        reset: () =>
            set({
                modelNumber: '',
                productType: '',
                selectedProduct: '',
                selectedUsage: '',
                smartMovingSupported: null,
                previouslyUsedSmartMoving: null
            })
    };
}

export const flowStore = createFlowStore();
