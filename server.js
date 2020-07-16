const puppeteer = require('puppeteer-core');
const shell = require('shelljs');

let interval = 1000;

let isMuted = false;

function mute() {
  if(!isMuted) {
    shell.exec('amixer set Master mute');
    console.log('mute');
    isMuted = true;
  }
}

function unMute() {
  if(isMuted) {
    shell.exec('amixer set Master unmute');
    console.log('unmute');
    isMuted = false;
  }
}

(async () => {
  let launchOptions = { headless: false, 
                          executablePath: '/usr/bin/chromium',
                          args: ['--no-sandbox'],
                          userDataDir: 'config/chromium' };

  const browser = await puppeteer.launch(launchOptions);

  let page = await browser.newPage();
  await page.goto('http://open.spotify.com');

  

  setInterval(async () => {
    const pages = await browser.pages();

    let titles = await Promise.all(pages.map( async (page) => {
      return page.title().then(
        (title) => {
          return title;
        }, (error) => {
          return '';
        });
    }));

    let found = await titles.reduce((prev,title) =>{
      if(prev) {
        return true;
      }

      if(title.startsWith("Advert")) {
        return true;
      }
      return false;

    },false);

    if(!found) {
      unMute();
    } else {
      mute();
    }
  }, interval);
})();

    