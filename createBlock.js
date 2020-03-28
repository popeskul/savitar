'use strict';

// Block file generator

// Usage: node createBlock.js [block name] [ext. space extensions]

const fs = require('fs');
const projectConfig = require('./projectConfig.json');

const dirs = projectConfig.dirs;
const mkdirp = require('mkdirp');

const blockName = process.argv[2]; // get the name of the block
const defaultExtensions = ['scss', 'html', 'img']; // default extensions
const extensions = uniqueArray(defaultExtensions.concat(process.argv.slice(3))); // add the extensions you entered when calling (if there's)

// If there is a block name
if (blockName) {
  const dirPath = `${dirs.srcPath + dirs.blocksDirName}/${blockName}/`; // full path to the block folder to be created
  mkdirp(dirPath, err => {
    // create
    // If any mistake - show
    if (err) {
      console.error(`[Touch Invest] Cancel operation: ${err}`);
    }

    // No mistake, let's go!
    else {
      console.log(`[Touch Invest] Create folder ${dirPath} (if absent)`);

      // We go around the array of extensions and create files if they are not already created
      extensions.forEach(extention => {
        const filePath = `${dirPath + blockName}.${extention}`; // full path to the file to be created
        let fileContent = ''; // future file content
        let fileCreateMsg = ''; // future console message when creating a file

        // If it is SCSS
        if (extention === 'scss') {
          fileContent = `\n.${blockName} {\n  $block-name: &; // #{$block-name}__element {}\n}\n`;
          // fileCreateMsg = '';

          // Add the created file.
          let hasThisBlock = false;
          for (const block in projectConfig.blocks) {
            if (block === blockName) {
              hasThisBlock = true;
              break;
            }
          }
          if (!hasThisBlock) {
            projectConfig.blocks[blockName] = [];
            const newPackageJson = JSON.stringify(projectConfig, '', 2);
            fs.writeFileSync('./projectConfig.json', newPackageJson);
            fileCreateMsg =
              '[Touch Invest] Block connection added in projectConfig.json';
          }
        }

        // If it's HTML
        else if (extention === 'html') {
          fileContent = `<!--DEV\n\@ @include('blocks/${blockName}/${blockName}.html')\nMore: https://www.npmjs.com/package/gulp-file-include\n-->\n<div class="${blockName}">content</div>\n`;
          // fileCreateMsg = '';
        }

        // If it's js
        else if (extention === 'js') {
          fileContent =
            "// document.addEventListener('DOMContentLoaded', function(){});\n// (function(){\n// code\n// }());\n";
        }

        // If you need a subfolder for pictures
        else if (extention === 'img') {
          const imgFolder = `${dirPath}img/`;
          if (fileExist(imgFolder) === false) {
            mkdirp(imgFolder, err => {
              if (err) console.error(err);
              else
                console.log(
                  `[Touch Invest] Create folder: ${imgFolder} (if absent)`
                );
            });
          } else {
            console.log(
              `[Touch Invest] Folder ${imgFolder} NOT created (already exists) `
            );
          }
        }

        // Create a file if it does not already exist
        if (fileExist(filePath) === false && extention !== 'img') {
          fs.writeFile(filePath, fileContent, err => {
            if (err) {
              return console.log(`[Touch Invest] File NOT Created: ${err}`);
            }
            console.log(`[Touch Invest] File created: ${filePath}`);
            if (fileCreateMsg) {
              console.warn(fileCreateMsg);
            }
          });
        } else if (extention !== 'img') {
          console.log(
            `[Touch Invest] File NOT Created: ${filePath} (already exists)`
          );
        }
      });
    }
  });
} else {
  console.log('[Touch Invest] Cancel operation: block not specified');
}

// Leave only unique values in the array (remove repetitions)
function uniqueArray(arr) {
  const objectTemp = {};
  for (let i = 0; i < arr.length; i++) {
    const str = arr[i];
    objectTemp[str] = true; // remember a string as an object property
  }
  return Object.keys(objectTemp);
}

// Check file existence
function fileExist(path) {
  const fs = require('fs');
  try {
    fs.statSync(path);
  } catch (err) {
    return !(err && err.code === 'ENOENT');
  }
}
