const repoOwner = "Shubham-cyber-prog";
const repoName = "100-Days-Of-Web-Development";
const container = document.getElementById("contributors-grid");

async function fetchContributors() {
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contributors`);
        if (!response.ok) throw new Error("Failed to fetch contributors");

        const contributors = await response.json();
        container.innerHTML = ""; // Clear the loading text

        contributors.forEach(user => {
            const card = document.createElement("a");
            card.href = user.html_url;
            card.target = "_blank";
            card.className = "contributor-card";

            card.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}" class="contributor-img">
                <span class="contributor-name">${user.login}</span>
                <span class="contributor-commits"><strong class="highlight-count">${user.contributions}</strong> contributions</span>
                <p class="view-profile">Click to view profile</p>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = `<p style="color: #ef4444;">Unable to load contributors at this time.</p>`;
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", fetchContributors);