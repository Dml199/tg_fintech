import puppeteer from "puppeteer";



import { DataTools, DomLogicHandler } from "./tools.js";
import {
specs,
FRONT_PAGE_TAG,
CONTENT_PAGE_TAG,
WAIT_FOR_PAGE_TO,
} from "./variables.js";



//import { DbAPIHandler } from "./database_api.js";



const browser_addr = "http://127.0.0.1:5200";



class Browser {
constructor(local_url = "None") {
this.derived_pages = [];
this.address = local_url;
this.browser = async () => {
return this.address === "None"
? await puppeteer.launch()
: await puppeteer.connect({ browserURL: this.address });
};
this.page_content;
this.data = [];
}



async go_to(address) {
const browserInst = await this.browser();
this.page_content = await browserInst.newPage();
await this.page_content.goto(address, {
waitUntil: WAIT_FOR_PAGE_TO,
timeout: 0,
});
return this.page_content;
}



async gather_data() {
this.data = await this.page_content.$$eval("main a", (elems) => {
return elems.map((elem) => ({
header: elem.innerText,
href: elem.href,
}));
});
}



async getTextInfo(page_instance) {




return (this.text_data = await DomLogicHandler.check_node(
await page_instance.$(CONTENT_PAGE_TAG)
));
}
}





async function main() {
const br = new Browser(browser_addr);
await br.go_to(specs.reuters.BASE_URL);
await br.gather_data();
DataTools.purifyData(br.data);
//const valid_list = await DbAPIHandler.findPost(br.data)
//const valid_list_= valid_list.slice(0,5)
//const page_instances = await Promise.all(valid_list_.map(page_desc => br.go_to(page_desc.href)));



//await Promise.all(page_instances.map(async (page, index) => {
//br.data[index].content = await br.getTextInfo(page);
//}));




//await DbAPIHandler.pushPost(br.data)
console.dir(br.data)
}



main()