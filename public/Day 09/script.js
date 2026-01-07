
        // --- DATA MANAGEMENT ---

        // 1. Get notes from LocalStorage or initialize empty array
        let notes = JSON.parse(localStorage.getItem('quicknotes-app')) || [];
        let isEditing = false;
        let currentEditId = null;

        const appContainer = document.getElementById('app');
        const searchInput = document.getElementById('search-input');

        // Modal Elements
        const modalOverlay = document.getElementById('modal-overlay');
        const modalTitle = document.getElementById('modal-title');
        const titleInput = document.getElementById('note-title');
        const bodyInput = document.getElementById('note-body');
        const saveBtn = document.getElementById('save-btn');
        const cancelBtn = document.getElementById('cancel-btn');

        // --- FUNCTIONS ---

        // Save to Browser's LocalStorage
        function saveToLocalStorage() {
            localStorage.setItem('quicknotes-app', JSON.stringify(notes));
        }

        // Generate a unique ID (Timestamp)
        function generateId() {
            return Date.now().toString();
        }

        // Get Current Date formatted
        function getCurrentDate() {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date().toLocaleDateString('en-US', options);
        }

        // Render Notes to HTML
        function renderNotes(notesToRender) {
            appContainer.innerHTML = '';

            // Always add the "Add New" button as the first card
            const addCard = document.createElement('div');
            addCard.className = 'note-card add-note-card';
            addCard.innerHTML = `
                <span class="add-icon">+</span>
                <span>Add New Note</span>
            `;
            addCard.addEventListener('click', () => openModal());
            appContainer.appendChild(addCard);

            // Render existing notes
            notesToRender.forEach(note => {
                const noteEl = document.createElement('div');
                noteEl.className = 'note-card';
                noteEl.innerHTML = `
                    <div>
                        <div class="note-title">${note.title}</div>
                        <div class="note-body">${note.body}</div>
                    </div>
                    <div class="note-footer">
                        <span>${note.date}</span>
                        <div class="btn-group">
                            <button class="icon-btn" onclick="editNote('${note.id}')">✏️</button>
                            <button class="icon-btn delete-btn" onclick="deleteNote('${note.id}')">🗑️</button>
                        </div>
                    </div>
                `;
                appContainer.appendChild(noteEl);
            });
        }

        // --- MODAL LOGIC ---

        function openModal(editMode = false, noteId = null) {
            modalOverlay.classList.add('active');

            if (editMode) {
                // Find note data to pre-fill
                const note = notes.find(n => n.id === noteId);
                titleInput.value = note.title;
                bodyInput.value = note.body;
                modalTitle.textContent = "Edit Note";
                isEditing = true;
                currentEditId = noteId;
            } else {
                // Clear inputs for new note
                titleInput.value = '';
                bodyInput.value = '';
                modalTitle.textContent = "Add Note";
                isEditing = false;
                currentEditId = null;
            }
            titleInput.focus();
        }

        function closeModal() {
            modalOverlay.classList.remove('active');
        }

        function handleSave() {
            const title = titleInput.value.trim() || 'Untitled Note';
            const body = bodyInput.value.trim();

            if (!body && !title) {
                alert("Note cannot be empty!");
                return;
            }

            if (isEditing) {
                // Update existing note
                notes = notes.map(n => 
                    n.id === currentEditId ? { ...n, title, body, date: getCurrentDate() } : n
                );
            } else {
                // Create new note
                const newNote = {
                    id: generateId(),
                    title,
                    body,
                    date: getCurrentDate()
                };
                // Add to beginning of array
                notes.unshift(newNote);
            }

            saveToLocalStorage();
            renderNotes(notes);
            closeModal();
        }

        // --- GLOBAL ACTIONS (Exposed to window for onclick in HTML) ---

        window.deleteNote = function(id) {
            if(confirm("Are you sure you want to delete this note?")) {
                notes = notes.filter(n => n.id !== id);
                saveToLocalStorage();
                renderNotes(notes);
            }
        };

        window.editNote = function(id) {
            openModal(true, id);
        };

        // --- EVENT LISTENERS ---

        saveBtn.addEventListener('click', handleSave);
        cancelBtn.addEventListener('click', closeModal);

        // Close modal if clicking outside the white box
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        // Search Filter
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filteredNotes = notes.filter(n => 
                n.title.toLowerCase().includes(term) || 
                n.body.toLowerCase().includes(term)
            );
            renderNotes(filteredNotes);
        });

        // Initial Render
        renderNotes(notes);
=======
const { jsPDF } = window.jspdf;
let recipes = JSON.parse(localStorage.getItem('recipes')) || [
 {id:1,title:'Veg Biryani',img:'https://images.unsplash.com/photo-1600628422019-8a0b8e7c7d5d',ingredients:['Rice','Vegetables','Spices'],steps:['Cook rice','Prepare masala','Mix & steam'],time:900},
 {id:2,title:'Margherita Pizza',img:'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3',ingredients:['Flour','Cheese','Tomato Sauce'],steps:['Prepare dough','Add toppings','Bake'],time:800},
 {id:3,title:'Pancakes',img:'https://images.unsplash.com/photo-1587732019718-4a4e7f5b6a2d',ingredients:['Flour','Milk','Eggs'],steps:['Make batter','Cook on pan','Serve hot'],time:400},
 {id:4,title:'Caesar Salad',img:'https://images.unsplash.com/photo-1568605114967-8130f3a36994',ingredients:['Lettuce','Croutons','Dressing'],steps:['Chop','Mix','Serve'],time:300},
 {id:5,title:'Chocolate Brownies',img:'https://images.unsplash.com/photo-1599785209707-a456fc1337bb',ingredients:['Cocoa','Butter','Sugar','Flour'],steps:['Mix ingredients','Bake','Cool & slice'],time:700},
 {id:6,title:'Masala Dosa',img:'https://images.unsplash.com/photo-1626776876729-bab4360a7b19',ingredients:['Rice batter','Potato','Spices'],steps:['Prepare filling','Spread batter','Cook & fold'],time:600}
];
let favs = JSON.parse(localStorage.getItem('favs')) || [];

function save(){localStorage.setItem('recipes',JSON.stringify(recipes));localStorage.setItem('favs',JSON.stringify(favs));}

function toggleTheme(){document.body.classList.toggle('dark')}

function render(){
 const el=document.getElementById('recipes');el.innerHTML='';
 recipes.forEach(r=>{
  const fav=favs.includes(r.id)?'❤️':'🤍';
  el.innerHTML+=`<div class="card"><img src="${r.img}"><div class="info"><h3>${r.title} <span class="favorite" onclick="favToggle(${r.id})">${fav}</span></h3><button onclick="openRecipe(${r.id})">View</button></div></div>`
 })
}

function favToggle(id){favs.includes(id)?favs=favs.filter(f=>f!==id):favs.push(id);save();render()}

function openRecipe(id){
 const r=recipes.find(x=>x.id===id);
 let t=r.time;
 document.getElementById('modal').style.display='flex';
 document.getElementById('modal').innerHTML=`<div class="modal-content"><button onclick="closeModal()">✖</button><h2>${r.title}</h2><p><b>Ingredients</b></p><ul>${r.ingredients.map(i=>`<li>${i}</li>`).join('')}</ul><p><b>Steps</b></p><ol>${r.steps.map(s=>`<li>${s}</li>`).join('')}</ol><div class="timer" id="timer">${t}s</div><button onclick="startTimer(${t})">🔥 Start Timer</button><button onclick="exportPDF(${id})">📄 Export PDF</button><button onclick="aiSuggest()">🧠 AI Suggest</button></div>`
}

function startTimer(sec){
 let t=sec;const el=document.getElementById('timer');
 const i=setInterval(()=>{t--;el.textContent=t+'s';if(t<=0){clearInterval(i);alert('⏰ Time Up!')}},1000)
}

function exportPDF(id){
 const r=recipes.find(x=>x.id===id);const pdf=new jsPDF();
 pdf.text(r.title,10,10);pdf.text('Ingredients:',10,20);
 r.ingredients.forEach((i,n)=>pdf.text('- '+i,10,30+n*8));
 pdf.save(r.title+'.pdf');
}

function aiSuggest(){alert('🧠 AI Suggestion: Try adding herbs & olive oil for better flavor!')}

function openAdd(){
 document.getElementById('modal').style.display='flex';
 document.getElementById('modal').innerHTML=`<div class="modal-content"><button onclick="closeModal()">✖</button><h2>Add Recipe</h2><input id="t" placeholder="Title"><input id="i" placeholder="Image URL"><textarea id="ing" placeholder="Ingredients comma separated"></textarea><textarea id="st" placeholder="Steps comma separated"></textarea><button onclick="addRecipe()">Save</button></div>`
}

function addRecipe(){
 recipes.push({id:Date.now(),title:t.value,img:i.value,ingredients:ing.value.split(','),steps:st.value.split(','),time:600});save();closeModal();render();}
function closeModal(){document.getElementById('modal').style.display='none'}
render();
