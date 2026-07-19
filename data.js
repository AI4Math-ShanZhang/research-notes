/* =====================================================================
   BLOG CONTENT — this is the only file you edit to add notes/categories.
   To add a NOTE:   add an object to the right category's `notes` array.
   To add a CATEGORY: add an object to `categories`.
   `file` is the path to the note's HTML page (see posts/_template.html).
   ===================================================================== */
const BLOG = {
  title:   "Research Notes",
  tagline: "Paper summaries + my key notes.",
  links: [
    { text: "Blog",   href: "index.html" },
    { text: "GitHub", href: "https://github.com/AI4Math-ShanZhang/research-notes" },
  ],

  categories: [
    {
      id: "loop-transformer",
      name: "Loop Transformer",
      blurb: "Latent / looped reasoning, chain-of-thought, expressivity & complexity.",
      notes: [
        {
          title:   "Chain of Thought vs Latent Thought",
          file:    "posts/cot-vs-latent-thought.html",
          date:    "2026-07-19",
          paper:   "Xu & Sato · arXiv:2509.25239",
          tags:    ["reasoning", "complexity", "looped TF"],
          summary: "All three paradigms reuse one Transformer block — they differ only in what is fed back each step. That single difference is why latent thought is good at parallel reasoning and CoT is good at approximate counting.",
        },
      ],
    },

    {
      id: "vla-world-model",
      name: "VLA / World Model",
      blurb: "Vision-language-action policies, world models, and RL for robots.",
      notes: [
        {
          title:   "RECAP (π0.6): RL for VLAs",
          file:    "posts/recap-pi06.html",
          date:    "2026-07-19",
          paper:   "π0.6 · arXiv:2511.14759",
          tags:    ["VLA", "RL", "value function"],
          summary: "RECAP fits a value function offline, then extracts a policy by advantage conditioning instead of PPO-style policy gradients — steadier training for real-robot VLAs.",
        },
      ],
    },

    // Add your third category here, e.g.:
    // { id:"memory-rag", name:"Memory / RAG", blurb:"...", notes:[] },
  ],
};
