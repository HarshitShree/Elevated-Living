/* ==========================================================================
   ELEVATED LIVING — CATALOG DATA
   --------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD, REMOVE OR REPRICE ITEMS.

   To add a product, copy one block and change the values:

     {
       id:    "cor-07",              // must be unique across the whole file
       name:  "Marble Desk Set",
       cat:   "corporate",           // must match a category slug below
       price: 4200,                  // selling price in rupees, numbers only
       mrp:   5200,                  // optional. Shows as a struck-through price
       img:   "https://...jpg",      // product photo URL
       desc:  "One short line.",
       type:  "Desk",                // shows up as a filter checkbox
       material: "Marble",           // shows up as a filter checkbox
       badge: "Bestseller",          // optional: "Bestseller" / "New" / ""
       stock: true                   // false = shown but cannot be added
     },

   TIP FOR PHOTOS: upload images into an `images/` folder in this repo and
   write  img: "images/marble-desk-set.jpg"  instead of a long URL.
   ========================================================================== */

const BUSINESS = {
  name:     "Elevated Living",
  // WhatsApp number that receives every order. Country code, no + and no spaces.
  whatsapp: "919810838065",
  instagram:"https://www.instagram.com/elevatedlivingg",
  email:    "hello@elevatedliving.in",
  city:     "New Delhi, India"
};

const CATEGORIES = [
  {
    slug: "corporate",
    name: "Corporate Gifting",
    tagline: "Considered gifts for clients, teams and milestones, in quantities that scale.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
  },
  {
    slug: "festive",
    name: "Festive Specials",
    tagline: "Diwali, Holi and the season of giving, wrapped the way it deserves.",
    img: "https://i.pinimg.com/1200x/19/a1/cc/19a1cc070cc83733451a8553205aaa72.jpg"
  },
  {
    slug: "birthday",
    name: "Birthday Milestones",
    tagline: "Gifts with a little personality, for the people who have everything.",
    img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1600&auto=format&fit=crop"
  },
  {
    slug: "wedding",
    name: "Grand Weddings",
    tagline: "Trousseau trays, hampers and favours for the whole celebration.",
    img: "https://i.pinimg.com/1200x/41/af/d8/41afd86c24b8743bbcbe1d5a9e538fc6.jpg"
  },
  {
    slug: "anniversary",
    name: "Timeless Anniversaries",
    tagline: "Pieces that mark the years without saying a word.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
  },
  {
    slug: "signature",
    name: "Signature Collection",
    tagline: "The home pieces we keep coming back to. Available all year.",
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1600&auto=format&fit=crop"
  }
];

/* --------------------------------------------------------------------------
   SAMPLE CATALOG — replace these with your real items and prices.
   Everything below this line is placeholder data.
   -------------------------------------------------------------------------- */

const PRODUCTS = [

  /* ── CORPORATE GIFTING ─────────────────────────────────────────────── */
  { id:"cor-01", name:"Executive Marble Desk Set", cat:"corporate", price:4850, mrp:5900,
    img:"https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=900&auto=format&fit=crop",
    desc:"Pen stand, card holder and coaster in veined marble.", type:"Desk", material:"Marble", badge:"Bestseller", stock:true },

  { id:"cor-02", name:"Brass Cardholder & Pen", cat:"corporate", price:2200,
    img:"https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=900&auto=format&fit=crop",
    desc:"Hand-finished brass, engraved to order.", type:"Desk", material:"Brass", badge:"", stock:true },

  { id:"cor-03", name:"Slate Coaster Set of Six", cat:"corporate", price:1650, mrp:1950,
    img:"https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=900&auto=format&fit=crop",
    desc:"Natural slate with cork backing, in a gift sleeve.", type:"Tableware", material:"Stone", badge:"", stock:true },

  { id:"cor-04", name:"Leather Portfolio Folder", cat:"corporate", price:3400,
    img:"https://images.unsplash.com/photo-1524578271613-d550eacf6090?q=80&w=900&auto=format&fit=crop",
    desc:"Full-grain leather, A4, with notepad.", type:"Desk", material:"Leather", badge:"New", stock:true },

  { id:"cor-05", name:"Signature Welcome Hamper", cat:"corporate", price:6900, mrp:8200,
    img:"https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=900&auto=format&fit=crop",
    desc:"Dry fruits, candle and ceramic mug in a wooden crate.", type:"Hamper", material:"Mixed", badge:"Bestseller", stock:true },

  { id:"cor-06", name:"Ceramic Mug Pair, Matte", cat:"corporate", price:1450,
    img:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=900&auto=format&fit=crop",
    desc:"Stoneware in ivory and charcoal.", type:"Tableware", material:"Ceramic", badge:"", stock:false },

  /* ── FESTIVE SPECIALS ──────────────────────────────────────────────── */
  { id:"fes-01", name:"Diwali Brass Diya Set", cat:"festive", price:2750, mrp:3400,
    img:"https://images.unsplash.com/photo-1605021154533-8ade7d99c4e5?q=80&w=900&auto=format&fit=crop",
    desc:"Five hand-cast diyas on a mirrored tray.", type:"Decor", material:"Brass", badge:"Bestseller", stock:true },

  { id:"fes-02", name:"Dry Fruit Treasure Box", cat:"festive", price:3900,
    img:"https://images.unsplash.com/photo-1609501676725-7186f017a4b7?q=80&w=900&auto=format&fit=crop",
    desc:"Four compartments, premium grade, sealed fresh.", type:"Hamper", material:"Wood", badge:"", stock:true },

  { id:"fes-03", name:"Marble Coaster & Napkin Ring Set", cat:"festive", price:3200,
    img:"https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=900&auto=format&fit=crop",
    desc:"Marble with brass inlay, service of six.", type:"Tableware", material:"Marble", badge:"", stock:true },

  { id:"fes-04", name:"Scented Candle Trio", cat:"festive", price:2400, mrp:2900,
    img:"https://images.unsplash.com/photo-1602874801006-e26c4c5b5e8a?q=80&w=900&auto=format&fit=crop",
    desc:"Oud, saffron and sandalwood in frosted glass.", type:"Decor", material:"Glass", badge:"New", stock:true },

  { id:"fes-05", name:"Silver-Plated Pooja Thali", cat:"festive", price:5600,
    img:"https://images.unsplash.com/photo-1604608672516-f1b9b1a0a224?q=80&w=900&auto=format&fit=crop",
    desc:"Engraved thali with matching bowls and spoon.", type:"Decor", material:"Silver", badge:"", stock:true },

  { id:"fes-06", name:"Grand Festive Hamper", cat:"festive", price:9500, mrp:11500,
    img:"https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=900&auto=format&fit=crop",
    desc:"Our largest hamper. Sweets, candles, diyas and linen.", type:"Hamper", material:"Mixed", badge:"Bestseller", stock:true },

  /* ── BIRTHDAY MILESTONES ───────────────────────────────────────────── */
  { id:"bir-01", name:"Personalised Name Tray", cat:"birthday", price:2900,
    img:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=900&auto=format&fit=crop",
    desc:"Acrylic and gold, engraved with any name.", type:"Decor", material:"Acrylic", badge:"New", stock:true },

  { id:"bir-02", name:"Celebration Cake Stand", cat:"birthday", price:3200, mrp:3800,
    img:"https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=900&auto=format&fit=crop",
    desc:"Footed stand in glass with brass rim.", type:"Tableware", material:"Glass", badge:"", stock:true },

  { id:"bir-03", name:"Birthday Indulgence Hamper", cat:"birthday", price:4500,
    img:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=900&auto=format&fit=crop",
    desc:"Chocolate, candle, mug and a handwritten card.", type:"Hamper", material:"Mixed", badge:"Bestseller", stock:true },

  { id:"bir-04", name:"Marble Jewellery Dish", cat:"birthday", price:1400,
    img:"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=900&auto=format&fit=crop",
    desc:"Small keepsake dish, gift boxed.", type:"Decor", material:"Marble", badge:"", stock:true },

  { id:"bir-05", name:"Monogrammed Wine Glasses", cat:"birthday", price:3600,
    img:"https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=900&auto=format&fit=crop",
    desc:"Pair of crystal glasses, etched initials.", type:"Tableware", material:"Glass", badge:"", stock:true },

  { id:"bir-06", name:"Luxury Bath & Body Box", cat:"birthday", price:5200, mrp:6100,
    img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=900&auto=format&fit=crop",
    desc:"Soaps, oils and linen towel in a keepsake box.", type:"Hamper", material:"Mixed", badge:"", stock:true },

  /* ── GRAND WEDDINGS ────────────────────────────────────────────────── */
  { id:"wed-01", name:"Trousseau Packing Tray Set", cat:"wedding", price:8400, mrp:9800,
    img:"https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=900&auto=format&fit=crop",
    desc:"Set of four mirrored trays with organza covers.", type:"Trousseau", material:"Mixed", badge:"Bestseller", stock:true },

  { id:"wed-02", name:"Mehendi Favour Box, Set of 20", cat:"wedding", price:11000,
    img:"https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=900&auto=format&fit=crop",
    desc:"Hand-painted boxes with almonds and a tealight.", type:"Favours", material:"Wood", badge:"", stock:true },

  { id:"wed-03", name:"Silver Dry Fruit Platter", cat:"wedding", price:7200,
    img:"https://images.unsplash.com/photo-1600289031464-74d374b64991?q=80&w=900&auto=format&fit=crop",
    desc:"Five-section platter with lid, silver plated.", type:"Tableware", material:"Silver", badge:"", stock:true },

  { id:"wed-04", name:"Bridal Keepsake Chest", cat:"wedding", price:14500, mrp:17000,
    img:"https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=900&auto=format&fit=crop",
    desc:"Velvet-lined chest in carved sheesham.", type:"Trousseau", material:"Wood", badge:"New", stock:true },

  { id:"wed-05", name:"Guest Welcome Hamper", cat:"wedding", price:3800,
    img:"https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?q=80&w=900&auto=format&fit=crop",
    desc:"Per-room hamper: water, snacks, itinerary card.", type:"Hamper", material:"Mixed", badge:"", stock:true },

  { id:"wed-06", name:"Engraved Couple Goblets", cat:"wedding", price:4900,
    img:"https://images.unsplash.com/photo-1566454419290-57a64afe30ac?q=80&w=900&auto=format&fit=crop",
    desc:"Brass goblets engraved with names and date.", type:"Tableware", material:"Brass", badge:"", stock:false },

  /* ── TIMELESS ANNIVERSARIES ────────────────────────────────────────── */
  { id:"ann-01", name:"Silver Photo Frame, 8x10", cat:"anniversary", price:4200,
    img:"https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=900&auto=format&fit=crop",
    desc:"Hallmarked frame with velvet back.", type:"Decor", material:"Silver", badge:"Bestseller", stock:true },

  { id:"ann-02", name:"Crystal Decanter Set", cat:"anniversary", price:8900, mrp:10500,
    img:"https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=900&auto=format&fit=crop",
    desc:"Decanter with two tumblers on a wooden base.", type:"Barware", material:"Glass", badge:"", stock:true },

  { id:"ann-03", name:"Engraved Anniversary Clock", cat:"anniversary", price:6400,
    img:"https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?q=80&w=900&auto=format&fit=crop",
    desc:"Desk clock in brass with engraved plate.", type:"Decor", material:"Brass", badge:"", stock:true },

  { id:"ann-04", name:"Linen Table Runner & Napkins", cat:"anniversary", price:3300,
    img:"https://images.unsplash.com/photo-1594224457860-23f2d5e2e0c5?q=80&w=900&auto=format&fit=crop",
    desc:"Pure linen, hand-hemmed, service of six.", type:"Linen", material:"Linen", badge:"New", stock:true },

  { id:"ann-05", name:"Rose & Oud Diffuser", cat:"anniversary", price:2800,
    img:"https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=900&auto=format&fit=crop",
    desc:"200ml reed diffuser in amber glass.", type:"Decor", material:"Glass", badge:"", stock:true },

  { id:"ann-06", name:"Twenty-Five Years Hamper", cat:"anniversary", price:12500, mrp:14800,
    img:"https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=900&auto=format&fit=crop",
    desc:"Silver frame, candles, linen and chocolates.", type:"Hamper", material:"Mixed", badge:"", stock:true },

  /* ── SIGNATURE COLLECTION ──────────────────────────────────────────── */
  { id:"sig-01", name:"Sculpted Brass Bowl", cat:"signature", price:5400,
    img:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=900&auto=format&fit=crop",
    desc:"Hand-beaten centrepiece bowl, 12 inch.", type:"Decor", material:"Brass", badge:"Bestseller", stock:true },

  { id:"sig-02", name:"Marble Cheese Board", cat:"signature", price:3600, mrp:4200,
    img:"https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=900&auto=format&fit=crop",
    desc:"Carrara marble with acacia handle.", type:"Tableware", material:"Marble", badge:"", stock:true },

  { id:"sig-03", name:"Stoneware Dinner Set, 16 Piece", cat:"signature", price:11800,
    img:"https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=900&auto=format&fit=crop",
    desc:"Reactive glaze, service for four.", type:"Tableware", material:"Ceramic", badge:"", stock:true },

  { id:"sig-04", name:"Woven Cane Storage Basket", cat:"signature", price:2600,
    img:"https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=900&auto=format&fit=crop",
    desc:"Natural cane with leather pulls.", type:"Decor", material:"Cane", badge:"", stock:true },

  { id:"sig-05", name:"Black Marble Vase", cat:"signature", price:6800, mrp:7900,
    img:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=900&auto=format&fit=crop",
    desc:"Turned from a single block, 14 inch.", type:"Decor", material:"Marble", badge:"New", stock:true },

  { id:"sig-06", name:"Brass Candle Stand, Pair", cat:"signature", price:4100,
    img:"https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=900&auto=format&fit=crop",
    desc:"Tapered stands in antique brass finish.", type:"Decor", material:"Brass", badge:"", stock:true }
];
