/**
 * throwaway probe — element boxes at one width, to keep the comps honest.
 * node docs/design/comps/probe.mjs <comp> <width>
 */
import { spawn } from "node:child_process";

const PORT = 9223;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [comp = "b", width = "1024"] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${process.env.TMPDIR || "/tmp"}/dabaz-probe-profile`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--hide-scrollbars",
    "about:blank",
  ],
  { stdio: "ignore" },
);

async function json(path) {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}${path}`);
      if (r.ok) return await r.json();
    } catch {}
    await sleep(150);
  }
  throw new Error("chrome did not come up");
}

const version = await json("/json/version");
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let seq = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const p = pending.get(m.id);
    pending.delete(m.id);
    m.error ? p.reject(new Error(JSON.stringify(m.error))) : p.resolve(m.result);
  }
};
const send = (method, params = {}, sessionId) => {
  const id = ++seq;
  ws.send(JSON.stringify({ id, method, params, sessionId }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
};
const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
const cmd = (m, p) => send(m, p, sessionId);

await cmd("Page.enable");
await cmd("Runtime.enable");
await cmd("Emulation.setDeviceMetricsOverride", {
  width: Number(width),
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});
await cmd("Page.navigate", {
  url: `http://127.0.0.1:4321/docs/design/comps/${comp}.html`,
  waitUntil: "load",
});
await sleep(400);
const out = await cmd("Runtime.evaluate", {
  expression: `(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        sel,
        top: +r.top.toFixed(1), bottom: +r.bottom.toFixed(1),
        left: +r.left.toFixed(1), right: +r.right.toFixed(1),
        h: +r.height.toFixed(1), w: +r.width.toFixed(1),
        marginTop: cs.marginTop, marginBottom: cs.marginBottom,
        padTop: cs.paddingTop, padBottom: cs.paddingBottom,
      };
    };
    const sels = [
      ".site-header", ".hero", ".hero__inner", ".hero__name", ".hero__role",
      ".hero__intro", ".hero__now", ".hero__links", ".hero__portrait",
      ".identity", ".record", "#work", "#work .section__head",
      "#work .section__index", "#work .section__title", "#work .section__list",
      "#work .row", "#earlier", "#about", ".about__body", ".site-footer",
    ];
    return { boxes: sels.map(pick).filter(Boolean) };
  })()`,
  returnByValue: true,
});
console.log(JSON.stringify(out.result.value.boxes, null, 1));
const overflow = await cmd("Runtime.evaluate", {
  expression: `({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
  })`,
  returnByValue: true,
});
console.log("overflow:", JSON.stringify(overflow.result.value));
ws.close();
chrome.kill();
