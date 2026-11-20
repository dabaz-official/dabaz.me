/**
 * throwaway comp shooter — Chrome DevTools Protocol, no dependencies.
 *
 * node docs/design/comps/shoot.mjs [comp ...]
 *
 * Serves nothing itself: expects `python3 -m http.server 4321` at the repo
 * root. Writes docs/design/shots/<comp>-<width>-<theme>.png plus a scrolled
 * viewport at 1440 for the sticky-header check.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";

const PORT = 9222;
const BASE = "http://127.0.0.1:4321/docs/design/comps";
const OUT = new URL("../shots/", import.meta.url).pathname;
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const widths = [375, 768, 1024, 1440];
const comps = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["before", "a", "b"];

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${process.env.TMPDIR || "/tmp"}/dabaz-comps-profile`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "about:blank",
  ],
  { stdio: "ignore" },
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
};

function send(method, params = {}, sessionId) {
  const id = ++seq;
  ws.send(JSON.stringify({ id, method, params, sessionId }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", {
  targetId,
  flatten: true,
});
const cmd = (method, params) => send(method, params, sessionId);

await cmd("Page.enable");
await cmd("Runtime.enable");
await cmd("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "no-preference" }],
});

await mkdir(OUT, { recursive: true });

async function evaluate(expression) {
  return cmd("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
}

for (const comp of comps) {
  for (const width of widths) {
    await cmd("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await cmd("Page.navigate", {
      url: `${BASE}/${comp}.html`,
      waitUntil: "load",
    });
    await sleep(350);
    await evaluate("document.fonts.ready.then(() => true)");
    await evaluate("new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))");

    const { cssContentSize } = await cmd("Page.getLayoutMetrics");
    const height = Math.ceil(cssContentSize.height);

    for (const theme of ["light", "dark"]) {
      await evaluate(
        `document.documentElement.dataset.theme = ${JSON.stringify(theme)}; true`,
      );
      await evaluate("new Promise(r => requestAnimationFrame(r))");
      const shot = await cmd("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: { x: 0, y: 0, width, height, scale: 1 },
      });
      await writeFile(
        `${OUT}${comp}-${width}-${theme}.png`,
        Buffer.from(shot.data, "base64"),
      );
      console.log(`${comp}-${width}-${theme}.png  ${width}×${height}`);
    }

    // Sticky header over scrolled content — the D5 check, at 1440.
    if (width === 1440) {
      await evaluate("window.scrollTo(0, 760); true");
      await sleep(250);
      for (const theme of ["light", "dark"]) {
        await evaluate(
          `document.documentElement.dataset.theme = ${JSON.stringify(theme)}; true`,
        );
        await evaluate("new Promise(r => requestAnimationFrame(r))");
        const shot = await cmd("Page.captureScreenshot", { format: "png" });
        await writeFile(
          `${OUT}${comp}-${width}-scrolled-${theme}.png`,
          Buffer.from(shot.data, "base64"),
        );
      }
      await evaluate("window.scrollTo(0, 0); true");
      console.log(`${comp}-${width}-scrolled.png`);
    }
  }
}

// Interaction states — real hover and real keyboard focus, clipped.
for (const comp of comps.filter((c) => c === "a" || c === "b")) {
  await cmd("Emulation.setDeviceMetricsOverride", {
    width: 1024,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await cmd("Page.navigate", {
    url: `${BASE}/${comp}.html`,
    waitUntil: "load",
  });
  await sleep(350);
  await evaluate("document.fonts.ready.then(() => true)");
  await evaluate(
    `document.documentElement.dataset.theme = "light"; true`,
  );

  // Hover the second work row (one with a cover, in B).
  const rowBox = await evaluate(`(() => {
    const el = document.querySelectorAll("#work .row")[1];
    const r = el.getBoundingClientRect();
    return { x: r.left + 240, y: r.top + r.height / 2, top: r.top, height: r.height };
  })()`);
  const row = rowBox.result.value;
  await cmd("Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: row.x,
    y: row.y,
    buttons: 0,
  });
  await sleep(250);
  let shot = await cmd("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: {
      x: 0,
      y: row.top - 40,
      width: 1024,
      height: row.height + 80,
      scale: 2,
    },
  });
  await writeFile(`${OUT}${comp}-1024-hover.png`, Buffer.from(shot.data, "base64"));
  console.log(`${comp}-1024-hover.png`);

  // Keyboard focus on the first hero link.
  for (let i = 0; i < 4; i++) {
    await cmd("Input.dispatchKeyEvent", {
      type: "rawKeyDown",
      windowsVirtualKeyCode: 9,
      key: "Tab",
      code: "Tab",
    });
    await cmd("Input.dispatchKeyEvent", {
      type: "keyUp",
      windowsVirtualKeyCode: 9,
      key: "Tab",
      code: "Tab",
    });
    await sleep(60);
  }
  await sleep(200);
  const heroBox = await evaluate(`(() => {
    const r = document.querySelector(".hero__links").getBoundingClientRect();
    return { top: r.top, height: r.height };
  })()`);
  const hero = heroBox.result.value;
  shot = await cmd("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: hero.top - 40, width: 1024, height: hero.height + 80, scale: 2 },
  });
  await writeFile(`${OUT}${comp}-1024-focus.png`, Buffer.from(shot.data, "base64"));
  console.log(`${comp}-1024-focus.png`);
}

ws.close();
chrome.kill();
console.log("done");
