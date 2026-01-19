const projects = [
  {
    day: 1,
    title: "Portfolio Website",
    description: "Basic personal portfolio using HTML and CSS",
    link: "../../Day01"
  },
  {
    day: 2,
    title: "Landing Page",
    description: "Responsive landing page design",
    link: "../../Day02"
  },
  {
    day: 3,
    title: "Todo List",
    description: "Simple todo list using JavaScript",
    link: "../../Day03"
  }
];

const projectGrid = document.getElementById("projectGrid");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h3>Day ${project.day}: ${project.title}</h3>
    <p>${project.description}</p>
    <a
      href="${project.link}"
      target="_blank"
      rel="noopener noreferrer"
    >
      View Project →
    </a>
  `;

  projectGrid.appendChild(card);
});
