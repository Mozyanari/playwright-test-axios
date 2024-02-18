import { test, expect } from '@playwright/test';
import { Pokemon } from '../src/types';

test("ヌオーさんしか勝たん", async ({ page }) => {
  const mockemon: Pokemon = {
    id: 195,
    name: 'quagsire',
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/195.png'
    }
  }

  await page.route('https://httpbin.org/post', route => {
    const request = route.request();
    // リクエストボディを取得
    // const postData = JSON.parse(request.postData() ?? "nodata");
    // リクエストボディの内容を検証
    // expect(postData).toEqual({ /* 期待するリクエストボディの内容 */ });
    if (request.method() === 'POST') {
        console.log("POST DATA!!!")
        console.log(JSON.parse(request.postData() ?? "nodata"))
        expect(JSON.parse(request.postData() ?? "nodata")).toEqual({
            firstName: "Fred",
            lastName: "Flintstone"
        });
    }
    console.log("came")
    console.log(request)
    // リクエストを続行
    route.continue();
  })

  await page.route('https://pokeapi.co/api/v2/pokemon/greninja', async route => {
    await route.fulfill({ json: mockemon });
    console.log(route.fetch)
  });

  await page.goto('http://localhost:3000/');

//   await expect(page.getByText('quagsire')).toBeVisible();
});
