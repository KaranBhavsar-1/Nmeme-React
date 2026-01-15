import React, { useState } from "react";

function AddMemeCategory({ onClose, onAdd, mode = "category" }) {
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [subs, setSubs] = useState([]);

  const handleEnter = (e) => {
    if (e.key === "Enter" && input.trim()) {
      const value = input.trim().toLowerCase();

      setSubs((prev) =>
        prev.includes(value) ? prev : [...prev, value]
      );

      setInput("");
    }
  };

  const removeSub = (i) => {
    setSubs(subs.filter((_, idx) => idx !== i));
  };

  const handleAdd = () => {
    if (subs.length === 0) return;
    if (mode === "category" && !name) return;

    onAdd({
      name: mode === "category" ? name : null,
      subreddits: subs.join("+"),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="relative bg-[#262626] w-[380px] rounded-xl p-6 text-white">

        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-red-400 text-xl font-bold"
        >
          ×
        </button>

        {/* CATEGORY NAME (ONLY FOR CATEGORY MODE) */}
        {mode === "category" && (
          <>
            <label className="font-bold text-lg">Category Name</label>
            <textarea
              className="w-full bg-[#3a3a3a] mt-2 p-3 rounded outline-none resize-none"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}

        {/* SUBREDDITS */}
        <label className="font-bold text-lg mt-4 block">
          Category subreddits
        </label>

        <textarea
          className="w-full bg-[#3a3a3a] mt-2 p-3 rounded outline-none resize-none border border-white"
          placeholder="Type & press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
        />

        <p className="text-sm mt-2">
          Add subreddit by pressing Enter, click tag to remove.
        </p>

        {/* TAG CHIPS */}
        <div className="flex flex-wrap gap-2 mt-3">
          {subs.map((s, i) => (
            <span
              key={i}
              onClick={() => removeSub(i)}
              className="bg-[#3b3b3b] px-3 py-1 rounded-full cursor-pointer flex items-center gap-2"
            >
              {s}
              <span className="text-red-400 font-bold">×</span>
            </span>
          ))}
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={handleAdd}
          className="mt-6 w-full bg-[#8fc9ff] text-black font-bold py-3 rounded-lg"
        >
          {mode === "category" ? "Add Category" : "Add Tags"}
        </button>
      </div>
    </div>
  );
}

export default AddMemeCategory;
