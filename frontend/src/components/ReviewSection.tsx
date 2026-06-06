"use client";

import { useEffect, useState } from "react";
import api from "../services/axios";

export default function ReviewSection({ collegeId }: { collegeId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      const res = await api.get(`/reviews/${collegeId}`);
      setReviews(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    if (!comment.trim()) return;
    try {
      setSubmitting(true);
      await api.post("/reviews", { collegeId, comment, rating });
      setComment("");
      setRating(5);
      await load();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
        Student Reviews
      </h2>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Write a Review</h3>
        
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl transition-colors ${
                  rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience at this college..."
          className="w-full border border-gray-300 bg-white p-3.5 rounded-xl h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm resize-none mb-4"
        />

        <div className="flex justify-end">
          <button
            onClick={submit}
            disabled={submitting || !comment.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No reviews yet. Be the first to share your experience!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border border-gray-100 bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="flex text-yellow-400 text-sm">
                    {"★".repeat(Math.round(review.rating))}
                    <span className="text-gray-300">{"★".repeat(5 - Math.round(review.rating))}</span>
                  </div>
                  <span className="ml-3 text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    {Math.round(review.rating)}.0
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {review.user?.name || "Anonymous"}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
