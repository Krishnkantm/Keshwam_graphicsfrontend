import React from "react";

function Card({ it, setPreview }) {
  const isVideo = it.mimeType?.startsWith("video");

  return (
    <div className="card">
      {isVideo ? (
        <video
          className="media"
          src={it.url}
          preload="metadata"
          controls={false}
          onClick={() => setPreview({ type: "video", src: it.url })}
          style={{ cursor: "zoom-in" }}
        />
      ) : (
        <img
          className="media"
          src={it.url}
          alt={it.originalName}
          loading="lazy"
          decoding="async"
          onClick={() => setPreview({ type: "image", src: it.url })}
          style={{ cursor: "zoom-in" }}
        />
      )}

      <div className="card-body">
        <div className="title">{it.title || it.originalName}</div>
        {/* price + button row */}
        <div className="price-row">
          <div className="price">₹ {it.price}</div>

          <a
            href="https://wa.me/+918370079435?text=Hello%2C%20Sir"
            target="_blank"
            rel="noopener noreferrer"
            className="order-btn"
          >
            Order Now
          </a>
        </div>
        <div className="cat">{it.category}</div>
        <div className="date">
          {new Date(it.uploadedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Card);
