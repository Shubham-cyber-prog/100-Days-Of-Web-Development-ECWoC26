const folders = {
  inbox: [
    {
      from: "admin@ecwoc.dev",
      subject: "Welcome to ECWoC",
      body: "Congratulations on joining Elite Coders Winter of Code!",
      read: false
    },
    {
      from: "mentor@opensource.org",
      subject: "PR Review Update",
      body: "Your pull request has been reviewed. Excellent progress!",
      read: false
    }
  ],
  sent: [
    {
      from: "you@domain.com",
      subject: "Re: Project Update",
      body: "Thank you for the update. I will proceed accordingly.",
      read: true
    }
  ],
  drafts: []
};

let currentFolder = "inbox";

const emailList = document.getElementById("email-list");
const preview = document.getElementById("email-preview");
const folderTitle = document.getElementById("folder-title");
const navButtons = document.querySelectorAll(".nav-btn");

/* Render Email List */
function renderList() {
  emailList.innerHTML = "";

  const emails = folders[currentFolder];
  folderTitle.textContent =
    currentFolder.charAt(0).toUpperCase() + currentFolder.slice(1);

  if (emails.length === 0) {
    emailList.innerHTML = "<p>No emails here</p>";
    preview.innerHTML = "<p>No email selected</p>";
    return;
  }

  emails.forEach((email, index) => {
    const item = document.createElement("div");
    item.className = "email-item" + (email.read ? "" : " unread");
    item.innerHTML = `<strong>${email.from}</strong><br>${email.subject}`;
    item.onclick = () => openEmail(index);
    emailList.appendChild(item);
  });
}

/* Open Email */
function openEmail(index) {
  const emails = folders[currentFolder];
  emails[index].read = true;

  document.querySelectorAll(".email-item").forEach(el =>
    el.classList.remove("active")
  );
  emailList.children[index].classList.add("active");

  preview.innerHTML = `
    <h4>${emails[index].subject}</h4>
    <p><strong>From:</strong> ${emails[index].from}</p>
    <p>${emails[index].body}</p>
  `;

  renderList();
  emailList.children[index].classList.add("active");
}

/* Navigation */
navButtons.forEach(btn => {
  btn.onclick = () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFolder = btn.dataset.folder;
    preview.innerHTML = "<p>Select an email to read</p>";
    renderList();
  };
});

/* Initial Load */
renderList();
