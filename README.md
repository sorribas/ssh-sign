ssh-sign
========

Browser extension to store ssh keys and sign messages with them. Right now only supports
Google Chrome and RSA keys.

How it works
------------

Install the Chrome extension and add your private keys, then you can use the `sshSign` function
from any tab within your web browser. The function signature is like this.

```
sshSign(str: string, cb: (e: Error, s: string) => void): void
```

when this function gets called, a popup opens with the string to be signed so that the user can approve
the signature, and enter the key passphrase if necessary. When the user approves the signature, the callback
gets called with null and a string containing the signature.

Why?
----

You can use this to authenticate users as an alternative to username and password combinations. It might
be preferable in cases where you already have ssh keys as an authentication method for ssh, or you can
use it to authenticate users who's public keys are already known (e.g. from github).
