# Transformation Plan: Bizstartupkits -> Agentic AI Workforce

## Goal
Transform the existing Bizstartupkits website into a high-conversion landing page for a premium "Agentic AI workforce" service, mirroring the high-performance model of AISSIST.IO.

## 1. Architectural & Aesthetic Shift
*   **Aesthetic:** "Mission Control" / "Technical Excellence".
    *   Darker theme (refining the current dark mode).
    *   Grid-based layouts with mono-spaced typography for technical data.
    *   Real-time status indicators and "Resolver Node" visualizations.
*   **Messaging:** Shift from "Consulting" (process-oriented) to "Resolution" (outcome-oriented).
    *   Core Philosophy: **"Stop Replying. Start Resolving."**

## 2. Component & Page Audit

### Landing Page Overhaul (`src/components/LandingPage.tsx`)
*   **[MODIFY] Hero Section:** 
    *   Headline: "Stop Replying. Start Resolving."
    *   Sub-headline: "Deploy a fleet of AgentMesh™ Resolvers that handle your business operations with 83% autonomous accuracy."
    *   Primary CTA: "Run Ghost Capacity Audit".
*   **[NEW] Ghost Capacity Calculator:**
    *   Interactive component estimating lost revenue.
    *   Inputs: Headcount, Average Salary, Manual Tasks/Day.
    *   Output: "Annual Inefficiency Leakage" (based on 40% baseline).
*   **[NEW] Comparison Table:**
    *   "Generic Chatbots" vs. "AgentMesh™ Workforce".
    *   Metrics: Resolution vs. Conversation, CRM Sync, Voice Support, Task Completion.
*   **[MODIFY] Service Showcases:**
    *   Replace generic AI sections with "AgentMesh™ Workforce" and "Custom Python Resolvers".
*   **[NEW] Pricing Section:**
    *   Tiered model based on "Resolution Nodes".
    *   Target: South African Market Rates (ZAR) for 2026.
*   **[MODIFY] B.A.T Model Pitch:**
    *   "Build AI Together" - Zero upfront fees, success-based partnership.

### Page Transformations
*   **[MODIFY/RENAME] `src/pages/CognitiveAutomation.tsx` -> `src/pages/AgentMeshWorkforce.tsx`**
    *   Focus: WhatsApp tasks, Voice-to-Action, CRM auto-sync.
*   **[MODIFY/RENAME] `src/pages/EnterpriseAISuite.tsx` -> `src/pages/CustomPythonResolvers.tsx`**
    *   Focus: Complex logic nodes built in Antigravity, technical API orchestration.
*   **[MODIFY/RENAME] `src/pages/EngagementModel.tsx` -> `src/pages/BATModel.tsx`**
    *   Focus: The "Build AI Together" pilot program details.

### Global Components
*   **[MODIFY] `src/components/Navbar.tsx`:** Update menu items to "Workforce", "Resolvers", "The B.A.T Model".
*   **[MODIFY] `src/components/Footer.tsx`:** Update branding and links.

## 3. Implementation Steps

### Phase 1: Planning & Foundation (Current)
*   [x] Generate `Transformation_Plan.md`.
*   [ ] Analyze `src/lib/utils.ts` and `src/index.css` for aesthetic consistency.

### Phase 2: Skill & Persona Definition
*   **[NEW] `.agent/skills/whatsapp-resolver/SKILL.md`:** Define how nodes handle WhatsApp voice and CRM sync.
*   **[MODIFY] `agents.md`:** Add "Lead Reliability Engineer" persona (83% resolution oversight).

### Phase 3: UI Development
*   Implement `GhostCapacityCalculator`.
*   Implement `ComparisonTable`.
*   Overhaul `LandingHero` and `PricingSection`.

### Phase 4: Route & Page Migration
*   Rename and refactor sub-pages.
*   Update `App.tsx` routing.

## 4. Verification Plan
*   **Visual Audit:** Ensure "Mission Control" aesthetic is consistent across all pages.
*   **Conversion Check:** Verify that "Ghost Capacity Audit" is the primary path for users.
*   **Logic Check:** Ensure the calculator reflects the 40% inefficiency baseline accurately.
