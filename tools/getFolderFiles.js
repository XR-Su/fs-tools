/**
 * @Name:
 * @Description: get filePath from the folder
 * @author RiSusss
 * @date 2019-05-26
 */
const fs = require("fs");

const getFolderFiles = folderPath => {
  let mds = [];
  let images = [];
  let folders = [];
  let files = [];
  let webps = [];
  if (!fs.existsSync(folderPath)) {
    console.log("path not exist !");
    return;
  }
  fs.readdirSync(folderPath).forEach(file => {
    const filePath = folderPath + "/" + file;
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      if (/(.*)\.(md)/.test(file)) {
        mds.push(filePath);
      } else if (/(.*)\.(jpg|jpeg|png)/.test(file)) {
        images.push(filePath);
      } else if (/(.*)\.(webp)/.test(file)) {
        webps.push(filePath);
      }
      files.push(filePath);
    } else if (stat.isDirectory()) {
      folders.push(filePath);
    }
  });
  return { mds, images, files, folders, webps };
};

module.exports = getFolderFiles;
