const readStream = process.openStdin();
const chalk = require('chalk');

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
    let outcome = "success";

    arr.map(function(line, i) {
        if(line.includes("TAP version")){
            process.stdout.write("TAP version bunny" + "\n");
        } 
        else if (line.charAt(0) === "#" && i < arr.length - 6) {
            process.stdout.write(chalk.bold(line.replace("# ", "")) + "\n");
        }
        else if (line.includes("ok")) {
            process.stdout.write(chalk.blue(line.replace("ok ", "  ")) + "\n");
        }
        else if (line.includes("not ok")){
            outcome = "failure";
            process.stdout.write(chalk.red(line.replace("not ok ", "  ")) + "\n");
        }
        else if (line.includes("1..")){
            process.stdout.write(chalk.magenta("````````````````") + "\n" + "\n");
        }
        else if (line.includes("# t")) {
            process.stdout.write(chalk.magenta(line.replace("# t", "T")) + "\n");
        }
        else if (line.includes("# pass") && (outcome == "success")){
            process.stdout.write(chalk.blue(line.replace("# p", "P")) + "\n" + success + "\n")
        } else if (line.includes("# fail")) {
            process.stdout.write(chalk.red(line.replace("# f", "F")) + "\n" + failure + "\n");
        } else {
            process.stdout.write(line + "\n");
        }
    });
})