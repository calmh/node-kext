var kext = require('./lib/kext');

// Ensure that the module with bundle id 'foo.tun' is loaded.  If it isn't, try
// to load it from the specified kext.  Calls the callback as cb(null, true) if
// the module is or could be loaded, cb(null, false) otherwise, or with an
// error object if something failed spectacularly.

kext.ensure('foo.tun', '/Library/Extensions/tun.kext', console.log);

