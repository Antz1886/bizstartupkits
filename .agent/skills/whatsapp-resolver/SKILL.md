# Skill: WhatsApp Resolver Node

## Description
This skill enables AgentMesh™ workforce nodes to intercept, interpret, and resolve business tasks originating from WhatsApp, including text and voice messages. It focuses on high-fidelity task completion and autonomous CRM synchronization.

## Capabilities
*   **Voice-to-Action Protocol:** Transcribes and interprets WhatsApp voice notes to identify intent and required actions.
*   **Omni-Channel Routing:** Syncs WhatsApp conversations with centralized CRM silos (Salesforce, HubSpot, Zoho).
*   **Resolution Engine:** Handles end-to-end procedures such as booking appointments, updating lead status, or generating quotes directly from the chat interface.
*   **Automated Escalation:** Triggers human intervention when task complexity exceeds the 83% autonomous threshold or high-risk sentiment is detected.

## Operational Flow
1.  **Ingestion:** Node monitors incoming WhatsApp webhook.
2.  **Perception:** AI identifies if the message is text or voice. Voice notes are processed via Whisper-class models.
3.  **Context Retrieval:** Queries the "Digital Nervous System" for existing lead/customer data.
4.  **Resolution Logic:** Node executes the task (e.g., "Schedule a demo for tomorrow at 2 PM").
5.  **Synchronization:** CRM is updated via API with the outcome of the resolution.
6.  **Confirmation:** Node sends a resolution summary back to the user on WhatsApp.

## Governance & Compliance
*   **POPIA Compliance:** All South African data is processed according to POPIA standards.
*   **Zero-Retention Policy:** Sensitive personal data is not stored on intermediary nodes post-resolution.
*   **Audit Logging:** Every resolution attempt is logged for the Lead Reliability Engineer's oversight.
