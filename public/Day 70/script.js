// Customer Growth
new Chart(document.getElementById("customersChart"), {
    type: "line",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            label: "Customers (K)",
            data: [1.2, 1.8, 2.5, 3.6, 4.8, 6.1],
            borderColor: "#667eea",
            backgroundColor: "rgba(102,126,234,0.2)",
            fill: true
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: "Customer Growth"
            }
        }
    }
});

// Monthly Revenue
new Chart(document.getElementById("revenueChart"), {
    type: "bar",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            label: "Revenue ($K)",
            data: [8, 10.5, 14.2, 17.8, 21, 26.5],
            backgroundColor: "#48bb78"
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: "Monthly Revenue"
            }
        }
    }
});

// Category Distribution
new Chart(document.getElementById("categoryChart"), {
    type: "doughnut",
    data: {
        labels: [
            "Electronics (40%)",
            "Fashion (25%)",
            "Home & Kitchen (20%)",
            "Others (15%)"
        ],
        datasets: [{
            data: [40, 25, 20, 15],
            backgroundColor: ["#667eea", "#f6ad55", "#48bb78", "#fc8181"]
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: "Sales by Category"
            }
        }
    }
});

// Orders Trend
new Chart(document.getElementById("ordersChart"), {
    type: "line",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            label: "Orders (K)",
            data: [0.6, 0.9, 1.3, 1.7, 2.1, 3.2],
            borderColor: "#f6ad55",
            fill: false
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: "Orders Trend"
            }
        }
    }
});

// Revenue vs Orders
new Chart(document.getElementById("revOrdersChart"), {
    type: "bar",
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Revenue ($K)",
                data: [8, 10.5, 14.2, 17.8, 21, 26.5],
                backgroundColor: "#667eea"
            },
            {
                label: "Orders (K)",
                data: [0.6, 0.9, 1.3, 1.7, 2.1, 3.2],
                backgroundColor: "#f6ad55"
            }
        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: "Revenue vs Orders"
            }
        }
    }
});
