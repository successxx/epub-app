// Auto-refactored by GPT-5 via Cursor: text sections converted to unique, lightweight components (no deps, no images, no repeats).
import type { Metadata } from "next";
import Section from "../../../../components/ui/Section";
import BlogHeader from "../BlogHeader";
import Timeline from "../../../../components/ui/Timeline";
import StripeBuyButton from "../../../../components/StripeBuyButton";
import DynamicPublishedDate from "../../../../components/ui/DynamicPublishedDate";

export const metadata: Metadata = {
  title: "Turn a 60‑Minute Interview into a 200‑Page Ebook",
  description: "A step‑by‑step capture process: prompts, structure, and review to produce a voice‑true book fast.",
  keywords: ["ebook", "interview", "capture process", "voice fidelity", "authority marketing"],
  openGraph: {
    title: "Turn a 60‑Minute Interview into a 200‑Page Ebook",
    description:
      "A step‑by‑step capture process: prompts, structure, and review to produce a voice‑true book fast.",
    type: "article",
    images: [
      {
        url: "/api/og?title=60%E2%80%91Minute%20Interview%20%E2%86%92%20200%E2%80%91Page%20Ebook&subtitle=Capture%20%E2%80%A2%20Structure%20%E2%80%A2%20Review&bg=dark",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Turn a 60‑Minute Interview into a 200‑Page Ebook",
    description:
      "A step‑by‑step capture process: prompts, structure, and review to produce a voice‑true book fast.",
    images: [
      "/api/og?title=60%E2%80%91Minute%20Interview%20%E2%86%92%20200%E2%80%91Page%20Ebook&subtitle=Capture%20%E2%80%A2%20Structure%20%E2%80%A2%20Review&bg=dark",
    ],
  },
};

export default function Post() {
  return (
    <Section>
      <BlogHeader current="lead-magnet-2" />
      <div className="space-y-8">
        <h1 className="text-3xl md:text-4xl tracking-tight">Turn a 60‑Minute Interview into a 200‑Page Ebook</h1>

        {/* Blog Hero (text-only) */}
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 text-sm text-foreground/80">
          <div className="flex flex-wrap items-center gap-3">
            <DynamicPublishedDate positionFromLatest={18} prefix="Published" />
            <span aria-hidden>•</span>
            <span>Reading time: ~10–12 min</span>
          </div>
          <p className="mt-2">Capture once. Publish many. Use this field-tested path to turn one focused hour into a voice‑true book that sells.</p>
        </div>

        {/* Key Takeaways (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5">
          <h2 id="tldr" className="text-lg font-medium tracking-tight">Key Takeaways</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-foreground/80 space-y-1">
            <li>Define outcomes first—audience, funnel placement, proof required.</li>
            <li>Interview for belief, method, proof, objections; keep stories specific.</li>
            <li>Structure for momentum; deliver summaries and next steps.</li>
          </ul>
        </div>

        {/* Problem → Outcome Intro (unique) */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-foreground/10 p-5">
            <h2 id="problem" className="text-lg font-medium tracking-tight">The problem</h2>
            <p className="mt-2 text-sm text-foreground/80">You have experience, talks, memos. But the time to write is scarce, and drafts stall. The result is scattered proof and inconsistent messaging.</p>
          </div>
          <div className="rounded-xl border border-foreground/10 p-5">
            <h2 id="outcome" className="text-lg font-medium tracking-tight">The outcome</h2>
            <p className="mt-2 text-sm text-foreground/80">One hour yields a coherent, persuasive book. Clear arc, voice intact, summaries ready for landing pages and sequences.</p>
          </div>
        </div>

        <Timeline
          items={[
            { title: "Define the reader and promised change", body: <div>One person. One outcome. Narrow beats broad.</div> },
            { title: "Pick funnel placement", body: <div>Lead magnet, pre‑call primer, or proposal proof.</div> },
            { title: "Draft prompts", body: <div>Origin, belief shift, method, proof, objections.</div> },
            { title: "Run a focused hour", body: <div>Record clean audio. Silence distractions. Stay on rails.</div> },
            { title: "Transcribe and mark moments", body: <div>Fix domain terms. Mark strong lines worth keeping verbatim.</div> },
            { title: "Outline the standard arc", body: <div>Promise → Belief → Method → Cases → Objections → Next steps.</div> },
            { title: "Draft summaries first", body: <div>Then expand with examples and checklists.</div> },
            { title: "Edit aloud", body: <div>Cut filler. Keep signature phrases for voice fidelity.</div> },
            { title: "Add one‑page outline + FAQ", body: <div>Make sharing and approval easy.</div> },
            { title: "Publish and launch sequence", body: <div>Landing page + three honest emails.</div> },
          ]}
        />

        {/* Checklist (Do this next) (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5">
          <h2 id="next" className="text-lg font-medium tracking-tight">Do this next</h2>
          <ul className="mt-2 text-sm text-foreground/80 space-y-1">
            <li>✔ Write your one‑line promise to the reader.</li>
            <li>✔ Pick the six chapter headings using the standard arc.</li>
            <li>✔ Book your interview slot; prepare prompts; hit record.</li>
          </ul>
        </div>

        {/* Definition List (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5">
          <h2 id="terms" className="text-lg font-medium tracking-tight">Key definitions</h2>
          <dl className="mt-3 grid sm:grid-cols-2 gap-4 text-sm text-foreground/80">
            <div><dt className="font-medium">Belief shift</dt><dd>Replacing a common but unhelpful belief with a clearer one.</dd></div>
            <div><dt className="font-medium">Method chapter</dt><dd>Step‑by‑step explanation with an example and a checklist.</dd></div>
            <div><dt className="font-medium">Objections chapter</dt><dd>Risk, price, timing—acknowledged and resolved.</dd></div>
            <div><dt className="font-medium">Next steps</dt><dd>Concrete actions that move the reader forward today.</dd></div>
          </dl>
        </div>

        {/* Pull Quote (unique) */}
        <blockquote className="rounded-xl border-l-4 border-foreground/20 bg-foreground/5 p-5 text-foreground/90">
          “Capture judgment in an hour. Deliver clarity for years.”
          <footer className="mt-2 text-xs text-foreground/60">— Editorial principle</footer>
        </blockquote>

        {/* FAQ Strip (unique) */}
        <div>
          <h2 id="faq" className="text-lg font-medium tracking-tight">FAQ</h2>
          <details className="mt-3 rounded-xl border border-foreground/10 p-4">
            <summary className="cursor-pointer font-medium">Will it sound like me?</summary>
            <p className="mt-2 text-sm text-foreground/80">Yes. We keep phrasing and cadence while tightening clarity.</p>
          </details>
          <details className="mt-2 rounded-xl border border-foreground/10 p-4">
            <summary className="cursor-pointer font-medium">How long until I can use it?</summary>
            <p className="mt-2 text-sm text-foreground/80">Weeks, not months. Most time is editing and packaging for reuse.</p>
          </details>
          <details className="mt-2 rounded-xl border border-foreground/10 p-4">
            <summary className="cursor-pointer font-medium">Where should I deploy first?</summary>
            <p className="mt-2 text-sm text-foreground/80">Landing page + three‑email sequence; then pre‑call primer and proposal.</p>
          </details>
        </div>

        {/* Resource Links (unique) */}
        <div className="rounded-xl border border-foreground/10 p-5">
          <h2 id="resources" className="text-lg font-medium tracking-tight">Resources</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-foreground/80 space-y-1">
            <li><a href="/features" className="underline">Features</a> — what’s included from interview to delivery.</li>
            <li><a href="/how-it-works" className="underline">How it works</a> — the full three‑step method.</li>
            <li><a href="/pricing" className="underline">Pricing</a> — start with a fixed, transparent fee.</li>
          </ul>
        </div>

        <article className="prose prose-invert max-w-none">
          <h2>Why a single hour is enough</h2>
          <p>You are not short on ideas—you are short on time. A focused hour can surface the stories, the turns of phrase, and the judgments that make your work distinct. The trick isn’t to talk more; it’s to talk better. A tight prompt set, a ruthless interviewer, and a clear arc will capture what matters and ignore what doesn’t. When you remove the pressure to “write,” your best thinking arrives on time.</p>

          <h2>Prompts that pull out judgment</h2>
          <ol>
            <li><strong>Origin story.</strong> When did you realize the old way no longer worked? Name the moment.</li>
            <li><strong>Belief shift.</strong> What do buyers believe now, and what should they believe instead?</li>
            <li><strong>Method.</strong> If you had to teach the fix in three steps, what are they?</li>
            <li><strong>Proof.</strong> A number, a case, and a quote—specifics that travel.</li>
            <li><strong>Objections.</strong> Risk, price, timing—in your reader’s words, not yours.</li>
          </ol>

          <h2>Structure that creates momentum</h2>
          <p>Readers decide to continue at the end of each section. Give them a reason. Open with a promise. Move to the belief shift so they see the world differently. Teach the method with an example. Offer two short cases. Resolve the three big objections. End with one next step. That’s it. No theatrics, no gimmicks—just a clean path through the argument.</p>

          <h2>From transcript to chapter</h2>
          <ul>
            <li><strong>Mark moments.</strong> Circle the sentences that sound exactly like you. Those are anchors.</li>
            <li><strong>Rewrite for reading.</strong> Shorten sentences, add subheads, remove filler.</li>
            <li><strong>Place proof near claims.</strong> Numbers and cases live next to the lines they support.</li>
          </ul>

          <h2>Voice fidelity in practice</h2>
          <p>Keep five to seven signature phrases untouched. Your cadence—how you pause, where you emphasize—is a conversion asset. Readers trust what sounds like you on your best day. Editing should increase clarity without sanding off personality. When in doubt, read aloud. If a sentence feels like something you would say to a friend, keep it.</p>

          <h2>A mini case from the field</h2>
          <p>A founder in fintech recorded 62 minutes on a Saturday morning. The transcript yielded eight chapter seeds. We built the first chapter from six sentences he’d said verbatim, added two short cases from his pipeline, and placed one number—days to reconcile—next to the claim it supported. The landing page converted at 31% and replies doubled within a week. Not because it was flashy, but because it felt like him.</p>

          <h2>Common pitfalls and fixes</h2>
          <ul>
            <li><strong>Too many promises.</strong> Pick one. Put the rest in later chapters.</li>
            <li><strong>Generic proof.</strong> “Industry leading” is air. Use a single concrete number instead.</li>
            <li><strong>Unclear next step.</strong> Offer a diagnostic, a checklist, or a short call—one only.</li>
          </ul>

          <h2>Your one‑hour checklist</h2>
          <ol>
            <li>Write your audience + problem + promise line.</li>
            <li>Prepare the five prompts above.</li>
            <li>Record in a quiet room; keep a glass of water and a timer.</li>
            <li>Transcribe, mark moments, and outline the arc.</li>
            <li>Draft summaries first; expand with examples and proof.</li>
          </ol>
        </article>

        <article className="prose prose-invert max-w-none">
          <h2>Common interviewer mistakes (and fixes)</h2>
          <ul>
            <li><strong>Leading questions.</strong> Ask, “What made that costly?” not, “Was that costly?” The former invites judgment; the latter yields yes/no.</li>
            <li><strong>Over‑explaining.</strong> If you tee up each answer with a speech, you’ll capture your words, not theirs. Keep prompts short and let silence pull better sentences out.</li>
            <li><strong>Chasing novelty.</strong> The lines that convert are often things you’ve said a hundred times. Old lines made new by context are better than new lines that haven’t been tested.</li>
          </ul>

          <h2>Transcription that preserves meaning</h2>
          <p>Use a high‑quality model and correct domain terms first. Don’t waste energy making a perfect transcript. Your goal is understanding, not punctuation. Fix names, acronyms, and technical nouns so editing doesn’t get stuck on misunderstandings.</p>

          <h2>Editorial standards that speed decisions</h2>
          <p>Adopt three rules: short sentences, numbers near claims, and one next step per section. Make these visible in your doc so collaborators use the same lens. When standards are explicit, reviews get faster, and drafts reach “good enough to ship” without ego battles.</p>
          <p>Remember the point: capture judgment, not jargon. If a stranger can learn something useful from one page, your interview did its job. Everything else is packaging.</p>
        </article>

        {/* CTA Band (unique; Stripe) */}
        <div className="rounded-xl border border-foreground/10 p-5">
          <div className="text-sm font-medium">Ship your book faster than you thought possible.</div>
          <p className="mt-1 text-sm text-foreground/70">Buy now. One hour in; a publish‑ready book out—engineered to teach, persuade, and convert.</p>
          <div className="mt-3 max-w-xs">
            <StripeBuyButton />
          </div>
        </div>
      </div>
    </Section>
  );
}
