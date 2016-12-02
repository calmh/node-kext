# This project is not actively maintained

Issues and pull requests on this repository may not be acted on in a timely
manner, or at all.  You are of course welcome to use it anyway. You are even
more welcome to fork it and maintain the results.

![Unmaintained](https://nym.se/img/unmaintained.jpg)

node-kext
=========

```javascript
var kext = require('kext');

// Ensure that the module with bundle id 'foo.tun' is loaded.  If it isn't, try
// to load it from the specified kext.  Calls the callback as cb(null, true) if
// the module is or could be loaded, cb(null, false) otherwise, or with an
// error object if something failed spectacularly.

kext.ensure('foo.tun', '/Library/Extensions/tun.kext', console.log);
```

License
-------

MIT
