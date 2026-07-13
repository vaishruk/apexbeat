/* ============================================================
   CardioLumen — site configuration
   Change the site name/tagline here; every page picks it up
   via [data-site-name] and [data-site-tagline] elements.
   ============================================================ */
window.SITE = {
  name: "CardioLumen",
  tagline: "From Internal Medicine Residency to Cardiology Fellowship",
  creator: "Vaishnavi Sabesan, MD",
  creatorRole: "Internal Medicine Resident",
  year: new Date().getFullYear(),
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-site-name]").forEach((el) => (el.textContent = window.SITE.name));
  document.querySelectorAll("[data-site-tagline]").forEach((el) => (el.textContent = window.SITE.tagline));
  document.querySelectorAll("[data-site-year]").forEach((el) => (el.textContent = window.SITE.year));
  if (document.title.includes("{site}")) document.title = document.title.replace("{site}", window.SITE.name);
});
