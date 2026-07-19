/* =====================================================================
   BLOG CONTENT — this is the only file you edit to add notes/categories.
   Each category has:
     notes[]  — written note pages (title, file, date, paper, tags, summary)
     papers[] — a reading list (name, link, summary) shown on papers.html
   ===================================================================== */
const BLOG = {
  title:   "Research Notes",
  tagline: "Paper summaries + my key notes.",
  links: [
    { text: "Blog",   href: "index.html" },
    { text: "Papers", href: "papers.html" },
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
      papers: [
        {
          name:    "A Formal Comparison Between Chain of Thought and Latent Thought",
          link:    "https://arxiv.org/abs/2509.25239",
          summary: "Proves latent/looped thought is stronger at parallel (depth-bound) computation, while CoT's token sampling uniquely enables approximate counting and sampling.",
        },
        {
          name:    "Coconut — Training LLMs to Reason in a Continuous Latent Space",
          link:    "https://arxiv.org/abs/2412.06769",
          summary: "Lets a model reason in continuous 'thought' vectors instead of words by feeding the last hidden state straight back as the next input embedding.",
        },
        {
          name:    "Universal Transformers (looped-Transformer origin)",
          link:    "https://arxiv.org/abs/1807.03819",
          summary: "Applies the same Transformer block recurrently with adaptive depth — the architecture the latent-thought line builds on for extra expressivity with fewer parameters.",
        },
      ],
    },

    {
      id: "vla",
      name: "VLA/VWA",
      blurb: "Vision-language-action policies — training, RL, decoding, and masking.",
      notes: [
        { title:"Intro: VLA, World Models & World-Action Models", file:"posts/intro_vla_world_model.html", date:"2026-07-19", paper:"Overview note", tags:["intro","overview"], summary:"A gentle introduction to what VLAs, world models, and world-action models are, and how they relate." },
        { title:"VLA & World-Model Papers — Comparative Review", file:"posts/vla_world_model_survey.html", date:"2026-07-19", paper:"Survey / comparative review", tags:["survey"], summary:"Side-by-side comparison of the main VLA and world-model papers I've read — architectures, objectives, and trade-offs." },
        { title:"RECAP (π0.6): RL for VLAs", file:"posts/recap-pi06.html", date:"2026-07-19", paper:"π0.6 · arXiv:2511.14759", tags:["RL","value function","π-series"], summary:"RECAP fits a value function offline, then extracts a policy by advantage conditioning instead of PPO-style policy gradients — steadier training for real-robot VLAs. (Links the full RL walkthrough.)" },
        { title:"WALL-WM — Beginner's Walkthrough", file:"posts/wall_wm_analysis.html", date:"2026-07-19", paper:"WALL-WM", tags:["world-action model","pipeline"], summary:"Pipeline, data, and experiments walkthrough for WALL-WM. See also the Q&A and the demos below." },
        { title:"WALL-WM — Q&A from our discussion", file:"posts/wall_wm_qa.html", date:"2026-07-19", paper:"WALL-WM", tags:["world-action model","Q&A"], summary:"Answers to the specific questions that came up while working through WALL-WM." },
        { title:"WALL-WM — Input → Output Data Flow (demo)", file:"posts/pipeline_dataflow_demo.html", date:"2026-07-19", paper:"WALL-WM", tags:["demo","data flow"], summary:"Visual demo tracing a single example through WALL-WM's input-to-output pipeline." },
        { title:"WALL-WM — Chunk vs. Event (demo)", file:"posts/chunk_vs_event_demo.html", date:"2026-07-19", paper:"WALL-WM", tags:["demo","action chunks"], summary:"Concrete demo contrasting chunk-based vs event-based action representations." },
        { title:"WALL-WM — Staircase Decoding vs. Next-Token (animated)", file:"posts/staircase_decoding_demo.html", date:"2026-07-19", paper:"WALL-WM", tags:["demo","decoding"], summary:"Animated comparison of staircase decoding against plain next-token decoding." },
        { title:"WALL-WM — Tube Patch Masking (interactive)", file:"posts/tube_masking_demo.html", date:"2026-07-19", paper:"WALL-WM", tags:["demo","masking"], summary:"Interactive demo of tube patch masking over video frames." },
        { title:"WALL-WM — Sight-Cone Masking (interactive)", file:"posts/sight_cone_masking_demo.html", date:"2026-07-19", paper:"WALL-WM", tags:["demo","masking"], summary:"Interactive demo of sight-cone masking." },
        { title:"LingBot-VA 2.0 — Beginner's Visual Guide", file:"posts/lingbot_va2_explained.html", date:"2026-07-19", paper:"LingBot-VA 2.0", tags:["LingBot","architecture"], summary:"Illustrated walkthrough of the LingBot-VA 2.0 architecture and how it produces actions." },
        { title:"LingBot-VA §3.3 & §3.4 — Teacher Forcing & the Deployment Trick", file:"posts/lingbot_va_training_deployment.html", date:"2026-07-19", paper:"LingBot-VA", tags:["LingBot","training","deployment"], summary:"How LingBot-VA trains with teacher forcing and the trick that bridges training and deployment." },
      ],
      papers: [
        { name:"π0.6 — a VLA that learns from experience (RECAP)", link:"https://arxiv.org/abs/2511.14759", summary:"A VLA that keeps improving from its own experience via RECAP: an offline value function plus advantage-conditioned policy extraction." },
        { name:"π0.7 — steerable generalist with rich context conditioning", link:"https://arxiv.org/abs/2604.15483", summary:"A steerable generalist VLA that conditions on rich context to follow varied instructions." },
        { name:"Qwen-VLA — unified manipulation + navigation + egocentric", link:"https://arxiv.org/abs/2605.30280", summary:"One VLA covering manipulation, navigation, and egocentric tasks in a single model." },
        { name:"PhysBrain 1.0 — physics-commonsense-first VLA", link:"https://arxiv.org/abs/2605.15298", summary:"A VLA that puts physical commonsense first, grounding action in physical reasoning." },
        { name:"LingBot-Video — MoE video foundation model for embodiment", link:"https://arxiv.org/abs/2607.07675", summary:"A mixture-of-experts video foundation model built as a backbone for embodied policies." },
        { name:"LingBot-VA 2 — native-from-scratch video-action pretraining", link:"https://arxiv.org/abs/2607.08639", summary:"Pretrains a video-action model natively from scratch rather than adapting a language backbone." },
        { name:"LingBot-Vision — spatial-perception vision backbone", link:"https://arxiv.org/abs/2607.05247", summary:"A vision backbone specialized for spatial perception in embodied settings." },
        { name:"Qwen-RobotNav — configurable navigation VLA", link:"https://arxiv.org/abs/2606.18112", summary:"A configurable, navigation-focused VLA." },
        { name:"WALL-WM — event-grounded world-action model", link:"https://arxiv.org/abs/2606.01955", summary:"A world-action model grounded on events that imagines the future and acts on it. (arXiv id inferred from the folder PDF — verify.)" },
        { name:"LingBot-VA — causal autoregressive video-action world model", link:"https://arxiv.org/abs/2601.21998", summary:"A causal, autoregressive video-action world model that predicts video and action together." },
        { name:"DreamZero — World Action Models are Zero-shot Policies", link:"https://arxiv.org/abs/2602.15922", summary:"Argues that a good world-action model already behaves as a zero-shot policy." },
        { name:"Cosmos 3 — omnimodal world model for Physical AI", link:"https://arxiv.org/abs/2606.02800", summary:"An omnimodal world model aimed at Physical AI, spanning multiple modalities of world dynamics." },
      ],
    },

    {
      id: "world-model",
      name: "World Model",
      blurb: "World models — dynamics prediction, memory, imagination, and planning.",
      notes: [
        { title:"World Models (Ha & Schmidhuber)", file:"posts/world-models-ha-schmidhuber.html", date:"2026-07-19", paper:"Ha & Schmidhuber · arXiv:1803.10122", tags:["memory","MDN-RNN","imagination","foundational"], summary:"The V-M-C agent, focused on the memory model M: an MDN-RNN whose hidden state remembers history and predicts a distribution over the next latent. Memory is a generative model of dynamics — it lets the agent imagine and even train entirely inside the 'dream'." },
      ],
      papers: [
        { name:"World Models — Ha & Schmidhuber", link:"https://arxiv.org/abs/1803.10122", summary:"The foundational V-M-C agent; the MDN-RNN memory predicts future latents, letting the controller train inside the agent's own imagined 'dream'." },
      ],
    },
  ],
};
