import * as fs from "node:fs"

export class DataTools {
  static Validate(list) {
    if (list.length == 0) {
      console.log("Empty list given!");
      throw new Error("Empty list on data pipeline!");
    }
  }

  static pruneOnEmptyData(list) {
    this.Validate(list);
    for (let i = list.length - 1; i >= 0; --i) {
      if (list[i].href == "" || list[i].header == "") {
        list.splice(i, 1);
      }
    }
  }

  static pruneOnFewWords(list) {
    this.Validate(list);

    for (let i = list.length - 1; i >= 0; --i) {
      if (list[i].header.split(" ").length < 3) {
        list.splice(i, 1);
      }
    }
  }
  static async purifyData(list) {
    this.pruneOnEmptyData(list);
    this.pruneOnFewWords(list);
  }
}

export class DomLogicHandler {
  constructor() {}

  static async check_node(node) {
    const text_info = await node.evaluate(async (el) => {
      let data_arr = [];
      let clsNm_obj = [];

      function wordCount(item) {
        console.log(item);
        if (item.split(" ").length >= 20) return true;
        else {
          return false;
        }
      }
      async function checkCurrentNode(elem) {
   
        const children = Array.from(elem.children)
        let index;
        if (children.length >= 8) {
          for (let i = 0; i < children.length; ++i) {

            if (clsNm_obj.some((value)=>value.class == children[i].className)) {
              console.log("Function is doing its magic!!!")
              /*clsNm_obj.push({class:elem.children[i].className, count: 1})*/
                clsNm_obj[index].count++
            }
             else{ console.log("Values being pushed: "); clsNm_obj.push({class:children[i].className, count: 1});console.log("Values: " + clsNm_obj);}
            /* if(wordCount(elem.children[i].innerText )){
                
              data_arr.push(elem.children[i].innerText);
            }*/
          }
           

        } else {
          for (child of elem.children) {
            await checkCurrentNode(child);
          }
        }
      }
      
      checkCurrentNode(el);
      
      
      return clsNm_obj;
    });

  return text_info
  }
}
