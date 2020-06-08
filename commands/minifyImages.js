/**
 * @Name: 压缩文件夹下的图片
 * @Description:
 * @author RiSusss
 * @date 2019-05-26
 */
const folderPath = process.argv[3];
const fs = require("fs");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

const launch = folderPath => {
  fs.readdirSync(folderPath).forEach(file => {
    const filePath = folderPath + "/" + file;
    const stat = fs.statSync(filePath);
    if (stat.isFile() && stat.size > 1000000) {
      if (/(.*)\.(jpg|png)/.test(file)) {
        minifyImage(filePath);
      }
    }
  });
};

const minifyImage = filePath => {
  imagemin([filePath], `${folderPath}/build`, {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  });
};

launch(folderPath);

// (async () => {
//   const files = await imagemin(
//     [`${filePath}/*.{jpg,png}`],
//     `${filePath}/build`,
//     {
//       plugins: [
//         imageminJpegtran(),
//         imageminPngquant({
//           quality: [0.6, 0.8]
//         })
//       ]
//     }
//   );
// })();
