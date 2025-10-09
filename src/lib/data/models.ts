// 製品型番データ
export interface ModelData {
    model: string;
    hasSmartMoving: boolean; // スマート引っ越し機能の有無
}

// 製品型番リスト（スマート引っ越し対応状況を含む）
export const MODELS: ModelData[] = [
    // WSRシリーズ（親機）
    { model: 'WSR-5400AX6S', hasSmartMoving: true },
    { model: 'WSR-5400AX6', hasSmartMoving: true },
    { model: 'WSR-3200AX4S', hasSmartMoving: true },
    { model: 'WSR-3200AX4B', hasSmartMoving: true },
    { model: 'WSR-1800AX4S', hasSmartMoving: true },
    { model: 'WSR-1800AX4', hasSmartMoving: true },
    { model: 'WSR-1800AX4B', hasSmartMoving: true },
    { model: 'WSR-1166DHPL2', hasSmartMoving: true },
    { model: 'WSR-1166DHP4', hasSmartMoving: false }, // 旧機種
    { model: 'WSR-2533DHP3', hasSmartMoving: true },
    { model: 'WSR-2533DHP2', hasSmartMoving: false },
    { model: 'WSR-A2533DHP3', hasSmartMoving: true },
    { model: 'WSR-600DHP', hasSmartMoving: false },
    { model: 'WSR-300HP', hasSmartMoving: false },

    // WXRシリーズ（親機・ハイエンド）
    { model: 'WXR-6000AX12S', hasSmartMoving: true },
    { model: 'WXR-5950AX12', hasSmartMoving: true },
    { model: 'WXR-11000XE12', hasSmartMoving: true },

    // WTRシリーズ（親機・法人向け）
    { model: 'WTR-M2133HP', hasSmartMoving: false },
    { model: 'WTR-M2133HS', hasSmartMoving: false },

    // WEXシリーズ（中継機）
    { model: 'WEX-1800AX4', hasSmartMoving: false },
    { model: 'WEX-1800AX4EA', hasSmartMoving: false },
    { model: 'WEX-733DHP', hasSmartMoving: false },
    { model: 'WEX-733DHPS', hasSmartMoving: false },
    { model: 'WEX-1166DHPS', hasSmartMoving: false },
    { model: 'WEX-1166DHP2', hasSmartMoving: false },

    // WEMシリーズ（中継機・メッシュ）
    { model: 'WEM-1266', hasSmartMoving: true },
    { model: 'WEM-1266WP', hasSmartMoving: true },

    // WMRシリーズ（親機・ポータブル）
    { model: 'WMR-433W2', hasSmartMoving: false },
    { model: 'WMR-300', hasSmartMoving: false },
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

// 製品タイプのパターン定義
export const PRODUCT_TYPE_PATTERNS = {
    親機: ['WSR-', 'WXR-', 'WTR-', 'WMR-'],
    中継機: ['WEX-', 'WEM-']
};

// 型番から製品タイプを判定
export function determineProductType(model: string): string {
    const upperModel = model.toUpperCase().trim();

    // 親機のパターンをチェック
    for (const prefix of PRODUCT_TYPE_PATTERNS.親機) {
        if (upperModel.startsWith(prefix)) {
            return '親機';
        }
    }

    // 中継機のパターンをチェック
    for (const prefix of PRODUCT_TYPE_PATTERNS.中継機) {
        if (upperModel.startsWith(prefix)) {
            return '中継機';
        }
    }

    return '';
}
