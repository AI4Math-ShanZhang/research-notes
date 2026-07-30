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
        {
          title:   "On the Reasoning Abilities of Masked Diffusion LMs",
          file:    "posts/diffusion-lm-reasoning.html",
          date:    "2026-07-19",
          paper:   "Svete, Merrill & Sabharwal · arXiv:2510.13117",
          tags:    ["diffusion LM", "complexity", "AC/NC", "PLT"],
          summary: "A diffusion LM is a looped transformer with a token scratchpad (MDM ≡ PLT), and its denoising-step count is a depth dial climbing AC⁰ → regular → AC^d → NC. Includes notation (AC/NC/AC^d), both figures, and all five takeaways.",
        },
        {
          title:   "Looped Transformers Are Better at Learning Learning Algorithms",
          file:    "posts/looped-transformers-learning-algorithms.html",
          date:    "2026-07-23",
          paper:   "Yang, Lee, Nowak & Papailiopoulos · ICLR 2024 · arXiv:2311.12424",
          tags:    ["looped TF", "in-context learning", "gradient descent", "empirical"],
          summary: "The empirical companion: a 1-layer transformer looped ~20× matches a 12-layer one at in-context learning (1/12 the params) by emulating gradient descent — one cheap matmul step, repeated (same family as Newton–Schulz). Covers input injection, the b/T training window, θ-vs-w, in-context learning as meta-learning, the fixed-point / deterministic-Markov view, and the simplicity bias (helps on noise/ill-conditioning, hurts on scaling) with a runnable demo.",
        },
      ],
      papers: [
        {
          name:    "A Formal Comparison Between Chain of Thought and Latent Thought",
          link:    "https://arxiv.org/abs/2509.25239",
          summary: "Proves latent/looped thought is stronger at parallel (depth-bound) computation, while CoT's token sampling uniquely enables approximate counting and sampling.",
        },
        {
          name:    "On the Reasoning Abilities of Masked Diffusion Language Models",
          link:    "https://arxiv.org/abs/2510.13117",
          summary: "Proves masked diffusion LMs are equivalent to padded looped transformers; denoising steps map to circuit depth (AC⁰→AC^d→NC), and diffusion is strictly more step-efficient than CoT on parallelizable problems.",
        },
        {
          name:    "Coconut — Training LLMs to Reason in a Continuous Latent Space",
          link:    "https://arxiv.org/abs/2412.06769",
          summary: "Lets a model reason in continuous 'thought' vectors instead of words by feeding the last hidden state straight back as the next input embedding.",
        },
        {
          name:    "Looped Transformers are Better at Learning Learning Algorithms",
          link:    "https://arxiv.org/abs/2311.12424",
          summary: "Empirically trains a 1-layer looped transformer to emulate iterative learning algorithms (gradient descent) for in-context learning, matching a 12-layer model at 1/12 the parameters via input injection and a truncated loss window.",
        },
      ],
    },

    {
      id: "text-diffusion",
      name: "Text Diffusion",
      blurb: "Diffusion language models — architecture, sampling, self-conditioning, and interpretability. (The complexity-theory side lives in Loop Transformer.)",
      notes: [
        {
          title:   "How Transparent is DiffusionGemma?",
          file:    "posts/diffusiongemma-transparency.html",
          date:    "2026-07-29",
          paper:   "Engels, McDougall, Chughtai et al. · Google DeepMind · arXiv:2606.20560",
          tags:    ["text diffusion", "self-conditioning", "interpretability", "monitorability", "logit lens", "EB sampling"],
          summary: "DiffusionGemma passes a dense self-conditioning matrix S between denoising steps, which naively makes it 28.6× more opaque than Gemma 4 — but S = softmax(logits)·W_E is structurally a blend of token embeddings, so squeezing it to ~8 tokens per position costs nothing and opaque serial depth drops to 1.1×. Covers the architecture (canvas, S, EB renoising), the f_k / f_p ablations and their out-of-distribution caveat, Figure 3's category breakdown, and all six §5 phenomena — plus why lock-in is the unifying mechanism, why the sequence-smearing 'beam search' is really just spacing, and how uniform vs. absorbing noise explains the whole LLaDA contrast.",
        },
      ],
      papers: [
        {
          name:    "How Transparent is DiffusionGemma?",
          link:    "https://arxiv.org/abs/2606.20560",
          summary: "Decomposes transparency into opaque serial depth, variable transparency, and algorithmic transparency. Shows the inter-step bottleneck compresses to O(few) tokens with no capability loss, that those tokens are mostly guesses at current/nearby final tokens, and that monitorability matches Gemma 4 — while documenting six diffusion-specific reasoning behaviours.",
        },
        {
          name:    "Analog Bits — Generating Discrete Data using Diffusion Models with Self-Conditioning",
          link:    "https://arxiv.org/abs/2208.04202",
          summary: "Chen, Zhang & Hinton (ICLR 2023) — origin of the self-conditioning trick DiffusionGemma inherits. The denoiser goes from f(x_t, t) to f(x_t, x̃₀, t): concatenate the previous step's own x₀ estimate onto the input instead of discarding it. Training zeroes that input 50% of the time and applies stop_gradient to the extra forward pass, so cost rises under 25% and zero becomes the in-distribution encoding of \"no signal\" — which is why DiffusionGemma initializes S₀ to the zero matrix. Cuts ImageNet 64×64 FID by 30–43% (Table 8) and works on continuous DDPM too, so it's a generic technique rather than an analog-bits-specific hack.",
        },
        {
          name:    "PRISM — Fine-Tuning Masked Diffusion for Provable Self-Correction",
          link:    "https://arxiv.org/abs/2510.01384",
          summary: "Kim, Kim, Lee, Pan, Kim, Kakade & Chen — a plug-in remasking head that learns per-token quality without RL or a verifier. Target is g*(y) = p(x^i = y^i | y ⊕ m^i): how likely the token sitting at position i would be if you couldn't see it. The trick is the label — fill a masked slot with the model's own sample y^i, then supervise with the free binary check 1[x^i = y^i]; since BCE's minimizer is the conditional mean, that single bit recovers the exact probability. g is one coordinate of the unmasking posterior f already models, just readable from an input where the slot is FILLED rather than masked — which is what turns L extra forward passes into zero. Shares the backbone with a second head, regularized by the ordinary MDM loss to prevent forgetting f. Sudoku, 170M text, and LLaDA-8B code.",
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
        { title:"Dreamer (v1 → v3) — Latent Imagination", file:"posts/dreamer-latent-imagination.html", date:"2026-07-24", paper:"Hafner et al. · v1 arXiv:1912.01603 (ICLR 2020) · v3 arXiv:2301.04104 (2023)", tags:["actor-critic","latent imagination","RSSM","value target","DreamerV3","categorical latents"], summary:"The Q&A that made it click: the p (image-informed) vs q (image-free) split that powers imagination; actor-critic trained entirely in the dream, with a worked V_λ target (eq 6) and analytic gradients through the dynamics; V_λ vs GAE (same λ-blend, minus baseline); action model ≠ action supervision (trained up the value gradient, no target action). Plus a DreamerV3 section — symlog, twohot categorical critic, discrete latents, free-bits KL, percentile return normalization — and the key insight that the issue is the Gaussian's unimodality, not continuity (flow matching fits VLA action heads / DIAMOND decoders; categorical fits the latent dynamics for cheap sampling + closed-form KL)." },
        { title:"AdaJEPA — An Adaptive Latent World Model", file:"posts/adajepa-adaptive-latent-world-model.html", date:"2026-07-28", paper:"Wang, Bounou, LeCun & Ren · arXiv:2606.32026", tags:["test-time adaptation","JEPA","MPC","planning","stop-gradient"], summary:"Stop freezing the world model. The adaptation loss is just the JEPA prediction loss — predicted next latent vs. actually-observed next latent, stop-gradient on the target — but applied online to the last 5 transitions the robot generated itself, one gradient step per MPC replan on the last layers of encoder + predictor. Covers why re-planning fixes state error but never model bias (noise vs. bias), why z is the image latent and the action rides in through its own encoder, why stop-gradient is needed once the encoder moves too, and the ablation principle: shape/dynamics shift enters at the predictor, visual/layout shift enters at the encoder — fix the error where it enters." },
      ],
      papers: [
        { name:"World Models — Ha & Schmidhuber", link:"https://arxiv.org/abs/1803.10122", summary:"The foundational V-M-C agent; the MDN-RNN memory predicts future latents, letting the controller train inside the agent's own imagined 'dream'." },
        { name:"Dream to Control: Learning Behaviors by Latent Imagination (Dreamer)", link:"https://arxiv.org/abs/1912.01603", summary:"Learns an RSSM latent world model, then trains an actor-critic entirely in imagination by backpropagating the λ-return value target through the learned dynamics — beating prior model-based and model-free agents on 20 visual control tasks." },
        { name:"V-JEPA 2 — Self-Supervised Video Models Enable Understanding, Prediction and Planning", link:"https://arxiv.org/abs/2506.09985", summary:"Pretrains an action-free joint-embedding predictive architecture on over 1M hours of internet video by masked latent feature prediction, then post-trains an action-conditioned world model (V-JEPA 2-AC) on under 62 hours of unlabeled Droid robot video. Plans from image goals to do zero-shot reach/grasp/pick-and-place on Franka arms in unseen labs — no task-specific training, no reward. Also SOTA on motion understanding (77.3 on SSv2), action anticipation (39.7 R@5 on EK-100), and video QA at 8B scale." },
        { name:"EponaV2 — Driving World Model with Comprehensive Future Reasoning", link:"https://arxiv.org/abs/2605.14696", summary:"Perception-free driving world model that forecasts future depth and semantic maps alongside the future image, instead of predicting next frames alone. Depth supplies 3D geometry and motion of surrounding objects; semantics come from features distilled out of large segmentation models — both supervised by pseudo-labels from visual foundation models, so no manual annotation. Stage two finetunes the trajectory with flow-matching GRPO. SOTA among perception-free models on NAVSIM (+1.3 PDMS, +5.5 EPDMS); still short of perception-based SOTA, limited by pseudo-label precision. Follow-up to Epona (2506.24113)." },
        { name:"AdaJEPA — An Adaptive Latent World Model", link:"https://arxiv.org/abs/2606.32026", summary:"Adapts the latent world model at test time inside the MPC loop: plan, act, use the observed transition as a self-supervised signal, re-plan. One gradient step per replan on the last layers of encoder and predictor substantially improves goal-reaching under visual and dynamics shift, with no extra demonstrations." },
      ],
    },
  ],
};
