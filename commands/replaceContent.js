/**
 * 替换文件 img 的路径
 * 之后扩展为替换文件中指定内容
 */
const fs = require("fs");
const filePath = process.argv[3];
const dirName = "assets";

/**
 * 解析文件夹
 * @param folderPath
 */
const parseFolder = folderPath => {
  const { files, folders } = getFolderFiles(folderPath);
  folders.forEach(folderPath => {
    parseFolder(folderPath);
  });
  files.forEach(filePath => {
    parseFile(filePath);
  });
};

/**
 * 解析文件
 * @param filePath
 */
const parseFile = filePath => {
  fs.readFile(filePath, "utf8", (err, data) => {
    let newData = changeImgPath(data);

    newData = new Buffer.from(newData);
    fs.writeFile(filePath, newData, { encoding: "utf8" }, err => {});
  });
};

/**
 * 修改图片路径
 * @desc 修改文件中的图片路径
 * @param data
 * @returns {void | string | never}
 */
const changeImgPath = data => {
  let reg = /!\[(.*?)\]\((.*?)\/(.*?)\)/g;
  return data.replace(reg, `![$1](${dirName}/$3)`);
};

/**
 * 获取文件路径
 * @desc 获取文件夹中所有文件路径
 * @param folderPath
 */
const getFolderFiles = folderPath => {
  let files = [];
  let folders = [];
  fs.readdirSync(folderPath).forEach(file => {
    const filePath = folderPath + "/" + file;
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      if (/(.*)\.(md)/.test(file)) {
        files.push(filePath);
      }
    } else if (stat.isDirectory()) {
      folders.push(filePath);
    }
  });
  return { files, folders };
};

const fileState = fs.statSync(filePath);
if (fileState.isDirectory()) {
  parseFolder(filePath);
} else {
  parseFile(filePath);
}
