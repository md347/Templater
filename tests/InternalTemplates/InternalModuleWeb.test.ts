import TestTemplaterPlugin from "../main.test";
import { expect } from "chai";

export function InternalModuleWebTests(t: TestTemplaterPlugin) {
    t.test("tp.web is undefined", async () => {
        await expect(
            t.run_and_get_output(`Web: <% tp.web %>\n\n`)
        ).to.eventually.equal(`Web: undefined\n\n`);
    });
}
