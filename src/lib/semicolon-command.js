'use strict';
const vscode = require('vscode');
const Range = vscode.Range;
module.exports = semicolonCommand;

function semicolonCommand(textEditor, textEditorEdit) {
  const cursorPosition = textEditor.selection.active;
  const line = textEditor.document.lineAt(cursorPosition);

  const cycle = [";", ","];

  const next = (char) => {
    const index = cycle.indexOf(char) + 1;
    return index && index < cycle.length ? cycle[index] : null;
  }

  const endChar = line.text[line.text.length - 1];

  // if end char is already one in the cycle, move to the next char
  if (cycle.includes(endChar)) {
    const nextChar = next(endChar);
    textEditorEdit.delete(new Range(
      line.range.end.translate(0, -1),
      line.range.end
    ));

    if (nextChar) {
      textEditorEdit.insert(line.range.end, nextChar);
      return;
    }
  } else {
    textEditorEdit.insert(line.range.end, cycle[0]);
  }
}
