# Elevated Living

Static storefront. No backend, no database, no build step. Orders are handed off to WhatsApp.

## Files

```
index.html            Home page
shop.html             Category page. Serves all six via ?c=slug
assets/products.js    The catalog. This is the only file you edit day to day
assets/app.js         Cart, filters, sorting, WhatsApp checkout
assets/styles.css     Design system
```

Category URLs:

```
shop.html?c=corporate
shop.html?c=festive
shop.html?c=birthday
shop.html?c=wedding
shop.html?c=anniversary
shop.html?c=signature
```

## Deploying

Commit all four files, keeping the `assets/` folder intact, then in the repo go to
**Settings → Pages → Source: Deploy from a branch → main / (root)**. The site goes live at
`https://harshitshree.github.io/Elevated-Living/`.

## Adding a product

Open `assets/products.js` and copy an existing block:

```js
{ id:"fes-07", name:"Brass Urli Bowl", cat:"festive", price:3400, mrp:3900,
  img:"images/brass-urli.jpg",
  desc:"Hand-beaten, 10 inch.", type:"Decor", material:"Brass", badge:"New", stock:true },
```

- `id` must be unique across the whole file. Nothing else depends on it.
- `cat` must match one of the six slugs above.
- `mrp` is optional. If it is higher than `price`, it shows struck through.
- `badge` can be `"Bestseller"`, `"New"` or `""`. Featured sorting puts bestsellers first.
- `stock: false` keeps the item visible but swaps the button for an Enquire link.
- `type` and `material` build the filter checkboxes automatically. Reuse the same
  spellings so they group properly. A new value just appears as a new checkbox.

### Photos

Make an `images/` folder in the repo, drop the files in, and reference them as
`img: "images/brass-urli.jpg"`. Shoot or crop to a 4:5 portrait ratio and keep each file
under about 300 KB so pages stay fast.

## Changing the WhatsApp number

Top of `assets/products.js`:

```js
whatsapp: "919810838065"
```

Country code first, no `+`, no spaces. Every WhatsApp link on the site reads from this.

## What the order message looks like

```
*NEW ORDER — Elevated Living*

1. Diwali Brass Diya Set
   2 × ₹2,750 = ₹5,500
2. Scented Candle Trio
   1 × ₹2,400 = ₹2,400

*Total: ₹7,900*  (3 items)

*Name:* Ananya
*Needed by:* 2026-10-18
*Notes:* Gift wrap both, deliver to Vasant Kunj

Please confirm availability and delivery.
```

The customer taps send. Nothing is charged on the site and no payment details are collected.

## Known limits

- The bag is stored in the customer's own browser. Clearing site data empties it.
- Prices are display only. Confirm the final amount yourself on WhatsApp before dispatch.
- Stock is manual. `stock: false` does not track quantity.
