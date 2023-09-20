const remove = require("./delete");
const get = require("./get");
const post = require("./post");
const put = require("./put");

module.exports = { get, post, put, delete: remove }
