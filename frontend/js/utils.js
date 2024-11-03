// Example function to populate the clients report table
function populateClientsReport(data) {
    const table = document.getElementById("clientsReportTable");
    table.innerHTML = data.map(client => `
        <tr>
            <td>${client.id}</td>
            <td>${client.name}</td>
            <td>${client.contact}</td>
            <td>${client.location}</td>
            <td>${client.dateRegistered}</td>
        </tr>
    `).join('');
}

// Example function to populate the services report table
function populateServicesReport(data) {
    const table = document.getElementById("servicesReportTable");
    table.innerHTML = data.map(service => `
        <tr>
            <td>${service.id}</td>
            <td>${service.name}</td>
            <td>${service.clientName}</td>
            <td>${service.startDate}</td>
            <td>${service.endDate}</td>
            <td>${service.status}</td>
        </tr>
    `).join('');
}

// Example function to populate the revenue report table
function populateRevenueReport(data) {
    const table = document.getElementById("revenueReportTable");
    table.innerHTML = data.map(revenue => `
        <tr>
            <td>${revenue.transactionId}</td>
            <td>${revenue.clientName}</td>
            <td>${revenue.serviceProvided}</td>
            <td>${revenue.amount}</td>
            <td>${revenue.date}</td>
        </tr>
    `).join('');
}

// Example function to populate the projects report table
function populateProjectsReport(data) {
    const table = document.getElementById("projectsReportTable");
    table.innerHTML = data.map(project => `
        <tr>
            <td>${project.projectId}</td>
            <td>${project.projectName}</td>
            <td>${project.clientName}</td>
            <td>${project.startDate}</td>
            <td>${project.endDate}</td>
            <td>${project.status}</td>
        </tr>
    `).join('');
}
