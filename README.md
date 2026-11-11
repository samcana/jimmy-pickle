# Jimmy Pickle 🥒

A responsive pickleball coaching website built with React + Vite, designed for free hosting on GitHub Pages.

## What's included

- Home, Jimmy's Drills, Lessons & Coaching, Meet Jimmy and Contact Jimmy pages
- Searchable drill library with skill, level, player-count and duration filters
- 28 original coaching drills across 14 skill areas
- Drill detail views with instructions, coaching tips and progressions
- YouTube search links for each drill (no fabricated video IDs)
- Favourites saved in browser local storage
- Lesson planner with editable timings, ordering, saved plans and print view
- Contact form UI with a clear demo notice (does not send messages yet)
- Responsive mobile layout
- GitHub Actions workflow to build and publish to GitHub Pages

## Publish with GitHub Pages

1. Create a GitHub repository named `jimmy-pickle`.
2. Upload the contents of this ZIP to the repository root (not the ZIP file itself).
3. Make sure the default branch is named `main`.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment → Source**, choose **GitHub Actions**.
6. Open the **Actions** tab and wait for the "Deploy Jimmy Pickle to GitHub Pages" workflow to finish.
7. Your site will be available at:

   `https://YOUR-GITHUB-USERNAME.github.io/jimmy-pickle/`

The first deployment can take a couple of minutes.

## Add Jimmy's logo

Put the uploaded logo in the `public` folder and name it:

`jimmy-pickle-logo.png`

The header will display that logo automatically. If you prefer an SVG, update the `LOGO` constant near the top of `src/App.jsx` to `jimmy-pickle-logo.svg`.

## Run locally (optional)

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal.

To test the production build:

```bash
npm run build
npm run preview
```

## Important notes

- Favourites and lesson plans are stored in local storage on the current browser/device. They do not sync between devices.
- The contact form is currently a front-end demonstration. It does not transmit or store enquiries.
- Drill video buttons open YouTube search results for the relevant drill. They do not embed unverified videos.
- If you rename the GitHub repository, update `base` in `vite.config.js` to `/<new-repository-name>/`.
- If you use a custom domain or a user/organization site repository, the Vite `base` setting may need to be changed to `/`.

## Updating the site

Edit the files, commit the changes to the `main` branch and push to GitHub. The GitHub Actions workflow automatically rebuilds and redeploys the site.
