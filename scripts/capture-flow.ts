import { promises as fs } from 'fs';
import path from 'path';
import { chromium, type Page } from 'playwright';

const BASE_URL = 'https://localhost:4173/support-flow';
const SCREENSHOT_DIR = path.join(process.cwd(), 'screenshots');

// スクリーンショットの保存先ディレクトリを作成
async function ensureScreenshotDir() {
    try {
        await fs.mkdir(SCREENSHOT_DIR, { recursive: true });
        console.log(`📁 スクリーンショットディレクトリ: ${SCREENSHOT_DIR}`);
    } catch (error) {
        console.error('ディレクトリ作成エラー:', error);
    }
}

// スクリーンショットを撮影
async function takeScreenshot(page: Page, name: string) {
    const filename = `${name}.png`;
    const filepath = path.join(SCREENSHOT_DIR, filename);
    await page.screenshot({ path: filepath, fullPage: true });
    console.log(`✅ ${filename} を保存しました`);
}

// 少し待機
async function wait(ms: number = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// 中継機接続フローをキャプチャ (全29スクリーンショット)
async function captureRelayExtenderFlow() {
	console.log('\n🎬 中継機接続フローのキャプチャを開始します (全29枚)...\n');    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        ignoreHTTPSErrors: true, // 自己署名証明書を許可
        permissions: [] // カメラ、マイク、位置情報などの許可をブロック
    });
    const page = await context.newPage();

    // カメラとマイクへのアクセスをブロック
    await context.grantPermissions([]);

    // メディアデバイスへのアクセスを拒否
    await page.context().route('**/*', (route) => {
        const request = route.request();
        if (request.resourceType() === 'media') {
            route.abort();
        } else {
            route.continue();
        }
    });

    try {
        // 1. トップページ
        console.log('📍 ステップ 1/30: トップページを開く...');
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await wait(1000);
        await takeScreenshot(page, '01_top');

        // 2. 設定方法を選択 → 製品入力画面へ遷移
        console.log('📍 ステップ 2/30: 設定方法を選択...');
        await page.click('text=設定方法');
        await wait(2000); // カメラ許可ダイアログが表示されないように少し待つ
        await takeScreenshot(page, '02_product-input');

        // 3. 製品を入力（例: WXR-6000AX12S）
        console.log('📍 ステップ 3/28: 製品を入力...');
        // テキスト入力フィールドを探して入力
        const inputField = await page.locator('input[type="text"]').first();
        await inputField.click();
        await inputField.fill('WXR-6000AX12S');
        await wait(1500); // 製品タイプの自動判別を待つ
        await takeScreenshot(page, '03_product-confirmed');

        // 4. 次へボタン → 利用方法選択へ
        console.log('📍 ステップ 4/28: 利用方法選択へ...');
        await page.click('button:has-text("次へ")');
        await wait(1000);
        await takeScreenshot(page, '04_usage');

        // 5. 中継機として使用を選択 → relay へ
        console.log('📍 ステップ 5/28: 中継機として使用を選択...');
        await page.click('text=中継機として使用');
        await wait(1000);
        await takeScreenshot(page, '05_relay');

        // 6. 設定を開始 → old-router-input-easymesh へ遷移
        console.log('📍 ステップ 6/28: 設定を開始...');
        await page.click('button:has-text("設定を開始する")');
        await wait(1000);
        await takeScreenshot(page, '06_old-router-input');

        // 7. 既存機器の選択（バッファロー製品・型番不明）
        console.log('📍 ステップ 7/28: 既存機器を選択...');
        await page.click('input[id="device-buffalo-unknown"]');
        await wait(500);
        await page.click('button:has-text("次へ")');
        await wait(1000);
        await takeScreenshot(page, '07_relay-setup');

        // 8. 詳細な手順を見る
        console.log('📍 ステップ 8/28: 詳細な手順を見る...');
        await wait(500);
        await page.locator('button:has-text("詳細な手順")').first().click();
        await wait(1000);
        await takeScreenshot(page, '08_extender-start');

        // 9. ステップ1: 中継機の設置
        console.log('📍 ステップ 9/30: 中継機の設置...');
        await page.click('button:has-text("準備完了・次へ")');
        await wait(1000);
        await takeScreenshot(page, '09_extender-step1');

        // 10. ステップ2: EasyMeshスイッチをOFF
        console.log('📍 ステップ 10/30: EasyMeshスイッチをOFF...');
        await page.click('button:has-text("設置完了・次へ")');
        await wait(1000);
        await takeScreenshot(page, '10_extender-step2');

        // 11. ステップ3: Resetボタンを押す
        console.log('📍 ステップ 11/30: Resetボタンを押す...');
        await page.click('button:has-text("スイッチOFF完了・次へ")');
        await wait(1000);
        await takeScreenshot(page, '11_extender-step3');

        // 12. ステップ4: 親機の確認
        console.log('📍 ステップ 12/30: 親機の確認...');
        await page.click('button:has-text("Reset完了・次へ")');
        await wait(1000);
        await takeScreenshot(page, '12_extender-step4');

        // WPSボタンがある場合のフロー
        console.log('📍 ステップ 13/30: WPSボタンがある を選択...');
        await page.click('button:has-text("WPS（AOSS）ボタンがある")');
        await wait(1000);
        await takeScreenshot(page, '13_extender-step4-wps-selected');

        // 13. ステップ5: WPS接続
        console.log('📍 ステップ 14/30: WPS接続...');
        await page.click('button:has-text("次へ")');
        await wait(1000);
        await takeScreenshot(page, '14_extender-wps');

        // 14. ステップ6: WPS接続確認
        console.log('📍 ステップ 15/30: WPS接続確認...');
        await page.click('button:has-text("ボタン操作完了・次へ")');
        await wait(1000);
        await takeScreenshot(page, '15_extender-wps-check');

        // 正常な場合
        console.log('📍 ステップ 16/30: 正常な接続を選択...');
        await page.click('button:has-text("緑点灯または遅い点滅（正常）")');
        await wait(1000);
        await takeScreenshot(page, '16_extender-wps-check-success');

        // 15. 中継機の位置調整
        console.log('📍 ステップ 17/30: 中継機の位置調整...');
        await page.click('button:has-text("次へ")');
        await wait(1000);
        await takeScreenshot(page, '17_extender-position');

        // 16. 設定完了
        console.log('📍 ステップ 18/30: 設定完了...');
        await page.click('button:has-text("位置調整完了・設定を終了")');
        await wait(1000);
        await takeScreenshot(page, '18_setup-complete');

        // 17. NPS入力
        console.log('📍 ステップ 19/30: NPS入力...');
        await page.click('button:has-text("満足度調査へ進む")');
        await wait(1000);
        await takeScreenshot(page, '19_nps');

        // スコアを選択（例: 9点）
        console.log('📍 ステップ 20/30: NPSスコアを選択...');
        await page.click('button:has-text("9")');
        await wait(1000);
        await takeScreenshot(page, '20_nps-score-selected');

        // 18. 最終完了
        console.log('📍 ステップ 21/30: 最終完了...');
        await page.click('button:has-text("送信して完了")');
        await wait(1000);
        await takeScreenshot(page, '21_final-complete');

        console.log('\n✨ WPS接続フローのキャプチャが完了しました！\n');

        // 新しいページでマニュアル接続フローも撮影
        console.log('📍 ステップ 22/30: マニュアル接続フローへ...');
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await wait(1000);

        // マニュアル接続フローのショートカット
        console.log('⏩ マニュアル接続フローへ移動中...');
        await page.click('text=設定方法');
        await wait(2000);
        const inputField2 = await page.locator('input[type="text"]').first();
        await inputField2.click();
        await inputField2.fill('WXR-6000AX12S');
        await wait(1500);
        await page.click('button:has-text("次へ")');
        await wait(500);
        await page.click('text=中継機として使用');
        await wait(500);
        await page.click('button:has-text("設定を開始する")');
        await wait(500);
        await page.click('input[id="device-buffalo-unknown"]');
        await wait(500);
        await page.click('button:has-text("次へ")');
        await wait(500);
        await page.locator('button:has-text("詳細な手順")').first().click();
        await wait(500);
        await page.click('button:has-text("準備完了・次へ")');
        await wait(500);
        await page.click('button:has-text("設置完了・次へ")');
        await wait(500);
        await page.click('button:has-text("スイッチOFF完了・次へ")');
        await wait(500);
        await page.click('button:has-text("Reset完了・次へ")');
        await wait(500);

        // WPSボタンがない場合を選択
        console.log('📍 ステップ 22/30: WPSボタンがない を選択...');
        await page.click('button:has-text("WPS（AOSS）ボタンがない")');
        await wait(1000);
        await takeScreenshot(page, '22_extender-step4-manual-selected');

        console.log('📍 ステップ 23/30: 手動接続設定...');
        await page.click('button:has-text("次へ")');
        await wait(1000);
        await takeScreenshot(page, '23_extender-manual');

        console.log('📍 ステップ 24/30: ログイン画面...');
        await page.click('button:has-text("設定画面を開いた・次へ")');
        await wait(1000);
        await takeScreenshot(page, '24_extender-manual-login');

        console.log('📍 ステップ 25/30: ランプ確認...');
        await page.click('button:has-text("設定完了・次へ")');
        await wait(1000);
        await takeScreenshot(page, '25_extender-manual-check');

        // 成功の場合
        console.log('📍 ステップ 26/30: 接続成功を選択...');
        await page.click('button:has-text("両方とも点灯または点滅（正常）")');
        await wait(1000);
        await takeScreenshot(page, '26_extender-manual-check-success');

        console.log('📍 ステップ 27/30: 位置調整（マニュアル）...');
        await page.click('button:has-text("次へ")');
        await wait(1000);
        await takeScreenshot(page, '27_extender-position-manual');

        console.log('\n✨ マニュアル接続フローのキャプチャも完了しました！\n');

        // エラーケースも撮影
        console.log('📍 ステップ 28/30: 再試行画面...');
        await page.goto(`${BASE_URL}/relay-extender-retry`, { waitUntil: 'networkidle' });
        await wait(1000);
        await takeScreenshot(page, '28_extender-retry');

        console.log('📍 ステップ 29/30: サポート画面...');
        await page.goto(`${BASE_URL}/relay-extender-support`, { waitUntil: 'networkidle' });
        await wait(1000);
        await takeScreenshot(page, '29_extender-support');

        // 最後に戻るボタンを押した後のトップページを撮影
        console.log('📍 ステップ 30/30: トップへ戻る...');
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await wait(1000);
        await takeScreenshot(page, '30_top-return');

        console.log('\n✨ エラーケースのキャプチャも完了しました！\n');
    } catch (error) {
        console.error('❌ エラーが発生しました:', error);
    } finally {
        await browser.close();
    }
}

// メイン実行
async function main() {
    console.log('🚀 フローキャプチャプログラムを起動します\n');
    console.log('⚠️  事前に `npm run preview` でサーバーを起動してください\n');

    await ensureScreenshotDir();
    await captureRelayExtenderFlow();

    console.log('\n🎉 すべてのキャプチャが完了しました！');
    console.log(`📂 スクリーンショット保存先: ${SCREENSHOT_DIR}\n`);
}

main().catch(console.error);
