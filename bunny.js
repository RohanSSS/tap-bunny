#!/usr/bin/env node

const colors = require("colors");
const tapOut = require("tap-out");

let success = `|￣￣￣￣￣|
| SUCCESS  |
| I <3 U   |
|＿＿＿＿＿|
(\\__/) ||
(•ㅅ•) ||
/ 　 づ`;

let failure = `|￣￣￣￣￣|
| FAILURE  |
| I H8 U   |
|＿＿＿＿＿|
(\\__/) ||
(•ㅅ•) ||
/ 　 づ`;

const bunny = () => {
  const readStream = process.openStdin();

  let fileContent = "";

  readStream.on("data", chunk => {
    fileContent += chunk;
  });

  readStream.on("end", () => {
    if (fileContent === "") return process.stdout.write("\nERROR".red + "\n");
    var arr = fileContent.toString().split("\n");
    // console.log(arr);

    displayErrors(arr);
    formatLines(arr);
    addBunny(arr);
    process.stdout.write("\n\n");
  });
};

const addBunny = arr => {
  // console.log(arr);
  if (arr[arr.length - 3].includes("ok")) {
    process.stdout.write(success);
  } else {
    process.stdout.write(failure);
  }
};

const formatLines = arr => {
  let b = false;
  arr.map((line, i) => {
    if (line.charAt(0) == "#" && i < arr.length - 6) {
      const formatted = line.slice(2).bold;
      process.stdout.write("\n" + formatted + "\n");
    } else if (line.slice(0, 2) == "ok") {
      const prefix = line.slice(3, 4) + ". ";
      const formatted = prefix.bold.green + line.slice(5).green;
      process.stdout.write("  " + formatted + "\n");
    } else if (line.slice(0, 3) == "not") {
      const prefix = line.slice(7, 8) + ". ";
      const formatted = prefix.bold.red + line.slice(9).red;
      process.stdout.write("  " + formatted + "\n");
    } else if (line.slice(0, 7) == "# tests" && i > arr.length - 7) {
      const formatted = "Tests: ".cyan.bold + line.slice(7).bold.blue;
      process.stdout.write("\n" + formatted + "\n");
    } else if (line.slice(0, 6) == "# pass" && i > arr.length - 7) {
      const formatted = "Passed:".cyan.bold + line.slice(7).green.bold;
      process.stdout.write(formatted + "\n");
    } else if (i == arr.length - 3) {
      let num = "0";
      if (line.slice(0, 6) == "# fail") num = line.slice(8);
      const formatted = "Failed: ".cyan.bold + num.red.bold;
      process.stdout.write(formatted + "\n");
    } else if (
      line.slice(0, 11) != "TAP version" &&
      line != "" &&
      line.slice(1, 3) != ".."
    ) {
      if (line === "  ---") {
        b = true;
      }
      if (b === false) {
        process.stdout.write(line.italic.yellow + "\n");
      }
      if (line === "  ...") {
        b = false;
      }
    }
  });
  process.stdout.write("\n");
};

const displayErrors = arr => {
  let errors = [];
  arr.map((line, i) => {
    if (line.slice(0, 5) == "  ---") {
      let b = false;
      let e = [];
      for (let j = i - 1; arr[j] != "  ..."; j++) {
        if (arr[j] != "  ---") e.push(arr[j]);
      }
      errors.push(e);
    }
  });
  // console.log(errors);
  errors.map(arr => {
    const title = arr.shift().slice(7).underline.bold;
    process.stdout.write(title + "\n");
    arr.map(line => {
      const formatted = line.slice(2).yellow;
      process.stdout.write(formatted + "\n");
    });
    process.stdout.write("\n");
  });
};

bunny();
