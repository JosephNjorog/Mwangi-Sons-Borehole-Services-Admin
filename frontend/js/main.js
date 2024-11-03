// Load components when the document is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Load header, sidebar, and footer components
    await loadComponent('header-container', '/components/header.html');
    await loadComponent('sidebar-container', '/components/sidebar.html');
    await loadComponent('footer-container', '/components/footer.html');

    // Initialize dashboard data if on index page
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        initializeDashboard();
    }

    // Add click event listener for mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
});

// Toggle sidebar for mobile view
const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
};

// Initialize dashboard data
const initializeDashboard = async () => {
    try {
        // Fetch dashboard statistics
        const stats = await api.get('/dashboard/stats');
        
        // Update dashboard cards
        document.getElementById('totalClients').textContent = stats.totalClients;
        document.getElementById('activeServices').textContent = stats.activeServices;
        document.getElementById('totalRevenue').textContent = formatCurrency(stats.totalRevenue);
        document.getElementById('ongoingProjects').textContent = stats.ongoingProjects;

        // Load recent activities
        await loadRecentActivities();
    } catch (error) {
        console.error('Error initializing dashboard:', error);
        showNotification('Failed to load dashboard data', 'error');
    }
};

// Load recent activities
const loadRecentActivities = async () => {
    try {
        const activities = await api.get('/activities/recent');
        const activityList = document.getElementById('activityList');
        
        if (activityList) {
            activityList.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas ${getActivityIcon(activity.type)}"></i>
                    </div>
                    <div class="activity-details">
                        <p class="activity-text">${activity.description}</p>
                        <span class="activity-time">${formatDate(activity.timestamp)}</span>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading recent activities:', error);
    }
};

// Get icon class based on activity type
const getActivityIcon = (type) => {
    const icons = {
        'client_registration': 'fa-user-plus',
        'service_registration': 'fa-tools',
        'payment': 'fa-money-bill-wave',
        'report': 'fa-file-alt',
        'default': 'fa-info-circle'
    };
    return icons[type] || icons.default;
};

// Handle form submissions
const handleFormSubmit = async (formId, endpoint, successMessage) => {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                // Validate form data
                const errors = validation.validateForm(data, getValidationRules(formId));
                if (Object.keys(errors).length > 0) {
                    showFormErrors(errors);
                    return;
                }
                
                // Submit form data
                const response = await api.post(endpoint, data);
                
                showNotification(successMessage);
                form.reset();
                
                // Refresh dashboard if needed
                if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
                    initializeDashboard();
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Failed to submit form', 'error');
            }
        });
    }
};

// Get validation rules based on form ID
const getValidationRules = (formId) => {
    const rules = {
        'clientForm': {
            name: { required: true },
            email: { required: true, email: true },
            phone: { required: true, phone: true },
            address: { required: true }
        },
        'serviceForm': {
            clientId: { required: true },
            serviceType: { required: true },
            description: { required: true }
        },
        'chargesForm': {
            clientId: { required: true },
            serviceType: { required: true },
            depth: { required: true, number: true },
            surveyFee: { required: true, number: true },
            localAuthorityFee: { required: true, number: true }
        }
    };
    return rules[formId] || {};
};

// Show form validation errors
const showFormErrors = (errors) => {
    // Clear existing error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Display new error messages
    Object.entries(errors).forEach(([field, message]) => {
        const input = document.getElementById(field);
        if (input) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            input.parentNode.appendChild(errorDiv);
            input.classList.add('error');
        }
    });
};

// Export functions for use in other scripts
export {
    handleFormSubmit,
    showNotification,
    formatCurrency,
    formatDate,
    toggleSidebar
};