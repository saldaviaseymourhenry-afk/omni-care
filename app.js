const savedCatalog = JSON.parse(localStorage.getItem("omnicare-catalog-draft") || "null");
const introductoryFragranceIds = new Set(["aura", "assuree", "adente", "odyssey", "oxygen", "omega"]);
const currentPersonalCare = {
  "hair-treatment-oil": { name: "Hair Serum", price: 345, howTo: "Apply a small amount directly to the scalp and gently massage with fingertips. Leave on for several hours or overnight, then wash thoroughly. Use consistently as part of your regular scalp-care routine." },
  "hair-treatment-duo": {
    name: "Rosemary Hair Fall & Growth Treatment Oil",
    price: 280,
    badge: "Hair growth support",
    description: "A nourishing botanical hair and scalp treatment designed to support healthy-looking hair growth, strengthen the feel of the hair, and nourish the scalp.",
    notes: ["Nourishes the scalp", "Supports healthy-looking hair growth", "Helps improve the feel of dry, weak hair", "Helps reduce the appearance of hair breakage", "Leaves hair soft and conditioned"],
    size: "100 ml"
  }
};
const currentSku = {
  "aura": "OC-S-AUR-050", "assuree": "OC-S-ASR-050", "adente": "OC-S-ARD-050",
  "amitie-discovery": "OC-S-AMT-SET", "odyssey": "OC-S-ODY-050", "oxygen": "OC-S-OXY-050",
  "omega": "OC-S-OMG-050", "jezreel-discovery": "OC-S-JZR-SET",
  "hair-treatment-oil": "OC-C-HSR-100", "hair-treatment-duo": "OC-C-RHG-100"
};
const inventoryWasInitialized = localStorage.getItem("omnicare-inventory-v1") === "ready";
const hydrateProducts = (source, preserveAdminEdits = false) => source.map(product => {
  const launchDefaults = introductoryFragranceIds.has(product.id)
    ? { price: 699 }
    : { ...(currentPersonalCare[product.id] || {}), ...(product.id.includes("discovery") ? { pricePending: true } : {}) };
  const hydrated = preserveAdminEdits ? { ...product } : { ...product, ...launchDefaults };
  return { ...hydrated, sku: hydrated.sku || currentSku[hydrated.id], stock: inventoryWasInitialized && Number.isFinite(Number(hydrated.stock)) ? Number(hydrated.stock) : 10000 };
});
let products = hydrateProducts(savedCatalog || structuredClone(window.OMNICARE_PRODUCTS), Array.isArray(savedCatalog));
localStorage.setItem("omnicare-inventory-v1", "ready");
window.getOmniProducts = () => products;
window.setOmniProducts = next => { products = next; localStorage.setItem("omnicare-catalog-draft", JSON.stringify(products)); render(); };
window.resetOmniProducts = () => { products = hydrateProducts(structuredClone(window.OMNICARE_PRODUCTS)); localStorage.removeItem("omnicare-catalog-draft"); render(); };
const $ = s => document.querySelector(s);
const money = value => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(value);
const deliveryFee = 90;
const productPrice = product => product.pricePending ? "Coming soon" : money(product.price);
let cart = JSON.parse(localStorage.getItem("omnicare-cart") || "[]");
let detailQty = 1;

const card = p => `<a class="product-card" href="#/product/${p.id}"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="pill">${p.pricePending?'Coming soon':p.badge}</span></div><div class="product-info"><div><h3>${p.name}</h3><p>${p.collection}</p></div><span class="price">${productPrice(p)}</span></div></a>`;
function home(){return `<section class="hero hero-campaign hero-fullframe"><div class="hero-image"><img src="assets/hero-model-generic.png" alt="Elegant Omni-care beauty model in a warm floral setting"></div><div class="hero-copy"><p class="eyebrow">Scent, care & considered ritual</p><h1>Beauty,<br>made personal.</h1><p>Distinctive fragrance for every side of you.</p><a class="button" href="#/shop/all">Explore the collection</a></div></section><section class="section"><div class="section-head"><div><p class="eyebrow">Curated for you</p><h2 class="display">The Omni-care edit</h2></div><a class="text-link" href="#/shop/all">View all products</a></div><div class="product-grid">${products.slice(0,4).map(card).join("")}</div></section><section class="category-duo"><article class="category-panel"><img src="assets/hero-scents.jpg" alt="OmniScent perfume collection"><div class="category-copy"><p class="eyebrow">The art of presence</p><h2>Scents</h2><a href="#/shop/scents">Shop fragrances</a></div></article><article class="category-panel"><img src="assets/hero-care.jpg" alt="Omni-care botanical hair treatment oils"><div class="category-copy"><p class="eyebrow">Rooted in care</p><h2>Personal Care</h2><a href="#/shop/personal-care">Shop the ritual</a></div></article></section>`}

function shop(slug){
  const map={"scents":"Scents","womens":"Women's Scents","mens":"Men's Scents","personal-care":"Personal Care"}; const active=map[slug]||"All"; const title=active==="All"?"The collection":active;
  const copy=active==="Scents"?"From airy and luminous to deep and magnetic, find a fragrance that feels unmistakably yours.":active==="Women's Scents"?"The Valley of Amitie—a luminous fragrance wardrobe for every expression of her.":active==="Men's Scents"?"The Valley of Jezreel—confident fragrances for every side of him.":active==="Personal Care"?"Botanical care for the routines that restore, nourish and bring you back to yourself.":"Explore every Omni-care scent and personal care ritual.";
  const brand=active==="Men's Scents"?`<a class="mens-brand" href="#catalogGrid"><img src="assets/scent-men-branding.png" alt="OmniScent The Valley of Jezreel men's collection — fragrances that tell your story"></a>`:active==="Women's Scents"?`<a class="womens-brand" href="#catalogGrid"><img src="assets/hero-scents.jpg" alt="OmniScent The Valley of Amitie women's fragrance collection"><span><small>The women's collection</small>The Valley of Amitie</span></a>`:"";
  return `${brand}<section class="collection-hero"><div><p class="eyebrow">Omni-care store</p><h1 class="display">${title}</h1></div><p>${copy}</p></section><div class="shop-toolbar"><div class="filter-chips"><button class="filter-chip ${active==='All'?'active':''}" data-filter="All">All</button><button class="filter-chip ${active==='Scents'?'active':''}" data-filter="Scents">Scents</button><button class="filter-chip ${active==="Women's Scents"?'active':''}" data-filter="Women's Scents">Women</button><button class="filter-chip ${active==="Men's Scents"?'active':''}" data-filter="Men's Scents">Men</button><button class="filter-chip ${active==='Personal Care'?'active':''}" data-filter="Personal Care">Care</button></div><select class="sort-select" id="sortSelect" aria-label="Sort products"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name</option></select></div><div class="product-grid catalog-grid" id="catalogGrid"></div>`;
}
function noteRows(p){return p.topNotes?[["Top notes",p.topNotes],["Middle notes",p.middleNotes],["Base notes",p.baseNotes]].map(([label,list])=>`<div class="note-row scent-note-row"><span>${label}</span><strong>${list.join(" · ")}</strong></div>`).join(""):p.notes.map((n,i)=>`<div class="note-row"><span>0${i+1}</span><strong>${n}</strong></div>`).join("")}
function productPage(p){return `<section class="product-page"><div class="product-gallery"><img src="${p.image}" alt="${p.name}"></div><div class="product-detail"><a class="crumb" href="#/shop/${p.line==='Scents'?'scents':'personal-care'}">${p.line} / ${p.collection}</a><p class="eyebrow">${p.pricePending?'Coming soon':p.badge}</p><h1 class="display">${p.name}</h1><p class="lead">${p.description}</p><div class="detail-meta"><span>${p.size}</span><span>${productPrice(p)}</span></div><div class="notes">${noteRows(p)}</div>${p.howTo?`<div class="usage-block"><span>How to use</span><p>${p.howTo}</p></div>`:''}<div class="buy-row">${p.pricePending?`<button class="button" disabled>Price pending</button>`:`<div class="qty"><button data-qty="down" aria-label="Decrease quantity">−</button><span id="detailQty">1</span><button data-qty="up" aria-label="Increase quantity">+</button></div><button class="button" data-add="${p.id}">Add to bag — ${money(p.price)}</button>`}</div></div></section>`}
function story(){return `<section class="story-hero"><div class="story-copy"><p class="eyebrow">Our point of view</p><h1 class="display">Care is a way of being.</h1><p>Omni-care brings fragrance and personal care into one considered world. Each product is designed to feel beautiful in use, easy to return to, and distinctly your own.</p></div><img src="assets/hair-benefits.jpg" alt="Omni-care botanical hair treatment ingredients and benefits"></section><section class="story-values"><article><p class="eyebrow">01</p><h3>Personal by nature</h3><p>Choose what speaks to your mood, your rhythm and the way you want to feel.</p></article><article><p class="eyebrow">02</p><h3>Made for ritual</h3><p>Useful formulas and memorable fragrances that earn their place in everyday life.</p></article><article><p class="eyebrow">03</p><h3>Beauty with intention</h3><p>Thoughtful presentation, clear purpose and a refined experience from shelf to skin.</p></article></section>`}
function contact(){return `<section class="contact-page"><div class="contact-intro"><p class="eyebrow">We're here to help</p><h1 class="display">Contact Omni-care</h1><p>For product questions, orders and customer assistance, reach us through Viber, WhatsApp or email.</p></div><div class="contact-options"><a class="contact-card" href="viber://chat?number=%2B639068403075"><span>Viber</span><strong>0906 840 3075</strong><small>Message us on Viber</small></a><a class="contact-card" href="https://wa.me/639068403075" target="_blank" rel="noopener"><span>WhatsApp</span><strong>0906 840 3075</strong><small>Start a WhatsApp chat</small></a><a class="contact-card" href="mailto:ceo@omni-care.store"><span>Email</span><strong>ceo@omni-care.store</strong><small>Send us an email</small></a></div></section>`}
function renderCatalog(filter="All",sort="featured"){
  let list=filter==="All"?[...products]:filter==="Women's Scents"?products.filter(p=>p.audience==="Women"):filter==="Men's Scents"?products.filter(p=>p.audience==="Men"):products.filter(p=>p.line===filter); if(sort==="low")list.sort((a,b)=>a.price-b.price); if(sort==="high")list.sort((a,b)=>b.price-a.price); if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
  $("#catalogGrid").innerHTML=list.length?list.map(card).join(""):`<div class="empty-state"><h2 class="display">Nothing here yet</h2><p>Try another category.</p></div>`;
}
function render(){
  const parts=location.hash.slice(2).split("/"); let markup;
  if(parts[0]==="shop") markup=shop(parts[1]||"all"); else if(parts[0]==="product") {const p=products.find(x=>x.id===parts[1]);markup=p?productPage(p):shop("all")} else if(parts[0]==="story") markup=story(); else if(parts[0]==="contact") markup=contact(); else markup=home();
  $("#app").innerHTML=markup;
  window.scrollTo(0,0); detailQty=1;
  if(parts[0]==="shop"){const initial=parts[1]==="scents"?"Scents":parts[1]==="womens"?"Women's Scents":parts[1]==="mens"?"Men's Scents":parts[1]==="personal-care"?"Personal Care":"All";renderCatalog(initial);}
}
function saveCart(){localStorage.setItem("omnicare-cart",JSON.stringify(cart));updateBag();}
function addToCart(id,qty=1){const product=products.find(p=>p.id===id);if(!product||product.pricePending){showToast("This product is coming soon");return}const found=cart.find(i=>i.id===id);if(found)found.qty+=qty;else cart.push({id,qty});saveCart();showToast("Added to your bag");}
function updateBag(){
  const count=cart.reduce((n,i)=>n+i.qty,0);$("#bagCount").textContent=count;const host=$("#bagItems");if(!host)return;
  host.innerHTML=cart.length?cart.map(i=>{const p=products.find(x=>x.id===i.id);return `<div class="bag-item"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><p>${p.size} · Qty ${i.qty}</p><button class="remove" data-remove="${p.id}">Remove</button></div><strong>${money(p.price*i.qty)}</strong></div>`}).join(""):`<div class="empty-state"><h3 class="display">Your bag is empty</h3><p>Discover a scent or care ritual to begin.</p><a class="button" href="#/shop/all" data-close>Shop all</a></div>`;
  const subtotal=cart.reduce((n,i)=>n+products.find(p=>p.id===i.id).price*i.qty,0),orderTotal=cart.length?subtotal+deliveryFee:0;$("#bagSummary").innerHTML=cart.length?`<div class="summary-row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="summary-row"><span>Delivery</span><strong>${money(deliveryFee)}</strong></div><div class="summary-row total"><span>Total</span><strong>${money(orderTotal)}</strong></div><button class="button full" id="checkoutButton">Checkout</button>`:"";$("#checkoutTotal").innerHTML=cart.length?`<div class="summary-row"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="summary-row"><span>Delivery</span><strong>${money(deliveryFee)}</strong></div><div class="summary-row total"><span>Order total</span><strong>${money(orderTotal)}</strong></div>`:"";
}
function openPanel(panel){closePanels();$("#overlay").classList.add("open");panel.classList.add("open");panel.setAttribute("aria-hidden","false");document.body.classList.add("no-scroll");if(panel===$("#searchDrawer"))setTimeout(()=>$("#searchInput").focus(),200)}
function closePanels(){document.querySelectorAll(".drawer,.checkout-modal").forEach(x=>{x.classList.remove("open");x.setAttribute("aria-hidden","true")});$("#overlay").classList.remove("open");document.body.classList.remove("no-scroll")}
function showToast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function search(query){const q=query.trim().toLowerCase();const list=q?products.filter(p=>[p.name,p.line,p.collection,p.badge,...p.notes].join(" ").toLowerCase().includes(q)):products.slice(0,4);$("#searchResults").innerHTML=list.length?list.map(p=>`<a class="search-result" href="#/product/${p.id}" data-close><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>${p.line} · ${p.badge}</p></div><strong>${productPrice(p)}</strong></a>`).join(""):`<p>No products match “${query.replace(/[<>]/g,'')}”.</p>`}
document.addEventListener("click",e=>{
  const filter=e.target.closest("[data-filter]");if(filter){document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));filter.classList.add("active");renderCatalog(filter.dataset.filter,$("#sortSelect").value)}
  const q=e.target.closest("[data-qty]");if(q){detailQty=Math.max(1,detailQty+(q.dataset.qty==="up"?1:-1));$("#detailQty").textContent=detailQty}
  const add=e.target.closest("[data-add]");if(add)addToCart(add.dataset.add,detailQty); const rem=e.target.closest("[data-remove]");if(rem){cart=cart.filter(i=>i.id!==rem.dataset.remove);saveCart()}
  if(e.target.closest("[data-close]")||e.target===$("#overlay"))closePanels(); if(e.target===$("#checkoutButton")){closePanels();openPanel($("#checkoutModal"))}
});
$("#searchButton").addEventListener("click",()=>{search("");openPanel($("#searchDrawer"))}); $("#bagButton").addEventListener("click",()=>{updateBag();openPanel($("#bagDrawer"))}); $("#searchInput").addEventListener("input",e=>search(e.target.value));
$("#menuButton").addEventListener("click",e=>{const n=$("#primaryNav");n.classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",n.classList.contains("open"))}); $("#primaryNav").addEventListener("click",()=>$("#primaryNav").classList.remove("open"));
$("#checkoutForm").addEventListener("submit",e=>{e.preventDefault();closePanels();showToast("Checkout is ready for payment connection")}); document.addEventListener("change",e=>{if(e.target.id==="sortSelect"){const active=$("[data-filter].active");renderCatalog(active.dataset.filter,e.target.value)}}); document.addEventListener("keydown",e=>{if(e.key==="Escape")closePanels()});
window.addEventListener("hashchange",render);render();updateBag();
