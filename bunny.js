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
  console.log(arr.length);

  process.stdout.write(fileContent + addBunny(arr) + "\n");
});

const addBunny = arr => {
  console.log(arr);
  if (arr[arr.length - 3].includes("ok")) {
    return success;
  } else {
    return failure;
  }
};
