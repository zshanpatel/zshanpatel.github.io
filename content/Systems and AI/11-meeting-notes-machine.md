---
title: The Meeting Notes Machine
name: meeting-notes-machine
description: Record once, then let a pipeline transcribe, file and process every meeting into minutes, decisions and owned action items, with follow-up emails drafted and ready.
type: workflow
tags:
  - meetings
  - productivity
  - macos
  - automation
showDate: false
draft: false
---

> ⚠️ **macOS Only** — This pipeline uses `ffmpeg -f avfoundation` for audio capture and macOS-specific tooling (LaunchAgents, osascript, BlackHole, SwiftBar). It will not work on Linux or Windows without modification.

### 🎙️ Meetings That Write Their Own Minutes

Every meeting produces the same artefacts: decisions, action items, open questions. And every week those artefacts evaporate, because capturing them depends on whoever volunteers to take notes, and reconstructing them later costs an hour nobody has. The talk happened. The record is a shrug.

A pipeline fixes this permanently. Five stages, zero paid tools, fully automated.

---

## 🏗️ System Architecture

```
┌─────────────────┐    ┌──────────────┐    ┌────────────────────┐    ┌────────────────────┐    ┌──────────────────┐
│  MENUBAR BTN    │───▶│   CAPTURE    │───▶│    TRANSCRIBE      │───▶│       FILE         │───▶│     PROCESS      │
│  (SwiftBar)     │    │  (ffmpeg)    │    │  (google-genai)    │    │  (fswatch watcher) │    │  (Any Agent)     │
└─────────────────┘    └──────────────┘    └────────────────────┘    └────────────────────┘    └──────────────────┘
     │                    │                    │                      │                      │
  Click to            BlackHole 2ch       gemini-2.5-flash      ~/Vault/03 Vault/         claude-code /
  start/stop          16kHz stereo        → fallback lite       Meeting Notes/            codex /
  recording           WAV                  via API              YYYY-MM-DD_slug/          antigravity
```

**No local models. No paid subscriptions. Runs on your Mac with free-tier APIs.**

---

## 📋 Prerequisites (One-Time Setup)

| Tool           | Install Command                                                                                   | Purpose                                        |
| -------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Homebrew       | `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` | Package manager                                |
| ffmpeg         | `brew install ffmpeg`                                                                             | Audio capture via avfoundation                 |
| BlackHole 2ch  | `brew install --cask blackhole-2ch`                                                               | Route system audio (Zoom/Meet/Teams) to ffmpeg |
| fswatch        | `brew install fswatch`                                                                            | Watch folder for new recordings                |
| jq             | `brew install jq`                                                                                 | JSON parsing in shell                          |
| SwiftBar       | `brew install --cask swiftbar`                                                                    | Menubar button to start/stop recording         |
| icalBuddy*     | `brew install ical-buddy`                                                                         | *Optional* — pull attendee names from Calendar |
| python3        | (built-in)                                                                                        | Render scripts                                 |
| Gemini API Key | [Get free key](https://aistudio.google.com/apikey)                                                | Transcription (free tier: 1500 req/day)        |

> **icalBuddy** reads local Calendar.app data **without OAuth**. If installed, the watcher passes attendee names to the prompt for named speaker attribution. Skip if you don't use Calendar.app.

---

## 📁 Vault Structure (PARA-Compliant)

```
~/MeetingRecordings/                                    # 00 Inbox — raw audio drops here
~/Documents/DraftVault/03 Vault/Meeting Notes/          # 03 Vault — processed outputs (PARA)
  ├── 2026-08-21_supplier-call/
  │   ├── 2026-08-21_supplier-call.wav                  # Original audio
  │   ├── 2026-08-21_supplier-call.txt                  # Raw transcript (Gemini)
  │   ├── 2026-08-21_supplier-call.json                 # Structured extraction
  │   ├── 2026-08-21_supplier-call.md                   # Human-readable minutes
  │   └── 2026-08-21_supplier-call_followup_*.eml       # Ready-to-send emails
  └── ...
```

**Naming convention**: `YYYY-MM-DD_slug.{wav,txt,json,md,eml}` — date first so it sorts itself.

---

## ⚙️ Stage 1: CAPTURE — Record with ffmpeg + BlackHole

### One-Time Audio Setup
1. Install BlackHole: `brew install --cask blackhole-2ch`
2. Open **Audio MIDI Setup** (⌘+Space → "Audio MIDI Setup")
3. Click `+` → **Create Multi-Output Device**
4. Check **BlackHole 2ch** + **your speakers/headphones**
5. Right-click the new device → **Use This Device For Sound Output**
6. In Zoom/Meet/Teams: set **Microphone = BlackHole 2ch**, **Speaker = Multi-Output Device**

### Record Command
```bash
# Record system audio (Zoom/Meet) + your mic to stereo WAV @ 16kHz
ffmpeg -f avfoundation -i ":0" -ac 2 -ar 16000 \
  ~/MeetingRecordings/$(date '+%Y-%m-%d_%H-%M-%S').wav
```

**Device `:0`** = BlackHole 2ch (system audio). Verify with:
```bash
ffmpeg -f avfoundation -list_devices true -i ""
# Look for "BlackHole 2ch" at index 0
```

### Quick-Record Alias (add to `~/.zshrc`)
```bash
alias meetrec='ffmpeg -f avfoundation -i ":0" -ac 2 -ar 16000 ~/MeetingRecordings/$(date "+%Y-%m-%d_%H-%M-%S").wav'
# Usage: meetrec  → starts recording, Ctrl+C to stop
```

### Menubar Button — SwiftBar (Recommended)

Install SwiftBar: `brew install --cask swiftbar`

Create plugin file: `~/Library/Application Support/SwiftBar/Plugins/meeting_recorder.10s.sh`

```bash
#!/bin/bash
# SwiftBar plugin — click 🎙️ to start/stop recording
# Save as: ~/Library/Application Support/SwiftBar/Plugins/meeting_recorder.10s.sh
# Refresh: 10s (checks recording status every 10 seconds)

PID_FILE="/tmp/meeting_recorder.pid"
WAV_DIR="$HOME/MeetingRecordings"
mkdir -p "$WAV_DIR"

if [[ -f "$PID_FILE" ]] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    # Currently recording — show stop button
    echo "🎙️ REC | color=red"
    echo "---"
    echo "Stop Recording | bash=/bin/kill param1=-TERM param2=$(cat "$PID_FILE") terminal=false refresh=true"
    echo "Recording PID: $(cat "$PID_FILE")"
else
    # Idle — show start button
    echo "🎙️"
    echo "---"
    echo "Start Recording | bash=/usr/bin/env bash param1=-c param2='ffmpeg -f avfoundation -i \":0\" -ac 2 -ar 16000 \"$HOME/MeetingRecordings/$(date \"+%Y-%m-%d_%H-%M-%S\").wav\" & echo \$! > /tmp/meeting_recorder.pid' terminal=false refresh=true"
fi
```

```bash
chmod +x ~/Library/Application\ Support/SwiftBar/Plugins/meeting_recorder.10s.sh
# SwiftBar auto-loads; click 🎙️ in menubar to toggle recording
```

**Shows**: `🎙️` (idle) → `🎙️ REC` (recording, red). Click to toggle. PID tracked in `/tmp/meeting_recorder.pid`.

---

### Rough Notes Workflow (Granola-Style)

**Optional but recommended**: During the meeting, jot quick notes in a `.md` file. The watcher automatically picks these up and uses them to guide AI emphasis.

1. Create rough notes folder: `mkdir -p ~/MeetingRoughNotes`
2. During meeting, create: `~/MeetingRoughNotes/2026-08-21_client-call.md`
3. Write anything: keywords, decisions you want flagged, "action: Sarah send deck", "pricing concerns"
4. When pipeline runs, it reads this file and uses your notes to:
   - Prioritize topics you cared about
   - Extract commitments you highlighted
   - Structure output around your mental model
5. Your rough notes appear verbatim in the final `meeting.md` for reference

**Template hint**: Add `TEMPLATE: sales-discovery` (or `candidate-interview`, `board-meeting`, `project-planning`, `retro`, `client-checkin`) anywhere in rough notes to trigger structured output for that meeting type.

---

## ⚙️ Stage 2: TRANSCRIBE — Gemini API (Free Tier)

### Why Gemini?
- **Free tier**: 1,500 requests/day, 1M tokens/minute
- **Model**: `gemini-2.5-flash` (primary) → fallback `gemini-2.5-flash-lite` — fast, accurate, handles 1hr+ audio
- **No local GPU/RAM needed** — runs in cloud, returns text
- **Diarization support** — can identify speakers if prompted
- **SDK**: `google-genai` (GA, v2.18.1+) — pin `<3.0.0`

### Transcription Script (`~/scripts/transcribe_gemini.py`)
```python
#!/usr/bin/env python3
"""
Transcribe audio using Gemini API (google-genai SDK).
Usage: python3 transcribe_gemini.py input.wav output.txt
"""
import sys
import os
from google import genai
from google.genai import types

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    print("ERROR: Set GEMINI_API_KEY environment variable", file=sys.stderr)
    sys.exit(1)

if len(sys.argv) != 3:
    print("Usage: python3 transcribe_gemini.py input.wav output.txt", file=sys.stderr)
    sys.exit(1)

audio_path, output_path = sys.argv[1], sys.argv[2]

client = genai.Client(api_key=API_KEY)

print(f"Uploading {audio_path}...")
audio_file = client.files.upload(file=audio_path)

# Wait for file to be ready
import time
while audio_file.state.name == "PROCESSING":
    time.sleep(1)
    audio_file = client.files.get(name=audio_file.name)

prompt = """Transcribe this meeting audio with speaker diarization.

OUTPUT FORMAT:
- Each utterance on its own line
- Format: [MM:SS] Speaker N: text
- If speakers distinguishable, use consistent labels (Speaker 1, Speaker 2, etc.)
- If speaker identity known from context, use names
- Include timestamps at start of each speaker turn
- Mark unclear audio as [inaudible]
- Mark overlapping speech as [overlapping]
- Output plain text only, no markdown

EXAMPLE:
[00:12] Speaker 1: Let's start with the budget review.
[00:18] Speaker 2: Sure, I've prepared the Q3 numbers.
[00:25] Speaker 1: Great, walk us through the variance.
[00:30] Speaker 2: Revenue is up 15% but costs..."

CRITICAL:
- Every speaker turn MUST have a timestamp
- Maintain consistent speaker labels throughout
- Do not summarize — full verbatim transcript needed for downstream processing"""

# Try primary model, fallback to lite
for model_name in ["gemini-2.5-flash", "gemini-2.5-flash-lite"]:
    try:
        print(f"Transcribing with {model_name}...")
        response = client.models.generate_content(
            model=model_name,
            contents=[prompt, audio_file],
            config=types.GenerateContentConfig(temperature=0)
        )
        break
    except Exception as e:
        print(f"{model_name} failed: {e}, trying fallback...")
        if model_name == "gemini-2.5-flash-lite":
            raise

with open(output_path, "w") as f:
    f.write(response.text)

print(f"Done → {output_path}")
```

### Setup
```bash
chmod +x ~/scripts/transcribe_gemini.py
echo 'export GEMINI_API_KEY="your-key-here"' >> ~/.zshrc
source ~/.zshrc
pip3 install "google-genai<3.0.0"
```

---

## ⚙️ Stage 3: FILE — Auto-Organize into Vault

### Watcher Script (`~/scripts/meeting_watcher.sh`)
```bash
#!/bin/bash
# Watches ~/MeetingRecordings for new .wav files, runs full pipeline with context enrichment

set -euo pipefail

WATCH_DIR="$HOME/MeetingRecordings"
VAULT_DIR="$HOME/Documents/DraftVault/03 Vault/Meeting Notes"
SCRIPTS_DIR="$HOME/scripts"
ROUGH_NOTES_DIR="$HOME/MeetingRoughNotes"  # optional: user drops .md rough notes here

mkdir -p "$WATCH_DIR"
mkdir -p "$VAULT_DIR"
mkdir -p "$ROUGH_NOTES_DIR"

echo "[$(date)] Meeting Notes Machine watcher started"
echo "Watching: $WATCH_DIR"
echo "Vault: $VAULT_DIR"

# Helper: get attendees from icalBuddy for today's events matching the meeting slug
get_attendees() {
    local slug="$1"
    if command -v icalBuddy &> /dev/null; then
        local keywords=$(echo "$slug" | sed 's/_/ /g' | sed 's/-/ /g')
        icalBuddy -n -iep "title,attendees" -b "" -nc -nrd -df "%Y-%m-%d" eventsToday 2>/dev/null | \
        grep -i -A5 "$keywords" | \
        grep "attendees:" | \
        head -1 | \
        sed 's/.*attendees: //' | \
        sed 's/, /,/g' || echo ""
    else
        echo ""
    fi
}

# Helper: detect meeting type from slug/calendar
detect_meeting_type() {
    local slug="$1"
    local lower=$(echo "$slug" | tr '[:upper:]' '[:lower:]')
    
    case "$lower" in
        *client*|*call*|*pitch*|*demo*|*discovery*) echo "client-call" ;;
        *sync*|*standup*|*stand-up*|*daily*|*weekly*|*team*) echo "internal-sync" ;;
        *board*|*investor*) echo "board" ;;
        *interview*|*candidate*|*screen*) echo "interview" ;;
        *discovery*|*requirements*) echo "discovery" ;;
        *planning*|*sprint*|*roadmap*) echo "planning" ;;
        *retro*|*retrospective*) echo "retro" ;;
        *1:1*|*one-on-one*|*1on1*) echo "1:1" ;;
        *) echo "ad-hoc" ;;
    esac
}

# Helper: find previous meeting context
get_prev_context() {
    local slug="$1"
    local prev_dir=$(find "$VAULT_DIR" -maxdepth 1 -type d -name "*${slug%%-*}*" 2>/dev/null | sort -r | head -1)
    if [[ -n "$prev_dir" && -f "$prev_dir/meeting.json" ]]; then
        python3 -c "
import json, sys
with open('$prev_dir/meeting.json') as f:
    data = json.load(f)
carryover = [a for a in data.get('action_items', []) if a.get('owner') != 'UNASSIGNED']
decisions = data.get('decisions', [])[:3]
print('PREV_DECISIONS:' + '; '.join([d['decision'] for d in decisions]))
print('CARRYOVER_ACTIONS:' + '; '.join([f\"{a['id']}: {a['task']} ({a['owner']})\" for a in carryover]))
" 2>/dev/null || echo ""
    else
        echo ""
    fi
}

fswatch -0 -e ".*" -i "\\.wav$" "$WATCH_DIR" | while read -d "" wav_file; do
    base=$(basename "$wav_file" .wav)
    project_dir="$VAULT_DIR/$base"
    
    mkdir -p "$project_dir"
    
    # Copy audio to project folder
    cp "$wav_file" "$project_dir/"
    
    # 1. Transcribe with speaker diarization
    echo "[$(date)] Transcribing $base..."
    python3 "$SCRIPTS_DIR/transcribe_gemini.py" "$wav_file" "$project_dir/$base.txt"
    
    # 2. Gather context
    echo "[$(date)] Gathering context for $base..."
    
    # Rough notes (optional)
    rough_notes_path=""
    rough_notes_content=""
    if [[ -f "$ROUGH_NOTES_DIR/$base.md" ]]; then
        rough_notes_path="$ROUGH_NOTES_DIR/$base.md"
        rough_notes_content=$(cat "$rough_notes_path")
        echo "  Found rough notes: $rough_notes_path"
    fi
    
    # Attendees from calendar
    attendees=$(get_attendees "$base")
    if [[ -n "$attendees" ]]; then
        echo "  Found attendees: $attendees"
    else
        attendees="[extract from transcript]"
    fi
    
    # Meeting type detection
    meeting_type=$(detect_meeting_type "$base")
    echo "  Meeting type: $meeting_type"
    
    # Previous meeting context
    prev_context=$(get_prev_context "$base" "$attendees")
    if [[ -n "$prev_context" ]]; then
        echo "  Found previous meeting context"
    fi
    
    # 3. Process with agent (pass all context)
    echo "[$(date)] Processing with agent..."
    "$SCRIPTS_DIR/process_with_agent.sh" \
        "$project_dir/$base.txt" \
        "$project_dir" \
        "$rough_notes_path" \
        "$attendees" \
        "$meeting_type" \
        "$prev_context"
    
    # 4. Notify (macOS native)
    osascript -e "display notification \"Meeting processed: $base\" with title \"Meeting Notes Machine\""
done
```

### Make it executable
```bash
chmod +x ~/scripts/meeting_watcher.sh
```

---

## ⚙️ Stage 4: PROCESS — Agent-Agnostic Extraction (Granola-Inspired)

The prompt is modeled on **Granola's human-in-the-loop approach**: you jot rough notes during the meeting; AI enhances them with transcript context. Output includes executive summary, structured decisions, verified action items, commitments, risks, and draft follow-ups.

### Universal Processing Prompt (`~/scripts/meeting_prompt.md`)
```markdown
# ROLE
You are an expert meeting analyst. You work ONLY from the provided transcript and any user-supplied rough notes. You never invent, infer motives, or smooth over disagreement. You attribute every claim to a speaker. You flag uncertainty explicitly.

# INPUTS
- **Transcript file**: {{TRANSCRIPT_PATH}} (with timestamps [MM:SS] and speaker labels)
- **User rough notes** (optional): {{ROUGH_NOTES_PATH}} — user's in-meeting jottings; use as guidance for what to emphasize
- **Attendees**: {{ATTENDEES}} — from calendar (icalBuddy) or transcript extraction; format: "Name (role/org)"
- **Meeting type**: {{MEETING_TYPE}} — one of: client-call, internal-sync, board, interview, discovery, planning, retro, 1:1, ad-hoc
- **My role**: {{MY_ROLE}} — your role in this meeting (e.g., "founder", "product lead", "sales")
- **Previous meeting context** (optional): {{PREV_CONTEXT}} — key decisions/actions from last meeting with same attendees
- **Audience for output**: {{AUDIENCE}} — team / client / both
- **Tone for follow-ups**: {{FOLLOWUP_TONE}} — 2 lines describing your voice/style

# OUTPUT — Write these files to {{OUTPUT_DIR}}:

## 1. {{OUTPUT_DIR}}/meeting.json (structured, machine-readable)
```json
{
  "meta": {
    "date": "{{DATE}}",
    "slug": "{{SLUG}}",
    "meeting_type": "{{MEETING_TYPE}}",
    "duration_minutes": 0,
    "attendees": [{"name": "...", "role": "...", "org": "...", "speaker_label": "Speaker 1"}],
    "my_role": "{{MY_ROLE}}"
  },
  "executive_summary": "3-5 sentence TL;DR covering: purpose, key outcomes, critical decisions, top 3 action items",
  "key_topics": [
    {"topic": "...", "summary": "...", "speakers": ["..."], "timestamp_range": "[MM:SS-MM:SS]", "importance": "high|medium|low"}
  ],
  "decisions": [
    {"decision": "...", "maker": "...", "basis": "...", "alternatives_considered": ["..."], "dissent": "none|noted", "timestamp": "[MM:SS]"}
  ],
  "action_items": [
    {"id": "A1", "task": "...", "owner": "...", "deadline": "...", "trigger": "...", "context": "...", "verified": true|false, "source_timestamp": "[MM:SS]"}
  ],
  "commitments": [
    {"speaker": "...", "commitment": "...", "type": "explicit|implied|conditional", "context": "...", "timestamp": "[MM:SS]"}
  ],
  "open_questions": [
    {"question": "...", "raised_by": "...", "context": "...", "blocking": true|false, "timestamp": "[MM:SS]"}
  ],
  "risks_flags": [
    {"risk": "...", "raised_by": "...", "severity": "high|medium|low", "mitigation": "...", "timestamp": "[MM:SS]"}
  ],
  "followup_emails": [
    {"to": "...", "subject": "...", "body": "...", "attachments_suggested": ["..."]}
  ],
  "next_meeting_prep": {
    "suggested_agenda": ["..."],
    "carryover_actions": ["A1", "A2"],
    "info_needed": ["..."]
  }
}
```

## 2. {{OUTPUT_DIR}}/meeting.md (human-readable, Obsidian-ready)
```markdown
---
date: {{DATE}}
meeting_type: {{MEETING_TYPE}}
attendees: [{{ATTENDEES}}]
my_role: {{MY_ROLE}}
tags: [meeting, {{MEETING_TYPE}}, {{DATE}}]
---

# Meeting: {{DATE}} — {{SLUG}}

> **Executive Summary**  
> {{executive_summary}}

## 🎯 Key Topics Discussed
| Topic | Summary | Speakers | Time | Importance |
|-------|---------|----------|------|------------|
| ... | ... | ... | [MM:SS-MM:SS] | 🔴/🟡/🟢 |

## ✅ Decisions Made
| # | Decision | Maker | Basis | Alternatives | Dissent | Time |
|---|----------|-------|-------|--------------|---------|------|
| 1 | ... | ... | ... | ... | none/noted | [MM:SS] |

## 📋 Action Items (Verified)
| ID | Task | Owner | Deadline | Trigger | Context | Verified | Source |
|----|------|-------|----------|---------|---------|----------|--------|
| A1 | ... | ... | ... | ... | ... | ✅/❌ | [MM:SS] |

> **Verification Required**: Items marked ❌ need your review — AI could not confirm owner/deadline from transcript.

## 🤝 Commitments Tracked
| Speaker | Commitment | Type | Context | Time |
|---------|------------|------|---------|------|
| ... | ... | explicit/implied/conditional | ... | [MM:SS] |

> **Commitment Types**: explicit = "I will...", implied = context suggests ownership, conditional = "if X then I'll Y"

## ❓ Open Questions
| Question | Raised By | Context | Blocking? | Time |
|----------|-----------|---------|-----------|------|
| ... | ... | ... | 🔴/⚪ | [MM:SS] |

## ⚠️ Risks & Flags
| Risk | Raised By | Severity | Mitigation | Time |
|------|-----------|----------|------------|------|
| ... | ... | 🔴/🟡/🟢 | ... | [MM:SS] |

## 📧 Follow-Up Emails (Draft)
### To: {{email_1_to}}
**Subject:** {{email_1_subject}}

{{email_1_body}}

> *Suggested attachments: {{attachments_suggested}}*

---

### To: {{email_2_to}}
**Subject:** {{email_2_subject}}

{{email_2_body}}

---

## 🔄 Next Meeting Prep
**Suggested Agenda:**
- {{agenda_1}}
- {{agenda_2}}

**Carryover Actions:** {{carryover_actions}}

**Info Needed Before Next Meeting:**
- {{info_1}}
- {{info_2}}

## 📝 User Rough Notes (Reference)
{{rough_notes_content}}

---

## 🔗 Transcript Reference
Full transcript: `{{SLUG}}.txt`  
Searchable in Obsidian with timestamps [MM:SS] and speaker labels.
```

# RULES — Non-Negotiable

1. **Source every claim**: Every decision, action, commitment, question, risk MUST include a `[MM:SS]` timestamp from the transcript.

2. **Speaker attribution is mandatory**: 
   - Use calendar attendee names when {{ATTENDEES}} provided
   - Fall back to "Speaker 1/2/3" from transcript diarization
   - NEVER say "the team agreed" — name who said what

3. **Action item rigor**:
   - Extract ONLY explicit commitments ("I will send...", "Sarah to review...")
   - For implied commitments: mark `verified: false` and flag in Verification Required section
   - Every action MUST have: specific deliverable (not topic), named owner, deadline OR trigger event
   - If no owner named → `owner: "UNASSIGNED"`, `verified: false`
   - If no deadline → `deadline: "NO_DEADLINE_SET"`, `verified: false`
   - `trigger` field: what kicks off this action (e.g., "after design review", "by Friday EOD", "when budget approved")

4. **Decision capture**:
   - Record what was decided, who made the call, on what basis
   - Note alternatives discussed (even if rejected)
   - Flag any dissent or concerns raised

5. **Commitment tracking**:
   - Explicit: "I will...", "We'll...", "My action is..."
   - Implied: Context suggests ownership but not stated
   - Conditional: "If budget approved, I'll hire..."
   - All need timestamps

6. **User rough notes integration**:
   - If {{ROUGH_NOTES_PATH}} exists, read it
   - User's notes guide emphasis — topics they noted get deeper coverage
   - Show user's original notes in the "User Rough Notes" section
   - AI additions are distinct from user input

7. **Previous meeting context**:
   - If {{PREV_CONTEXT}} provided, check carryover actions
   - Note which previous actions were completed/blocked
   - Reference prior decisions if relevant

8. **Meeting type awareness** (adapt structure):
   - **client-call**: Emphasize decisions, commitments, next steps, relationship signals
   - **internal-sync**: Focus on blockers, alignment, resource needs
   - **board**: Formal decisions, governance items, metrics, approvals
   - **interview**: Candidate signals, concerns, hire/no-hire rationale
   - **discovery**: Pain points, requirements, budget/timeline, decision criteria
   - **planning**: Scope, milestones, owners, dependencies, risks
   - **retro**: What worked, what didn't, specific improvements with owners
   - **1:1**: Career growth, blockers, feedback, commitments both ways
   - **ad-hoc**: Capture everything; structure lightly

9. **Output quality**:
   - Executive summary: 3-5 sentences, decision-oriented
   - No fluff, no hedge words ("seems", "appears", "might")
   - If transcript has [inaudible] gaps, note impact on extraction
   - If speakers unclear, note attribution uncertainty

10. **Follow-up emails**:
    - One per external attendee (client, partner, candidate)
    - Internal attendees get summary via team channel, not email
    - Tone: {{FOLLOWUP_TONE}}
    - Content: Only what concerns that recipient
    - Include specific commitments THEY made
    - Suggest attachments if referenced in meeting

# TEMPLATE HINTS (Optional — if user wants specific format)

If user provides a template name in rough notes (e.g., "TEMPLATE: sales-discovery"), adapt output structure to match. Built-in template types:
- `sales-discovery`: Pain, impact, champion, timeline, budget, next steps
- `candidate-interview`: Role fit, technical signal, culture, concerns, recommendation
- `board-meeting`: Approvals, metrics, governance, risk, strategy
- `project-planning`: Scope, milestones, resources, dependencies, risks
- `retro`: Continue, start, stop, action items with owners
- `client-checkin`: Health, blockers, expansion signals, action items
```

### Agent Runner (`~/scripts/process_with_agent.sh`)
```bash
#!/bin/bash
# Runs the processing prompt with any available agent.
# Priority: claude-code > codex > antigravity > manual
# Usage: process_with_agent.sh <transcript> <output_dir> <rough_notes_path> <attendees> <meeting_type> <prev_context>

set -euo pipefail

TRANSCRIPT="$1"
OUTPUT_DIR="$2"
ROUGH_NOTES_PATH="${3:-}"
ATTENDEES="${4:-}"
MEETING_TYPE="${5:-ad-hoc}"
PREV_CONTEXT="${6:-}"
PROMPT_FILE="$HOME/scripts/meeting_prompt.md"

if [[ ! -f "$TRANSCRIPT" ]]; then
    echo "ERROR: Transcript not found: $TRANSCRIPT" >&2
    exit 1
fi

if [[ ! -f "$PROMPT_FILE" ]]; then
    echo "ERROR: Prompt template not found: $PROMPT_FILE" >&2
    exit 1
fi

# Read rough notes content if provided
ROUGH_NOTES_CONTENT=""
if [[ -n "$ROUGH_NOTES_PATH" && -f "$ROUGH_NOTES_PATH" ]]; then
    ROUGH_NOTES_CONTENT=$(cat "$ROUGH_NOTES_PATH")
fi

# Read prompt template
PROMPT=$(cat "$PROMPT_FILE")

# Replace placeholders
PROMPT="${PROMPT/{{TRANSCRIPT_PATH}}/$TRANSCRIPT}"
PROMPT="${PROMPT/{{OUTPUT_DIR}}/$OUTPUT_DIR}"
PROMPT="${PROMPT/{{DATE}}/$(date '+%Y-%m-%d')}"
PROMPT="${PROMPT/{{SLUG}}/$(basename "$OUTPUT_DIR")}"
PROMPT="${PROMPT/{{ROUGH_NOTES_PATH}}/$ROUGH_NOTES_PATH}"
PROMPT="${PROMPT/{{ROUGH_NOTES_CONTENT}}/$ROUGH_NOTES_CONTENT}"
PROMPT="${PROMPT/{{ATTENDEES}}/$ATTENDEES}"
PROMPT="${PROMPT/{{MEETING_TYPE}}/$MEETING_TYPE}"
PROMPT="${PROMPT/{{MY_ROLE}}/$(whoami)}"
PROMPT="${PROMPT/{{AUDIENCE}}/team}"
PROMPT="${PROMPT/{{FOLLOWUP_TONE}}/Professional, concise, action-oriented. Direct but warm.}"
PROMPT="${PROMPT/{{PREV_CONTEXT}}/$PREV_CONTEXT}"

# Try agents in order
if command -v claude &> /dev/null; then
    echo "Using claude-code..."
    echo "$PROMPT" | claude -p --output-format json
elif command -v codex &> /dev/null; then
    echo "Using codex..."
    echo "$PROMPT" | codex exec
elif command -v antigravity &> /dev/null; then
    echo "Using antigravity..."
    echo "$PROMPT" | antigravity run
else
    echo "No agent CLI found. Paste this into your agent:"
    echo ""
    echo "========================================="
    echo "$PROMPT"
    echo "========================================="
    echo ""
    echo "Output directory: $OUTPUT_DIR"
    exit 1
fi
```

```bash
chmod +x ~/scripts/process_with_agent.sh
```

---

## ⚙️ Stage 5: DISTRIBUTE — Outputs Ready to Ship

The pipeline produces:

| File                     | Purpose                | Next Step                                  |
| ------------------------ | ---------------------- | ------------------------------------------ |
| `meeting.md`             | Human-readable minutes | Open in Obsidian / share                   |
| `meeting.json`           | Structured data        | JSON + Markdown in Vault (searchable)      |
| `meeting_followup_*.eml` | Draft emails           | Open in Mail.app / send via `gws` CLI      |

> **Email sending**: The pipeline outputs `.eml` files. You send them via `gws gmail send` (if using gws CLI), double-click to open in Mail.app, or your preferred mail client. No auto-send.

---

## 🤖 Autopilot: Run Watcher as Background Service

### What the Watcher Does

The **watcher** (`meeting_watcher.sh`) is a shell script that runs continuously in the background:

1. **`fswatch`** monitors `~/MeetingRecordings` for new `.wav` files (null-delimited, efficient)
2. **When a file appears**, the loop runs:
   - Transcribes via Gemini API (`transcribe_gemini.py`)
   - Processes with your agent (`process_with_agent.sh` → claude-code/codex/antigravity)
   - Writes `meeting.md`, `meeting.json`, `meeting_followup_*.eml` to Vault
   - Sends macOS native notification via `osascript`
3. **`LaunchAgent`** (macOS service manager) keeps it alive:
   - `RunAtLoad` → starts at login
   - `KeepAlive` → restarts if it crashes
   - Logs to `/tmp/meeting-notes.log` and `/tmp/meeting-notes.err`

You `launchctl load` it **once**; it runs forever. No manual start needed after reboot.

### LaunchAgent (`~/Library/LaunchAgents/com.user.meeting-notes.plist`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key><string>com.user.meeting-notes</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>/Users/USERNAME/scripts/meeting_watcher.sh</string>
    </array>
    <key>RunAtLoad</key><true/>
    <key>KeepAlive</key><true/>
    <key>StandardOutPath</key><string>/tmp/meeting-notes.log</string>
    <key>StandardErrorPath</key><string>/tmp/meeting-notes.err</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>GEMINI_API_KEY</key><string>YOUR_KEY_HERE</string>
        <key>PATH</key><string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
    </dict>
</dict>
</plist>
```

> Replace `USERNAME` (your macOS short username) and `YOUR_KEY_HERE` (Gemini API key) before loading.

### Load/Unload
```bash
# Edit the plist first, then:
launchctl load ~/Library/LaunchAgents/com.user.meeting-notes.plist
# launchctl unload ~/Library/LaunchAgents/com.user.meeting-notes.plist
```

### View Logs
```bash
tail -f /tmp/meeting-notes.log      # Watcher output
tail -f /tmp/meeting-notes.err      # Errors
```

### Verify It's Running
```bash
launchctl list | grep meeting-notes
# Should show: PID  Status  Label
# e.g.,  12345  0  com.user.meeting-notes
```

---

## 📋 Setup Checklist (tasks.md)

Create `~/Documents/DraftVault/03 Vault/Meeting Notes/tasks.md` and work through each:

```markdown
# Meeting Notes Machine — Setup Tasks

## Prerequisites
- [ ] Homebrew installed
- [ ] `brew install ffmpeg fswatch jq`
- [ ] `brew install --cask blackhole-2ch`
- [ ] `brew install --cask swiftbar`
- [ ] `brew install ical-buddy`  # optional, for speaker names from Calendar
- [ ] BlackHole configured in Audio MIDI Setup
- [ ] Multi-Output Device created (BlackHole + Speakers)
- [ ] Zoom/Meet/Teams audio settings updated
- [ ] Gemini API key obtained (free tier)
- [ ] `export GEMINI_API_KEY="..."` in ~/.zshrc

## Scripts
- [ ] Create ~/scripts/ directory
- [ ] Save transcribe_gemini.py → ~/scripts/
- [ ] Save meeting_watcher.sh → ~/scripts/
- [ ] Save process_with_agent.sh → ~/scripts/
- [ ] Save meeting_prompt.md → ~/scripts/
- [ ] `chmod +x` all .sh and .py files
- [ ] Test: `python3 ~/scripts/transcribe_gemini.py test.wav test.txt`

## Vault Structure
- [ ] `mkdir -p ~/MeetingRecordings`
- [ ] `mkdir -p ~/MeetingRoughNotes`  # for in-meeting rough notes
- [ ] `mkdir -p ~/Documents/DraftVault/03\ Vault/Meeting\ Notes`
- [ ] Copy tasks.md to Meeting Notes folder

## SwiftBar Menubar Button
- [ ] Create plugin: `~/Library/Application Support/SwiftBar/Plugins/meeting_recorder.10s.sh`
- [ ] `chmod +x` the plugin
- [ ] Verify 🎙️ appears in menubar

## Automation (LaunchAgent)
- [ ] Copy plist to `~/Library/LaunchAgents/com.user.meeting-notes.plist`
- [ ] Edit: replace USERNAME + YOUR_KEY_HERE
- [ ] `launchctl load ~/Library/LaunchAgents/com.user.meeting-notes.plist`
- [ ] Verify: `launchctl list | grep meeting-notes`
- [ ] Watch logs: `tail -f /tmp/meeting-notes.log`

## First Run
- [ ] Click 🎙️ in menubar → Start Recording
- [ ] Speak for 30 seconds
- [ ] Click 🎙️ REC → Stop Recording
- [ ] Watch logs for processing
- [ ] Open generated .md in Obsidian
- [ ] Open .eml files in Mail.app / send via gws CLI

## Rough Notes Test (Granola-Style)
- [ ] Create `~/MeetingRoughNotes/2026-08-21_test.md` with: "action: send follow-up email"
- [ ] Record test meeting
- [ ] Verify rough notes appear in output and guide AI emphasis

## Agent Integration
- [ ] Verify claude-code / codex / antigravity CLI works
- [ ] Test process_with_agent.sh manually
- [ ] Customize meeting_prompt.md with your role/tone
```

---

## 🔧 Customization Points

| What | Where |
|------|-------|
| Your role/tone | Edit `meeting_prompt.md` |
| Transcription model | Change `gemini-2.5-flash` in `transcribe_gemini.py` |
| Output format | Edit `meeting_prompt.md` JSON/MD templates |
| Notification style | Edit `meeting_watcher.sh` osascript line |
| Recording trigger | SwiftBar menubar (default) / Hammerspoon / Shortcuts.app |
| Speaker names | Install `ical-buddy` for Calendar attendee lookup |

---

## 🎯 Usage Flow (Daily)

```bash
# 1. Join meeting → set audio to Multi-Output Device
# 2. Start recording (click menubar 🎙️):
#    → Shows 🎙️ REC (red) while recording
# 3. Meeting ends → click 🎙️ REC to stop
# 4. Walk away. Pipeline runs automatically:
#    → Transcribes via Gemini (flash → fallback lite)
#    → Extracts minutes/decisions/actions via your agent
#    → Files everything in ~/Documents/DraftVault/03 Vault/Meeting Notes/
#    → macOS notification appears

# 5. Review & send:
open ~/Documents/DraftVault/03\ Vault/Meeting\ Notes/2026-08-21_client-call/meeting.md
open ~/Documents/DraftVault/03\ Vault/Meeting\ Notes/2026-08-21_client-call/meeting_followup_*.eml
# Send via: gws gmail send ...  OR  double-click .eml → Mail.app → Send
```

---

## 🧪 Test Without a Meeting

```bash
# Generate 30s test tone
ffmpeg -f lavfi -i "sine=frequency=440:duration=30" -ar 16000 ~/MeetingRecordings/test_$(date '+%Y-%m-%d_%H-%M-%S').wav

# Watch the pipeline process it
tail -f /tmp/meeting-notes.log
```

---

## ❓ Troubleshooting

| Issue | Fix |
|-------|-----|
| "No audio captured" | Check BlackHole is selected in Audio MIDI Setup + meeting app; verify `ffmpeg -f avfoundation -list_devices true -i ""` shows BlackHole at index 0 |
| "Gemini quota exceeded" | Free tier: 1500 req/day. Wait or upgrade. |
| "Agent not found" | Install claude-code (`npm i -g @anthropic/claude-code`) or codex (`npm i -g @openai/codex`) or antigravity |
| "Permission denied" | `chmod +x` on all scripts; check LaunchAgent PATH includes `/opt/homebrew/bin` |
| "LaunchAgent not running" | `launchctl list | grep meeting-notes` → check `/tmp/meeting-notes.err` |
| "SwiftBar plugin not showing" | Check `~/Library/Application Support/SwiftBar/Plugins/meeting_recorder.10s.sh` exists + executable; restart SwiftBar |
| "Transcript empty" | Audio file valid? `file ~/MeetingRecordings/*.wav`; check Gemini API key in plist + `~/.zshrc` |
| "Speaker names not showing" | Install `ical-buddy` (`brew install ical-buddy`); ensure Calendar.app has the meeting with attendees |

---

## 🔗 Related

- **The hands underneath**: [[04 Blog Content/Systems and AI/00-cli|Command Anything]] — why folders + CLI beat chat
- **Pair with**: [[04 Blog Content/Systems and AI/02-family-problem-solving|The Family Discussion Organiser]]
- **Vocabulary**: [[Lexicon/human-in-the-loop|human in the loop]], [[Lexicon/knowledge-base|knowledge base]]

---

## ✅ Action Checklist (Condensed)

- [ ] Install deps + BlackHole + SwiftBar + configure audio
- [ ] Get Gemini API key (free)
- [ ] Deploy scripts to `~/scripts/`
- [ ] Create Vault folders + tasks.md
- [ ] Install SwiftBar plugin → `~/Library/Application Support/SwiftBar/Plugins/`
- [ ] Load LaunchAgent
- [ ] Click 🎙️ on one real meeting
- [ ] Review output, send one follow-up email (gws CLI or Mail.app)
- [ ] Iterate prompt for your voice/style

---

> **📋 All scripts are embedded above** — copy directly from the code blocks. No separate download needed.