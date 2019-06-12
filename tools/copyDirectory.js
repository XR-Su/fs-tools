/**
 * @Name: 拷贝文件夹
 * @Description:
 * @author RiSusss
 * @date 2019-05-26
 */

const fs = require("fs");
const path = require("path");

module.exports = function CopyDirectory(src, dest) {
  if (fs.existsSync(dest) == false) {
    fs.mkdirSync(dest);
  }
  if (fs.existsSync(src) == false) {
    return false;
  }
  // console.log("src:" + src + ", dest:" + dest);
  // 拷贝新的内容进去
  let dirs = fs.readdirSync(src);
  dirs.forEach(function(item) {
    let item_path = path.join(src, item);
    let temp = fs.statSync(item_path);
    if (temp.isFile()) {
      // 是文件
      // console.log("Item Is File:" + item);
      fs.copyFileSync(item_path, path.join(dest, item));
    } else if (temp.isDirectory()) {
      // 是目录
      // console.log("Item Is Directory:" + item);
      CopyDirectory(item_path, path.join(dest, item));
    }
  });
};
