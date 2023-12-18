export function base64Decode(str: string): string {
  const base64Decoded = atob(str);
  const uint8Array = new Uint8Array(
    Uint8Array.from(base64Decoded, (c) => c.charCodeAt(0))
  );
  return new TextDecoder('utf-8').decode(uint8Array);
}
