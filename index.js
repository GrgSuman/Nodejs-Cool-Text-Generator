const { urlencoded } = require('express');
const express = require('express')
const app = express()
const puppeteer = require("puppeteer")

//for templates
app.set('view engine', 'ejs');

//use static folder
app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({extended:false}))


async function start() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto("https://www.fontsforinstagram.com")
  await page.type("#thenitesharya-text","Bijaya")
  const names = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".aryafonts div")).map(x => x.textContent)
  })
  console.log(names)
  await browser.close()
}

// start()

//nickfinder
async function freeFireName(text) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://nickfinder.com/"+text)
    const names = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".copy_variant")).map(x => x.textContent)
    })
    return names
    await browser.close()
  }

// or 0 to turn off the limit
process.setMaxListeners(0)

  app.listen(5000,()=>{
    console.log("Running")
  })

  app.get('/',(req,res)=>{
    res.render('index.ejs')
  })

  app.post('/freefire-name',async(req,res)=>{
    const text = req.body.text
    let fancyText = await freeFireName(text)
    res.json({coolNames:fancyText})
  })



