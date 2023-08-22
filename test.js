const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    const siteUrl = 'https://sejongjys.sjeduhs.kr/sejongjys-h/na/ntt/selectNttList.do?mi=5791&bbsId=3323';

    await page.goto(siteUrl);

    // "세종시 시민안전보험 홍보" 글 클릭
    await page.click('.bbs_tit a');

    // 클릭 후에 나타나는 새로운 페이지가 로딩될 때까지 대기
    await page.waitForNavigation();

    // 새로운 페이지의 HTML 코드 가져오기
    const postHtml = await page.content();

    console.log('Post HTML:', postHtml);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
})();
