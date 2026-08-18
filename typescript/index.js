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
// function greet(name: string, greet?: string): void {
//   console.log(`${greet ?? "Hello"} my name is ${name}`);
// }
// greet("arun", "hii");
// function greet(name: string, greet: string = "hello"): void {
//   console.log(`${greet} my name is ${name}`);
// }
// greet("arun");
// function guess(id: string | number) {
//   typeof id == "string"
//     ? console.log("this is string", id)
//     : console.log("this is number", id);
// }
// guess(2);
// class arun {
//   private name: string = "arun";
//   greet(): void {
//     console.log(this.name);
//   }
// }
// const name = new arun();
// name.greet();
class arun {
    secret = "this_is_your_secret";
}
class amrita extends arun {
    secret2 = "this_is_your_secret_2";
    envs() {
        console.log(this.secret, this.secret2);
    }
}
const key = new amrita();
key.envs();
export {};
//# sourceMappingURL=index.js.map