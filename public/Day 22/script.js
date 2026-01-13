const input = document.getElementById("markdownInput");
const preview = document.getElementById("preview");

function renderMarkdown(text) {
  return text
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/`(.*?)`/gim, "<code>$1</code>")
    .replace(/\n$/gim, "<br />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank'>$1</a>");
}

input.addEventListener("input", () => {
  preview.innerHTML = renderMarkdown(input.value);
});

input.value = `# Welcome 👋

## Markdown Previewer

**Bold Text**
*Italic Text*
\`Inline Code\`

[OpenAI](https://openai.com)
`;

preview.innerHTML = renderMarkdown(input.value);
