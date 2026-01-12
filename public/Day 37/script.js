document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection ---
    const eventForm = document.getElementById('event-form');
    const eventsContainer = document.getElementById('events-container');
    const noEventsMessage = document.getElementById('no-events-message');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const eventIdInput = document.getElementById('event-id');

    // --- State Management ---
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let editingEventId = null;

    // --- Functions ---

    const saveEvents = () => {
        localStorage.setItem('events', JSON.stringify(events));
    };

    const renderEvents = () => {
        // Clear container before re-rendering
        eventsContainer.innerHTML = '';
        if (events.length === 0) {
            noEventsMessage.style.display = 'block';
            return;
        }
        noEventsMessage.style.display = 'none';

        // Sort events by date and time
        events.sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));

        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card', 'glass-panel');
            eventCard.dataset.id = event.id;

            eventCard.innerHTML = `
                <h3>${event.name}</h3>
                <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${event.time}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p class="event-description">${event.description || 'No description provided.'}</p>
                <div class="event-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            eventsContainer.appendChild(eventCard);
        });
    };

    const resetForm = () => {
        eventForm.reset();
        editingEventId = null;
        formTitle.textContent = 'Create New Event';
        submitBtn.textContent = 'Create Event';
        cancelBtn.style.display = 'none';
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const eventData = {
            name: document.getElementById('event-name').value,
            date: document.getElementById('event-date').value,
            time: document.getElementById('event-time').value,
            location: document.getElementById('event-location').value,
            description: document.getElementById('event-description').value,
        };

        if (editingEventId) {
            const eventIndex = events.findIndex(event => event.id === editingEventId);
            if (eventIndex !== -1) {
                events[eventIndex] = { id: editingEventId, ...eventData };
            }
        } else {
            const newEvent = { id: Date.now().toString(), ...eventData };
            events.push(newEvent);
        }

        saveEvents();
        renderEvents();
        resetForm();
    };

    const handleEventAction = (e) => {
        const eventCard = e.target.closest('.event-card');
        if (!eventCard) return;

        const eventId = eventCard.dataset.id;

        if (e.target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this event?')) {
                // Add removing class for animation
                eventCard.classList.add('removing');
                
                // Wait for animation to finish before updating state
                setTimeout(() => {
                    events = events.filter(event => event.id !== eventId);
                    saveEvents();
                    renderEvents();
                }, 500); // Match this with the CSS animation duration
            }
        } else if (e.target.classList.contains('edit-btn')) {
            const eventToEdit = events.find(event => event.id === eventId);
            if (eventToEdit) {
                // Populate form with event data
                document.getElementById('event-name').value = eventToEdit.name;
                document.getElementById('event-date').value = eventToEdit.date;
                document.getElementById('event-time').value = eventToEdit.time;
                document.getElementById('event-location').value = eventToEdit.location;
                document.getElementById('event-description').value = eventToEdit.description;
                
                // Switch form to 'edit' mode
                editingEventId = eventId;
                formTitle.textContent = 'Edit Event';
                submitBtn.textContent = 'Update Event';
                cancelBtn.style.display = 'block';
                
                // Scroll to form for better UX
                document.getElementById('event-form-section').scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // --- Event Listeners ---
    eventForm.addEventListener('submit', handleFormSubmit);
    eventsContainer.addEventListener('click', handleEventAction);
    cancelBtn.addEventListener('click', resetForm);

    // --- Initial Render ---
    renderEvents();
});