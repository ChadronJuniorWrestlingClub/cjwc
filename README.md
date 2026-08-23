# Chadron Junior Wrestling Club

Static GitHub Pages rebuild of the former WordPress site.

## Files

- `index.html`: one-page site with key informational sections
- `styles.css`: site styling
- `script.js`: mobile navigation plus the Google Sheet-powered notices feed
- `assets/`: downloaded club images and the bylaws PDF

## Important Dates And Notices

The home page reads notices from the published Google Sheet URL stored near the bottom of `script.js`. Board members edit the Google Sheet; they do not need GitHub access for routine notice updates. Keep the column names as `Date`, `Title`, `Details`, and `Type`. Valid `Type` values currently use `Important`, `Notice`, or `Schedule`.

## Publish on GitHub Pages

1. Create a GitHub repository and add these files.
2. In GitHub, open `Settings` -> `Pages`.
3. Set the source to `Deploy from a branch`.
4. Choose the `main` branch and `/ (root)`.
5. If you want the existing domain, point your DNS to GitHub Pages and add a `CNAME` file later.
