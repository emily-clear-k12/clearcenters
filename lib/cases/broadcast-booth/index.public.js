// Student-safe Broadcast Booth cases.
import { publicBroadcastBoothCase, listBroadcastBoothCases } from "./catalog.js";

export function getBroadcastBoothPublicCase(standard) {
  return publicBroadcastBoothCase(standard);
}

export function listBroadcastBoothPublicCases() {
  return listBroadcastBoothCases().map((c) => publicBroadcastBoothCase(c.standard));
}
