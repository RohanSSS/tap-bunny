const readStream = process.openStdin();

let success = 
`|￣￣￣￣￣|
| SUCCESS  |  
| I <3 U   | 
|＿＿＿＿＿| 
(\\__/) || 
(•ㅅ•) || 
/ 　 づ`;

let failure =
`|￣￣￣￣￣|
| FAILURE  |  
| I H8 U   | 
|＿＿＿＿＿| 
(\\__/) || 
(•ㅅ•) || 
/ 　 づ`;

let fileContent = "";

readStream.on("data", (chunk) => {
    fileContent += chunk;
});

// readStream.on("error", () => {
//     cb(err, fileContent);
// })

readStream.on("end", () => {
    var arr = fileContent.toString().split('\n');
//console.log(arr);
arr.forEach(function(line) {
    if (line.includes("# fail")) {
    process.stdout.write(fileContent + failure + "\n");
    } else if (line.includes("# pass")) {
    process.stdout.write(fileContent + success + "\n");
    }
});
})