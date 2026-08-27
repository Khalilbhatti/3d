import type { Story } from "./types";

/**
 * =============================================================================
 *  BLOG  (rendered through the Story model)
 * =============================================================================
 *  Long-form posts from the GitzTech team, authored as structured blocks so
 *  they can be edited without touching layout. See docs/CONTENT_EDITING.md
 *  for the block reference.
 */
export const stories: Story[] = [
  {
    id: "story-ai-lead-gen-automation",
    slug: "ai-b2b-lead-generation-automation",
    title: "AI B2B Lead Generation Automation: Building a Scalable Outbound Sales Engine",
    dek: "How AI and n8n automation turn prospect research, enrichment, personalization, outreach and CRM updates into one connected, scalable sales engine.",
    author: "GitzTech",
    authorRole: "AI Automation Team",
    date: "2026-08-27",
    displayDate: "27 August 2026",
    readingTime: "9 min read",
    category: "AI Automation",
    seed: "story-ai-leadgen-01",
    palette: { from: "#F0B429", via: "#2E4C8A", to: "#0A1327", ink: 0.18 },
    blocks: [
      {
        type: "paragraph",
        lead: true,
        text: "Finding potential customers is easy. Finding the right customers, understanding their business, personalizing the conversation, following up at the right time, and keeping the whole pipeline organized is much harder.",
      },
      {
        type: "paragraph",
        text: "For most B2B teams, that gap gets filled with hours of repetitive work every week — researching prospects, copying information between platforms, checking websites, drafting outreach, updating CRMs and chasing follow-ups by hand. As the number of prospects grows, the manual work grows with it.",
      },
      {
        type: "paragraph",
        text: "AI-powered workflow automation changes that model. Instead of treating lead generation as a pile of disconnected manual tasks, a business can connect prospect discovery, enrichment, qualification, personalization, outreach, response handling and CRM updates into one workflow — with a tool like n8n acting as the orchestration layer between AI models, APIs, the CRM, email and internal tools.",
      },
      { type: "heading", text: "Where the traditional process breaks down" },
      {
        type: "paragraph",
        text: "A typical outbound process — find companies, research each one, find contacts, check fit, write a personalized message, send it, wait, follow up, update the CRM, notify the salesperson, repeat — isn't hard task by task. The problem is volume: a rep can burn hours on admin before a single meaningful conversation happens.",
      },
      {
        type: "paragraph",
        text: "That volume creates the same failure modes in almost every sales team we've worked with: research quality that varies by whoever's doing it, duplicate leads from systems that don't talk to each other, interested prospects that go quiet in an inbox, generic outreach when research takes too long, and important context that lives in someone's personal notes instead of the CRM.",
      },
      { type: "heading", text: "What AI B2B lead generation automation actually does" },
      {
        type: "paragraph",
        text: "AI B2B lead generation automation combines traditional workflow automation with an AI model that can interpret information, not just move it. A lead moves through enrichment, website research, AI qualification, personalization, outreach, reply classification and a CRM update — each stage doing one job, applying the same rules to every record whether there are ten leads or ten thousand.",
      },
      {
        type: "image",
        artworkId: "prj-b2b-leadgen",
        alt: "GitzTech's AI B2B Lead Generation & Cold Email Engine — six connected n8n workflows spanning Google Maps sourcing, enrichment, email delivery, AI reply classification and CRM logging.",
        caption: "Six connected n8n workflows, from Google Maps sourcing to CRM-ready sales routing.",
      },
      { type: "heading", text: "The pipeline, stage by stage" },
      {
        type: "paragraph",
        text: "It starts with a source of potential prospects — a lead database, a website form, a CRM record, an event list or an approved data provider — captured as structured fields (company, website, industry, location, contact, size, source) so the automation has something to work with.",
      },
      {
        type: "paragraph",
        text: "From there, enrichment fills in what raw contact data usually leaves out: company description, employee range, technology signals, business model and likely pain points — turning \"ABC Company — email@example.com\" into a profile a rep can actually open a conversation with.",
      },
      {
        type: "paragraph",
        text: "AI qualification is where the model earns its place — not by making unrestricted decisions, but by producing structured output (a lead score, an industry match, a location match) that deterministic business rules then evaluate. A lead scoring above threshold and matching the target industry and market moves to qualified outreach; anything else goes to manual review. Combining AI interpretation with fixed rules is far more reliable than letting a model run the whole decision on its own.",
      },
      {
        type: "paragraph",
        text: "Website research feeds the same qualification step: the model reads a prospect's public site to identify what the company does, who it serves, and where the likely automation or efficiency gaps are — so outreach can open with something true about the business, not a generic pitch.",
      },
      {
        type: "pullquote",
        text: "The goal isn't to make messages sound artificially clever. The goal is to make them relevant.",
        cite: "GitzTech automation team",
      },
      {
        type: "paragraph",
        text: "Personalized outreach drafts are generated from that context under explicit guardrails — don't invent facts, don't claim a relationship that doesn't exist, don't make unsupported promises, stay on brand and stay compliant. AI assists personalization; it doesn't fabricate it.",
      },
      {
        type: "paragraph",
        text: "Follow-ups run on a schedule tied to conversation state rather than anyone's memory — an initial message, a follow-up after a few days of silence, a second follow-up after a week, and an automatic stop the moment a reply comes in, handing the thread to a human. Incoming replies are then classified by the model — interested, not interested, future opportunity, needs context, unclear — so the workflow can trigger the right next step instead of a rep re-reading every inbox message to work out what happened.",
      },
      {
        type: "paragraph",
        text: "The CRM update closes the loop automatically — lead status, score, last contact, reply summary, next action and assignment all written back without a rep manually re-entering what the workflow already knows.",
      },
      { type: "heading", text: "Human-in-the-loop, not full autonomy" },
      {
        type: "paragraph",
        text: "The best systems we build are selectively autonomous. Enrichment, research, formatting, duplicate detection, scoring assistance, draft generation, follow-up scheduling, reply categorization, CRM updates and notifications can run on their own. Important negotiations, complex objections, high-value opportunities, sensitive conversations and final strategic decisions stay with people. That balance is what makes the system trustworthy enough to actually run in production.",
      },
      { type: "heading", text: "Why n8n as the orchestration layer" },
      {
        type: "paragraph",
        text: "AI alone isn't an automation system — you still need triggers, APIs, conditions, databases and notifications wired together. n8n is where that architecture lives: CRM in, AI model out, email sent, CRM updated, team notified, calendar checked — all as one connected, adaptable workflow rather than a chain of scripts held together by hope.",
      },
      { type: "heading", text: "What separates a demo from a production system" },
      {
        type: "paragraph",
        text: "A workflow that looks impressive in a demo can still fail quietly in production. The engineering details that separate the two: duplicate detection so the same prospect doesn't re-enter the pipeline, respect for API and platform rate limits, error handling so one failed service doesn't silently drop a lead, intelligent retries on temporary failures, logging of important events, monitoring that flags a broken workflow before it costs a week of pipeline, and approval gates on anything sensitive enough to need a human sign-off.",
      },
      { type: "heading", text: "Where to start" },
      {
        type: "paragraph",
        text: "Businesses don't need to automate everything at once. The teams that get the most value start with the most repetitive, most measurable piece — lead enrichment and CRM updates — then layer in AI qualification and research, personalized outreach assistance, automated follow-ups, reply classification, and eventually more autonomous agents, measuring the return at each stage before adding the next.",
      },
      { type: "heading", text: "Common questions" },
      { type: "heading", text: "Can AI replace the sales team?" },
      {
        type: "paragraph",
        text: "No. AI is most effective on repetitive research, data processing and coordination. Relationships, negotiation, strategy and complex conversations stay with people.",
      },
      { type: "heading", text: "Does it work with our existing CRM?" },
      {
        type: "paragraph",
        text: "Yes — the workflow is designed around the CRM and tools a business already uses, rather than forcing a switch to new software.",
      },
      { type: "heading", text: "How much of the process should we automate first?" },
      {
        type: "paragraph",
        text: "Start with the repetitive, measurable tasks — enrichment, data sync, research assistance and notifications — and add more autonomy gradually as the workflow proves reliable.",
      },
      {
        type: "paragraph",
        text: "AI B2B lead generation isn't about sending more automated messages. It's about building a better sales process — one where data, AI, workflow automation, business rules and human expertise work together, so the team spends less time on repetitive admin and more time on the conversations that actually move deals forward.",
      },
    ],
    relatedArtworkIds: ["prj-b2b-leadgen", "prj-website-rag"],
    relatedStoryIds: [],
  },
];
