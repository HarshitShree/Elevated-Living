/* ==========================================================================
   ELEVATED LIVING — app logic
   Cart, filters, sorting, WhatsApp checkout. Loaded after products.js.
   ========================================================================== */

/* ── helpers ───────────────────────────────────────────────────────────── */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const rupees = n => "\u20B9" + Number(n).toLocaleString("en-IN");

const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));

const catBySlug = slug => CATEGORIES.find(c => c.slug === slug);

/* ── theme ─────────────────────────────────────────────────────────────── */

(function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem("el_theme"); } catch (e) {}
  if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
})();

function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("el_theme", next); } catch (e) {}
}

/* ── cart state ────────────────────────────────────────────────────────── */

const CART_KEY = "el_cart_v1";
let cart = [];

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    cart = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(cart)) cart = [];
  } catch (e) { cart = []; }
  // drop anything that no longer exists in the catalog
  cart = cart.filter(line => PRODUCTS.some(p => p.id === line.id));
}

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
}

const cartCount = () => cart.reduce((n, l) => n + l.qty, 0);
const cartTotal = () => cart.reduce((n, l) => {
  const p = PRODUCTS.find(x => x.id === l.id);
  return n + (p ? p.price * l.qty : 0);
}, 0);

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product || !product.stock) return;
  const line = cart.find(l => l.id === id);
  if (line) line.qty += 1;
  else cart.push({ id, qty: 1 });
  saveCart();
  renderCart();
  toast(product.name + " added to your bag");
}

function setQty(id, qty) {
  const line = cart.find(l => l.id === id);
  if (!line) return;
  line.qty = qty;
  if (line.qty < 1) cart = cart.filter(l => l.id !== id);
  saveCart();
  renderCart();
}

function removeLine(id) {
  cart = cart.filter(l => l.id !== id);
  saveCart();
  renderCart();
}

/* ── cart drawer ───────────────────────────────────────────────────────── */

function openCart()  { $("#cart").classList.add("on"); $("#scrim").classList.add("on"); document.body.style.overflow = "hidden"; }
function closeCart() { $("#cart").classList.remove("on"); $("#scrim").classList.remove("on"); document.body.style.overflow = ""; }

function renderCart() {
  const badge = $(".cart-count");
  const n = cartCount();
  if (badge) { badge.textContent = n; badge.classList.toggle("on", n > 0); }

  const box = $("#cart-items");
  if (!box) return;

  if (!cart.length) {
    box.innerHTML = `
      <div class="cart-empty">
        <i class="fa-regular fa-gem"></i>
        <p>Your bag is empty.</p>
        <p style="font-size:.82rem;margin-top:.4rem;">Browse a collection and add the pieces you like.</p>
      </div>`;
  } else {
    box.innerHTML = cart.map(line => {
      const p = PRODUCTS.find(x => x.id === line.id);
      return `
        <div class="ci">
          <img src="${esc(p.img)}" alt="" loading="lazy">
          <div>
            <div class="ci-name">${esc(p.name)}</div>
            <div class="ci-price">${rupees(p.price)} each</div>
            <div class="ci-row">
              <div class="qty">
                <button type="button" aria-label="Reduce quantity" data-qty="${p.id}" data-to="${line.qty - 1}">&minus;</button>
                <span>${line.qty}</span>
                <button type="button" aria-label="Increase quantity" data-qty="${p.id}" data-to="${line.qty + 1}">+</button>
              </div>
              <button type="button" class="ci-remove" data-remove="${p.id}">Remove</button>
            </div>
          </div>
        </div>`;
    }).join("");
  }

  const totalEl = $("#cart-total");
  if (totalEl) totalEl.textContent = rupees(cartTotal());
  const sendBtn = $("#send-order");
  if (sendBtn) sendBtn.disabled = cart.length === 0;
  const lbl = $("#cart-count-label");
  if (lbl) lbl.textContent = n === 1 ? "1 item" : n + " items";
}

/* ── WhatsApp checkout ─────────────────────────────────────────────────── */

function buildOrderMessage() {
  const name = ($("#buyer-name")?.value || "").trim();
  const date = ($("#buyer-date")?.value || "").trim();
  const note = ($("#buyer-note")?.value || "").trim();

  const lines = [];
  lines.push("*NEW ORDER \u2014 Elevated Living*");
  lines.push("");

  cart.forEach((l, i) => {
    const p = PRODUCTS.find(x => x.id === l.id);
    lines.push(`${i + 1}. ${p.name}`);
    lines.push(`   ${l.qty} \u00D7 ${rupees(p.price)} = ${rupees(p.price * l.qty)}`);
  });

  lines.push("");
  lines.push(`*Total: ${rupees(cartTotal())}*  (${cartCount()} items)`);
  lines.push("");
  if (name) lines.push(`*Name:* ${name}`);
  if (date) lines.push(`*Needed by:* ${date}`);
  if (note) lines.push(`*Notes:* ${note}`);
  lines.push("");
  lines.push("Please confirm availability and delivery.");

  return lines.join("\n");
}

function sendOrder() {
  if (!cart.length) return;
  const url = "https://wa.me/" + BUSINESS.whatsapp + "?text=" + encodeURIComponent(buildOrderMessage());
  window.open(url, "_blank", "noopener");
}

/* ── toast ─────────────────────────────────────────────────────────────── */

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  if (!t) return;
  t.innerHTML = `<i class="fa-solid fa-check"></i><span>${esc(msg)}</span>`;
  t.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("on"), 2600);
}

/* ── shared chrome: nav, scrim, delegated clicks ───────────────────────── */

function initChrome() {
  loadCart();
  renderCart();

  const nav = $("#nav");
  if (nav && nav.classList.contains("transparent")) {
    const onScroll = () => nav.classList.toggle("transparent", window.scrollY < 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  $("#scrim")?.addEventListener("click", () => { closeCart(); closeFilters(); });
  $("#cart-open")?.addEventListener("click", openCart);
  $("#cart-close")?.addEventListener("click", closeCart);
  $("#send-order")?.addEventListener("click", sendOrder);
  $("#theme-toggle")?.addEventListener("click", toggleTheme);
  $("#nav-toggle")?.addEventListener("click", () => $("#mobile-menu").classList.toggle("on"));

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeCart(); closeFilters(); }
  });

  document.addEventListener("click", e => {
    const add = e.target.closest("[data-add]");
    if (add) { addToCart(add.dataset.add); return; }

    const q = e.target.closest("[data-qty]");
    if (q) { setQty(q.dataset.qty, parseInt(q.dataset.to, 10)); return; }

    const rm = e.target.closest("[data-remove]");
    if (rm) { removeLine(rm.dataset.remove); return; }
  });
}

/* ==========================================================================
   SHOP PAGE
   ========================================================================== */

const state = {
  cat: "",
  search: "",
  sort: "featured",
  types: new Set(),
  materials: new Set(),
  min: null,
  max: null,
  inStockOnly: false
};

function openFilters()  { $("#filters")?.classList.add("on"); $("#scrim")?.classList.add("on"); }
function closeFilters() { $("#filters")?.classList.remove("on"); $("#scrim")?.classList.remove("on"); }

function initShop() {
  const params = new URLSearchParams(location.search);
  const slug = params.get("c");
  const category = catBySlug(slug) || CATEGORIES[0];
  state.cat = category.slug;

  // hero
  document.title = category.name + " | Elevated Living";
  $("#shop-bg").src = category.img;
  $("#shop-title").textContent = category.name;
  $("#shop-tag").textContent = category.tagline;
  $("#crumb-cat").textContent = category.name;

  // category switcher
  $("#cat-pills").innerHTML = CATEGORIES.map(c =>
    `<a class="pill" href="shop.html?c=${c.slug}"${c.slug === category.slug ? ' aria-current="page"' : ""}>${esc(c.name)}</a>`
  ).join("");

  buildFilters();

  $("#search").addEventListener("input", e => { state.search = e.target.value.toLowerCase().trim(); render(); });
  $("#sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
  $("#min").addEventListener("input", e => { state.min = e.target.value ? +e.target.value : null; render(); });
  $("#max").addEventListener("input", e => { state.max = e.target.value ? +e.target.value : null; render(); });
  $("#in-stock").addEventListener("change", e => { state.inStockOnly = e.target.checked; render(); });
  $("#clear").addEventListener("click", clearFilters);
  $("#filter-open").addEventListener("click", openFilters);
  $("#filter-done").addEventListener("click", closeFilters);

  render();
}

function inCategory() { return PRODUCTS.filter(p => p.cat === state.cat); }

function buildFilters() {
  const items = inCategory();

  const facet = (key, holder, bucket) => {
    const counts = {};
    items.forEach(p => { if (p[key]) counts[p[key]] = (counts[p[key]] || 0) + 1; });
    const keys = Object.keys(counts).sort();
    const box = $(holder);
    if (!keys.length) { box.closest(".filter-block").style.display = "none"; return; }
    box.innerHTML = keys.map(k => `
      <label class="check">
        <input type="checkbox" value="${esc(k)}" data-facet="${bucket}">
        <span>${esc(k)}</span><span class="n">${counts[k]}</span>
      </label>`).join("");
  };

  facet("type", "#facet-type", "types");
  facet("material", "#facet-material", "materials");

  $$("[data-facet]").forEach(cb => cb.addEventListener("change", e => {
    const set = state[e.target.dataset.facet];
    e.target.checked ? set.add(e.target.value) : set.delete(e.target.value);
    render();
  }));

  const prices = items.map(p => p.price);
  $("#min").placeholder = Math.min(...prices);
  $("#max").placeholder = Math.max(...prices);
}

function clearFilters() {
  state.search = ""; state.types.clear(); state.materials.clear();
  state.min = null; state.max = null; state.inStockOnly = false; state.sort = "featured";
  $("#search").value = ""; $("#min").value = ""; $("#max").value = "";
  $("#in-stock").checked = false; $("#sort").value = "featured";
  $$("[data-facet]").forEach(cb => cb.checked = false);
  render();
}

function visibleProducts() {
  let list = inCategory();

  if (state.search) {
    list = list.filter(p =>
      (p.name + " " + p.desc + " " + (p.type || "") + " " + (p.material || "")).toLowerCase().includes(state.search));
  }
  if (state.types.size)     list = list.filter(p => state.types.has(p.type));
  if (state.materials.size) list = list.filter(p => state.materials.has(p.material));
  if (state.min != null)    list = list.filter(p => p.price >= state.min);
  if (state.max != null)    list = list.filter(p => p.price <= state.max);
  if (state.inStockOnly)    list = list.filter(p => p.stock);

  const rank = p => (p.badge === "Bestseller" ? 0 : p.badge === "New" ? 1 : 2);
  const sorters = {
    featured:  (a, b) => rank(a) - rank(b),
    "price-a": (a, b) => a.price - b.price,
    "price-d": (a, b) => b.price - a.price,
    "name-a":  (a, b) => a.name.localeCompare(b.name),
    "name-d":  (a, b) => b.name.localeCompare(a.name)
  };
  return [...list].sort(sorters[state.sort] || sorters.featured);
}

function card(p) {
  const badge = !p.stock
    ? `<span class="tag oos">Made to order</span>`
    : p.badge ? `<span class="tag">${esc(p.badge)}</span>` : "";

  const price = `${rupees(p.price)}${p.mrp && p.mrp > p.price ? `<s>${rupees(p.mrp)}</s>` : ""}`;

  const action = p.stock
    ? `<button class="btn btn-sm" data-add="${p.id}">Add to bag</button>`
    : `<a class="btn btn-sm btn-ghost" target="_blank" rel="noopener"
          href="https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent("Hello! Is " + p.name + " available to order?")}">Enquire</a>`;

  return `
    <article class="card">
      <div class="card-media">
        <img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy">
        ${badge}
      </div>
      <div class="card-body">
        <h3 class="card-name">${esc(p.name)}</h3>
        <p class="card-desc">${esc(p.desc || "")}</p>
        <div class="card-foot">
          <div class="price">${price}</div>
          ${action}
        </div>
      </div>
    </article>`;
}

function render() {
  const list = visibleProducts();
  const total = inCategory().length;
  $("#count").textContent = list.length === total
    ? `${total} pieces`
    : `${list.length} of ${total} pieces`;

  $("#grid").innerHTML = list.length
    ? list.map(card).join("")
    : `<div class="empty" style="grid-column:1/-1">
         <h3>Nothing matches those filters</h3>
         <p>Try a wider price range, or clear the filters to see the full collection.</p>
         <button class="btn btn-sm" onclick="clearFilters()">Clear filters</button>
       </div>`;
}
