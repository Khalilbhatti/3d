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
    relatedStoryIds: ["story-rag-ai-support-automation"],
  },
  {
    id: "story-rag-ai-support-automation",
    slug: "rag-ai-customer-support-automation",
    title: "RAG AI Customer Support: How Businesses Can Build Smarter Support Automation",
    dek: "How Retrieval-Augmented Generation, AI agents and n8n automation combine company knowledge, CRM integration and human escalation into support that's actually accurate.",
    author: "GitzTech",
    authorRole: "AI Automation Team",
    date: "2026-08-28",
    displayDate: "28 August 2026",
    readingTime: "10 min read",
    category: "AI Automation",
    seed: "story-rag-support-01",
    palette: { from: "#F0B429", via: "#2E4C8A", to: "#0A1327", ink: 0.18 },
    blocks: [
      {
        type: "paragraph",
        lead: true,
        text: "Customers expect answers quickly. Long response times can turn a simple question into a frustrating part of the experience — and for businesses, providing fast support at scale without hiring more agents is genuinely hard.",
      },
      {
        type: "paragraph",
        text: "Support teams have to search documentation, check customer records, understand conversation context, find the right policy and write a response that's both accurate and useful — for every question, every time. AI-powered support automation can create real value here, but connecting a generic chatbot to a business website isn't enough on its own.",
      },
      {
        type: "paragraph",
        text: "A language model can understand English extremely well without knowing anything about your company's latest pricing, internal procedures, product documentation or policies. Retrieval-Augmented Generation (RAG) closes that gap — it retrieves relevant information from an approved business knowledge base before the model generates a response. Combined with a workflow platform like n8n, a CRM, communication channels and human escalation, RAG becomes the foundation of a real support-automation system.",
      },
      { type: "heading", text: "Where traditional support breaks down" },
      {
        type: "paragraph",
        text: "A single support interaction can mean reading the message, searching documentation, looking up the customer, checking previous conversations, finding the right policy, writing a response and updating the support system — manageable for one conversation, a real workload across hundreds. And a large share of that workload is the same handful of questions repeated: opening hours, pricing, documentation, cancellation policy, delivery times, account resets, payment methods — exactly the kind of repetitive, well-defined question automation is good at, provided the answers stay accurate.",
      },
      { type: "heading", text: "Why a generic AI chatbot isn't enough" },
      {
        type: "paragraph",
        text: "A general-purpose model knows what refund policies typically look like — it doesn't know your company's current one. Ask it directly and it can produce a confident, professional-sounding answer that's simply wrong, and an incorrect support answer is often worse than no answer at all. That's why a support AI needs to be connected to controlled business knowledge, not left to answer from general training.",
      },
      { type: "heading", text: "What RAG actually is" },
      {
        type: "paragraph",
        text: "RAG stands for Retrieval-Augmented Generation. The idea is simple: retrieve relevant business information first, then ask the model to generate an answer using that information — rather than asking a question straight into a model and hoping it happens to know the answer. Grounding the response in retrieved, approved content is what keeps the answer specific to your business.",
      },
      {
        type: "image",
        artworkId: "prj-website-rag",
        alt: "GitzTech's Website-to-RAG AI Knowledge Base — an n8n pipeline that crawls a website and embeds its content into Pinecone as a semantic-search-ready AI knowledge base.",
        caption: "Crawl, chunk, embed, store — turning a business's own content into a retrievable knowledge base.",
      },
      { type: "heading", text: "Building the knowledge base" },
      {
        type: "paragraph",
        text: "It starts with collecting business knowledge from trusted sources — website pages, product documentation, help-centre articles, FAQs, internal guides, policies and approved PDFs. Raw pages rarely arrive retrieval-ready: navigation menus, footers, cookie notices and repeated headings get cleaned out, and what's left is split into smaller, meaningful chunks — a product overview, pricing, installation steps, troubleshooting, refund policy — each one focused enough to retrieve precisely.",
      },
      {
        type: "paragraph",
        text: "Each chunk is then converted into an embedding, a numerical representation of what the text means rather than the exact words it uses. That's what lets the system match a question like \"Can I get my money back if I cancel?\" to a refund-policy document without either sentence sharing the words \"money back\" — semantic retrieval, not keyword search. The embeddings are stored in a vector database alongside metadata — title, source, category, product, version, date updated — which matters once a knowledge base grows beyond a handful of documents.",
      },
      { type: "heading", text: "What happens when a customer asks a question" },
      {
        type: "paragraph",
        text: "A message like \"How long does delivery normally take?\" enters the workflow, gets converted into a retrieval query, and the vector search returns the relevant delivery-time documentation. That retrieved context — not the model's general knowledge — is what the AI uses to answer: \"Standard delivery normally takes 3–5 business days. Express orders typically arrive within 1–2 business days.\" The response is grounded in what the business actually documented, not in what a model assumes.",
      },
      {
        type: "pullquote",
        text: "\"I couldn't find enough information in our current documentation to answer that accurately. I'll connect you with our support team.\" That response is far better than a confident, invented one.",
        cite: "GitzTech automation team",
      },
      { type: "heading", text: "Knowing when to hand off to a human" },
      {
        type: "paragraph",
        text: "Not every question should be answered automatically. A mature system runs on escalation rules: high-confidence, well-documented questions get an automated response; low-confidence answers, sensitive requests, complaints and refund requests go to a human. \"AI replaces the support department\" is the wrong framing — the better one is AI handling repetitive questions while people handle the exceptions: complaints, disputes, sensitive account issues, complex technical cases, angry customers and anything that genuinely needs judgment.",
      },
      { type: "heading", text: "Where n8n fits" },
      {
        type: "paragraph",
        text: "RAG is one part of the system, not the whole thing. A real support automation still needs a customer message to arrive from WhatsApp, a website widget or email, get identified against the CRM, searched against the knowledge base, passed to the model, checked against confidence and business rules, then either answered directly or escalated — with the outcome written back to the CRM either way. n8n is the layer that wires all of that together as one workflow instead of a set of disconnected scripts.",
      },
      { type: "heading", text: "One knowledge layer, several channels" },
      {
        type: "paragraph",
        text: "Because the knowledge layer is built separately from the channel, the same RAG search can sit behind WhatsApp, a website chat widget and email support without being rebuilt three times. On WhatsApp — a channel customers are often already using — the workflow can identify the customer, pull conversation context, search the knowledge base, generate and send a response, log the interaction and escalate when needed, with the conversation visible in the CRM instead of trapped in a phone. On email, the same retrieval can either send a fully automated reply for simple questions or prepare a draft for a rep to approve on anything more complex, with urgency classified and the CRM updated either way.",
      },
      {
        type: "image",
        artworkId: "prj-whatsapp-assistant",
        alt: "A multimodal WhatsApp AI agent by GitzTech, accepting text, voice, image and PDF input and connected to a business's tools.",
        caption: "The same retrieval layer can sit behind WhatsApp, a website widget or email — one knowledge base, several channels.",
      },
      { type: "heading", text: "The knowledge base is the real project" },
      {
        type: "paragraph",
        text: "The quality of a RAG system depends entirely on the quality of what it retrieves — outdated or conflicting content means confidently wrong answers. That means treating the knowledge base as something with an owner, a review cadence tied to product and policy changes, version information on important documents, useful metadata, and a habit of testing common questions against the retrieval system directly. RAG is as much a knowledge-management project as it is an AI one.",
      },
      { type: "heading", text: "What to measure" },
      {
        type: "paragraph",
        text: "Message volume isn't the metric that matters. Resolution rate, escalation rate, first response time, customer satisfaction, answer accuracy against approved information, and support hours actually saved give a far more honest picture of whether the system is working.",
      },
      { type: "heading", text: "Mistakes worth avoiding" },
      {
        type: "paragraph",
        text: "The common failure modes are consistent: uploading everything instead of curating useful content, ignoring document quality and structure, shipping with no escalation path, running with no monitoring for failed workflows or degraded answers, giving the AI more system access than its task requires, and treating the model itself as the source of truth instead of the retrieval layer behind it.",
      },
      { type: "heading", text: "Where this is heading" },
      {
        type: "paragraph",
        text: "Support automation is moving past simple rule-based chatbots toward systems that retrieve customer context, search internal knowledge, create tickets, update CRM records, route complex cases and assist human reps directly rather than just answering FAQs. The goal was never AI that can do everything — it's AI that reliably does the right things, with people picking up everywhere judgment is genuinely required.",
      },
      {
        type: "paragraph",
        text: "RAG customer support is a practical way to combine a model's language ability with information your business actually trusts — retrieving the right answer before generating a response, rather than hoping the model already knows it. Combined with n8n, CRM integration, business rules and human escalation, it stops being a chatbot and becomes real support infrastructure: faster answers, consistent information, less repetitive work, and a support team with more time for the conversations that need a person.",
      },
      { type: "heading", text: "Common questions" },
      { type: "heading", text: "Does RAG eliminate AI hallucinations?" },
      {
        type: "paragraph",
        text: "No system can guarantee that — but a well-designed RAG architecture grounds responses in relevant business information and gives the model an escalation path for anything it doesn't have enough information to answer, which meaningfully reduces unsupported answers.",
      },
      { type: "heading", text: "Can it work with WhatsApp and a CRM?" },
      {
        type: "paragraph",
        text: "Yes — a WhatsApp conversation can trigger the same retrieval workflow, and customer context and conversation events can sync to the CRM through APIs or workflow integrations, so support history isn't stuck inside a messaging app.",
      },
      { type: "heading", text: "Is n8n required to build this?" },
      {
        type: "paragraph",
        text: "No. RAG can be implemented with different tooling, but n8n is useful for connecting the AI system to the business applications, APIs, databases and messaging platforms around it.",
      },
    ],
    relatedArtworkIds: ["prj-website-rag", "prj-whatsapp-assistant"],
    relatedStoryIds: ["story-ai-lead-gen-automation"],
  },
];
