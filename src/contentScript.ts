import * as fs from 'fs'
import * as path from 'path'

var src = fs.readFileSync(path.join(__dirname, '..', 'web', 'on-page-script.js')).toString()
inject(src)

function inject (content: string) {
  try {
    var container = document.head || document.documentElement
    var scriptTag = document.createElement('script')
    scriptTag.setAttribute('async', 'false')
    scriptTag.textContent = content
    container.insertBefore(scriptTag, container.children[0])
    container.removeChild(scriptTag)
  } catch (e) {
    console.error('Error injecting script', e)
  }
}

window.addEventListener('ssh-rsa-request-signature', function (evt: any) {
  chrome.runtime.sendMessage({message: evt.detail})
})

chrome.runtime.onMessage.addListener(function (msg) {
  window.dispatchEvent(new CustomEvent<string>('ssh-rsa-request-signature-reply', {detail: msg.signature}))
})
