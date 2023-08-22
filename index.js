const request = require("request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const getHTML = () => {
    console.log("getHTML function");
};

const getNews = () => {
    request(
        {
            url: "https://sejongjys.sjeduhs.kr/sejongjys-h/na/ntt/selectNttList.do?mi=5791&bbsId=3323",
            method: "GET",
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
            }
          },
      (error, response, body) => {
        if (error) {
          console.error(error);
          return;
        }
        if (response.statusCode === 200) {
          console.log("response ok");

          const $ = cheerio.load(body);

        const notices = [];

        $("div.bbs_ListA table tbody tr").each((index, element) => {
        const $columns = $(element).find("td");

        const number = $columns.eq(0).text().trim();
        const title = $columns.eq(1).find("a").text().trim();
        const author = $columns.eq(2).text().trim();
        const date = $columns.eq(3).text().trim();
        const views = $columns.eq(4).text().trim();

        notices.push({ number, title, author, date, views });
        });

        console.log(notices);
        }
      }
    );
  };
  
  getNews(); // 함수 호출