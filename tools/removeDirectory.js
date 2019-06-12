/**
 * @Name: 删除文件夹
 * @Description:
 * @author RiSusss
 * @date 2019-05-26
 */

const fs = require("fs");
const path = require("path");

module.exports = function DeleteDirectory(dir) {
  if (fs.existsSync(dir) == true) {
    let files = fs.readdirSync(dir);
    files.forEach(function(item) {
      let item_path = path.join(dir, item);
      if (fs.statSync(item_path).isDirectory()) {
        DeleteDirectory(item_path);
      } else {
        fs.unlinkSync(item_path);
      }
    });
    fs.rmdirSync(dir);
  }
};
