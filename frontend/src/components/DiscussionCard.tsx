"use client";

import { useState } from "react";
import { addAnswer } from "../services/discussionService";

export default function DiscussionCard({ discussion, reload }: any) {
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!answer.trim()) return;
    try {
      setSubmitting(true);
      await addAnswer(discussion.id, answer);
      setAnswer("");
      reload();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {discussion.title}
      </h2>
      <p className="text-gray-700 text-sm mb-6 leading-relaxed">
        {discussion.content}
      </p>

      {discussion.answers && discussion.answers.length > 0 && (
        <div className="mt-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Answers ({discussion.answers.length})
          </h3>
          <div className="space-y-4">
            {discussion.answers.map((a: any) => (
              <div key={a.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-800">{a.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-100 flex gap-3">
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer..."
          className="w-full border border-gray-300 bg-gray-50 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm flex-1"
        />
        <button
          onClick={submit}
          disabled={submitting || !answer.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm whitespace-nowrap text-sm"
        >
          {submitting ? "Replying..." : "Reply"}
        </button>
      </div>
    </div>
  );
}
