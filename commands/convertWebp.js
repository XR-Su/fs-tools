/**
 * @Name:
 * @Description: convert .webp to .png
 * @author RiSusss
 * @date 2019-06-12
 */

const path = require("path");
const folderPath = process.argv[3];
const execFile = require("child_process").execFile;
const dwebp = require("dwebp-bin").path;
const { getFolderFiles } = require("../tools");

const { webps } = getFolderFiles(folderPath);

webps.forEach((webp, index) => {
  const fileName = path.basename(webp, ".webp");
  execFile(dwebp, [webp, "-o", folderPath + "/" + fileName + ".png"], function(
    error
  ) {
    if (error) {
      throw error;
    }

    console.log(`${fileName} was converted`);
  });
});
