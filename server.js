const puppeteer = require('puppeteer-core');

let interval = 3000;


(async () => {
    // set some options (set headless to false so we can see 
    // this automated browsing experience)
    let launchOptions = { headless: false, 
                          executablePath: '/usr/bin/chromium', // because we are using puppeteer-core so we must define this option
                          args: ['--no-sandbox'],
                        userDataDir: '~/.config/chromium' };

    const browser = await puppeteer.launch(launchOptions);

    const pages = await browser.pages();


    setInterval(async () => {
      pages.forEach( async (page) => {
        let title = await page.title();
        if(title.startsWith("asdf")) {

            // mute
            console.log("mute");


            let unmuteInterval = setInterval(async () => {
                let title = await page.title();
                if(!title.startsWith("asdf")) {
                    console.log('unmute');
                    clearInterval(unmuteInterval);
                }
            }, 1000);
        }
    })

    
    }, interval);

      
   
    // const page = await browser.newPage();

    // // set viewport and user agent (just in case for nice viewing)
    // await page.setViewport({width: 1366, height: 768});
    // await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    // // go to the target web
    // await page.goto('https://google.com');

    // console.log(await browser.version());

    // close the browser
    // await browser.close();
})();

    