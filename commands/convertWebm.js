/**
 * @Name:
 * @Description: convert .webp to .gif
 * @author RiSusss
 * @date 2019-06-12
 */

const path = require("path");
const folderPath = process.argv[3];
const execFile = require("child_process").execFile;
const dwebp = require("dwebp-bin").path;
const { getFolderFiles } = require("../tools");

const { webms } = getFolderFiles(folderPath);

webms.forEach((webm, index) => {
	const fileName = path.basename(webm, ".webm");
	execFile(dwebp, [webm, "-o", folderPath + "/" + fileName + ".gif"], function(
		error
	) {
		if (error) {
			throw error;
		}

		console.log(`${fileName} was converted`);
	});
});
