import { describe, expect, it } from "vitest";

import { PAGE_ORDER, swipeTarget } from "@/hooks/useSwipeNavigation";

describe("swipe navigation", () => {
  it("keeps the navbar page order", () => {
    expect(PAGE_ORDER).toEqual(["/", "/library", "/author", "/connect", "/buy"]);
  });

  it("swiping left on Home goes to Library", () => {
    expect(swipeTarget("/", -120, 4)).toBe("/library");
  });

  it("swiping left on Library goes to Author", () => {
    expect(swipeTarget("/library", -100, -6)).toBe("/author");
  });

  it("swiping right on Author goes back to Library", () => {
    expect(swipeTarget("/author", 90, 2)).toBe("/library");
  });

  it("swiping right on Home has nowhere to go", () => {
    expect(swipeTarget("/", 120, 0)).toBeNull();
  });

  it("swiping left on Buy has nowhere to go", () => {
    expect(swipeTarget("/buy", -150, 0)).toBeNull();
  });

  it("ignores vertical swipes", () => {
    expect(swipeTarget("/", -30, -200)).toBeNull();
  });

  it("ignores short ambiguous swipes", () => {
    expect(swipeTarget("/", -40, 10)).toBeNull();
    expect(swipeTarget("/library", -70, -60)).toBeNull();
  });

  it("never swipes away from the PDF reader", () => {
    expect(swipeTarget("/read/hindi", -200, 0)).toBeNull();
    expect(swipeTarget("/read/english", 200, 0)).toBeNull();
  });
});
