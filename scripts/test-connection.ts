import { chromium } from 'playwright';

async function testConnection() {
    console.log('🔍 プレビューサーバーへの接続テストを開始...\n');

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        ignoreHTTPSErrors: true,
        permissions: [] // カメラなどの許可をブロック
    });
    const page = await context.newPage();

    // すべての権限をブロック
    await context.grantPermissions([]);

    try {
        const url = 'https://localhost:4173/support-flow';
        console.log(`📡 接続先: ${url}`);

        await page.goto(url, { waitUntil: 'networkidle' });
        console.log('✅ 接続成功！');

        const title = await page.title();
        console.log(`📄 ページタイトル: ${title}`);

        // 5秒待機してからブラウザを閉じる
        console.log('\n⏳ 5秒後にブラウザを閉じます...');
        await new Promise(resolve => setTimeout(resolve, 5000));

    } catch (error) {
        console.error('❌ エラー:', error);
    } finally {
        await browser.close();
        console.log('\n✨ テスト完了');
    }
}

testConnection().catch(console.error);
