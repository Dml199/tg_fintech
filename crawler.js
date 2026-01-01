import { data } from "./stocks_by_mar_cap.js";
import url_list from "./url_list.js";
import puppeteer from "puppeteer";
import * as url from 'node:url'
import {DataTools, DomLogicHandler} from "./tools.js"
import {specs, FRONT_PAGE_TAG,CONTENT_PAGE_TAG,WAIT_FOR_PAGE_TO} from "./variables.js"

const browser_addr = "http://127.0.0.1:5200"

class Browser {
constructor (local_url = "None") {


this.derived_pages = []
this.address = local_url;
this.browser = async () => {return this.address === "None" ? await puppeteer.launch(): await puppeteer.connect({browserURL:this.address})}
this.page_content
this.data =[]
}

async go_to(address){
const browserInst = await this.browser()
this.page_content = await browserInst.newPage()
await this.page_content.goto(address,{waitUntil:WAIT_FOR_PAGE_TO, timeout:0})
return this.page_content
}

async gather_data(){
  this.data = await this.page_content.$$eval("main", (elems) => {
    return elems.map((elem) => ({  
      header: elem.innerText,
      href: elem.href
    }));
  });

}



async getTextInfo(){
  /*try{
  let interval= 5;
  let start = 0;
  let end = start + interval;
  data_slice = this.data.slice(start,end)*/

 
 /* for (let i = start;i<=end; ++i){
   this.derived_pages.push(await this.go_to(this.data[i].href))
 for (let j = 0; i<=end ; ++i) {
       this.text_data = DomLogicHandler.checkCurrentNode(this.derived_pages[j].$("main"))
        
   }
 }
}
catch (e) {
  console.log(e.message)
}*/

return this.text_data =await DomLogicHandler.check_node(await this.page_content.$(CONTENT_PAGE_TAG))
}

}


async function main(){
const br = new Browser(browser_addr)
await br.go_to(specs.reuters.BASE_URL)
await br.gather_data()
DataTools.purifyData(br.data)
const text_info = await br.getTextInfo()
console.dir(text_info)
}



main()