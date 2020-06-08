/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-27
 */
const path = require("path");
const fs = require("fs");
const { getFolderFiles } = require("../tools");

const folderPath = process.argv[3];
let { raws, images } = getFolderFiles(folderPath);
images = images.map(img => path.parse(img).name);
raws.forEach(raw => {
  images.indexOf(path.parse(raw).name) !== -1 ? "" : fs.unlinkSync(raw);
});
