import { ReviewItem } from '../types';

export const INITIAL_REVIEWS: ReviewItem[] = [];

const REVIEWS_STORAGE_KEY = 'galaxy_bridal_zone_reviews_v2';

export function getStoredReviews(): ReviewItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!saved) {
      return [];
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveReviewToStorage(newReview: ReviewItem): ReviewItem[] {
  try {
    const current = getStoredReviews();
    const updated = [newReview, ...current];
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save review:', e);
    return [newReview];
  }
}
