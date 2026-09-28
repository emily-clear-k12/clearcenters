export async function resolve(specifier, context, nextResolve) {
  if (specifier === "next/headers") {
    return { shortCircuit: true, url: new URL("./next-headers-stub.mjs", import.meta.url).href };
  }
  return nextResolve(specifier, context);
}

