# Phase 3: Project Design Phase 1
- **System Architecture:** Client -> Express Router -> Controller / Route Handler -> MongoDB Cache Check -> (Miss) Gemini 2.0 Flash -> Save to MongoDB -> Return JSON.
- **Data Flow:** Structured JSON payloads over HTTP with environment variable protection.
