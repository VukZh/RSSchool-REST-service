// const fs = require('fs');
// const path = require('path');

// const getAll = async () => {
//   const users = await getAllPromisify();
//   console.log(`... ${users}`);
//   return users;
// };

// const save = async () => {
//   const users = await getAllPromisify();
//   console.log(`... ${users}`);
//   return users;
// };

// const getAllPromisify = () => {
//   return new Promise((res, rej) => {
//     fs.readFile(
//       path.join(__dirname, '../..', 'data', 'users.json'),
//       'utf-8',
//       (err, content) => {
//         if (err) {
//           rej(err);
//         } else {
//           res(JSON.parse(content));
//         }
//       }
//     );
//   });
// };

// module.exports = { getAll };
