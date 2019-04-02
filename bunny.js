const colors = require("colors");
const readStream = process.openStdin();

let msg = "";

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

let fileContent = "";

readStream.on("data", chunk => {
  fileContent += chunk;
});

// readStream.on("error", () => {
//     cb(err, fileContent);
// })

readStream.on("end", () => {
  var arr = fileContent.toString().split("\n");
  console.log(arr);

  formatLines(arr);
  addBunny(arr);
});

const addBunny = arr => {
  // console.log(arr);
  if (arr[arr.length - 3].includes("ok")) {
    process.stdout.write("\n" + success);
  } else {
    process.stdout.write("\n" + failure);
  }
};

const formatLines = arr => {
  let string = "";
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
    }
  });
  string += "\n";
  return string;
};
