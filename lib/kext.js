var async = require('async');
var sudo = require('sudo');
var exec = require('child_process').exec;
var con = require('yacon');

exports.exists = exists;
exports.existsAny = existsAny;
exports.load = load;
exports.ensure = ensure;

function exists(bundle, cb) {
    exec('kextstat -lb ' + bundle, function (err, stdout, stderr) {
        con.debug('Checking for %s returned %j', bundle, stdout);
        cb(err, !!stdout.match(bundle));
    });
}

function existsAny(bundles, cb) {
    async.map(bundles, exists, function (err, res) {
        if (err) {
            return cb(err);
        }

        for (var i = 0; i < res.length; i++) {
            if (res[i]) {
                return cb(null, true);
            }
        }

        return cb(null, false);
    });
}

function load(kext, cb) {
    con.debug('Loading %s', kext);
    var ld = sudo(['/sbin/kextload', kext]);
    ld.on('exit', cb);
}

function ensure(bundles, kext, cb) {
    if (typeof bundles === 'string') {
        bundles = [ bundles ];
    }

    existsAny(bundles, function (err, ex) {
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
            existsAny(bundles, cb);
        });
    });
}

