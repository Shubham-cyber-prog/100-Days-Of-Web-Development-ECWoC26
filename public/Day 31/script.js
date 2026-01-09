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
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");

function applyFilters() {
    const searchText =  searchInput.value.toLowerCase();
    const selectedLocation = locationFilter.value;
    const selectedType = typeFilter.value;

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = 
            job.title.toLowerCase().includes(searchText) ||
            job.company.toLowerCase().includes(searchText);

        const matchesLocation = 
            selectedLocation === "all" || job.location === selectedLocation;

        const matchesType = 
            selectedType === "all" || job.type === selectedType;

        return matchesSearch && matchesLocation && matchesType;
    });
    renderJobs(filteredJobs);
}

searchInput.addEventListener("keyup", applyFilters);
locationFilter.addEventListener("change", applyFilters);
typeFilter.addEventListener("change", applyFilters);