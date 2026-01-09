
//import { prisma } from "./lib/prisma.js";

export class DataTools {
  static Validate(list) {
    if (list.length == 0) {
      console.log("Empty list given!");
      throw new Error("Empty list on data pipeline!");
    }
  }

  static pruneOnEmptyData(list) {
    for (let i = list.length - 1; i >= 0; --i) {
      if (list[i].href == "" || list[i].header == "") {
        list.splice(i, 1);
      }
    }
  }

  static pruneOnFewWords(list) {
    for (let i = list.length - 1; i >= 0; --i) {
      if (list[i].header.split(" ").length < 3) {
        list.splice(i, 1);
      }
    }
  }

  static async purifyData(list) {
    this.Validate(list);
    this.pruneOnEmptyData(list);
    this.pruneOnFewWords(list);
  }
}

export class DomLogicHandler {
  static async check_node(node) {
    const text_info = await node.evaluate(async (el) => {
      function wordCount(item) {
        return item.split(" ").length >= 20;
      }

      async function checkCurrentNode(elem) {
        const children = Array.from(elem.children);
        
        if (children.length >= 8) {
          const clsNm_obj = [];
          
          // Count class occurrences
          for (let i = 0; i < children.length; ++i) {
            const index = clsNm_obj.findIndex(e => e.class == children[i].className);
            if (index == -1) {
              clsNm_obj.push({ class: children[i].className, count: 1 });
            } else {
              clsNm_obj[index].count++;
            }
          }
          
          // Find biggest class group
          let biggest = clsNm_obj[0];
          for (let j = 0; j < clsNm_obj.length; ++j) {
            if (clsNm_obj[j].count > biggest.count) {
              biggest = clsNm_obj[j];
            }
          }
          
          // Collect text from most common class
          children.map(elem => {
            if (elem.className == biggest.class) {
              if (elem.textContent && wordCount(elem.textContent)) {
                data_arr.push(elem.textContent);
              }
            }
          });
        } else {
          for (let child of children) {
            await checkCurrentNode(child);
          }
        }
      }

      const data_arr = [];
      await checkCurrentNode(el);
      return data_arr.join(" ");
    });

    return text_info;
  }
}
/* 
export class DbAPIHandler {
  static async findPost(postList) {
    return postList.filter(async (unit) => {
      const existing = await prisma.post.findFirst({ 
        where: { title: { equals: unit.header } } 
      });
      return !existing;
    });
  }

  static async pushPost(postList) {
    for (const post of postList) {
      await prisma.post.create({
        data: {
          url: post.href,
          title: post.header,
          content: post.content || null,
        }
      });
    }
  }
} */
  