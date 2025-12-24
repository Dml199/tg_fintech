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
