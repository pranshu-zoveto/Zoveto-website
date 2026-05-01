import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getMessageFromUnknown,
  parseUpstreamJsonBody,
  getStringField,
  formatCosApiErrorMessage,
} from "@/lib/http-json";

describe("http-json", () => {
  it("parseUpstreamJsonBody parses object", () => {
    assert.deepEqual(parseUpstreamJsonBody('{"a":1}'), { a: 1 });
  });

  it("parseUpstreamJsonBody returns message wrapper on invalid JSON", () => {
    const v = parseUpstreamJsonBody("not json");
    assert.equal(typeof v, "object");
    assert.equal(getMessageFromUnknown(v), "not json");
  });

  it("parseUpstreamJsonBody uses default message for empty text", () => {
    const v = parseUpstreamJsonBody("");
    assert.equal(getMessageFromUnknown(v), "Upstream error");
  });

  it("getMessageFromUnknown", () => {
    assert.equal(getMessageFromUnknown({ message: "x" }), "x");
    assert.equal(getMessageFromUnknown(null), undefined);
    assert.equal(getMessageFromUnknown({ message: 1 }), undefined);
  });

  it("getStringField", () => {
    assert.equal(getStringField({ a: "b" }, "a"), "b");
    assert.equal(getStringField({ a: 1 }, "a"), undefined);
  });

  it("formatCosApiErrorMessage handles string or validation array", () => {
    assert.equal(formatCosApiErrorMessage({ message: "Bad" }), "Bad");
    assert.equal(
      formatCosApiErrorMessage({
        message: ["property a should not exist", "property b should not exist"],
        error: "Bad Request",
      }),
      "property a should not exist; property b should not exist",
    );
    assert.equal(formatCosApiErrorMessage({ error: "Forbidden" }), "Forbidden");
    assert.equal(formatCosApiErrorMessage({ message: 1 }), undefined);
  });
});
