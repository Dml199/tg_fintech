export class DataTools {

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
static async purifyData(list){
  this.pruneOnEmptyData(list);
  this.pruneOnFewWords(list);
}



}



export class DomLogicHandler{

  constructor(){

  }

 checkCurrentNode(node){
  data_arr = []
  
  if(node.children.length >= 8){
    for (let i = 0; i< elem_arr.length; ++i){
         data_arr.push(elem_arr[i].innerText)
    } return data_arr
  }
  else {for (child of node.children){checkCurrentNode(child)}}
}

}

