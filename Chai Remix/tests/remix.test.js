import { remix } from "../remix.js";
import {describe,it} from "node:test"; 
import assert from "node:assert";

describe("remix function test", () =>
{
    it("should convert `assert.strictEqual(true,true)` to `assert.isTrue(true)", () =>
    {
        assert.strictEqual(remix("assert.strictEqual(true,true)",true),"assert.isTrue(true)");
    })
})
