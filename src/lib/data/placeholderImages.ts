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
// backlighting, highway. `poster` is an actual extracted frame from that
// same video (not a different photo) so there's no jarring mismatched swap
// while the video buffers on a slow connection — it reads as a continuous
// load-in rather than two different cars appearing one after the other.
export const heroVehicle = {
  video: "https://videos.pexels.com/video-files/7727416/7727416-hd_1920_1080_25fps.mp4",
  poster: "https://images.pexels.com/videos/7727416/lamborghini-7727416.jpeg?w=1920&h=1080&dpr=1",
  name: "Lamborghini Aventador",
};

export const testimonialMeta = [
  { image: unsplash("photo-1583121274602-3e2820c69888", 1600), rating: 5 },
  { image: unsplash("photo-1542362567-b07e54358753", 1600), rating: 5 },
  { image: unsplash("photo-1517994112540-009c47ea476b", 1600), rating: 4 },
  { image: unsplash("photo-1605559424843-9e4c228bf1c2", 1600), rating: 5 },
];

export const aboutImage = unsplash("photo-1492144534655-ae79c964c9d7", 1600);
