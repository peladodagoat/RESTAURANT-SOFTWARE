---
name: stop-at-4k-tokens
description: Stop building and notify the user when ~4k tokens remain in the context window
metadata:
  type: feedback
---

Stop building the project when approximately 4,000 tokens remain in the context window. At that point, tell the user where you stopped so they can continue in a new session.

**Why:** User explicitly requested this to avoid context overflow mid-build.
**How to apply:** Monitor context usage during large builds. When nearing the 4k token limit, stop writing code, summarize what was completed and what remains.
