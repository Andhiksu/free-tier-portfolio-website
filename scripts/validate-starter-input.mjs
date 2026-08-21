import { readFile } from "node:fs/promises";
import console from "node:console";
import process from "node:process";

const path = process.argv[2] ?? "starter-input/profile.example.json";
const value = JSON.parse(await readFile(path, "utf8"));
const required = [
  "displayName",
  "headline",
  "publicEmail",
  "defaultLocale",
  "locales",
];

for (const key of required) {
  if (!(key in value) || value[key] === "" || value[key] == null) {
    throw new Error(`Missing required starter field: ${key}`);
  }
}

if (!/^\S+@\S+\.\S+$/.test(value.publicEmail)) {
  throw new Error("publicEmail must look like a public contact email");
}

if (
  !Array.isArray(value.locales) ||
  !value.locales.includes(value.defaultLocale)
) {
  throw new Error("locales must include defaultLocale");
}

console.log(`Starter input is valid: ${path}`);
