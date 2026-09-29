# Simple Interview Preparation Guide & Challenges

This guide explains your project in simple words and lists the hardest challenges you faced, which you can share with interviewers.

---

## 💡 1. The Project in Simple Words (No Jargon)

**Ashivo** is a quick-commerce grocery delivery platform where customers can buy daily essentials and groceries with instant 10-minute delivery. This project has two main parts:
1. **The Client (Frontend - React)**: The website the user sees. It lets them browse items, search, add products to their shopping cart, and type in their address.
2. **The Server (Backend - Node/Express & Database - MongoDB)**: The brain. It stores the products, manages user accounts, verifies passwords, handles payment checks, and saves order details.

---

## 🔑 2. Key Features Explained Simply

### A. Stripe Webhooks (How Payments are Confirmed)
* **What it means**: When a user pays, they go to Stripe's payment page. Once they pay successfully, Stripe's server directly calls our server (via a "Webhook") to say *"Hey, payment is done, please deliver the order."*
* **Why we did this**: If the user's internet disconnects or their browser crashes right after paying, we still get the message from Stripe. The user won't lose their money without getting their order.

### B. Double Token Security (Safe Login)
* **What it means**: We don't store passwords in plain text; we scramble them using `bcryptjs`. When a user logs in, we give them two keys:
  1. **Access Token (Short key)**: Works for a short time (e.g., 1 hour) to let them buy things.
  2. **Refresh Token (Long key)**: Works for a week to automatically get a new access key when the short one expires.
* **Cookie Storage**: We hide these keys in **HTTP-Only Cookies**. This means hacker scripts running on the browser cannot read them.

### C. Concurrent Database Querying (Speed)
* **What it means**: When loading a search page, the server has to:
  1. Find the matching products.
  2. Count how many total pages exist.
* **Why we did this**: Instead of waiting for task 1 to finish before starting task 2, we run both at the *exact same time* (`Promise.all`). This makes page loads twice as fast.

### D. Search Relevance (Smart Search)
* **What it means**: If someone searches for "Milk chocolate", the search engine knows the title "Chocolate Milk" is more important than a description that mentions the word "milk" once. We gave higher points (weights) to titles so the search shows what the user actually wants.

---

## 🚧 3. Hardest Challenges Faced (What to mention in the interview)

When the interviewer asks: **"What was the most difficult part of this project and how did you solve it?"**, talk about these:

### Challenge 1: The Stripe Webhook Cryptographic Signature Error
* **The Problem**: When Stripe sends the payment confirmation to our server, we must verify that it actually came from Stripe and not a hacker. Stripe requires the *raw, unparsed* request body to check this. However, Express globally converts all incoming requests into JSON formats (`express.json()`). Because the body was already parsed, the signature checks failed.
* **The Solution**: I had to re-order my server routing middlewares in [index.js](file:///c:/Users/ASUS/Desktop/Ashivo/quick-commerce-platform/server/index.js#L44-L46). I registered the Webhook path *before* any global parsing happened, specifically parsing it as raw buffer bytes using `express.raw({ type: 'application/json' })`.

### Challenge 2: API Race Conditions in Live Search
* **The Problem**: On our search page, users search as they type. If they type "egg" quickly, three requests are fired: "e", "eg", and "egg". If the request for "e" takes longer to respond than the request for "egg", the outdated "e" results will overwrite the newer "egg" results on the screen.
* **The Solution**: I implemented an **active clean-up flag** inside the React `useEffect` hook in [SearchPage.jsx](file:///c:/Users/ASUS/Desktop/Ashivo/quick-commerce-platform/client/src/pages/SearchPage.jsx#L23). When the user types a new letter, the previous call's cleanup function runs and sets `active = false`. This ignores any slow, outdated responses and keeps the search accurate.

### Challenge 3: Secure Cross-Origin Cookies (CORS Issues)
* **The Problem**: Since the frontend and backend run on different URLs (different ports during local development), browsers blocked our HTTP-only cookies from being set because of strict security rules.
* **The Solution**: I had to configure CORS settings on the Express server to explicitly allow credentials (`credentials: true`) and configure the cookie attributes (`sameSite: "None"`, `secure: true`) so the browser securely saved and forwarded the authentication tokens.
