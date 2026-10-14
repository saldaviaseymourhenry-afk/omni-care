window.OMNICARE_PRODUCTS = [
  { id: "aura", name: "Aura", line: "Scents", audience: "Women", collection: "The Valley of Amitie", price: 48, image: "assets/aura.jpg", badge: "Luminous & sophisticated", description: "A luminous and sophisticated fragrance that radiates elegance and modern femininity. Sparkling fruits meet delicate florals and warm, elegant woods, leaving a soft yet unforgettable aura.", topNotes: ["Bergamot", "Pear", "Mandarin Orange", "Pink Pepper"], middleNotes: ["Osmanthus", "Jasmine", "Freesia", "Rose"], baseNotes: ["White Musk", "Amber", "Cedarwood", "Vanilla"], notes: ["Bright, fresh and sparkling opening", "Elegant floral heart", "Warm, sensual and long-lasting dry down"], size: "50 ml" },
  { id: "assuree", name: "Assurée", line: "Scents", audience: "Women", collection: "The Valley of Amitie", price: 48, image: "assets/assuree.jpg", badge: "Confident & modern", description: "A confident and modern feminine fragrance blending luxurious florals with warm ambers. It expresses sophistication, strength and grace, leaving a lasting impression wherever you go.", topNotes: ["Lavender", "Bergamot", "Mandarin Orange", "Blackcurrant"], middleNotes: ["Osmanthus", "Jasmine", "Orange Blossom", "Ylang Ylang"], baseNotes: ["Amber", "Vanilla", "Cedarwood", "Sandalwood", "White Musk"], notes: ["Fresh, radiant and uplifting opening", "Luxurious floral heart", "Warm, sensual and empowering dry down"], size: "50 ml" },
  { id: "adente", name: "Ardente", line: "Scents", audience: "Women", collection: "The Valley of Amitie", price: 48, image: "assets/adente.jpg", badge: "Bold & sensual", description: "A bold and sensual fragrance that ignites passion. Rich spices, intoxicating florals and warm amber notes create a powerful and unforgettable signature.", topNotes: ["Saffron", "Bergamot", "Mandarin Orange", "Pink Pepper"], middleNotes: ["Osmanthus", "Jasmine", "Rose", "Orange Blossom"], baseNotes: ["Amber", "Woody Notes", "Vanilla", "White Musk", "Patchouli"], notes: ["Spicy, luminous and captivating opening", "Seductive floral heart", "Deep, warm and long-lasting dry down"], size: "50 ml" },
  { id: "amitie-discovery", name: "Amitie Discovery Set", line: "Scents", audience: "Women", collection: "The Valley of Amitie", price: 128, image: "assets/hero-scents.jpg", badge: "Three-piece edit", description: "Meet Aura, Assurée and Ardente together—a luminous wardrobe of florals for every expression of you.", notes: ["Aura", "Assurée", "Ardente"], size: "3 × 50 ml" },
  { id: "odyssey", name: "Odyssey", line: "Scents", audience: "Men", collection: "The Valley of Jezreel", price: 52, image: "assets/odyssey.jpg", badge: "Daring & adventurous", description: "A daring and adventurous fragrance for the modern man. Refreshing citrus and aromatic spices balance elegant florals and woody notes, creating a captivating journey that lasts all day.", topNotes: ["Bergamot", "Mandarin Orange", "Grapefruit", "Black Pepper"], middleNotes: ["Lavender", "Ginger", "Geranium", "Osmanthus"], baseNotes: ["Cedarwood", "Vetiver", "Patchouli", "Amber", "White Musk"], notes: ["Bright, fresh and invigorating opening", "Fresh aromatic heart", "Woody, masculine and long-lasting dry down"], size: "50 ml" },
  { id: "oxygen", name: "Oxygen", line: "Scents", audience: "Men", collection: "The Valley of Jezreel", price: 52, image: "assets/oxygen.jpg", badge: "Clean & energizing", description: "A clean and refreshing fragrance for the modern man. Crisp citrus and green notes meet airy florals and smooth woods, creating a fresh, energizing scent that keeps you confident all day.", topNotes: ["Bergamot", "Lemon", "Green Apple", "Mint"], middleNotes: ["Lavender", "Green Tea", "Neroli", "Osmanthus"], baseNotes: ["Ambroxan", "Cedarwood", "White Musk", "Vetiver"], notes: ["Clean, fresh and energizing opening", "Airy and refreshing heart", "Clean, smooth and long-lasting dry down"], size: "50 ml" },
  { id: "omega", name: "Omega", line: "Scents", audience: "Men", collection: "The Valley of Jezreel", price: 52, image: "assets/omega.jpg", badge: "Powerful & sophisticated", description: "A powerful and sophisticated fragrance for the modern man. Vibrant citrus, aromatic florals and refined woods leave a strong and lasting impression.", topNotes: ["Bergamot", "Lemon", "Pink Pepper", "Mandarin Orange"], middleNotes: ["Lavender", "Geranium", "Jasmine", "Osmanthus"], baseNotes: ["Cedarwood", "Sandalwood", "Amber", "White Musk", "Vetiver"], notes: ["Fresh, vibrant and powerful opening", "Aromatic and elegant heart", "Deep, masculine and long-lasting dry down"], size: "50 ml" },
  { id: "jezreel-discovery", name: "Jezreel Discovery Set", line: "Scents", audience: "Men", collection: "The Valley of Jezreel", price: 138, image: "assets/jezreel-trio.jpg", badge: "Three-piece edit", description: "Discover Odyssey, Oxygen and Omega together—three distinct moods in one considered collection.", notes: ["Odyssey", "Oxygen", "Omega"], size: "3 × 50 ml" },
  { id: "hair-treatment-oil", name: "Hair Treatment Oil", line: "Personal Care", collection: "Botanical Hair Ritual", price: 24, image: "assets/hair-oil.jpg", badge: "Daily ritual", description: "A lightweight botanical oil created to nourish the scalp, soften strands and support a healthy-looking shine.", notes: ["Scalp care", "Softens hair", "Natural shine"], size: "100 ml" },
  { id: "hair-treatment-duo", name: "Hair Treatment Oil Duo", line: "Personal Care", collection: "Botanical Hair Ritual", price: 42, image: "assets/hair-duo.jpg", badge: "Best value", description: "Two bottles of our botanical hair treatment oil for a consistent, restorative care routine.", notes: ["Two-bottle set", "Botanical blend", "Routine-ready"], size: "2 × 100 ml" }
];

// Current introductory retail price for every individual 50 ml fragrance.
const individualFragranceIds = new Set(["aura", "assuree", "adente", "odyssey", "oxygen", "omega"]);
window.OMNICARE_PRODUCTS.forEach(product => {
  if (individualFragranceIds.has(product.id)) product.price = 699;
  if (product.id.includes("discovery")) product.pricePending = true;
});

const personalCareUpdates = {
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
window.OMNICARE_PRODUCTS.forEach(product => Object.assign(product, personalCareUpdates[product.id] || {}));

const inventoryDefaults = {
  "aura": "OC-S-AUR-050", "assuree": "OC-S-ASR-050", "adente": "OC-S-ARD-050",
  "amitie-discovery": "OC-S-AMT-SET", "odyssey": "OC-S-ODY-050", "oxygen": "OC-S-OXY-050",
  "omega": "OC-S-OMG-050", "jezreel-discovery": "OC-S-JZR-SET",
  "hair-treatment-oil": "OC-C-HSR-100", "hair-treatment-duo": "OC-C-RHG-100"
};
window.OMNICARE_PRODUCTS.forEach(product => Object.assign(product, { sku: inventoryDefaults[product.id], stock: 10000 }));
