#!/usr/bin/env node

const bunny = require("../bunny.js");

const readStream = process.openStdin();

let fileContent = "";

readStream.on("data", chunk => {
  fileContent += chunk;
});

readStream.on("end", () => {
  if (fileContent === "") return bunny.errorBunny();
  var arr = fileContent.toString().split("\n");

  bunny.displayErrors(arr);
  bunny.formatLines(arr);
  bunny.addBunny(arr);
  process.stdout.write("\n\n");
});
