let posts = JSON.parse(localStorage.getItem("posts")) || [];

function addPost() {
  const text = document.getElementById("postText").value;
  if (!text.trim()) return;

  const post = {
    id: Date.now(),
    text,
    likes: 0,
    comments: []
  };

  posts.unshift(post);
  saveAndRender();
  document.getElementById("postText").value = "";
}

function likePost(id) {
  const post = posts.find(p => p.id === id);
  post.likes++;
  saveAndRender();
}

function addComment(id) {
  const input = document.getElementById(`comment-${id}`);
  if (!input.value.trim()) return;

  const post = posts.find(p => p.id === id);
  post.comments.push(input.value);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
}

function renderPosts() {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(p => {
    container.innerHTML += `
      <div class="post">
        <p>${p.text}</p>
        <div class="post-actions">
          <span onclick="likePost(${p.id})">❤️ ${p.likes}</span>
        </div>

        <input id="comment-${p.id}" placeholder="Add comment...">
        <button onclick="addComment(${p.id})">Comment</button>

        <div>
          ${p.comments.map(c => `<p>💬 ${c}</p>`).join("")}
        </div>
      </div>
    `;
  });
}

document.getElementById("themeToggle").onclick = () =>
  document.body.classList.toggle("dark");

document.getElementById("searchInput").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  document.querySelectorAll(".post").forEach(p => {
    p.style.display = p.innerText.toLowerCase().includes(value) ? "" : "none";
  });
});

renderPosts();
