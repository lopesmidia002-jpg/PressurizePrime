const { JSDOM, VirtualConsole } = require('jsdom');

const virtualConsole = new VirtualConsole();
virtualConsole.on("error", (err) => {
  console.error("Browser Error:", err);
});
virtualConsole.on("log", (log) => {
  console.log("Browser Log:", log);
});
virtualConsole.on("jsdomError", (err) => {
  console.error("JSDOM Error:", err);
});

JSDOM.fromURL("http://localhost:8080/", {
  runScripts: "dangerously",
  resources: "usable",
  virtualConsole
}).then(dom => {
  dom.window.addEventListener("error", (event) => {
    console.error("Window Error:", event.error);
  });
  setTimeout(() => {
    console.log("DOM loaded. HTML:", dom.window.document.body.innerHTML.substring(0, 500));
    process.exit(0);
  }, 3000);
}).catch(e => console.error(e));
