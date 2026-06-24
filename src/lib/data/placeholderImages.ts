/**
 * Placeholder-phase imagery only. Every URL below has been visually
 * verified to show what its label claims (single hero vehicle, each
 * testimonial vehicle confirmed by sight) — no generic stock filler
 * assigned to a mismatched caption. Swapping to real branded photography
 * means editing only this file.
 *
 * Translatable copy (quotes, names) lives in src/lib/i18n/translations.ts;
 * this file only holds language-neutral data — images and ratings, in the
 * same order as the testimonials.items array in each locale.
 */

function unsplash(id: string, w = 1800) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

// The single featured vehicle for the hero stage — a Lamborghini Aventador.
// Video confirmed by frame inspection: black Aventador, motion blur, sun
// backlighting, highway. `poster` is the static frame shown before the video
// can play and as the fallback if video fails to load.
export const heroVehicle = {
  video: "https://videos.pexels.com/video-files/7727416/7727416-hd_1920_1080_25fps.mp4",
  poster: unsplash("photo-1525609004556-c46c7d6cf023", 2400),
  name: "Lamborghini Aventador",
};

export const testimonialMeta = [
  { image: unsplash("photo-1583121274602-3e2820c69888", 1600), rating: 5 },
  { image: unsplash("photo-1542362567-b07e54358753", 1600), rating: 5 },
  { image: unsplash("photo-1517994112540-009c47ea476b", 1600), rating: 4 },
  { image: unsplash("photo-1605559424843-9e4c228bf1c2", 1600), rating: 5 },
];

export const aboutImage = unsplash("photo-1492144534655-ae79c964c9d7", 1600);
