const puppeteer = require('puppeteer-core');

let interval = 3000;


(async () => {
    // set some options (set headless to false so we can see 
    // this automated browsing experience)
    let launchOptions = { headless: false, 
                          executablePath: '/usr/bin/chromium',
                          args: ['--no-sandbox'],
                        userDataDir: '~/.config/chromium' };

    const browser = await puppeteer.launch(launchOptions);

    setInterval(async () => {
      const pages = await browser.pages();

      pages.forEach( async (page) => {
        let title = await page.title();
        if(title.startsWith("www.goo")) {

            // mute
            console.log("mute");

            let unmuteInterval = setInterval(async () => {
                let title = await page.title();
                if(!title.startsWith("www.goo")) {
                    console.log('unmute');
                    clearInterval(unmuteInterval);
                }
            }, 1000);
        }
    })  
    }, interval);
})();

    