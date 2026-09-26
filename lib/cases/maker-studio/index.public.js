// Student-safe Maker Studio cases.
import { publicMakerStudioCase, listMakerStudioCases } from "./catalog.js";

export function getMakerStudioPublicCase(standard) {
  return publicMakerStudioCase(standard);
}

export function listMakerStudioPublicCases() {
  return listMakerStudioCases().map((c) => publicMakerStudioCase(c.standard));
}
