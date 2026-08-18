// // const a: string = "this is my first  typescript server";
// // console.log(a);
// const a: string = "hello";
// console.log(typeof a);

// interface object {
//   name: string;
//   phone: number;
// }
// const arun: object = {
//   name: "arun",
//   phone: 12345,
// };

// const b: number | string;
// if (b === "number") console.log("a is number");
// console.log("a is string");

// function total(price: number, qty: number): number {
//   return price * qty;
// }
// total(10, 20);

function greet(name: string, greet?: string): void {
  console.log(`${greet ?? "Hello"} my name is ${name}`);
}
greet("arun", "hii");
