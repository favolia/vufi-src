const util = require('util');
const execute = util.promisify(require('child_process').exec);

async function exec(command) {
  try {
    const { stdout, stderr } = await execute(command);
    if (stderr) {
      return `exec error: ${stderr}`;
    } else {
      return `exec output:
      
${stdout}`;
    }
  } catch (error) {
    return `Error: ${error}`;
  }
}

module.exports = {
  exec
}