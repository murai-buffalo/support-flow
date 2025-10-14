// 製品型番データ
export interface ModelData {
    model: string;
    productType: '親機' | '中継機'; // 製品タイプ
    hasSmartMoving: boolean; // スマート引っ越し機能の有無
    hasEasyMesh: boolean; // EasyMesh機能の有無
}

// 製品型番リスト（スマート引っ越し対応状況を含む）
export const MODELS: ModelData[] = [
    // WSRシリーズ（親機）
    { model: 'WSR-6000AX8-MB', productType: '親機', hasSmartMoving: true, hasEasyMesh: true },
    { model: 'WSR-5400AX6S', productType: '親機', hasSmartMoving: true, hasEasyMesh: true },
    { model: 'WSR-5400AX6', productType: '親機', hasSmartMoving: true, hasEasyMesh: true },
    { model: 'WSR-3200AX4S', productType: '親機', hasSmartMoving: true, hasEasyMesh: true },
    { model: 'WSR-3200AX4B', productType: '親機', hasSmartMoving: true, hasEasyMesh: true },
    { model: 'WSR-1800AX4S', productType: '親機', hasSmartMoving: true, hasEasyMesh: true },
    { model: 'WSR-1800AX4', productType: '親機', hasSmartMoving: true, hasEasyMesh: true },
    { model: 'WSR-1800AX4B', productType: '親機', hasSmartMoving: true, hasEasyMesh: true },
    { model: 'WSR-1166DHPL2', productType: '親機', hasSmartMoving: true, hasEasyMesh: false },
    { model: 'WSR-1166DHP4', productType: '親機', hasSmartMoving: false, hasEasyMesh: false }, // 旧機種
    { model: 'WSR-2533DHP3', productType: '親機', hasSmartMoving: true, hasEasyMesh: false },
    { model: 'WSR-2533DHP2', productType: '親機', hasSmartMoving: false, hasEasyMesh: false },
    { model: 'WSR-A2533DHP3', productType: '親機', hasSmartMoving: true, hasEasyMesh: false },
    { model: 'WSR-600DHP', productType: '親機', hasSmartMoving: false, hasEasyMesh: false },
    { model: 'WSR-300HP', productType: '親機', hasSmartMoving: false, hasEasyMesh: false },

    // WXRシリーズ（親機・ハイエンド）
    { model: 'WXR-6000AX12S', productType: '親機', hasSmartMoving: true, hasEasyMesh: true },
    { model: 'WXR-5950AX12', productType: '親機', hasSmartMoving: true, hasEasyMesh: true },
    { model: 'WXR-11000XE12', productType: '親機', hasSmartMoving: true, hasEasyMesh: true },

    // WTRシリーズ（親機・法人向け）
    { model: 'WTR-M2133HP', productType: '親機', hasSmartMoving: false, hasEasyMesh: false },
    { model: 'WTR-M2133HS', productType: '親機', hasSmartMoving: false, hasEasyMesh: false },

    // WEXシリーズ（中継機）
    { model: 'WEX-1800AX4', productType: '中継機', hasSmartMoving: false, hasEasyMesh: true },
    { model: 'WEX-1800AX4EA', productType: '中継機', hasSmartMoving: false, hasEasyMesh: true },
    { model: 'WEX-733DHP', productType: '中継機', hasSmartMoving: false, hasEasyMesh: false },
    { model: 'WEX-733DHPS', productType: '中継機', hasSmartMoving: false, hasEasyMesh: false },
    { model: 'WEX-1166DHPS', productType: '中継機', hasSmartMoving: false, hasEasyMesh: false },
    { model: 'WEX-1166DHP2', productType: '中継機', hasSmartMoving: false, hasEasyMesh: false },

    // WEMシリーズ（中継機・メッシュ）
    { model: 'WEM-1266', productType: '中継機', hasSmartMoving: true, hasEasyMesh: true },
    { model: 'WEM-1266WP', productType: '中継機', hasSmartMoving: true, hasEasyMesh: true },

    // WMRシリーズ（親機・ポータブル）
    { model: 'WMR-433W2', productType: '親機', hasSmartMoving: false, hasEasyMesh: false },
    { model: 'WMR-300', productType: '親機', hasSmartMoving: false, hasEasyMesh: false },
];

// 型番のみのリスト（オートコンプリート用）
export const MODEL_LIST = MODELS.map((m) => m.model).sort();

// 型番からデータを取得
export function getModelData(modelNumber: string): ModelData | undefined {
    return MODELS.find((m) => m.model.toUpperCase() === modelNumber.toUpperCase());
}

// スマート引っ越し機能があるかチェック
export function hasSmartMovingFeature(modelNumber: string): boolean {
    const data = getModelData(modelNumber);
    return data?.hasSmartMoving ?? false;
}

// EasyMesh機能があるかチェック
export function hasEasyMeshFeature(modelNumber: string): boolean {
    const data = getModelData(modelNumber);
    return data?.hasEasyMesh ?? false;
}

// 型番から製品タイプを判定（型番単位で判定）
export function determineProductType(model: string): string {
    const modelData = getModelData(model);
    return modelData ? modelData.productType : '';
}
