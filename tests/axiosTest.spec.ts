import { test, expect } from '@playwright/test';

test("POSTボタンが押されたときの通信を確認するテスト", async ({ page }) => {
  // httpbinにリクエストが送られたときにここで受け取る
  await page.route('https://httpbin.org/post', route => {
    const request = route.request();
    // 送られたリクエストがPOSTリクエストかどうかを判定
    if (request.method() === 'POST') {
        console.log("POST DATA!!!")
        // postData()にPOSTされたJSONデータが入っているのでパースして判定する
        expect(JSON.parse(request.postData() ?? "nodata")).toEqual({
            firstName: "Fred",
            lastName: "Flintstone"
        });
        // ここでレスポンスを返す
        route.fulfill({
          status: 200, // HTTPステータスコード
          contentType: 'application/json', // コンテンツタイプ
          body: JSON.stringify({ // レスポンスボディ
            data: "Response from mock"
          })
        });
    }
    // console.log(request)
    // リクエストを続行
    // route.continue();
  })

  // ローカルホストに立てているページにアクセスする
  await page.goto('http://localhost:3000/');

  // Axios POST Dataボタンを押す
  await page.getByTestId('postButton').click()

  // 表示がPOSTになったかを確認
  const POSTtext = await page.textContent('[data-testid="postResult"]');
  expect(POSTtext).toBe("POST")
});

test("GETボタンが押されたときの通信を確認するテスト", async ({ page }) => {
  // httpbinにリクエストが送られたときにここで受け取る
  await page.route('https://httpbin.org/get', route => {
    const request = route.request();
    // 送られたリクエストがGETリクエストかどうかを判定
    if (request.method() === 'GET') {
        console.log("GET DATA!!!")
        // ここでレスポンスを返す
        route.fulfill({
          status: 200, // HTTPステータスコード
          contentType: 'application/json', // コンテンツタイプ
          body: JSON.stringify({ // レスポンスボディ
            data: "Response from mock"
          })
        });
    }
    // console.log(request)
    // リクエストを続行
    // route.continue();
  })

  // ローカルホストに立てているページにアクセスする
  await page.goto('http://localhost:3000/');

  // Axios POST Dataボタンを押す
  await page.getByTestId('getButton').click()

  // 表示がPOSTになったかを確認
  const GETtext = await page.textContent('[data-testid="getResult"]');
  expect(GETtext).toBe("GET")
});


