import { register } from "node:module";

register(new URL("./next-headers-hook.mjs", import.meta.url).href, { parentURL: import.meta.url });

