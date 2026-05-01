/**
 * Windows ARM64 + webpack can surface EISDIR for fs.readlink* on regular files.
 * Webpack/resolve treats EINVAL as "not a symlink", so normalize EISDIR -> EINVAL.
 */
const fs = require("fs");

function toEinval(err) {
  if (!err || err.code !== "EISDIR") return err;
  const wrapped = new Error(err.message);
  wrapped.code = "EINVAL";
  wrapped.errno = err.errno;
  wrapped.path = err.path;
  wrapped.syscall = err.syscall;
  return wrapped;
}

const readlink = fs.readlink.bind(fs);
fs.readlink = function patchedReadlink(path, options, callback) {
  let cb = callback;
  let opts = options;
  if (typeof options === "function") {
    cb = options;
    opts = undefined;
  }
  return readlink(path, opts, (err, value) => cb(toEinval(err), value));
};

const readlinkSync = fs.readlinkSync.bind(fs);
fs.readlinkSync = function patchedReadlinkSync(path, options) {
  try {
    return readlinkSync(path, options);
  } catch (err) {
    throw toEinval(err);
  }
};

if (fs.promises && typeof fs.promises.readlink === "function") {
  const promisesReadlink = fs.promises.readlink.bind(fs.promises);
  fs.promises.readlink = async function patchedPromisesReadlink(path, options) {
    try {
      return await promisesReadlink(path, options);
    } catch (err) {
      throw toEinval(err);
    }
  };
}
