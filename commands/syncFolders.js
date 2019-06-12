/**
 * @Name: 同步两个文件件
 * @Description:
 * @author RiSusss
 * @date 2019-05-26
 */
const { prompt } = require("inquirer");
const { getFolderFiles, removeDirectory, copyDirectory } = require("../tools");
const fs = require("fs");
// const { promisify } = require("util");
// const statAsync = promisify(fs.stat);

const questions = [
  {
    type: "input",
    name: "srcF",
    message: "set the source folder:"
  },
  {
    type: "input",
    name: "tarF",
    message: "set the target folder:"
  }
];

const syncFolders = (srcF, tarF) => {
  const { files: srcFiles, folders: srcInFs } = getFolderFiles(srcF);
  const { files: tarFiles, folders: tarInFs } = getFolderFiles(tarF);
  const { copyItems: copyFiles, removeItems: removeFiles } = diffList(
    srcFiles,
    tarFiles
  );
  const { copyItems: copyFolders, removeItems: removeFolders } = diffList(
    srcInFs,
    tarInFs
  );
  const tarfolderMap = getFilesNameMap(tarInFs);
  copy(srcF, tarF, copyFiles);
  copy(srcF, tarF, copyFolders);
  remove(tarF, removeFiles);
  remove(tarF, removeFolders);
  srcInFs.forEach(folder => {
    let folerName = folder.split("/").pop();
    if (!copyFolders[folerName]) {
      syncFolders(folder, tarfolderMap[folerName]);
    }
  });
};

/**
 * 获取文件名称 map
 * @param {} files
 * @returns {} {fileName: filePath}
 */
const getFilesNameMap = files => {
  const map = {};
  files.forEach(file => {
    map[file.split("/").pop()] = file;
  });
  return map;
};

/**
 * @desc 拷贝文件
 */
const copy = (srcF, tarF, files = {}) => {
  let src, tar, file;
  for (let name in files) {
    file = files[name];
    src = srcF + "/" + name;
    tar = tarF + "/" + name;
    if (file.isDir) {
      copyDirectory(src, tar);
    } else {
      fs.copyFileSync(src, tar);
    }
  }
};

/**
 * @desc 删除文件
 * @param {} tarF
 * @param {*} files
 */
const remove = (tarF, files = {}) => {
  let tar, file;
  for (let name in files) {
    file = files[name];
    tar = file.path;
    if (file.isDir) {
      removeDirectory(tar);
    } else {
      fs.unlinkSync(tar);
    }
  }
};

/**
 * @desc tar 中没有的复制
 *       src 中更新的覆盖
 *       tar 中没有的移除
 * @param {*} srcList
 * @param {*} tarList
 */
const diffList = (srcList = [], tarList = []) => {
  const srcMap = getFilesMap(srcList);
  const tarMap = getFilesMap(tarList);
  const copyItems = getCopyItems(srcMap, tarMap);
  const removeItems = getRemoveItems(srcMap, tarMap);
  return { copyItems, removeItems };
};

/**
 * @desc 获取目标文件夹中被移除项
 * @param {*} srcMap
 * @param {*} tarMap
 */
const getRemoveItems = (srcMap, tarMap) => {
  let file;
  let removeItems = {};
  for (let el in tarMap) {
    file = srcMap[el];
    // console.log(file)
    if (!file) {
      removeItems[el] = tarMap[el];
    }
  }
  return removeItems;
};

/**
 * @desc 获取源文件夹中需要复制的项
 * @param {*} srcMap
 * @param {*} tarMap
 */
const getCopyItems = (srcMap, tarMap) => {
  let file;
  let copyItems = {};
  for (let el in srcMap) {
    file = tarMap[el];
    // 没有：便复制
    if (!file) {
      copyItems[el] = srcMap[el];
    }
    // 有：
    else {
      // 判断 src 文件的 mtime 是否大于 tar 中的
      // 如果是文件夹不用判断
      if (!srcMap[el].isDir && srcMap[el].mtime > tarMap[el].mtime) {
        copyItems[el] = srcMap[el];
      }
    }
  }
  return copyItems;
};

/**
 * @desc 将文件信息存储为 hashMap
 * @param {*} list
 */
const getFilesMap = list => {
  const map = {};
  list.forEach(el => {
    const name = el.split("/").pop();
    const stat = fs.statSync(el);
    map[name] = {
      name,
      path: el,
      mtime: stat.mtime,
      isDir: stat.isDirectory()
    };
  });
  return map;
};

module.exports = prompt(questions).then(({ srcF, tarF }) => {
  console.time("use time:");
  srcF = srcF.trim();
  tarF = tarF.trim();
  syncFolders(srcF, tarF);
  console.timeEnd("use time:");
});
