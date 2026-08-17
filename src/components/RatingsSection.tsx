import React, { useState } from 'react';
import { 
  Star, 
  Sparkles, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquare, 
  Send,
  Filter
} from 'lucide-react';
import { ReviewItem, ServiceCategory } from '../types';
import { saveReviewToStorage } from '../data/initialReviews';

interface RatingsSectionProps {
  reviews: ReviewItem[];
  onReviewAdded: (newReviews: ReviewItem[]) => void;
}

export const RatingsSection: React.FC<RatingsSectionProps> = ({
  reviews,
  onReviewAdded,
}) => {
  // Form states
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory | 'general'>('makeup');
  const [serviceName, setServiceName] = useState('Bridal package');
  const [comment, setComment] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Filter state
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  // Helpful votes state (local)
  const [votedReviews, setVotedReviews] = useState<Record<string, boolean>>({});

  const servicePresets: Record<ServiceCategory | 'general', string[]> = {
    makeup: [
      'Bridal package (11 Services)',
      'reception bride (2 Services + Free Party Makeup)',
      'Mehndi makeup',
      'Nikah makeup (4 Services)',
      'Party makeup with hairdo',
    ],
    'facials-nails': [
      'Mani Pedi',
      'Hydra facial- Glass skin treatment',
      'Hydra facial for acne',
      'Hydra facial whitening for pigmentation sessions',
      'The deluxe hydra facial',
      'The platinum hydra facial',
    ],
    hair: [
      'Hair cut simple',
      'Butterfly haircut',
      'Kids haircut',
      'Custom hair treatments Consultations (Keratin / Botox / Rebonding)',
    ],
    waxing: [
      'Full arms wax',
      'Full legs wax',
      'Half arms wax',
      'Half legs wax',
      'Face wax',
    ],
    general: [
      'Galaxy Bridal Zone Overall Experience',
      'Kahkishan Ali Bridal Consultation',
    ],
  };

  const handleCategoryChange = (cat: ServiceCategory | 'general') => {
    setServiceCategory(cat);
    const presets = servicePresets[cat];
    if (presets && presets.length > 0) {
      setServiceName(presets[0]);
    }
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!comment.trim() || comment.trim().length < 5) {
      setErrorMsg('Please write a brief review.');
      return;
    }

    setErrorMsg('');

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      rating,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      serviceCategory,
      serviceName: serviceName || 'Galaxy Bridal Experience',
      comment: comment.trim(),
      verifiedClient: true,
      helpfulCount: 0,
    };

    // Automatically save review into localStorage & update state
    const updated = saveReviewToStorage(newReview);
    onReviewAdded(updated);

    // Reset form and show success confirmation
    setAuthor('');
    setComment('');
    setRating(5);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 6000);
  };

  const handleToggleHelpful = (id: string) => {
    setVotedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Calculate statistics
  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviewsCount).toFixed(1)
    : '5.0';

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fourStarCount = reviews.filter((r) => r.rating === 4).length;
  const threeOrLessCount = reviews.filter((r) => r.rating <= 3).length;

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === 'all') return true;
    return r.serviceCategory === selectedFilter;
  });

  return (
    <section id="ratings-section" className="py-16 md:py-20 bg-[#F5F2EC] relative scroll-mt-20 border-t border-[#E2DAD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FAF0F1] text-[#8E2C34] text-xs uppercase tracking-wider font-semibold border border-[#E8CFD2]">
            <Sparkles className="w-3.5 h-3.5 text-[#C29F6E]" />
            <span>Ratings & Client Feedback</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl font-normal text-[#2C2523] tracking-tight">
            Client Reviews
          </h2>
          <p className="text-sm text-[#6E625F]">
            Share your thoughts on services at <strong className="text-[#2C2523] font-medium">Galaxy Bridal Zone By Kahkishan Ali</strong>. Reviews are automatically saved.
          </p>
        </div>

        {/* Rating Scorecard & Form Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Overall Rating Card */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#E2DAD0] hover:border-[#D4BC96] transition-all soft-card-shadow flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8E2C34]">
                Overall Client Score
              </span>
              <div className="flex items-baseline space-x-4 mt-3">
                <span className="font-playfair text-5xl sm:text-6xl font-normal text-[#2C2523]">
                  {averageRating}
                </span>
                <div className="space-y-1">
                  <div className="flex text-[#C29F6E]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(Number(averageRating))
                            ? 'text-[#C29F6E] fill-[#C29F6E]'
                            : 'text-[#DDD3C7]'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-[#7A6E6A]">
                    {totalReviewsCount === 0
                      ? 'Be the first to leave a review'
                      : `Based on ${totalReviewsCount} review${totalReviewsCount > 1 ? 's' : ''}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Distribution bars */}
            <div className="space-y-2 mt-6 pt-5 border-t border-[#EAE3DA]">
              <div className="flex items-center text-xs space-x-3">
                <span className="w-12 text-[#6E5956]">5 Stars</span>
                <div className="flex-1 bg-[#EAE3DA] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#8E2C34] h-full rounded-full transition-all duration-500"
                    style={{ width: `${totalReviewsCount > 0 ? (fiveStarCount / totalReviewsCount) * 100 : 100}%` }}
                  />
                </div>
                <span className="w-6 text-right text-[#6E5956] font-medium">{fiveStarCount}</span>
              </div>

              <div className="flex items-center text-xs space-x-3">
                <span className="w-12 text-[#6E5956]">4 Stars</span>
                <div className="flex-1 bg-[#EAE3DA] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C29F6E] h-full rounded-full transition-all duration-500"
                    style={{ width: `${totalReviewsCount > 0 ? (fourStarCount / totalReviewsCount) * 100 : 0}%` }}
                  />
                </div>
                <span className="w-6 text-right text-[#6E5956] font-medium">{fourStarCount}</span>
              </div>

              <div className="flex items-center text-xs space-x-3">
                <span className="w-12 text-[#6E5956]">1-3 Stars</span>
                <div className="flex-1 bg-[#EAE3DA] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#D9CFC3] h-full rounded-full transition-all duration-500"
                    style={{ width: `${totalReviewsCount > 0 ? (threeOrLessCount / totalReviewsCount) * 100 : 0}%` }}
                  />
                </div>
                <span className="w-6 text-right text-[#6E5956] font-medium">{threeOrLessCount}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EAE3DA] text-xs text-[#7A6E6A] flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8E2C34]" />
              <span>Verified client feedback for Galaxy Bridal Zone</span>
            </div>
          </div>

          {/* Right: "Leave a Review" Interactive Form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#E2DAD0] hover:border-[#D4BC96] transition-all soft-card-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-playfair text-xl sm:text-2xl font-normal text-[#2C2523]">
                  Leave A Review
                </h3>
                <p className="text-xs text-[#6E625F]">
                  Share your experience with our haircuts, bridal makeup, or facials.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF0F1] text-[#8E2C34] border border-[#E8CFD2]">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>

            {formSubmitted && (
              <div className="mb-4 p-3.5 rounded-xl bg-[#F4F9F4] border border-[#C5E1C5] text-[#2D5A27] text-xs font-medium flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3E8E34] shrink-0" />
                <span>Thank you! Your review has been saved and is displayed below.</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-[#FDF2F2] border border-[#F5C6CB] text-[#721C24] text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleRatingSubmit} className="space-y-3.5" id="review-form">
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#6E5956] mb-1">
                  Your Rating
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        id={`star-btn-${star}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= (hoverRating || rating)
                              ? 'text-[#C29F6E] fill-[#C29F6E]'
                              : 'text-[#DDD3C7]'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-[#7A6E6A] ml-2">
                    {rating === 5 && 'Outstanding (5/5)'}
                    {rating === 4 && 'Very Good (4/5)'}
                    {rating === 3 && 'Good (3/5)'}
                    {rating === 2 && 'Fair (2/5)'}
                    {rating === 1 && 'Needs Improvement (1/5)'}
                  </span>
                </div>
              </div>

              {/* Name & Service category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="review-author" className="block text-xs uppercase tracking-wider font-semibold text-[#6E5956] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="review-author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Ayesha Khan"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-xs outline-none placeholder:text-[#A89D98]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="review-category" className="block text-xs uppercase tracking-wider font-semibold text-[#6E5956] mb-1">
                    Section
                  </label>
                  <select
                    id="review-category"
                    value={serviceCategory}
                    onChange={(e) => handleCategoryChange(e.target.value as ServiceCategory | 'general')}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-xs outline-none"
                  >
                    <option value="makeup">2. Makeup (Bridal, Reception, Mehndi, Nikah)</option>
                    <option value="facials-nails">3. Facials + Mani Pedi</option>
                    <option value="hair">1. Hair (Cuts, Treatments)</option>
                    <option value="waxing">4. Waxing Services</option>
                    <option value="general">Galaxy Bridal Studio Experience</option>
                  </select>
                </div>
              </div>

              {/* Specific Service Name */}
              <div>
                <label htmlFor="review-service-name" className="block text-xs uppercase tracking-wider font-semibold text-[#6E5956] mb-1">
                  Specific Service
                </label>
                <select
                  id="review-service-name"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-xs outline-none"
                >
                  {(servicePresets[serviceCategory] || []).map((preset) => (
                    <option key={preset} value={preset}>
                      {preset}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Comment */}
              <div>
                <label htmlFor="review-comment" className="block text-xs uppercase tracking-wider font-semibold text-[#6E5956] mb-1">
                  Your Review
                </label>
                <textarea
                  id="review-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={2}
                  placeholder="Share details about your appointment or service..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#DDD3C7] focus:border-[#8E2C34] text-[#2C2523] text-xs outline-none placeholder:text-[#A89D98]"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-review-btn"
                className="w-full py-3 px-6 bg-[#8E2C34] hover:bg-[#77242B] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-2xs flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5 text-[#E8D4B8]" />
                <span>Submit & Save Review</span>
              </button>
            </form>
          </div>
        </div>

        {/* Filter Pills for Reviews */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E2DAD0]">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#6E5956]">
            <Filter className="w-3.5 h-3.5 text-[#8E2C34]" />
            <span>Filter Reviews:</span>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'makeup', label: '2. Makeup' },
              { id: 'facials-nails', label: '3. Facials + Mani Pedi' },
              { id: 'hair', label: '1. Hair' },
              { id: 'waxing', label: '4. Waxing' },
            ].map((f) => (
              <button
                key={f.id}
                id={`filter-review-${f.id}`}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                  selectedFilter === f.id
                    ? 'bg-[#8E2C34] text-[#FAF8F5] border-[#8E2C34]'
                    : 'bg-[#FFFFFF] text-[#6E5956] hover:bg-[#FAF0F1] border-[#DDD3C7]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* List of Reviews Grid or Empty State */}
        {filteredReviews.length === 0 ? (
          <div className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#E2DAD0] text-center space-y-2">
            <h4 className="font-playfair text-lg font-normal text-[#2C2523]">
              No Reviews in this Category Yet
            </h4>
            <p className="text-xs text-[#6E625F] max-w-sm mx-auto">
              Be the first to share your experience with Galaxy Bridal Zone By Kahkishan Ali using the form above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => {
              const isVoted = votedReviews[rev.id];
              const currentHelpful = (rev.helpfulCount || 0) + (isVoted ? 1 : 0);

              return (
                <div
                  key={rev.id}
                  id={`review-card-${rev.id}`}
                  className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E2DAD0] soft-card-shadow flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    {/* Top Bar: Stars + Category badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex text-[#C29F6E]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= rev.rating
                                ? 'text-[#C29F6E] fill-[#C29F6E]'
                                : 'text-[#DDD3C7]'
                            }`}
                          />
                        ))}
                      </div>

                      <span className="text-[10px] uppercase font-medium tracking-wider px-2 py-0.5 rounded bg-[#FAF0F1] text-[#8E2C34] border border-[#E8CFD2]">
                        {rev.serviceCategory === 'facials-nails' ? 'Facials & Nails' : rev.serviceCategory}
                      </span>
                    </div>

                    {/* Service Visited */}
                    <div className="text-xs font-semibold text-[#2C2523]">
                      “{rev.serviceName}”
                    </div>

                    {/* Comment */}
                    <p className="text-xs text-[#5C514E] leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Author & Footer */}
                  <div className="pt-3 border-t border-[#EAE3DA] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-playfair font-medium text-[#2C2523] flex items-center space-x-1">
                        <span>{rev.author}</span>
                        {rev.verifiedClient && (
                          <CheckCircle2 className="w-3 h-3 text-[#8E2C34]" title="Verified Client" />
                        )}
                      </div>
                      <div className="text-[11px] text-[#8C7E7A]">{rev.date}</div>
                    </div>

                    {/* Helpful Button */}
                    <button
                      onClick={() => handleToggleHelpful(rev.id)}
                      className={`flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition-all ${
                        isVoted
                          ? 'bg-[#8E2C34] text-[#FAF8F5] border-[#8E2C34]'
                          : 'bg-[#FFFFFF] text-[#6E5956] hover:bg-[#FAF0F1] border-[#DDD3C7]'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{currentHelpful}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
