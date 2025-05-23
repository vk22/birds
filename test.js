// const myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('myPromise')
//     resolve("foo");
//   }, 300);
// });

// myPromise
//   .then(
//     result => {
//       // первая функция-обработчик - запустится при вызове resolve
//       console.log("Fulfilled: " + result); // result - аргумент resolve
//     },
//     error => {
//       // вторая функция - запустится при вызове reject
//       console.log("Rejected: " + error); // error - аргумент reject
//     }
//   );


//   console.log('myPromise after')  


async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("готово!"), 1000)
  });

  let result = await promise; // будет ждать, пока промис не выполнится (*)

  console.log(result); // "готово!"
}

async function doStuffWithUser() {
  console.log('1')
  await f();
  console.log('2')
}

doStuffWithUser()
