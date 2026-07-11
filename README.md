# Ledger — Personal Money Tracker

A small full-stack app to log salary income and daily expenses, date-wise,
and see monthly savings automatically. Built to replace a spreadsheet like
the one you were using (Monthly Salary, Food, Petrol, Recharge, Trip, Dress)
with a proper date-wise transaction log.

**Stack:** React (Vite) frontend · Node.js + Express backend · MongoDB
(Mongoose) · deployed as two separate projects on Vercel.

```
expense-tracker/
├── backend/     Express API, MongoDB models, Vercel serverless config
└── frontend/    React dashboard (Vite)
```

---

## 1. MongoDB setup (5 min, free)

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account.
2. Create a free **M0 cluster**.
3. Under **Database Access**, create a user with a username/password.
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) so Vercel can connect.
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```
6. Add a database name before the `?`, e.g. `.../expense-tracker?retryWrites=true...`

Keep this string — it's your `MONGODB_URI`.

---

## 2. Run locally first (recommended before deploying)

### Backend
```bash
cd backend
npm install
cp .env.example .env
# edit .env and paste your MONGODB_URI
npm run dev
```
Backend runs at `http://localhost:5000`. Test it:
```bash
curl http://localhost:5000/api/health
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# .env already points VITE_API_URL at http://localhost:5000 — leave as is for local dev
npm run dev
```
Open `http://localhost:5173` — you should see the dashboard. Add a test entry
to confirm it reaches MongoDB.

---

## 3. Deploy the backend to Vercel

1. Push the `backend/` folder to its own GitHub repo (or use the Vercel CLI directly).
2. In the Vercel dashboard: **Add New → Project**, import that repo.
3. Framework preset: **Other**. Root directory: the repo root (where `vercel.json` is).
4. Under **Environment Variables**, add:
   - `MONGODB_URI` = your connection string from step 1
5. Deploy. Once live, note the URL, e.g. `https://ledger-backend.vercel.app`.
6. Confirm it works: visit `https://ledger-backend.vercel.app/api/health` — should return `{"status":"ok",...}`.

**CLI alternative** (from the `backend/` folder):
```bash
npm install -g vercel
vercel login
vercel --prod
# when prompted, add MONGODB_URI as an environment variable,
# or run: vercel env add MONGODB_URI
```

---

## 4. Deploy the frontend to Vercel

1. Push the `frontend/` folder to its own GitHub repo.
2. In Vercel: **Add New → Project**, import that repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output `dist` (already set in `vercel.json`).
4. Under **Environment Variables**, add:
   - `VITE_API_URL` = the backend URL from step 3, e.g. `https://ledger-backend.vercel.app`
5. Deploy. Visit the resulting URL — your dashboard is live.

**CLI alternative** (from the `frontend/` folder):
```bash
vercel --prod
vercel env add VITE_API_URL
```

> Important: Vite bakes environment variables in at **build time**. If you
> add or change `VITE_API_URL` after the first deploy, trigger a new deploy
> (Vercel → Deployments → Redeploy) for it to take effect.

---

## 5. Using the app

- **Add entry**: choose Income or Expense, pick a date, category, amount, optional note.
- **Month picker** (top right): switch months to see that month's totals and history — this is what your spreadsheet couldn't do without manual filtering.
- **Summary strip**: Income, Expenses, and Saved (Income − Expenses) for the selected month, calculated automatically.
- **Category chart**: where your expense money went that month, at a glance.
- **Transaction list**: every entry, newest first, with a delete (×) button.

## 6. Extending it later

Ideas for a next pass, once the basics are working for you day to day:
- Monthly savings goal with a progress bar
- Per-category budget limits with an over-budget warning
- Export the month's transactions to CSV
- Simple login (e.g. with a single hardcoded passcode) if you deploy it somewhere others could find the URL

## Troubleshooting

| Symptom | Fix |
|---|---|
| Frontend shows a red error banner | `VITE_API_URL` is wrong, or the backend isn't deployed/running yet |
| Backend `/api/health` fails on Vercel | Check `MONGODB_URI` env var is set in the Vercel project settings |
| "Database connection failed" | MongoDB Atlas Network Access doesn't allow `0.0.0.0/0`, or password has a special character that needs URL-encoding |
| Local dev CORS error | Confirm backend is actually running on port 5000 before starting frontend |
