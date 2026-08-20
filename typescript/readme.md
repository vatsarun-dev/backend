# TypeScript Complete Guide

TypeScript is a statically typed programming language built on top of JavaScript. It adds a type system, modern language features, and tooling that helps find mistakes before code runs. TypeScript code is compiled or transpiled to JavaScript, which runs in Node.js, browsers, and other JavaScript environments.

This folder is an ESM TypeScript project. Its main source file is `index.ts`, its generated entry point is `index.js`, and its package uses TypeScript `^7.0.2` as a development dependency.

## Table of Contents

1. [Why TypeScript](#why-typescript)
2. [Installation and Commands](#installation-and-commands)
3. [First Program](#first-program)
4. [Types](#types)
5. [Variables and Inference](#variables-and-inference)
6. [Functions](#functions)
7. [Objects, Interfaces, and Type Aliases](#objects-interfaces-and-type-aliases)
8. [Unions, Intersections, and Narrowing](#unions-intersections-and-narrowing)
9. [Arrays, Tuples, and Enums](#arrays-tuples-and-enums)
10. [Generics](#generics)
11. [Classes](#classes)
12. [Modules](#modules)
13. [Utility Types](#utility-types)
14. [Error Handling and Async Code](#error-handling-and-async-code)
15. [Declaration Files](#declaration-files)
16. [Compiler Configuration](#compiler-configuration)
17. [TypeScript and JavaScript](#typescript-and-javascript)
18. [Best Practices](#best-practices)
19. [Limitations](#limitations)

## Why TypeScript

- **Early feedback:** catches many errors while editing or building.
- **Better refactoring:** editors understand symbols, parameters, and return values.
- **Self-documenting APIs:** types describe expected data.
- **Scalable JavaScript:** interfaces, generics, modules, and strict checks help large codebases.
- **JavaScript compatibility:** valid JavaScript is generally valid TypeScript.

TypeScript does not replace JavaScript. It improves the development experience and produces JavaScript as output.

## Installation and Commands

Install TypeScript locally in a project:

```bash
npm install --save-dev typescript
```

Create a configuration file:

```bash
npx tsc --init
```

Useful commands:

```bash
npx tsc                         # Compile using tsconfig.json
npx tsc --noEmit                # Type-check without writing JavaScript
npx tsc index.ts                # Compile one file with command-line defaults
npx tsc --watch                 # Recompile when files change
npx tsc --showConfig            # Print the final compiler configuration
node index.js                   # Run generated ESM JavaScript
```

For this project:

```bash
cd typescript
npm install
npx tsc --noEmit
node index.js
```

`npm test` is currently a placeholder and intentionally exits with an error because no test runner has been configured.

## First Program

```ts
const message: string = "Hello, TypeScript";
console.log(message);
```

The annotation says `message` must contain a string. TypeScript checks this during development and removes the annotation from the generated JavaScript.

## Types

### Primitive types

```ts
let username: string = "Arun";
let age: number = 25;
let active: boolean = true;
let nothing: null = null;
let missing: undefined = undefined;
let bigValue: bigint = 100n;
let uniqueKey: symbol = Symbol("key");
```

Use lowercase type names such as `string`, `number`, and `boolean`. `String`, `Number`, and `Boolean` refer to boxed objects and are usually incorrect for ordinary values.

### `any`, `unknown`, `void`, and `never`

```ts
let unsafe: any = "anything"; // Disables type safety; avoid it.
let input: unknown = getInput(); // Must be checked before use.

function logMessage(value: string): void {
  console.log(value);
}

function fail(reason: string): never {
  throw new Error(reason);
}
```

`unknown` is safer than `any`. `void` usually describes a function whose return value is ignored. `never` describes code that cannot successfully finish, such as a function that always throws or an impossible union branch.

### Literal types

```ts
let direction: "north" | "south" = "north";
const status = "success"; // inferred as the literal type "success"
```

Literal types are useful for restricted values, especially configuration and discriminated unions.

## Variables and Inference

TypeScript often infers types, so annotations are not required everywhere:

```ts
const count = 3; // number
const names = ["A", "B"]; // string[]
let ready = false; // boolean
```

Prefer inference when the value makes the type obvious. Add annotations at public API boundaries, for empty collections, complex objects, and values whose intended type is not obvious.

`const` prevents reassignment of a variable, but it does not make referenced objects immutable:

```ts
const user = { name: "Arun" };
user.name = "Amrita"; // Allowed: the object is still mutable.
```

Use `readonly` for compile-time protection:

```ts
type Settings = { readonly environment: string };
```

## Functions

```ts
function total(price: number, quantity: number): number {
  return price * quantity;
}

function greet(name: string, greeting = "Hello"): string {
  return `${greeting}, ${name}`;
}

function findUser(id: number): User | undefined {
  return users.find((user) => user.id === id);
}
```

Optional parameters use `?` and must come after required parameters:

```ts
function formatName(first: string, last?: string): string {
  return last ? `${first} ${last}` : first;
}
```

Function types describe callable values:

```ts
type Calculator = (left: number, right: number) => number;
const add: Calculator = (left, right) => left + right;
```

Rest parameters collect values into an array:

```ts
function sum(...values: number[]): number {
  return values.reduce((result, value) => result + value, 0);
}
```

## Objects, Interfaces, and Type Aliases

```ts
interface User {
  id: number;
  name: string;
  email: string;
  rollno: number;
  isAdmin: boolean;
  phone?: string;
}

const user: User = {
  id: 1,
  name: "Arun",
  email: "arun@example.com",
  rollno: 10,
  isAdmin: false,
};
```

Interfaces are extendable object contracts and can be reopened through declaration merging. Type aliases can describe objects, unions, primitives, tuples, and more:

```ts
type Identifier = string | number;
type Admin = User & { permissions: string[] };
```

Both are useful. Use the convention already established by the project; in new code, use `interface` for extendable object shapes and `type` for unions and composed types.

Structural typing means compatibility is based on properties, not class names:

```ts
function printUser(user: Pick<User, "id" | "email">): void {
  console.log(user.id, user.email);
}
```

## Unions, Intersections, and Narrowing

A union accepts one of several types:

```ts
function printId(id: string | number): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(0));
  }
}
```

An intersection combines requirements:

```ts
type Timestamped = { createdAt: Date };
type RecordWithTime = User & Timestamped;
```

Common narrowing tools include `typeof`, `instanceof`, the `in` operator, equality checks, truthiness checks, and custom type guards:

```ts
function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "id" in value;
}
```

For related object variants, use a discriminant:

```ts
type Result =
  | { kind: "success"; data: string }
  | { kind: "error"; message: string };

function readResult(result: Result): string {
  return result.kind === "success" ? result.data : result.message;
}
```

## Arrays, Tuples, and Enums

```ts
const ids: number[] = [1, 2, 3];
const names: Array<string> = ["A", "B"];
const coordinates: [number, number] = [10, 20];
```

Tuples have a fixed order and known element types. Optional and rest tuple elements are also supported.

For most application code, prefer string literal unions over enums:

```ts
type Role = "user" | "admin";
```

Enums are still available when a named runtime object is useful:

```ts
enum Priority {
  Low = "low",
  High = "high",
}
```

Be aware that enums emit JavaScript, while type aliases and interfaces disappear after compilation.

## Generics

Generics preserve relationships between input and output types:

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const firstName = first(["A", "B"]); // string | undefined
```

Constrain a generic when it needs a known property:

```ts
function getId<T extends { id: number }>(value: T): number {
  return value.id;
}
```

Generic interfaces and classes are useful for reusable data structures:

```ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
}
```

## Classes

```ts
class Account {
  constructor(
    public readonly id: number,
    private balance: number,
  ) {}

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}
```

Access modifiers are `public` (default), `protected` (class and subclasses), and `private` (class only). `readonly` prevents reassignment after initialization. `abstract` classes and methods define incomplete base implementations. `implements` checks that a class satisfies an interface; it does not change runtime behavior.

## Modules

Use `export` to expose values and `import` to consume them:

```ts
// math.ts
export function multiply(left: number, right: number): number {
  return left * right;
}

// app.ts
import { multiply } from "./math.js";
console.log(multiply(2, 3));
```

In Node.js ESM projects, write the emitted `.js` extension in relative imports. TypeScript resolves it to the source file while Node.js loads the generated JavaScript file.

Default exports are possible, but named exports usually make refactoring and API discovery clearer. Avoid circular dependencies and keep modules focused.

## Utility Types

TypeScript includes helpers for transforming types:

```ts
type UserPreview = Pick<User, "id" | "name">;
type UserWithoutRoll = Omit<User, "rollno">;
type EditableUser = Partial<User>;
type RequiredUser = Required<User>;
type ReadonlyUser = Readonly<User>;
type UserMap = Record<string, User>;
```

Other useful utilities include `ReturnType`, `Parameters`, `InstanceType`, `Awaited`, `NonNullable`, `Extract`, and `Exclude`:

```ts
type TotalResult = ReturnType<typeof total>;
type UserId = NonNullable<User["id"]>;
```

The existing `index.ts` uses `Pick`. Its current example references `password`, which is not declared on `User`; strict type-checking correctly reports that as an error. Add the property or remove it from the `Pick` selection.

## Error Handling and Async Code

Promises and `async` functions should have meaningful result types:

```ts
async function loadUser(id: number): Promise<User> {
  const response = await fetch(`/users/${id}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as User;
}
```

The `as User` assertion tells the compiler what you expect; it does not validate untrusted JSON. Validate API, environment, and user input at runtime with a validation library or explicit checks.

Catch values are best treated as `unknown`:

```ts
try {
  await loadUser(1);
} catch (error: unknown) {
  console.error(error instanceof Error ? error.message : "Unknown error");
}
```

## Declaration Files

Files ending in `.d.ts` contain type declarations without executable implementations. They describe JavaScript libraries, global values, or generated APIs.

```ts
declare module "legacy-library" {
  export function parse(value: string): unknown;
}
```

The generated `index.d.ts` in this folder describes the public types emitted from `index.ts`. Declaration maps (`.d.ts.map`) help editors navigate from generated declarations back to source.

## Compiler Configuration

`tsconfig.json` controls compilation. Important options include:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmitOnError": true,
    "sourceMap": true,
    "declaration": true,
    "outDir": "dist"
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Important concepts:

- `target` selects the JavaScript language level.
- `module` controls emitted module syntax.
- `moduleResolution` controls how imports are found.
- `strict` enables the strongest practical type checks.
- `noEmitOnError` prevents output when compilation fails.
- `lib` selects available platform declarations such as DOM APIs.
- `rootDir` and `outDir` control source and generated folder layout.
- `esModuleInterop` improves CommonJS and ES module interoperability.
- `declaration` emits `.d.ts` files for reusable packages.
- `sourceMap` connects generated JavaScript to TypeScript during debugging.

Use `npx tsc --noEmit` in CI even when another tool performs bundling, because bundlers may transpile without type-checking.

## TypeScript and JavaScript

TypeScript types are erased at runtime. These do not exist in generated JavaScript:

- interfaces
- type aliases
- generic parameters
- type annotations
- type-only imports

These do produce runtime code when used:

- functions and classes
- ordinary variables and objects
- enums
- decorators, depending on compiler configuration

Compile-time type safety cannot protect against malformed network data, incorrect environment variables, database values, or JavaScript callers. Validate boundaries at runtime and test real behavior.

## Best Practices

1. Enable `strict` mode.
2. Prefer `unknown` over `any` for untrusted values.
3. Let TypeScript infer obvious local types.
4. Type function parameters and public return values.
5. Model valid states with unions and discriminated objects.
6. Validate external data at runtime.
7. Keep types close to the domain they describe.
8. Prefer small interfaces and composition over deep inheritance.
9. Use `readonly` where mutation is not intended.
10. Avoid non-null assertions (`value!`) unless the invariant is certain.
11. Avoid broad type assertions; narrow or validate instead.
12. Keep generated files out of source control when the project can regenerate them.
13. Use a formatter, linter, and test runner alongside the compiler.
14. Keep TypeScript and its type packages aligned with the runtime versions you support.

## Common Mistakes

### Type assertion is not conversion

```ts
const value = "42" as unknown as number; // Still a string at runtime.
```

Use `Number(value)` for conversion and validate the result.

### Optional does not mean always present

```ts
function showEmail(user: User): string {
  return user.email; // Required here; optional fields need a check.
}
```

### `object` is too broad

Prefer a specific interface or `Record<string, unknown>` instead of `object` when the properties matter.

### `Array` without an element type is incomplete

Use `string[]`, `Array<string>`, or an appropriate union rather than an unbounded array type.

### Compilation is not testing

The compiler checks types, but tests check behavior. Use both for important code.

## Suggested Learning Order

1. JavaScript fundamentals: variables, functions, objects, arrays, modules, and promises.
2. Primitive annotations and inference.
3. Object types, interfaces, aliases, and unions.
4. Narrowing and strict null checks.
5. Generics and utility types.
6. Classes, modules, declaration files, and compiler configuration.
7. Runtime validation, testing, linting, and package publishing.

## Quick Reference

```ts
type ID = string | number;

interface Product {
  readonly id: ID;
  name: string;
  price: number;
  tags?: string[];
}

function formatProduct<T extends Product>(product: T): string {
  return `${product.name}: ${product.price}`;
}

type ProductUpdate = Partial<Pick<Product, "name" | "price" | "tags">>;
```

This example combines aliases, unions, interfaces, readonly properties, optional properties, generics, constraints, and utility types in a small API-shaped model.

## Official Documentation

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [TypeScript Reference](https://www.typescriptlang.org/docs/)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
