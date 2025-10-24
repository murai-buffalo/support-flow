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

// シナリオ1: WPS接続フロー
async function captureWPSFlow() {
    console.log('\n🎬 シナリオ1: WPS接続フローのキャプチャを開始します...\n');
    
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        ignoreHTTPSErrors: true,
        permissions: []
    });
    const page = await context.newPage();

    await context.grantPermissions([]);
    await page.context().route('**/*', (route) => {
        const request = route.request();
        if (request.resourceType() === 'media') {
            route.abort();
        } else {
            route.continue();
        }
    });

    try {
        console.log('📍 1-01: トップページを開く...');
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await wait(1000);
        await takeScreenshot(page, 'scenario1-01_top');

        console.log('📍 1-02: 設定方法を選択...');
        await page.click('text=設定方法');
        await wait(2000);
        await takeScreenshot(page, 'scenario1-02_product-input');

        console.log('📍 1-03: 製品を入力...');
        const inputField = await page.locator('input[type="text"]').first();
        await inputField.click();
        await inputField.fill('WXR-6000AX12S');
        await wait(1500);
        await takeScreenshot(page, 'scenario1-03_product-confirmed');

        console.log('📍 1-04: 利用方法選択へ...');
        await page.click('button:has-text("次へ")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-04_usage');

        console.log('📍 1-05: 中継機として使用を選択...');
        await page.click('text=中継機として使用');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-05_relay');

        console.log('📍 1-06: 設定を開始...');
        await page.click('button:has-text("設定を開始する")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-06_old-router-input');

        console.log('📍 1-07: 既存機器を選択...');
        await page.click('input[id="device-buffalo-unknown"]');
        await wait(500);
        await page.click('button:has-text("次へ")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-07_relay-setup');

        console.log('📍 1-08: 詳細な手順を見る...');
        await wait(500);
        await page.locator('button:has-text("詳細な手順")').first().click();
        await wait(1000);
        await takeScreenshot(page, 'scenario1-08_extender-start');

        console.log('📍 1-09: 中継機の設置...');
        await page.click('button:has-text("準備完了・次へ")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-09_extender-step1');

        console.log('📍 1-10: EasyMeshスイッチをOFF...');
        await page.click('button:has-text("設置完了・次へ")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-10_extender-step2');

        console.log('📍 1-11: Resetボタンを押す...');
        await page.click('button:has-text("スイッチOFF完了・次へ")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-11_extender-step3');

        console.log('📍 1-12: 親機の確認...');
        await page.click('button:has-text("Reset完了・次へ")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-12_extender-step4');

        console.log('📍 1-13: WPSボタンがある を選択...');
        await page.click('button:has-text("WPS（AOSS）ボタンがある")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-13_extender-step4-wps-selected');

        console.log('📍 1-14: WPS接続...');
        await page.click('button:has-text("次へ")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-14_extender-wps');

        console.log('📍 1-15: WPS接続確認...');
        await page.click('button:has-text("ボタン操作完了・次へ")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-15_extender-wps-check');

        console.log('📍 1-16: 正常な接続を選択...');
        await page.click('button:has-text("緑点灯または遅い点滅（正常）")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-16_extender-wps-check-success');

        console.log('📍 1-17: 中継機の位置調整...');
        await page.click('button:has-text("次へ")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-17_extender-position');

        console.log('📍 1-18: 設定完了...');
        await page.click('button:has-text("位置調整完了・設定を終了")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-18_setup-complete');

        console.log('📍 1-19: NPS入力...');
        await page.click('button:has-text("満足度調査へ進む")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-19_nps');

        console.log('📍 1-20: NPSスコアを選択...');
        await page.click('button:has-text("9")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-20_nps-score-selected');

        console.log('📍 1-21: 最終完了...');
        await page.click('button:has-text("送信して完了")');
        await wait(1000);
        await takeScreenshot(page, 'scenario1-21_final-complete');

        console.log('\n✨ シナリオ1: WPS接続フローのキャプチャが完了しました！\n');

    } catch (error) {
        console.error('❌ シナリオ1でエラーが発生しました:', error);
    } finally {
        await browser.close();
    }
}

// シナリオ2: マニュアル接続フロー
async function captureManualFlow() {
    console.log('\n🎬 シナリオ2: マニュアル接続フローのキャプチャを開始します...\n');
    
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        ignoreHTTPSErrors: true,
        permissions: []
    });
    const page = await context.newPage();

    await context.grantPermissions([]);
    await page.context().route('**/*', (route) => {
        const request = route.request();
        if (request.resourceType() === 'media') {
            route.abort();
        } else {
            route.continue();
        }
    });

    try {
        console.log('⏩ マニュアル接続フローへ移動中...');
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await wait(1000);
        await page.click('text=設定方法');
        await wait(2000);
        const inputField = await page.locator('input[type="text"]').first();
        await inputField.click();
        await inputField.fill('WXR-6000AX12S');
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

        console.log('📍 2-01: WPSボタンがない を選択...');
        await page.click('button:has-text("WPS（AOSS）ボタンがない")');
        await wait(1000);
        await takeScreenshot(page, 'scenario2-01_extender-step4-manual-selected');

        console.log('📍 2-02: 手動接続設定...');
        await page.click('button:has-text("次へ")');
        await wait(1000);
        await takeScreenshot(page, 'scenario2-02_extender-manual');

        console.log('📍 2-03: ログイン画面...');
        await page.click('button:has-text("設定画面を開いた・次へ")');
        await wait(1000);
        await takeScreenshot(page, 'scenario2-03_extender-manual-login');

        console.log('📍 2-04: ランプ確認...');
        await page.click('button:has-text("設定完了・次へ")');
        await wait(1000);
        await takeScreenshot(page, 'scenario2-04_extender-manual-check');

        console.log('📍 2-05: 接続成功を選択...');
        await page.click('button:has-text("両方とも点灯または点滅（正常）")');
        await wait(1000);
        await takeScreenshot(page, 'scenario2-05_extender-manual-check-success');

        console.log('📍 2-06: 位置調整...');
        await page.click('button:has-text("次へ")');
        await wait(1000);
        await takeScreenshot(page, 'scenario2-06_extender-position-manual');

        console.log('\n✨ シナリオ2: マニュアル接続フローのキャプチャが完了しました！\n');
    } catch (error) {
        console.error('❌ シナリオ2でエラーが発生しました:', error);
    } finally {
        await browser.close();
    }
}

// シナリオ3: エラーケース
async function captureErrorCases() {
    console.log('\n🎬 シナリオ3: エラーケースのキャプチャを開始します...\n');
    
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        ignoreHTTPSErrors: true,
        permissions: []
    });
    const page = await context.newPage();

    try {
        console.log('📍 3-01: 再試行画面...');
        await page.goto(`${BASE_URL}/relay-extender-retry`, { waitUntil: 'networkidle' });
        await wait(1000);
        await takeScreenshot(page, 'scenario3-01_extender-retry');

        console.log('📍 3-02: サポート画面...');
        await page.goto(`${BASE_URL}/relay-extender-support`, { waitUntil: 'networkidle' });
        await wait(1000);
        await takeScreenshot(page, 'scenario3-02_extender-support');

        console.log('\n✨ シナリオ3: エラーケースのキャプチャが完了しました！\n');
    } catch (error) {
        console.error('❌ シナリオ3でエラーが発生しました:', error);
    } finally {
        await browser.close();
    }
}

// メイン実行
async function main() {
    console.log('🚀 フローキャプチャプログラムを起動します\n');
    console.log('⚠️  事前に `npm run preview` でサーバーを起動してください\n');

    await ensureScreenshotDir();
    
    // シナリオ1: WPS接続フロー
    await captureWPSFlow();
    
    // シナリオ2: マニュアル接続フロー
    await captureManualFlow();
    
    // シナリオ3: エラーケース
    await captureErrorCases();

    console.log('\n🎉 すべてのシナリオのキャプチャが完了しました！');
    console.log(`📂 スクリーンショット保存先: ${SCREENSHOT_DIR}`);
    console.log('\n📊 キャプチャ結果:');
    console.log('   シナリオ1 (WPS接続): 21枚');
    console.log('   シナリオ2 (マニュアル接続): 6枚');
    console.log('   シナリオ3 (エラーケース): 2枚');
    console.log('   合計: 29枚\n');
}

main().catch(console.error);
