# Phase 4: Project Design Phase 2
- **Database Schema (Mongoose):**
  - `question`: String (Required, trimmed)
  - `category`: String (Default: 'General')
  - `aiAnswer`: String (Required)
  - `createdAt`: Date (Default: Date.now)
- **API Contracts:** Standardized JSON responses with `source` labels (`gemini_ai_generated` or `database_cache`).
