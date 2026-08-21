declare module 'node:crypto' {
  export function createHash(algorithm: string): {
    update(data: Uint8Array | string): {digest(encoding: 'hex'): string}
  }
}

declare module 'node:fs' {
  export function createReadStream(path: string): never
  export function readFileSync(path: string): Uint8Array
  export function readFileSync(path: string, encoding: 'utf8'): string
}

declare module 'node:path' {
  export function basename(path: string): string
  export function resolve(...paths: string[]): string
}

declare const process: {
  cwd(): string
}
