//Importing modules.
let fs = require("fs");
let path = require("path");

let extensions = {
  Images: [".png", ".jpg", ".jpeg", ".gif"],
  Audio: [".mp3"],
  Videos: [".mp4", ".mkv"],
  Documents: [".pdf", ".doc", ".txt"],
  Compressed: [".zip", ".rar"],
};

//Taking input from user.
let input = process.argv.slice(2);
let folderPath = input[0];

//Reading contents of folder.
let content = fs.readdirSync(folderPath);
let extFolderPath = folderPath;

// Move file to a folder.
function moveFileToFolder(fileName, extFolderPath) {
  fs.renameSync(folderPath + "\\" + fileName, extFolderPath + "\\" + fileName);
}
// Create Folder.
function createFolder(extFolderPath) {
  fs.mkdirSync(extFolderPath);
}
// Check folder exists or not.
function checkFolder(extension, folderPath) {
  for (let key in extensions) {
    let arr = extensions[key];
    let exitOrNot = arr.includes(extension);

    if (exitOrNot == true) {
      extFolderPath = path.join(folderPath, key);
      break;
    }
  }
  return fs.existsSync(extFolderPath);
}

for (let i = 0; i < content.length; i++) {
  let extensionName = path.extname(content[i]);
  let extensionFolderExit = checkFolder(extensionName, folderPath);

  if (extensionFolderExit == false) {
    createFolder(extFolderPath);
    moveFileToFolder(content[i], extFolderPath);
  } else {
    if (content[i] in extensions) {
      continue;
    }
    moveFileToFolder(content[i], extFolderPath);
  }
}
