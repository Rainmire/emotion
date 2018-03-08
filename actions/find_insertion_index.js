const findInsertionIndex = (emotes, cmd, start = 0, end = emotes.length - 1) => {
  let midpt = parseInt((start + end)/2, 10);

  if (start >= end) {
    if (emotes.length === 0 || cmd < emotes[midpt].command) {
      return midpt;
    } else {
      return midpt + 1;
    }
  }

  let cmd1 = emotes[midpt].command;
  let cmd2 = emotes[midpt + 1].command;

  if (cmd < cmd1) {
    return findInsertionIndex(emotes, cmd, start, midpt - 1);
  } else if (cmd > cmd2) {
    return findInsertionIndex(emotes, cmd, midpt + 1, end);
  } else {
    return midpt + 1;
  }
}

module.exports = findInsertionIndex;