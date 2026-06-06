"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import DiscussionCard from "../../components/DiscussionCard";
import { getDiscussions, createDiscussion } from "../../services/discussionService";

export default function DiscussionsPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadDiscussions = async () => {
    try {
      const data = await getDiscussions();
      setDiscussions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiscussions();
  }, []);

  const create = async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      setSubmitting(true);
      await createDiscussion(title, content);
      setTitle("");
      setContent("");
      await loadDiscussions();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Community Discussions
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Ask questions, share experiences, and connect with other students.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Start a new discussion</h2>
          <input
            placeholder="What's your question or topic?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 bg-gray-50 p-3.5 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm"
          />
          <textarea
            placeholder="Add more details..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 bg-gray-50 p-3.5 rounded-xl h-32 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors text-sm resize-none"
          />
          <div className="flex justify-end">
            <button
              onClick={create}
              disabled={submitting || !title.trim() || !content.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
            >
              {submitting ? "Posting..." : "Post Discussion"}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-40 rounded-2xl"></div>
            ))}
          </div>
        ) : discussions.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
            <p className="text-gray-500">No discussions found. Be the first to start one!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {discussions.map((discussion) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                reload={loadDiscussions}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
