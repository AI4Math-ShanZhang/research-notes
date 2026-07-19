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
      id: "vla",
      name: "VLA",
      blurb: "Vision-language-action policies — training, RL, decoding, and masking.",
      notes: [
        {
          title:   "Intro: VLA, World Models & World-Action Models",
          file:    "posts/intro_vla_world_model.html",
          date:    "2026-07-19",
          paper:   "Overview note",
          tags:    ["intro", "overview"],
          summary: "A gentle introduction to what VLAs, world models, and world-action models are, and how they relate.",
        },
        {
          title:   "VLA & World-Model Papers — Comparative Review",
          file:    "posts/vla_world_model_survey.html",
          date:    "2026-07-19",
          paper:   "Survey / comparative review",
          tags:    ["survey"],
          summary: "Side-by-side comparison of the main VLA and world-model papers I've read — architectures, objectives, and trade-offs.",
        },
        {
          title:   "RECAP (π0.6): RL for VLAs",
          file:    "posts/recap-pi06.html",
          date:    "2026-07-19",
          paper:   "π0.6 · arXiv:2511.14759",
          tags:    ["RL", "value function", "π-series"],
          summary: "RECAP fits a value function offline, then extracts a policy by advantage conditioning instead of PPO-style policy gradients — steadier training for real-robot VLAs. (Links the full RL walkthrough.)",
        },
        {
          title:   "WALL-WM — Beginner's Walkthrough",
          file:    "posts/wall_wm_analysis.html",
          date:    "2026-07-19",
          paper:   "WALL-WM",
          tags:    ["world-action model", "pipeline"],
          summary: "Pipeline, data, and experiments walkthrough for WALL-WM. See also the Q&A and the data-flow demo below.",
        },
        {
          title:   "WALL-WM — Q&A from our discussion",
          file:    "posts/wall_wm_qa.html",
          date:    "2026-07-19",
          paper:   "WALL-WM",
          tags:    ["world-action model", "Q&A"],
          summary: "Answers to the specific questions that came up while working through WALL-WM.",
        },
        {
          title:   "WALL-WM — Input → Output Data Flow (demo)",
          file:    "posts/pipeline_dataflow_demo.html",
          date:    "2026-07-19",
          paper:   "WALL-WM",
          tags:    ["demo", "data flow"],
          summary: "Visual demo tracing a single example through WALL-WM's input-to-output pipeline.",
        },
        {
          title:   "LingBot-VA 2.0 — Beginner's Visual Guide",
          file:    "posts/lingbot_va2_explained.html",
          date:    "2026-07-19",
          paper:   "LingBot-VA 2.0",
          tags:    ["LingBot", "architecture"],
          summary: "Illustrated walkthrough of the LingBot-VA 2.0 architecture and how it produces actions.",
        },
        {
          title:   "LingBot-VA §3.3 & §3.4 — Teacher Forcing & the Deployment Trick",
          file:    "posts/lingbot_va_training_deployment.html",
          date:    "2026-07-19",
          paper:   "LingBot-VA",
          tags:    ["LingBot", "training", "deployment"],
          summary: "How LingBot-VA trains with teacher forcing and the trick that bridges training and deployment.",
        },
        {
          title:   "WALL-WM — Chunk vs. Event (demo)",
          file:    "posts/chunk_vs_event_demo.html",
          date:    "2026-07-19",
          paper:   "Action representation",
          tags:    ["demo", "action chunks"],
          summary: "Concrete demo contrasting chunk-based vs event-based action representations.",
        },
        {
          title:   "WALL-WM — Staircase Decoding vs. Next-Token (animated)",
          file:    "posts/staircase_decoding_demo.html",
          date:    "2026-07-19",
          paper:   "Decoding",
          tags:    ["demo", "decoding"],
          summary: "Animated comparison of staircase decoding against plain next-token decoding.",
        },
        {
          title:   "WALL-WM — Tube Patch Masking (interactive)",
          file:    "posts/tube_masking_demo.html",
          date:    "2026-07-19",
          paper:   "Masking",
          tags:    ["demo", "masking"],
          summary: "Interactive demo of tube patch masking over video frames.",
        },
        {
          title:   "WALL-WM — Sight-Cone Masking (interactive)",
          file:    "posts/sight_cone_masking_demo.html",
          date:    "2026-07-19",
          paper:   "Masking",
          tags:    ["demo", "masking"],
          summary: "Interactive demo of sight-cone masking.",
        },
      ],
    },

    {
      id: "world-model",
      name: "World Model",
      blurb: "World models — dynamics prediction, video generation, planning. (Not started yet.)",
      notes: [],
    },
  ],
};
