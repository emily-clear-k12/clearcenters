// ClearDecode engine with all ruin content loaded. Server code (pages, API
// routes) imports this. Client components import ./core.js instead, so the
// ruin content stays on the server.
import RUIN_CONTENT from "./ruins/index.js";
import { registerContent } from "./core.js";

registerContent(RUIN_CONTENT);

export * from "./core.js";
