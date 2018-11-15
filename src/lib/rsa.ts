var rs = require('jsrsasign')
var rsu = require('jsrsasign-util')

export function sign (pem: string, passphrase: string, text: string): string {
  var prvKey = rs.KEYUTIL.getKey(pem, passphrase)

  var sig = new rs.Signature({alg: 'SHA1withRSA'})
  sig.init(prvKey)
  sig.updateString(text)
  var sigVal = sig.sign()
  return sigVal
}

export function verify (publicKey: string, text: string, signature: string): boolean {
  var sig = new rs.crypto.Signature({"alg": "SHA1withRSA"})
  sig.init(publicKey)
  sig.updateString(text)
  var isValid = sig.verify(signature)
  return isValid
}
