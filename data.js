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
      id: "fast-generation",
      name: "Fast Generation",
      blurb: "Few-step image and video generation — distilling diffusion/flow models down to a handful of network calls.",
      notes: [
        {
          title:   "Parallel Decoding Distillation — one network call for several denoising steps",
          file:    "posts/pdd-parallel-decoding-distillation.html",
          date:    "2026-08-02",
          paper:   "Shaul, Liu, Vahdat & Berner (NVIDIA) · arXiv:2607.26004",
          tags:    ["distillation", "flow matching", "few-step sampling", "video generation", "diversity"],
          summary: "Classical decoding needs one full network call per denoising step, because the model must be fed X_k before it can say the direction at X_k. PDD copies the final linear layer N times so one look at X_n emits the velocities for the next L steps at once — including steps whose states do not exist yet — and the speedup is exactly N/L calls. The L heads are linear on the same features, so they pre-add offline into one matrix: a PDD call costs the same as a teacher call. Training is one student pass plus 1–2 teacher passes: walk forward inside the block with the student's own arrows (free, no network calls), stop-gradient, ask the teacher for the right velocity at one random position, MSE. No GAN, no VSD, no JVP. Covers the X-vs-v distinction, why L different heads beat one head used L times (a curved path vs a straight big Euler step), why running the network L times IS the teacher, and why DMD2 wins HPSv2 while collapsing diversity to half of PDD's. 4 NFE matches the 100-call Qwen-Image teacher; Wan 14B after 200 iterations; LTX-2.3 at 8 NFE vs the teacher's 120.",
        },
      ],
      papers: [
        {
          name:    "Parallel Decoding Distillation for Fast Image and Video Generation",
          link:    "https://arxiv.org/abs/2607.26004",
          summary: "NVIDIA. Trajectory-based distillation that replaces VSD/adversarial losses with a single MSE regression. Discretizes the sampling path into N intervals grouped into blocks of size L; the student reuses the teacher backbone with the final linear layer repeated N times, so one forward pass on X_n yields mean velocities for every interval in the block, and at inference the L heads fuse into a single averaged linear layer (zero overhead per call, N/L fewer calls). Learns the mean velocity without ever regressing its derivative — no JVPs, no finite differences — by decomposing the full interval into parallel sub-intervals and supervising one random sub-interval per iteration, since gradients through the shared backbone recover the full-interval signal in expectation. Training costs 1 student pass + 1 (Euler) or 2 (Midpoint) teacher passes, is data-free (prompts only), and sampling variable block sizes gives one model that runs at 2/4/8 NFE without retraining. Results: Qwen-Image 20B at 4 NFE matches the 100-call teacher (OneIG 0.538, DPG 88.66); Wan2.1 1.3B best VBench overall at 4 NFE (84.94) with the highest motion score; Wan 14B after 200 iterations; LTX-2.3 22B at 8 NFE after ~250 iterations vs a 120-call teacher. The headline finding is diversity — OneIG diversity 0.181 vs DMD2's 0.109 (teacher 0.200) — though DMD2 still leads on HPSv2/PickScore, and on ImageNet-256 1-step PDD's 2.69 FID trails FreeFlow's 1.45.",
        },
      ],
    },

    {
      id: "vla",
      name: "VLA/VWA",
      blurb: "Vision-language-action policies — training, RL, decoding, and masking.",
      notes: [
        { title:"WorldDiT — A Unified Diffusion Architecture for World and Action Modeling", file:"posts/worlddit-unified-diffusion.html", date:"2026-08-01", paper:"Wang, Praveen, Roy & Villagra (Bagel Labs) · arXiv:2607.23909", tags:["world-action model","diffusion policy","flow matching","no VLM","LIBERO"], summary:"Does a robot policy need a VLM at all? WorldDiT says no: frozen MAE + frozen CLIP text feed one 4-layer DiT (399M total, 135M trainable) that denoises 7 actions and 128 future RGB patches together — 94.9% on LIBERO. The design is a one-way attention rule: action tokens may not read the image tokens, so the image branch is deleted at run time while its loss still backprops into the shared weights. Free supervision, zero inference cost. Covers why 34 visual tokens (input, squeezed meaning, clean) are not the 128 RGB patches (homework, raw pixels, noisy), why the flow lives in each target's own space rather than the 1024 hidden width, and why there is no planning anywhere — 20 denoising steps refine one answer, they don't search. Places it against π0 (the real 'swap the VLM for MAE' comparison) and WALL-WM (the opposite rule: its action model reads the imagined video every layer). Limits: no generalization test at all, four separate fine-tuned models averaged, 300/500 eval episodes used for checkpoint selection, and no ablation of the RGB loss that the whole thesis rests on." },
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
        { name:"WorldDiT — A Unified Diffusion Architecture for World and Action Modeling", link:"https://arxiv.org/abs/2607.23909", summary:"Bagel Labs. Drops the pretrained VLM action backbone entirely: frozen MAE (via a Perceiver Resampler) and a frozen CLIP text encoder produce 34 visual + 1 language + 1 state tokens per step over a 3-step context, and one small DiT (depth 4, width 1024, 399M total / 135M trainable) flow-matches two targets at once — a 7-step continuous action chunk and 128 normalized raw-RGB patches (64 evenly spaced 16×16 squares per camera) from the frame at t+7. A strict block-causal mask lets the RGB tokens read the actions but never the reverse, so the RGB branch is dropped from the inference graph while its gradient still reshapes the shared trunk; loss weights are 0.1 action vs 0.001 RGB. Deployment integrates 20 Euler steps, executes 3 of 7 actions, ensembles, replans. 94.9% mean on LIBERO (98.0/97.0/92.8/91.8) on the reported parameter–success Pareto frontier. Caveats the paper does and doesn't state: 300 of 500 episodes per suite were used for checkpoint selection (their own disclaimer), the four suites get four separately fine-tuned models, and there is no ablation removing the RGB objective the thesis depends on." },
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
        { name:"HumanCLAW — Can Vision-Language Models Act Through a Body?", link:"https://arxiv.org/abs/2607.27180", summary:"Meta + NTU + UW. Measures action intelligence by decoupling it twice. (1) The frozen off-the-shelf VLM only emits one atomic skill per 0.5s step from an 8-item vocabulary — walk(x,z,ψ), side_step, step_back, turn_in_place(θ), climb_upstairs(h,d), walk_downstairs(h,d), sit_in_place(h), stop — never a compositional command like sit(sofa), so long-horizon composition stays in the VLM's own reasoning. A skill-conditioned generator (38M motion DiT trained on AMASS, frozen, plus one ControlNet adapter per skill, zero-init injection, plug-and-play) realizes each call as continuous hundred-DoF motion. (2) Half-physics simulation: the world runs rigid-body physics (contact, gravity, movable objects) but the body is driven by equivalent kinematic velocities rather than joint torques, so walls block it and objects get knocked over while balance and motor-tracking failures are factored out. Every failure therefore reads at the decision level. HumanCLAW-Bench: 1,218 egocentric find-navigate-interact episodes across 41 indoor houses. Nine frontier VLMs, none solves it — best is 16.8%. Perception is not the bottleneck: once a target is genuinely visible the strongest model's self-reported seeing rate is within 5 points of measured visibility. What's missing is embodied self-awareness — knowing where the body is, whether it has arrived, and whether it just hit something." },
      ],
    },

    {
      id: "world-model",
      name: "World Model",
      blurb: "World models — dynamics prediction, memory, imagination, and planning.",
      notes: [
        { title:"World Models (Ha & Schmidhuber)", file:"posts/world-models-ha-schmidhuber.html", date:"2026-07-19", paper:"Ha & Schmidhuber · arXiv:1803.10122", tags:["memory","MDN-RNN","imagination","foundational"], summary:"The V-M-C agent, focused on the memory model M: an MDN-RNN whose hidden state remembers history and predicts a distribution over the next latent. Memory is a generative model of dynamics — it lets the agent imagine and even train entirely inside the 'dream'." },
        { title:"Dreamer (v1 → v3) — Latent Imagination", file:"posts/dreamer-latent-imagination.html", date:"2026-07-24", paper:"Hafner et al. · v1 arXiv:1912.01603 (ICLR 2020) · v3 arXiv:2301.04104 (2023)", tags:["actor-critic","latent imagination","RSSM","value target","DreamerV3","categorical latents"], summary:"The Q&A that made it click: the p (image-informed) vs q (image-free) split that powers imagination; actor-critic trained entirely in the dream, with a worked V_λ target (eq 6) and analytic gradients through the dynamics; V_λ vs GAE (same λ-blend, minus baseline); action model ≠ action supervision (trained up the value gradient, no target action). Plus a DreamerV3 section — symlog, twohot categorical critic, discrete latents, free-bits KL, percentile return normalization — and the key insight that the issue is the Gaussian's unimodality, not continuity (flow matching fits VLA action heads / DIAMOND decoders; categorical fits the latent dynamics for cheap sampling + closed-form KL)." },
        { title:"Masked Visual Actions for Unified World Modeling", file:"posts/masked-visual-actions.html", date:"2026-08-03", paper:"Alzayer, Huang, Chen, Luey, Zhang, Agrawala, Wetzstein, Fei-Fei, Du, Wu & Huang · arXiv:2607.19343", tags:["video world model","masking","forward/inverse","embodiment transfer","planning"], summary:"Don't tell the video model the action with numbers — draw it. The action is the robot arm painted onto the video in the right pixels, everything else flat gray. Reveal the robot pixels and the model fills in the scene (forward model); reveal the object pixels and the same model fills in the robot (inverse model) — same weights, only the mask changes, because both are conditionals of the joint p(e₁…eₙ) the video model already learned. Covers the two mask pipelines (SAM segmentation vs translucent URDF render with red gripper fingers) and why they're complementary, why the dense mask deletes the sparse-code→robot-appearance translator that skeleton/EEF conditioning has to learn and then fails to generalize, and the zero-shot inverse result they didn't expect (trained only on robot masks, works when flipped). The ablation's first row is the point: in-domain, sparse conditioning ties (LPIPS .107/.106/.0945) — the gap only opens on an unseen gripper and an unseen bimanual robot. Uses: policy evaluation (r=0.982), Best-of-N planning with a Gemini verifier (+7 to +26 pts), action extraction (90% vs DP 50 / ACT 80 / SmolVLA 85). Limits: correlation not causation, imagination biased optimistic, 14B model too slow for a control loop." },
        { title:"AdaJEPA — An Adaptive Latent World Model", file:"posts/adajepa-adaptive-latent-world-model.html", date:"2026-07-28", paper:"Wang, Bounou, LeCun & Ren · arXiv:2606.32026", tags:["test-time adaptation","JEPA","MPC","planning","stop-gradient"], summary:"Stop freezing the world model. The adaptation loss is just the JEPA prediction loss — predicted next latent vs. actually-observed next latent, stop-gradient on the target — but applied online to the last 5 transitions the robot generated itself, one gradient step per MPC replan on the last layers of encoder + predictor. Covers why re-planning fixes state error but never model bias (noise vs. bias), why z is the image latent and the action rides in through its own encoder, why stop-gradient is needed once the encoder moves too, and the ablation principle: shape/dynamics shift enters at the predictor, visual/layout shift enters at the encoder — fix the error where it enters." },
      ],
      papers: [
        { name:"Masked Visual Actions for Unified World Modeling", link:"https://arxiv.org/abs/2607.19343", summary:"Stanford/UMD/Harvard. A pixel-space control interface: the action is a partially revealed spatiotemporal trajectory — the acting entity drawn in place on every frame, the rest set to uniform gray — concatenated in latent space to a Wan-Fun-Control 2.2 14B base and adapted with LoRA rank 256 on ~15 hours (1,000 DROID demos + 4,000 RoboCasa, failures included on purpose). Masks come from SAM (prompt 'a robotic arm') or from rendering the URDF translucent with bright-red gripper fingers; the render path is what lets a user specify an unexecuted action at test time. Because the video model captures the joint p(e₁…eₙ), revealing the active entity yields a forward dynamics model and revealing the passive entity yields an inverse model from the same checkpoint — and the inverse direction is zero-shot, since training used only robot masks. Key ablation: in-domain on DROID, end-effector (0.107) and skeleton (0.106) conditioning tie with masked actions (0.0945); the gap only appears off-distribution — a custom 3D-printed gripper (22.79 vs 21.02/20.32 PSNR) and unseen bimanual R1-Pro in BEHAVIOR (22.90 vs 19.58/19.23, Ctrl-World 18.39, static or corrupted). So sparse conditioning fails at generalization, not fidelity: it must learn a code→appearance translator that memorizes the training robot. Applications: policy evaluation (r=0.982 with GT success), Best-of-N planning with a Gemini 3.1 Pro verifier prompted to penalize ghost contact / post-disengagement coasting / frame-jump glitches (+7 to +26 points), and action extraction via a learned IDM (90% vs DP 50, ACT 80, SmolVLA 85). Stated limits: correlation not causation; imagination is biased optimistic about task progress in both sim and real." },
        { name:"World Models — Ha & Schmidhuber", link:"https://arxiv.org/abs/1803.10122", summary:"The foundational V-M-C agent; the MDN-RNN memory predicts future latents, letting the controller train inside the agent's own imagined 'dream'." },
        { name:"Dream to Control: Learning Behaviors by Latent Imagination (Dreamer)", link:"https://arxiv.org/abs/1912.01603", summary:"Learns an RSSM latent world model, then trains an actor-critic entirely in imagination by backpropagating the λ-return value target through the learned dynamics — beating prior model-based and model-free agents on 20 visual control tasks." },
        { name:"V-JEPA 2 — Self-Supervised Video Models Enable Understanding, Prediction and Planning", link:"https://arxiv.org/abs/2506.09985", summary:"Pretrains an action-free joint-embedding predictive architecture on over 1M hours of internet video by masked latent feature prediction, then post-trains an action-conditioned world model (V-JEPA 2-AC) on under 62 hours of unlabeled Droid robot video. Plans from image goals to do zero-shot reach/grasp/pick-and-place on Franka arms in unseen labs — no task-specific training, no reward. Also SOTA on motion understanding (77.3 on SSv2), action anticipation (39.7 R@5 on EK-100), and video QA at 8B scale." },
        { name:"EponaV2 — Driving World Model with Comprehensive Future Reasoning", link:"https://arxiv.org/abs/2605.14696", summary:"Perception-free driving world model that forecasts future depth and semantic maps alongside the future image, instead of predicting next frames alone. Depth supplies 3D geometry and motion of surrounding objects; semantics come from features distilled out of large segmentation models — both supervised by pseudo-labels from visual foundation models, so no manual annotation. Stage two finetunes the trajectory with flow-matching GRPO. SOTA among perception-free models on NAVSIM (+1.3 PDMS, +5.5 EPDMS); still short of perception-based SOTA, limited by pseudo-label precision. Follow-up to Epona (2506.24113)." },
        { name:"AdaJEPA — An Adaptive Latent World Model", link:"https://arxiv.org/abs/2606.32026", summary:"Adapts the latent world model at test time inside the MPC loop: plan, act, use the observed transition as a self-supervised signal, re-plan. One gradient step per replan on the last layers of encoder and predictor substantially improves goal-reaching under visual and dynamics shift, with no extra demonstrations." },
      ],
    },

    {
      id: "spatial-intelligence",
      name: "Spatial Intelligence",
      blurb: "How MLLMs perceive and reason about 3D structure — diagnostic benchmarks, occlusion, counting, mental rotation.",
      notes: [],
      papers: [
        { name:"Spatial-IQ — Deconstructing Spatial Intelligence via Hierarchical Capability Tests", link:"https://arxiv.org/abs/2607.22864", summary:"NVIDIA. Takes one task — count every object in a stack of blocks, including the hidden ones that must be there to support the visible ones — and splits it into 9 sub-tasks ordered by the developmental stages of human spatial cognition (Piaget &amp; Inhelder): individuate objects, group them, count columns and layers (S1–S4), count visible objects (S5), identify the top layer, direct support, and supporting columns (S6–S8), count hidden objects (S9), then the targets T1 Object Counting and T2 Mental Rotation. ~80k scenes generated in Isaac Sim 5.1 on a 4×4×4 voxel grid with four object types; hidden-object ground truth comes from a pixel-level depth-buffer occlusion test that keeps an object only if it is camera-visible or physically required to hold up a retained object above it, so every hidden count is forced by support rather than guessed. 3k evaluation scenes, 68k disjoint training scenes, three response modalities (free text, image-option MCQ, image editing). Result: humans 82.1% on Object Counting, best of 8 frontier text models 17.7%, worst 2.1%; in 5-choice MCQ every model collapses to chance (~20%) against 86.2% human. The real finding is that the headline number hides the mechanism — Qwen (17.7%) combines its own visible+hidden counts correctly 64.2% of the time, close to the human 69.1%, while Gemini scores a comparable 14.8% with only 18.6% consistency, i.e. it reaches the total by a route that bypasses the decomposition. Errors are systematic: phantom block above the top layer, two columns merged into one, adjacent visible blocks merged or dropped. As training signal: SFT on the integer alone drives hierarchy preservation to 0%, SFT with hierarchical CoT lifts Qwen2.5-VL 32B from 2.9% → 46.7%, and a 10%-SFT warmup followed by GRPO/DAPO RLVR reaches 62.6% — with reward on the final integer only, so the gain is sharpening onto CoT trajectories that land on correct totals, not new sub-task supervision. Still 20 points under human." },
      ],
    },
  ],
};
