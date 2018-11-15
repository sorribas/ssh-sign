interface Window {
  sshSign(str: string, cb: (e: Error, s: string) => void): void
}

window.sshSign = function (str: string, cb: (e: Error, s: string) => void) {
  var called = false
  window.dispatchEvent(new CustomEvent<string>('ssh-rsa-request-signature', { detail: str})) 
  window.addEventListener('ssh-rsa-request-signature-reply', onsignaturereply)

  function onsignaturereply (signature: any) {
    if (called) return
    called = true
    cb(null, signature.detail)
  }
}
