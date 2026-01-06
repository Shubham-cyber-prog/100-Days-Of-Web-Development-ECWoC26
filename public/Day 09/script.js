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