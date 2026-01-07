const editor = document.getElementById("codeEditor");
const outputFrame = document.getElementById("outputFrame");
const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const languageSelect = document.getElementById("languageSelect");

runBtn.addEventListener("click", () => {
  const code = editor.value;
  const lang = languageSelect.value;

  if (lang === "html") {
    outputFrame.srcdoc = code;
    return;
  }

  if (lang === "css") {
    outputFrame.srcdoc = `
      <html>
        <head>
          <style>${code}</style>
        </head>
        <body></body>
      </html>
    `;
    return;
  }

  if (lang === "javascript") {
    outputFrame.srcdoc = `
      <html>
        <body>
          <pre id="output"></pre>

          <script>
            const outputEl = document.getElementById("output");

            console.log = function (...args) {
              outputEl.innerHTML += args.join(" ") + "\\n";
            };

            try {
              ${code}
            } catch (err) {
              outputEl.innerHTML += err;
            }
          </script>
        </body>
      </html>
    `;
  }
});

clearBtn.addEventListener("click", () => {
  editor.value = "";
  outputFrame.srcdoc = "";
});

saveBtn.addEventListener("click", () => {
  localStorage.setItem("savedCode", editor.value);
  alert("Code saved locally");
});

window.addEventListener("load", () => {
  const saved = localStorage.getItem("savedCode");
  if (saved) editor.value = saved;
});
