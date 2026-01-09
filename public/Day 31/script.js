const jobs = [
    {
        title: "Frontend Developer",
        company: "ABC Tech",
        location: "Remote",
        type: "Full Time"
    },
    {
        title: "Backend Developer",
        company: "CodeBase",
        location: "Bangalore",
        type: "Internship"
    },
    {
        title: "UI/UX Designer",
        company: "DesignPro",
        location: "Hyderabad",
        type: "Full Time"
    },
    {
        title: "Java Developer",
        company: "TechSoft",
        location: "Chennai",
        type: "Internship"
    },
];

const jobsContainer = document.getElementById("jobsContainer");

function renderJobs(jobList) {
    jobsContainer.innerHTML = "";

    jobList.forEach(job => {
        const jobCard = document.createElement("div");
        jobCard.className = "job-card";

        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>Company: ${job.company}</p>
            <p>Location: ${job.location}</p>
            <span>${job.type}</span>
            `;

        jobsContainer.appendChild(jobCard);
    });
}

renderJobs(jobs);

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {
    const searchText = searchInput.value.toLowerCase();

    const filteredJobs = jobs.filter(job => {
        return (
            job.title.toLowerCase().includes(searchText) ||
            job.company.toLowerCase().includes(searchText)
        );
    });
    renderJobs(filteredJobs);
});