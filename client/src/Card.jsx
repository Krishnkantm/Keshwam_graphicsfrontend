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
        <div className="price">₹ {it.price}</div>
        <div className="cat">{it.category}</div>
        <div className="date">
          {new Date(it.uploadedAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Card);