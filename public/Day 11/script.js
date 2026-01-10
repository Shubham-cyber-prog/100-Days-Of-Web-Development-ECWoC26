const blogPosts = [
  {
    title: "First Blog Post",
    date: "January 2026",
    content:
      "This is a simple blog website built as part of Day 11 of the 100 Days of Web Development challenge."
  },
  {
    title: "Why I Love Web Development",
    date: "January 2026",
    content:
      "Web development allows me to turn ideas into real products using HTML, CSS, and JavaScript."
  },
  {
    title: "Learning by Building Projects",
    date: "January 2026",
    content:
      "Building small projects every day helps strengthen fundamentals and improve problem-solving skills."
  }
];

const blogContainer = document.getElementById("blogContainer");

blogPosts.forEach(post => {
  const article = document.createElement("article");
  article.classList.add("blog-card");

  article.innerHTML = `
    <h2>${post.title}</h2>
    <p class="date">${post.date}</p>
    <p>${post.content}</p>
  `;

  blogContainer.appendChild(article);
});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
