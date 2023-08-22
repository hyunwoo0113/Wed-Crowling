const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const request = require('request-promise-native'); // 프로미스를 위해 request-promise-native 사용

(async () => {
  const siteUrl = 'https://sejongjys.sjeduhs.kr/sejongjys-h/na/ntt/selectNttList.do?mi=5791&bbsId=3323';
  const userAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto(siteUrl, { timeout: 120000 });

    // 첫번째 글 클릭
    //await page.click('.bbs_tit a');
    await page.click('#subContent > div.subContent > div.bbs_ListA > table > tbody > tr:nth-child(1) > td.bbs_tit.ta_l > a');


    // 클릭 후에 나타나는 새로운 페이지가 로딩될 때까지 대기
    await page.waitForSelector('.bbs_ViewA');

    // 글 내용의 HTML 내용 가져오기
    const postHtml = await page.content();

    const notices = getNotices(postHtml);

    console.log(notices);
  } catch (error) {
    console.error('오류가 발생했습니다:', error);
  } finally {
    await browser.close();
  }
})();

async function getNotices(html) {
  const $ = cheerio.load(html);

  const notices = [];

  $("div.bbs_ViewA").each((index, element) => {
    const $columns = $(element);

    const title = $columns.find('h3').text().trim();
    const author = $columns.find('li').eq(0).text().trim().replace(/작성자|\n|\t/g, '');  
    const date = $columns.find('li').eq(1).text().trim().replace(/작성일|\n|\t/g, '');
    const contents = $columns.find('.se-contents').text().trim();

    notices.push({ title, author, date, contents });
  });

  return notices;
}
