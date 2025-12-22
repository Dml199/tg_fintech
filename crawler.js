import { data } from "./stocks_by_mar_cap.js";
import url_list from "./url_list.js";
import puppeteer from "puppeteer";
import * as url from 'node:url'


const specs= {
reuters:{BASE_URL:"https://www.reuters.com",
selector_query:".search-results__list__2SxSK a",
heading_query:".search-results__list__2SxSK header span"
},
yahoo:{BASE_URL:"https://finance.yahoo.com/",
selector_query:".search-results__list__2SxSK a",
heading_query:".search-results__list__2SxSK header span"
}
}

const browser_addr = "http://127.0.0.1:5200"

class Browser {
constructor (local_url = "None") {



this.address = local_url;
this.browser = async () => {return this.address === "None" ? await puppeteer.launch(): await puppeteer.connect({browserURL:this.address})}
this.page_content
this.data =[]
}

async go_to(address){
const browserInst = await this.browser()
this.page_content = await browserInst.newPage()
await this.page_content.goto(address,{waitUntil:"domcontentloaded", timeout:0})

}

async gather_data(){
  this.data = await this.page_content.$$eval("main ul li a", (elems) => {
    return elems.map((elem) => ({  
      header: elem.innerText,
      href: elem.href
    }));
  });

}
}


class DataTools {

  static Validate(list){
    if (list.length == 0) {console.log("Empty list given!"); throw new Error("Empty list on data pipeline!")}  

  }


  static pruneOnEmptyData(list){
    this.Validate(list)
         for(let i = list.length-1;i>=0;--i){
        if (list[i].href == "" || list[i].header == ""){
            list.splice(i,1)
        }
    }
     
  }


  static pruneOnFewWords(list){
    this.Validate(list)
     
     for(let i = list.length-1;i>=0;--i){
        if (list[i].header.split(" ").length < 3){
            list.splice(i,1)
        }
  }
}

}




async function main(){
const br = new Browser(browser_addr)
await br.go_to(specs.reuters.BASE_URL)
await br.gather_data()
DataTools.pruneOnEmptyData(br.data)
DataTools.pruneOnFewWords(br.data)
console.log(br.data)
}



main()