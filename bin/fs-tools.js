#!/usr/bin/env node

const program = require("commander");
const { resolve } = require("path");

const res = command => resolve(__dirname, "../commands/", command);

program.version(require("../package").version);

program
  .command("replaceContent")
  .description("replace content in the file.")
  .alias("rc")
  .action(() => {
    require(res("replaceContent"));
  });

program
  .command("rearrangeAttachment")
  .description("rearrange the attachments in the md.")
  .alias("ra")
  .action(() => {
    require(res("rearrangeAttachment"));
  });

program
  .command("minifyImages")
  .description("minify the images")
  .alias("mi")
  .action(() => {
    require(res("minifyImages"));
  });

program
  .command("syncFolders")
  .description("sync two folders")
  .alias("sf")
  .action(() => {
    require(res("syncFolders"));
  });

program
  .command("convertWebp")
  .description("convert .webp to .png")
  .alias("cwp")
  .action(() => {
    require(res("convertWebp"))
  });

program
  .command("convertWebg")
  .description("convert .webp to .gif")
  .alias("cwg")
  .action(() => {
    require(res("convertWebm"))
  });

program
  .command("removeRaw")
  .description("remove abandon raw images")
  .alias("rr")
  .action(() => {
    require(res("removeRaw"))
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
