#!/usr/bin/env node

const colors = require("colors");

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

  // readStream.on("error", () => {
  //     cb(err, fileContent);
  // })

  readStream.on("end", () => {
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
  arr.map((line, i) => {
    if (line.charAt(0) == "#" && i < arr.length - 6) {
      const formatted = line.slice(2).bold;
      process.stdout.write("\n" + formatted + "\n");
    } else if (line.slice(0, 2) == "ok") {
      const formatted = line.slice(3).green;
      process.stdout.write("  " + formatted + "\n");
    } else if (line.slice(0, 3) == "not") {
      const formatted = line.slice(6).red;
      process.stdout.write(" " + formatted + "\n");
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
