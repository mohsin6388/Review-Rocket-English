import React, { useState } from "react";
import api from "../api"; 
import "./ReviewDisplay.css";

const ReviewDisplay = ({
  reviews,
  sessionId,
  googleUrl,
  onTrackCopied,
  onTrackRedirected,
}) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedReview, setSelectedReview] = useState("");

  const handleCopyAndGo = async (reviewText, index) => {
    try {
      // Review state me save karo
      setSelectedReview(reviewText);

      console.log("Saving review to backend:", reviewText);

       await api.post("/review/save-review", {
         session_id: sessionId,
         review_text: reviewText,
       });


      await navigator.clipboard.writeText(reviewText);

      setCopiedIndex(index);

      // Track analytics
      if (sessionId) {
        onTrackCopied?.(sessionId);

        setTimeout(() => {
          onTrackRedirected?.(sessionId);
        }, 500);
      }

      // Open Google Review Page
      setTimeout(() => {
        window.open(googleUrl, "_blank");
      }, 300);

      // Reset copied state
      setTimeout(() => {
        setCopiedIndex(null);
      }, 3000);
    } catch (err) {
      console.error("Copy failed:", err);

      // Fallback copy
      const textarea = document.createElement("textarea");

      textarea.value = reviewText;

      document.body.appendChild(textarea);

      textarea.select();

      document.execCommand("copy");

      document.body.removeChild(textarea);

      setCopiedIndex(index);

      setTimeout(() => {
        window.open(googleUrl, "_blank");
      }, 300);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 3000);
    }
  };

  return (
    <div className="review-display animate-fadeUp">
      {/* HEADER */}
      <div className="review-header">
        <div className="review-icon">✨</div>

        <div>
          <h3 className="review-title">Your Reviews are Ready!</h3>

          <p className="review-subtitle">
            AI ne aapke liye multiple reviews banaye
          </p>
        </div>
      </div>

      {/* REVIEW SLIDER */}
      <div className="reviews-slider">
        {reviews?.map((item, index) => (
          <div className="review-card" key={index}>
            <div className="review-text-box">
              <div className="quote-mark">"</div>

              <p className="review-text">{item.review}</p>
            </div>

            <button
              className={`copy-btn ${copiedIndex === index ? "copied" : ""}`}
              onClick={() => handleCopyAndGo(item.review, index)}
            >
              {copiedIndex === index ? (
                <>
                  <span className="btn-icon">✅</span>
                  Copied! Opening Google...
                </>
              ) : (
                <>
                  <span className="btn-icon">⭐</span>
                  Copy & Post on Google
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* STEPS */}
      <div className="review-steps">
  <div className="step-item">
    <span className="step-num">1</span>
    <span className="step-text">Copy any review</span>
  </div>

  <div className="step-item">
    <span className="step-num">2</span>
    <span className="step-text">The Google Reviews page will open</span>
  </div>

  <div className="step-item">
    <span className="step-num">3</span>
    <span className="step-text">Paste the review and post it</span>
  </div>
</div>

{/* DISCLAIMER */}
<p className="disclaimer">
  🔒 Your review will be posted directly on Google. We do not store any data.
</p>
    </div>
  );
};

export default ReviewDisplay;