import vscode from 'vscode'
import path from 'path'
import { exec } from 'child_process'

const config = vscode.workspace.getConfiguration('flasho')

function activate (context) {
  const disposable = vscode.commands.registerCommand('flasho.Flash', contextInfo => {
    const pathName = contextInfo.fsPath
    const extension = path.extname(pathName)

    if (extension === '.fla') {
      const programPath = (config.os_bit == '64-bit') ? 'Program Files (x86)' : 'Program Files'
      const execCmd = `"C:\\${programPath}\\Adobe\\Adobe Flash ${config.version}\\Flash.exe" "${pathName}"`

      exec(execCmd)

      if (config.notify) {
        vscode.window.showInformationMessage(`Opening ${path.basename(pathName)} in Adobe Flash`)
      }
    } else {
      if (config.notify) {
        vscode.window.showInformationMessage('Not a valid .fla file.')
      }
    }
  })

  context.subscriptions.push(disposable)
}

export { activate }

function deactivate () {
}

export { deactivate }
