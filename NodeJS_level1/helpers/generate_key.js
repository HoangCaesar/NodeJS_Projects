const { nanoid } = require("nanoid");

const key1 = nanoid(32).toString('hex');
const key2 = nanoid(32).toString('hex');

console.table({key1, key2})