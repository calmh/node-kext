var sudo = require('sudo');
var exec = require('child_process').exec;

exports.exists = exists;
exports.load = load;
exports.ensure = ensure;

function exists(bundle, cb) {
    exec('kextstat -lb ' + bundle, function (err, stdout, stderr) {
        cb(err, !!stdout.match(bundle));
    });
}

function load(kext, cb) {
    var ld = sudo(['/sbin/kextload', kext]);
    ld.on('exit', cb);
}

function ensure(bundle, kext, cb) {
    exists(bundle, function (err, ex) {
        if (err) {
            return cb(err);
        }
        if (ex) {
            return cb(null, true);
        }
        load(kext, function (status) {
            if (status !== 0) {
                return cb(null, false);
            }
            exists(bundle, cb);
        });
    });
}
