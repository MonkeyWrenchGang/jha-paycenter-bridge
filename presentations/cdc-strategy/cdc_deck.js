const pptxgen = require("pptxgenjs");

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";

  // ── COLORS — Jack Henry brand palette ───────────────────────────────────────
  const navy      = "06185F";  // Heritage Navy  — dark bgs, primary text
  const navyMid   = "06185F";  // Heritage Navy  — reuse for mid-dark elements
  const teal      = "085CE5";  // Vibrant Cobalt — primary accent
  const tealDark  = "06185F";  // Heritage Navy  — dark bars / bottoms
  const tealLight = "76DCFD";  // Tech Blue      — light accent
  const red       = "C62828";  // keep semantic red
  const redLight  = "FFEBEE";
  const green     = "1B5E20";
  const greenMid  = "2E7D32";
  const greenLight= "E8F5E9";
  const amber     = "E65100";
  const amberLight= "FFF3E0";
  const purple    = "6A1B9A";
  const purpleLight="F3E5F5";
  const ibmBlue   = "1565C0";
  const qlikGreen = "00796B";
  const white     = "FFFFFF";
  const lightGray = "E7ECF0";  // JH Light Cool Gray
  const midGray   = "B6BBC0";  // JH Medium Cool Gray
  const textDark  = "06185F";  // Heritage Navy for headings
  const textMid   = "575A5D";  // JH Dark Cool Gray for body
  const textLight = "B6BBC0";  // JH Medium Cool Gray for captions

  const FH = "Aptos Display"; // JH heading font
  const FB = "Aptos";         // JH body font
  const W  = 10;
  const H  = 5.625;

  // ── HELPERS ─────────────────────────────────────────────────────────────────
  const mkShadow = () => ({ type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.13 });

  // JH does NOT use a left vertical accent bar — horizontal cobalt line above title instead
  // Keep accentBar as a no-op so existing call sites compile without error
  const accentBar = (_s, _color) => {};

  // Footer: "Jack Henry™  |  Client Confidential" centered at bottom
  const addFooter = (s) => {
    s.addText("Jack Henry\u2122  |  Client Confidential", {
      x: 0, y: H - 0.24, w: W, h: 0.22,
      fontFace: FB, fontSize: 8.5, color: midGray, align: "center", margin: 0
    });
  };

  // JH title treatment: short Vibrant Cobalt line above title text, no grey separator below
  const addTitle = (s, text) => {
    // Cobalt accent bar above title (short, left-aligned)
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.28, y: 0.16, w: 3.5, h: 0.04,
      fill: { color: teal }, line: { color: teal, width: 0 }
    });
    s.addText(text, {
      x: 0.28, y: 0.25, w: 9.44, h: 0.6,
      fontFace: FH, fontSize: 26, bold: true, color: textDark, margin: 0
    });
    addFooter(s);
  };

  // JH section divider slide: Heritage Navy bg, centered content, cobalt accent line, Tech Blue subtitle
  const makeSectionSlide = (title, sub) => {
    const s = pres.addSlide();
    s.background = { color: navy };
    // Cobalt horizontal accent line
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.35, w: 4.0, h: 0.05,
      fill: { color: teal }, line: { color: teal, width: 0 }
    });
    s.addText(title, { x: 0.5, y: 1.55, w: 9.0, h: 1.3, fontFace: FH, fontSize: 40, bold: true, color: white, margin: 0 });
    if (sub) s.addText(sub, { x: 0.5, y: 3.0, w: 9.0, h: 0.6, fontFace: FB, fontSize: 17, color: tealLight, margin: 0 });
    addFooter(s);
    return s;
  };

  // ============================================================
  // SLIDE 1 ── TITLE
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: navy };
    // Subtle decorative rectangle bottom-right
    s.addShape(pres.shapes.RECTANGLE, { x: 6.8, y: 2.6, w: 3.2, h: 3.025, fill: { color: teal, transparency: 88 }, line: { color: teal, width: 0 } });
    // Vibrant Cobalt horizontal accent line above title
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.85, w: 5.0, h: 0.05, fill: { color: teal }, line: { color: teal, width: 0 } });
    s.addText("The Case for Log-Based CDC", {
      x: 0.5, y: 1.0, w: 9.0, h: 1.5, fontFace: FH, fontSize: 44, bold: true, color: white, margin: 0
    });
    s.addText("A Phased Strategy for Real-Time Data Acquisition", {
      x: 0.5, y: 2.65, w: 9.0, h: 0.6, fontFace: FB, fontSize: 20, color: tealLight, margin: 0
    });
    // JH footer — above the tagline bar
    s.addText("Jack Henry\u2122  |  Client Confidential", {
      x: 0, y: H - 0.54, w: W, h: 0.22,
      fontFace: FB, fontSize: 8.5, color: midGray, align: "center", margin: 0
    });
    // Tagline bar
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: H - 0.3, w: W, h: 0.3, fill: { color: "03113F" }, line: { color: "03113F", width: 0 } });
    s.addText("Addressing Operational Concerns  ·  Near-Term with Debezium  ·  Long-Term with Enterprise CDC", {
      x: 0.35, y: H - 0.27, w: 9.3, h: 0.25, fontFace: FB, fontSize: 10, color: midGray, margin: 0
    });
    s.addNotes("Welcome. This presentation makes the case for log-based CDC as our data acquisition strategy. We cover why CDC, where native SQL Server CDC creates operational friction, how Debezium + Kafka gives us a near-term path, and which enterprise CDC vendor (IBM IIDR or Striim) we move to in Phase 2. The core argument that runs through every slide: log-based CDC reads data the database is already writing to the transaction log. We add zero write load to source systems. That is the answer to virtually every operational pushback — and we address it directly and early.");
  }

  // ============================================================
  // SLIDE 2 ── AGENDA
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s);
    addTitle(s, "Agenda");

    const sections = [
      { n: "01", title: "Why CDC?",             desc: "The business and operational case for change data capture", color: teal    },
      { n: "02", title: "Native SQL Server CDC", desc: "Capabilities, operational concerns, and load reduction options", color: amber  },
      { n: "03", title: "Phase 1 — Native + Debezium", desc: "Near-term architecture and known limitations to plan for", color: purple },
      { n: "04", title: "Phase 2 — Enterprise CDC",    desc: "IBM InfoSphere IIDR, Striim, and vendor comparison",        color: greenMid  },
    ];

    const cW = 2.15, cH = 3.65, sX = 0.28, cY = 1.1, gap = 0.18;
    sections.forEach((sec, i) => {
      const x = sX + i * (cW + gap);
      s.addShape(pres.shapes.RECTANGLE, { x, y: cY, w: cW, h: cH, fill: { color: lightGray }, line: { color: midGray, width: 1 }, shadow: mkShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: cY, w: cW, h: 0.1, fill: { color: sec.color }, line: { color: sec.color, width: 0 } });
      s.addText(sec.n,    { x: x + 0.14, y: cY + 0.2,  w: cW - 0.28, h: 0.82, fontFace: FH, fontSize: 40, bold: true, color: sec.color, margin: 0 });
      s.addText(sec.title,{ x: x + 0.12, y: cY + 1.0,  w: cW - 0.24, h: 0.55, fontFace: FH, fontSize: 13, bold: true, color: textDark, margin: 0 });
      s.addText(sec.desc, { x: x + 0.12, y: cY + 1.62, w: cW - 0.24, h: 1.7,  fontFace: FB, fontSize: 11, color: textMid, margin: 0 });
    });
    s.addNotes("Quick agenda overview — four sections. The deck is designed so leadership can get the key message from the summary slide, and the technical team can dig into the operational detail in sections 2 and 3.");
  }

  // ============================================================
  // SLIDE 3 ── WHY CDC
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s);
    addTitle(s, "Why Change Data Capture?");

    // Left header
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 1.0, w: 4.4, h: 0.4, fill: { color: redLight }, line: { color: red, width: 1 } });
    s.addText("Without CDC — Current State", { x: 0.33, y: 1.0, w: 4.3, h: 0.4, fontFace: FH, fontSize: 13, bold: true, color: red, margin: 4 });

    const probs = [
      { h: "Batch latency",          d: "ETL jobs run on schedule — hours between source changes and availability downstream" },
      { h: "Source system load",     d: "Full table scans or timestamp polling add read pressure to production databases on every run" },
      { h: "Missed deletes & updates",d: "Deleted rows and rapid sequential updates are invisible to batch polling" },
      { h: "Fragile all-or-nothing runs", d: "A failed batch means all changes since the last successful run must be reprocessed" },
    ];
    let py = 1.5;
    probs.forEach(p => {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: py + 0.05, w: 0.06, h: 0.55, fill: { color: red }, line: { color: red, width: 0 } });
      s.addText(p.h, { x: 0.44, y: py,       w: 4.1, h: 0.28, fontFace: FB, fontSize: 12, bold: true, color: textDark, margin: 0 });
      s.addText(p.d, { x: 0.44, y: py + 0.28, w: 4.1, h: 0.35, fontFace: FB, fontSize: 10.5, color: textMid, margin: 0 });
      py += 0.72;
    });

    // Right header
    s.addShape(pres.shapes.RECTANGLE, { x: 5.32, y: 1.0, w: 4.4, h: 0.4, fill: { color: greenLight }, line: { color: greenMid, width: 1 } });
    s.addText("With Log-Based CDC", { x: 5.37, y: 1.0, w: 4.3, h: 0.4, fontFace: FH, fontSize: 13, bold: true, color: greenMid, margin: 4 });

    const sols = [
      { h: "Real-time propagation",    d: "Changes flow from source to target in seconds — driven by the transaction log, not a schedule" },
      { h: "Negligible source impact", d: "CDC reads the transaction log, which is written regardless — no additional load on source tables or application code" },
      { h: "Complete change history",  d: "Every INSERT, UPDATE, and DELETE captured in order, with before and after row images" },
      { h: "Resilient by design",      d: "Log position tracking means recovery from failure resumes exactly where processing stopped" },
    ];
    py = 1.5;
    sols.forEach(sol => {
      s.addShape(pres.shapes.RECTANGLE, { x: 5.32, y: py + 0.05, w: 0.06, h: 0.55, fill: { color: greenMid }, line: { color: greenMid, width: 0 } });
      s.addText(sol.h, { x: 5.48, y: py,        w: 4.1, h: 0.28, fontFace: FB, fontSize: 12, bold: true, color: textDark, margin: 0 });
      s.addText(sol.d, { x: 5.48, y: py + 0.28,  w: 4.1, h: 0.35, fontFace: FB, fontSize: 10.5, color: textMid, margin: 0 });
      py += 0.72;
    });
    s.addNotes("Set up the 'why'. Current state is batch ETL — scheduled, polling, and often running full table scans. Problems are latency (data is stale by hours), source load (we're adding read work to production), and gaps in change capture (especially deletes). Log-based CDC addresses all of these. Key point to land: the transaction log is already being written by SQL Server as part of its normal durability mechanism. CDC just reads it. We are not adding work to the source system — we're piggybacking on work that was already happening.");
  }

  // ============================================================
  // SLIDE 4 ── OPERATIONAL IMPACT STATS (key ops pushback answer)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: navy };
    // Cobalt accent line above title (JH dark-slide treatment)
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.16, w: 4.0, h: 0.05, fill: { color: teal }, line: { color: teal, width: 0 } });
    s.addText("Log-Based CDC on SQL Server", {
      x: 0.5, y: 0.27, w: 9.0, h: 0.6, fontFace: FH, fontSize: 27, bold: true, color: white, margin: 0
    });
    s.addText("No additional load on production — SQL Server writes its transaction log regardless. CDC only reads what\u2019s already there.", {
      x: 0.5, y: 0.88, w: 9.0, h: 0.42, fontFace: FB, fontSize: 13, color: tealLight, margin: 0
    });
    addFooter(s);

    const stats = [
      { stat: "~0%",    label: "Additional load on production SQL Server", sub: "SQL Server writes the log regardless — CDC only reads it", color: teal   },
      { stat: "Read\nOnly", label: "CDC's access model to source",         sub: "No writes to SQL Server application tables",               color: greenMid },
      { stat: "Zero",   label: "Application code changes required",        sub: "Transparent to source applications and connections",       color: purple  },
      { stat: "None",   label: "Source schema changes needed",             sub: "CDC operates on existing SQL Server table structures",     color: amber   },
    ];

    const cW = 2.1, cH = 3.3, sX = 0.35, cY = 1.45, gap = 0.22;
    stats.forEach((st, i) => {
      const x = sX + i * (cW + gap);
      s.addShape(pres.shapes.RECTANGLE, { x, y: cY, w: cW, h: cH, fill: { color: navyMid }, line: { color: navy, width: 1 }, shadow: mkShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: cY + cH - 0.08, w: cW, h: 0.08, fill: { color: st.color }, line: { color: st.color, width: 0 } });
      s.addText(st.stat,  { x: x + 0.08, y: cY + 0.2,  w: cW - 0.16, h: 1.1,  fontFace: FH, fontSize: 44, bold: true, color: st.color, align: "center", margin: 0 });
      s.addText(st.label, { x: x + 0.08, y: cY + 1.38, w: cW - 0.16, h: 0.7,  fontFace: FH, fontSize: 12, bold: true, color: white,    align: "center", margin: 0 });
      s.addText(st.sub,   { x: x + 0.08, y: cY + 2.14, w: cW - 0.16, h: 0.7,  fontFace: FB, fontSize: 10, color: midGray,              align: "center", margin: 0 });
    });
    s.addNotes("This is the slide to return to when ops or DBA teams push back. Log-based CDC adds approximately zero additional write load. SQL Server already writes every transaction to the log as part of its durability guarantee — CDC reads that log without adding to it. The CDC reader is read-only. No application code changes, no source schema changes. The one operational ask: enable CDC on specific tables, which requires ALTER DATABASE permissions and is a one-time configuration. After that, CDC runs autonomously. For the DBA team: approximately 1-2 hours of setup per database, then it runs unattended.");
  }

  // ============================================================
  // SLIDE 5 ── HOW LOG-BASED CDC WORKS
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s);
    addTitle(s, "How Log-Based CDC Works");

    const compY = 1.9, compH = 0.9;
    const comps = [
      { x: 0.15, w: 1.55, label: "Source\nApplication", sub: "",                         color: "37474F"  },
      { x: 2.05, w: 1.6,  label: "SQL Server",          sub: "Database engine",           color: navyMid   },
      { x: 4.0,  w: 1.8,  label: "Transaction\nLog",    sub: "Written regardless of CDC", color: tealDark  },
      { x: 6.15, w: 1.75, label: "CDC Reader",           sub: "Reads log non-invasively",  color: teal      },
      { x: 8.25, w: 1.5,  label: "Targets",              sub: "DW / Kafka / Apps",         color: greenMid  },
    ];
    comps.forEach(c => {
      s.addShape(pres.shapes.RECTANGLE, { x: c.x, y: compY, w: c.w, h: compH, fill: { color: c.color }, line: { color: c.color, width: 0 }, shadow: mkShadow() });
      s.addText(c.label, { x: c.x, y: compY + 0.07, w: c.w, h: 0.48, fontFace: FH, fontSize: 11, bold: true, color: white, align: "center", margin: 0 });
      if (c.sub) s.addText(c.sub, { x: c.x, y: compY + 0.58, w: c.w, h: 0.28, fontFace: FB, fontSize: 8.5, color: lightGray, align: "center", margin: 0 });
    });

    // Arrows
    [[1.7, 2.05], [3.65, 4.0], [5.8, 6.15], [7.9, 8.25]].forEach(([x1, x2]) => {
      s.addShape(pres.shapes.LINE, { x: x1, y: compY + compH / 2, w: x2 - x1, h: 0, line: { color: midGray, width: 2, endArrowType: "arrow" } });
    });

    // Labels above arrows
    s.addText("writes\ntransactions", { x: 1.58, y: 1.38, w: 0.6, h: 0.5, fontFace: FB, fontSize: 8, color: textLight, align: "center", margin: 0, italic: true });
    s.addText("already exists\nin normal ops", { x: 3.55, y: 1.38, w: 0.6, h: 0.5, fontFace: FB, fontSize: 8, color: textLight, align: "center", margin: 0, italic: true });
    s.addText("reads only\n(non-invasive)", { x: 5.68, y: 1.38, w: 0.6, h: 0.5, fontFace: FB, fontSize: 8.5, bold: true, color: teal, align: "center", margin: 0, italic: true });

    // Callout box
    s.addShape(pres.shapes.RECTANGLE, { x: 1.8, y: 3.15, w: 6.2, h: 1.12, fill: { color: teal, transparency: 92 }, line: { color: teal, width: 1.5 } });
    s.addText("The transaction log is written by SQL Server regardless of whether CDC is enabled.\nCDC simply reads it — adding no additional write overhead to the source database.", {
      x: 1.95, y: 3.2, w: 5.9, h: 1.0, fontFace: FB, fontSize: 12, color: tealDark, margin: 0, italic: true
    });
    s.addNotes("Spend 60 seconds on this diagram — it's the conceptual foundation. The source application and SQL Server behave completely normally. The transaction log is written as part of SQL Server's normal durability guarantee; nothing changes there. The CDC reader's relationship to the log (the 'reads only' arrow) is the critical one: read-only and non-invasive. The log exists whether we use CDC or not. This is the answer to 'what does this do to our production system?' — the answer is: nothing. We're reading something that was already there.");
  }

  // ============================================================
  // SLIDE 6 ── INITIAL LOAD: GETTING LOG-BASED CDC STARTED
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s);
    addTitle(s, "Getting Started: Initial Load & Setup");

    // Subtitle
    s.addText("Log-based CDC has two phases: a one-time full snapshot, then continuous incremental log reading. Production is unaffected throughout.", {
      x: 0.28, y: 0.92, w: 9.44, h: 0.36, fontFace: FB, fontSize: 11, color: textMid, margin: 0, italic: true
    });

    // Phase labels
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 1.38, w: 4.48, h: 0.32, fill: { color: teal }, line: { color: teal, width: 0 } });
    s.addText("PHASE A — One-Time Setup (DBA, ~1–2 hrs)", { x: 0.28, y: 1.38, w: 4.48, h: 0.32, fontFace: FH, fontSize: 11, bold: true, color: white, align: "center", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.22, y: 1.38, w: 4.5, h: 0.32, fill: { color: greenMid }, line: { color: greenMid, width: 0 } });
    s.addText("PHASE B — Ongoing (Fully Automated)", { x: 5.22, y: 1.38, w: 4.5, h: 0.32, fontFace: FH, fontSize: 11, bold: true, color: white, align: "center", margin: 0 });

    // Setup steps (left column)
    const setupSteps = [
      { n: "1", t: "Enable CDC on the database",     d: "One SQL command: sys.sp_cdc_enable_db — requires sysadmin or db_owner. No restart needed." },
      { n: "2", t: "Enable CDC per table",           d: "sys.sp_cdc_enable_table for each source table. Sets up internal change tracking and log scan position (LSN)." },
      { n: "3", t: "Verify log retention",           d: "Ensure SQL Server transaction log retention covers at least the CDC polling interval (typically 3–5 min)." },
      { n: "4", t: "Configure the CDC connector",   d: "Provide source DB credentials, table list, snapshot mode. For Debezium: a Kafka Connect JSON config. Enterprise tools: GUI wizard." },
    ];

    let sy = 1.82;
    const stepW = 4.18;
    setupSteps.forEach(step => {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: sy, w: 0.36, h: 0.62, fill: { color: teal }, line: { color: teal, width: 0 } });
      s.addText(step.n, { x: 0.28, y: sy, w: 0.36, h: 0.62, fontFace: FH, fontSize: 15, bold: true, color: white, align: "center", valign: "middle", margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.66, y: sy, w: stepW, h: 0.62, fill: { color: lightGray }, line: { color: midGray, width: 1 } });
      s.addText(step.t, { x: 0.74, y: sy + 0.04, w: stepW - 0.1, h: 0.22, fontFace: FH, fontSize: 11, bold: true, color: textDark, margin: 0 });
      s.addText(step.d, { x: 0.74, y: sy + 0.27, w: stepW - 0.1, h: 0.3,  fontFace: FB, fontSize: 9.5, color: textMid, margin: 0 });
      sy += 0.74;
    });

    // Ongoing steps (right column)
    const ongoingSteps = [
      { icon: "\u25BA", t: "Initial snapshot (full load)",  d: "CDC tool reads all existing rows from each source table — one time. This IS a full read, but production write load is unaffected.", color: greenMid },
      { icon: "\u25BA", t: "LSN bookmark set",              d: "The tool records the Log Sequence Number at snapshot time. All changes after that LSN stream incrementally — nothing is dropped.", color: teal },
      { icon: "\u25BA", t: "Incremental log reading begins",d: "CDC reader tails the SQL Server transaction log in real time. Inserts, updates, and deletes flow to targets continuously.", color: teal },
      { icon: "\u25BA", t: "Automated from here",           d: "No DBA involvement needed for ongoing operation. Schema changes (for enterprise tools) are handled automatically.", color: greenMid },
    ];

    let oy = 1.82;
    const onW = 4.18;
    ongoingSteps.forEach(step => {
      s.addShape(pres.shapes.RECTANGLE, { x: 5.22, y: oy, w: onW, h: 0.62, fill: { color: lightGray }, line: { color: midGray, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x: 5.22, y: oy, w: 0.06, h: 0.62, fill: { color: step.color }, line: { color: step.color, width: 0 } });
      s.addText(step.t, { x: 5.34, y: oy + 0.04, w: onW - 0.18, h: 0.22, fontFace: FH, fontSize: 11, bold: true, color: textDark, margin: 0 });
      s.addText(step.d, { x: 5.34, y: oy + 0.27, w: onW - 0.18, h: 0.3,  fontFace: FB, fontSize: 9.5, color: textMid, margin: 0 });
      oy += 0.74;
    });

    // Key callout at bottom
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 5.1, w: 9.44, h: 0.34, fill: { color: "EEF3FD" }, line: { color: teal, width: 1 } });
    s.addText("\u26A0  Large tables = longer initial snapshot (minutes to hours). Production write load is unaffected throughout. After snapshot, ongoing CDC is sub-second and fully automated.", {
      x: 0.35, y: 5.1, w: 9.3, h: 0.34, fontFace: FB, fontSize: 10, color: textDark, margin: 4
    });

    s.addNotes("This slide addresses the 'how do we start?' question directly. The initial snapshot is a one-time, read-only scan of source tables — it does NOT add write load. SQL Server continues serving normal application traffic. For a 100GB table, snapshot might take 20-40 minutes depending on network and disk throughput; a 1TB table could take several hours. Enterprise tools (IIDR, Striim, Qlik) handle this more efficiently and can parallelize. After the snapshot, the ongoing CDC is purely log-reading — zero query load on source tables. The DBA one-time effort is: two SQL commands per database/table, then verify log retention. That is the total operational ask from DBA teams.");
  }

  // ============================================================
  // SLIDE 6 (renumbered 7) ── NATIVE CDC CAPABILITIES
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s);
    addTitle(s, "Native SQL Server CDC — What It Provides");

    s.addText("Available in SQL Server 2008+, Standard and Enterprise editions. No additional license cost.", {
      x: 0.28, y: 1.0, w: 9.44, h: 0.34, fontFace: FB, fontSize: 11.5, color: textLight, margin: 0, italic: true
    });

    const caps = [
      { t: "Transaction Log Reading",    d: "Uses the SQL Server Log Reader Agent to capture changes without table scans or additional writes" },
      { t: "Before & After Images",      d: "Full row images for INSERT, UPDATE, and DELETE operations with configurable column tracking" },
      { t: "LSN-Based Ordering",         d: "Changes ordered by Log Sequence Number, preserving exact transaction commit order" },
      { t: "Net Changes Support",        d: "Returns only the net effect of multiple changes to a row within a configurable time window" },
      { t: "Per-Table Capture Instances",d: "Independent capture configuration per table; up to 2 instances per table for transition management" },
      { t: "No Additional License Cost", d: "Included with SQL Server — no commercial CDC license required for the base feature" },
    ];

    const cW = 3.0, cH = 1.28, sX = 0.28, sY = 1.42, gx = 0.16, gy = 0.12;
    caps.forEach((c, i) => {
      const x = sX + (i % 3) * (cW + gx);
      const y = sY + Math.floor(i / 3) * (cH + gy);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: cW, h: cH, fill: { color: lightGray }, line: { color: midGray, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: cH, fill: { color: teal }, line: { color: teal, width: 0 } });
      s.addText(c.t, { x: x + 0.15, y: y + 0.1,  w: cW - 0.25, h: 0.38, fontFace: FH, fontSize: 12, bold: true, color: textDark, margin: 0 });
      s.addText(c.d, { x: x + 0.15, y: y + 0.5,  w: cW - 0.25, h: 0.68, fontFace: FB, fontSize: 11, color: textMid, margin: 0 });
    });
    s.addNotes("Important framing: native CDC is a real, capable feature. The issues we cover on the next slide are operational and architectural — not fundamental design flaws. It does log-based capture, provides before/after images, uses LSN ordering. These are the right fundamentals. We're not dismissing native CDC as broken; we're being honest about where it creates friction at scale and in heterogeneous environments.");
  }

  // ============================================================
  // SLIDE 7 ── NATIVE CDC OPERATIONAL CONCERNS
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s, red);
    addTitle(s, "Native SQL Server CDC — Operational Concerns");

    const concerns = [
      { t: "SQL Server Agent Dependency",     d: "Capture and cleanup jobs run via SQL Agent. Agent downtime or resource pressure silently stalls CDC — no built-in alerting or automatic recovery." },
      { t: "Schema Changes Are Breaking Events", d: "Adding a column, renaming, or changing a type requires dropping and recreating the capture instance. There is no atomic switchover — consumers experience a gap or double-process." },
      { t: "CDC Tables in Production Database", d: "Change tables live in the source database (cdc schema), competing for I/O and adding to backup size. Poorly tuned cleanup jobs have caused hundreds of GB of accumulation." },
      { t: "Always On AG Failover Complexity",  d: "CDC does not automatically follow an AG failover. The capture jobs must be manually re-synchronized with the new primary, risking a continuity gap." },
      { t: "Log Reader Contention",             d: "If transactional replication is configured on the same database, CDC and replication share the Log Reader Agent. A slow replication subscriber can block CDC advancement." },
      { t: "SQL Server Only",                   d: "Native CDC has no concept of heterogeneous sources. As the estate expands to Oracle, PostgreSQL, or cloud databases, a separate CDC mechanism is required for each." },
    ];

    const cW = 4.55, cH = 1.3, sX = 0.28, sY = 1.05, gx = 0.34, gy = 0.1;
    concerns.forEach((c, i) => {
      const x = sX + (i % 2) * (cW + gx);
      const y = sY + Math.floor(i / 2) * (cH + gy);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: cW, h: cH, fill: { color: redLight }, line: { color: "FECACA", width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: cH, fill: { color: red }, line: { color: red, width: 0 } });
      s.addText(c.t, { x: x + 0.15, y: y + 0.1,  w: cW - 0.25, h: 0.35, fontFace: FH, fontSize: 12, bold: true, color: red, margin: 0 });
      s.addText(c.d, { x: x + 0.15, y: y + 0.48, w: cW - 0.25, h: 0.75, fontFace: FB, fontSize: 10.5, color: textMid, margin: 0 });
    });
    s.addNotes("Walk through each concern. The Agent dependency is the most common source of silent failures — when Agent hiccups, CDC falls behind and nothing alerts you. Schema changes are the most painful day-to-day issue: any schema evolution on a tracked table requires manual capture instance rotation, and teams that don't know this get caught out badly the first time a developer adds a column. The AG failover issue is particularly dangerous in HA environments — CDC doesn't know about AGs natively, so failover requires manual intervention. These are the common failure modes that teams hit in practice, not theoretical risks.");
  }

  // ============================================================
  // SLIDE 8 ── REDUCING NATIVE CDC OPERATIONAL LOAD
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s, amber);
    addTitle(s, "Reducing Native CDC Operational Load");

    s.addText("These mitigations reduce friction — but do not eliminate the core problems with schema changes and AG failover.", {
      x: 0.28, y: 1.0, w: 9.44, h: 0.36, fontFace: FB, fontSize: 12, color: textMid, margin: 0, italic: true
    });

    const opts = [
      { t: "Run CDC Off an AG Read Replica",        d: "Direct the CDC log reader to a readable AG secondary. Isolates CDC I/O from the primary workload. Requires AG configuration and careful LSN management.", impact: "Reduces primary load",         color: greenMid },
      { t: "Azure SQL Managed Instance",            d: "SQLMI has tighter CDC integration — CDC jobs are platform-managed and significantly more resilient to instance events than self-managed SQL Server.", impact: "Reduces Agent dependency",     color: teal    },
      { t: "SQL Server Change Tracking (lighter option)", d: "Tracks which rows changed but not the full before/after image. No Agent dependency, no CDC tables. Suitable for current-state-only sync scenarios.", impact: "Simplest; limited history",   color: ibmBlue  },
      { t: "Automated Capture Instance Rotation",   d: "Scripted SQL Agent jobs that detect schema changes and automate the drop/recreate capture instance workflow. Reduces manual effort but does not close the gap window.", impact: "Reduces schema change pain",  color: purple  },
      { t: "Custom Monitoring & Alerting",          d: "SQL Agent job status monitoring, latency checks comparing max LSN to captured LSN, and alerting via existing tooling. Converts silent failures to visible ones.", impact: "Addresses observability gap", color: amber   },
    ];

    const cH = 0.73;
    let y = 1.45;
    opts.forEach((opt, i) => {
      const bg = i % 2 === 0 ? lightGray : white;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y, w: 9.44, h: cH, fill: { color: bg }, line: { color: midGray, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y, w: 0.06, h: cH, fill: { color: opt.color }, line: { color: opt.color, width: 0 } });
      s.addText(opt.t, { x: 0.45, y: y + 0.07, w: 2.6, h: 0.28, fontFace: FH, fontSize: 11, bold: true, color: textDark, margin: 0 });
      s.addText(opt.d, { x: 0.45, y: y + 0.38, w: 6.45, h: 0.3,  fontFace: FB, fontSize: 10, color: textMid, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: y + 0.2, w: 2.42, h: 0.33, fill: { color: opt.color, transparency: 85 }, line: { color: opt.color, width: 1 } });
      s.addText(opt.impact, { x: 7.2, y: y + 0.2, w: 2.42, h: 0.33, fontFace: FB, fontSize: 9.5, bold: true, color: opt.color, align: "center", margin: 0 });
      y += cH + 0.05;
    });
    s.addNotes("This slide answers: can we make native CDC workable without going straight to a third-party tool? Yes, with investment. Running CDC off a read replica is the highest-value mitigation if you have an Always On AG — keeps CDC load completely off the primary. Azure SQL MI is a significant simplifier if you're already on that platform. Change Tracking is worth knowing as a lighter option for non-critical, current-state-only scenarios. But the honest message: these are mitigations. Schema change handling and AG failover complexity remain fundamentally unsolved. That's why Phase 2 exists.");
  }

  // ============================================================
  // SLIDE 9 ── PHASE 1 ARCHITECTURE
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s, purple);
    addTitle(s, "Phase 1: Native SQL Server CDC + Debezium");

    const compY = 1.55, compH = 0.85;
    const comps = [
      { x: 0.1,  w: 1.65, label: "SQL Server",       sub: "Source DB",                     color: navyMid  },
      { x: 2.1,  w: 1.85, label: "CDC Tables",        sub: "cdc schema (per table)",        color: "B45309" },
      { x: 4.3,  w: 2.0,  label: "Debezium",          sub: "Kafka Connect connector",       color: purple   },
      { x: 6.65, w: 1.7,  label: "Apache Kafka",      sub: "Topics per source table",       color: ibmBlue  },
      { x: 8.7,  w: 1.22, label: "Consumers",         sub: "DW / Apps",                    color: greenMid },
    ];
    comps.forEach(c => {
      s.addShape(pres.shapes.RECTANGLE, { x: c.x, y: compY, w: c.w, h: compH, fill: { color: c.color }, line: { color: c.color, width: 0 }, shadow: mkShadow() });
      s.addText(c.label, { x: c.x, y: compY + 0.07, w: c.w, h: 0.38, fontFace: FH, fontSize: 11, bold: true, color: white, align: "center", margin: 0 });
      s.addText(c.sub,   { x: c.x, y: compY + 0.5,  w: c.w, h: 0.3,  fontFace: FB, fontSize: 8.5, color: lightGray, align: "center", margin: 0 });
    });

    [[1.75, 2.1], [3.95, 4.3], [6.3, 6.65], [8.35, 8.7]].forEach(([x1, x2]) => {
      s.addShape(pres.shapes.LINE, { x: x1, y: compY + compH / 2, w: x2 - x1, h: 0, line: { color: midGray, width: 2, endArrowType: "arrow" } });
    });

    s.addText("Log Reader\nAgent", { x: 1.65, y: 1.1, w: 0.6, h: 0.42, fontFace: FB, fontSize: 8, color: textLight, align: "center", margin: 0, italic: true });
    s.addText("Polls CDC\ntables", { x: 3.85, y: 1.1, w: 0.55, h: 0.42, fontFace: FB, fontSize: 8, color: textLight, align: "center", margin: 0, italic: true });

    // Key facts
    const facts = [
      { lbl: "Latency",         val: "Seconds to low tens of seconds (polling-based via CDC table intervals)" },
      { lbl: "SQL Agent",       val: "Required — for CDC capture and cleanup jobs on SQL Server" },
      { lbl: "Schema changes",  val: "Manual — capture instance rotation required per DDL change" },
      { lbl: "Targets",         val: "Kafka topics → downstream consumers, DW loaders, stream processors" },
      { lbl: "Cost model",      val: "Debezium is open source; primary investment is Kafka Connect infrastructure" },
    ];
    let fy = 2.7;
    facts.forEach(f => {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: fy + 0.04, w: 0.06, h: 0.27, fill: { color: purple }, line: { color: purple, width: 0 } });
      s.addText(f.lbl + ":", { x: 0.44, y: fy, w: 1.4, h: 0.34, fontFace: FB, fontSize: 10.5, bold: true, color: textDark, margin: 0 });
      s.addText(f.val,       { x: 1.84, y: fy, w: 7.88, h: 0.34, fontFace: FB, fontSize: 10.5, color: textMid, margin: 0 });
      fy += 0.37;
    });
    s.addNotes("Important architecture clarification: Debezium's SQL Server connector does NOT read the transaction log directly. It reads from the CDC tables. This means you must enable SQL Server native CDC on every tracked table, and you inherit all of the native CDC operational concerns — Agent dependency, schema change handling, CDC table management. Debezium adds the Kafka abstraction and structured change events on top, which is valuable, but it doesn't eliminate the underlying dependencies. Be honest with the team about this distinction — it matters for planning the operational runbooks.");
  }

  // ============================================================
  // SLIDE 10 ── DEBEZIUM KNOWN LIMITATIONS
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s, purple);
    addTitle(s, "Debezium + Kafka: Known Limitations to Plan For");

    const items = [
      { t: "Inherits All Native CDC Dependencies",    d: "Reads CDC tables, not the SQL Server log. SQL Server Agent, capture instance management, and cleanup jobs all remain required.", sev: "high" },
      { t: "Schema Changes Require Manual Intervention",d: "DDL changes on tracked tables require capture instance recreation and connector reconfiguration — no automated DDL tracking.",   sev: "high" },
      { t: "LSN Offset Fragility",                    d: "If the cleanup job removes rows before Debezium processes them (e.g. after an outage), the connector fails and requires a full re-snapshot.", sev: "high" },
      { t: "Initial Snapshot at Scale",               d: "First-run snapshot of large tables runs under snapshot isolation, can take hours, and generates significant source I/O.",           sev: "med"  },
      { t: "Kafka Connect Operational Overhead",      d: "Kafka Connect cluster management, worker config, offset topics, schema registry, and connector restart logic are additional operational surface.", sev: "med"  },
      { t: "Unsupported SQL Server Data Types",       d: "hierarchyid, geography, geometry, and sql_variant produce opaque binary output or are unsupported without custom type converters.",  sev: "med"  },
      { t: "No Cross-Table Transaction Ordering",     d: "Ordering guarantees are per-topic (per table). Multi-table transactions are not delivered with cross-table ordering out of the box.",  sev: "med"  },
      { t: "Limited In-Flight Transformation",        d: "Single Message Transforms handle basic field changes only. Complex routing, enrichment, or join logic requires a separate layer.",     sev: "low"  },
    ];

    const sevColors = { high: red, med: amber, low: greenMid };
    const sevLabel  = { high: "HIGH", med: "MED",  low: "LOW"  };

    const cW = 4.5, cH = 0.88, sX = 0.28, sY = 1.05, gx = 0.44, gy = 0.07;
    items.forEach((item, i) => {
      const x = sX + (i % 2) * (cW + gx);
      const y = sY + Math.floor(i / 2) * (cH + gy);
      const sc = sevColors[item.sev];
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: cW, h: cH, fill: { color: lightGray }, line: { color: midGray, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: cH, fill: { color: sc }, line: { color: sc, width: 0 } });
      s.addText(item.t, { x: x + 0.15, y: y + 0.07, w: cW - 0.72, h: 0.3,  fontFace: FH, fontSize: 10.5, bold: true, color: textDark, margin: 0 });
      // Severity badge
      s.addShape(pres.shapes.RECTANGLE, { x: x + cW - 0.52, y: y + 0.08, w: 0.47, h: 0.26, fill: { color: sc, transparency: 80 }, line: { color: sc, width: 1 } });
      s.addText(sevLabel[item.sev], { x: x + cW - 0.52, y: y + 0.08, w: 0.47, h: 0.26, fontFace: FB, fontSize: 8.5, bold: true, color: sc, align: "center", margin: 0 });
      s.addText(item.d, { x: x + 0.15, y: y + 0.4, w: cW - 0.25, h: 0.44, fontFace: FB, fontSize: 10, color: textMid, margin: 0 });
    });
    s.addNotes("These are not reasons to reject Debezium — they are things to plan for explicitly. The three HIGH items need plans before go-live: (1) Accept that SQL Agent is a dependency and build monitoring around it; (2) Document the schema change procedure and make it part of the data engineering runbook; (3) Configure CDC cleanup job retention to 7+ days minimum so Debezium can recover from outages without a re-snapshot. The data type limitations should be inventoried against actual source tables before go-live. If tables use geography or hierarchyid, plan type converters first.");
  }

  // ============================================================
  // SLIDE 11 ── PHASE 1 WHAT YOU GET
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s, purple);
    addTitle(s, "Phase 1: What You Get");

    // Left — delivered
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 1.0, w: 4.3, h: 0.4, fill: { color: greenLight }, line: { color: greenMid, width: 1 } });
    s.addText("Delivered in Phase 1", { x: 0.33, y: 1.0, w: 4.2, h: 0.4, fontFace: FH, fontSize: 13, bold: true, color: greenMid, margin: 4 });

    const delivers = [
      "Real-time change stream from SQL Server into Kafka topics",
      "Structured change events with before/after row images",
      "LSN-based ordering preserved within each source table",
      "Open-source stack — no commercial CDC license",
      "Replayable from any retained Kafka offset",
      "Foundation for downstream consumers, DW loaders, and event-driven apps",
    ];
    let dy = 1.5;
    delivers.forEach(d => {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: dy + 0.06, w: 0.06, h: 0.27, fill: { color: greenMid }, line: { color: greenMid, width: 0 } });
      s.addText(d, { x: 0.44, y: dy, w: 4.0, h: 0.38, fontFace: FB, fontSize: 11.5, color: textDark, margin: 0 });
      dy += 0.43;
    });

    // Right — operational requirements
    s.addShape(pres.shapes.RECTANGLE, { x: 5.12, y: 1.0, w: 4.6, h: 0.4, fill: { color: amberLight }, line: { color: amber, width: 1 } });
    s.addText("Operational Requirements", { x: 5.17, y: 1.0, w: 4.5, h: 0.4, fontFace: FH, fontSize: 13, bold: true, color: amber, margin: 4 });

    const ops = [
      { r: "SQL Server Agent must be running",         n: "Existing requirement for most SQL Server installations" },
      { r: "Enable CDC on target tables (ALTER DATABASE)", n: "One-time DBA configuration; ~1–2 hours per database" },
      { r: "Tune CDC cleanup job retention (7+ days)", n: "Prevents offset loss during Debezium recovery windows" },
      { r: "Schema change runbook documented",         n: "Capture instance rotation procedure per tracked table" },
      { r: "Kafka Connect cluster deployed",           n: "New infra; managed options available (Confluent, MSK)" },
    ];
    let oy = 1.5;
    ops.forEach(op => {
      s.addShape(pres.shapes.RECTANGLE, { x: 5.12, y: oy + 0.05, w: 0.06, h: 0.54, fill: { color: amber }, line: { color: amber, width: 0 } });
      s.addText(op.r, { x: 5.28, y: oy,       w: 4.32, h: 0.28, fontFace: FB, fontSize: 11.5, bold: true, color: textDark, margin: 0 });
      s.addText(op.n, { x: 5.28, y: oy + 0.28, w: 4.32, h: 0.28, fontFace: FB, fontSize: 10,   color: textMid, margin: 0, italic: true });
      oy += 0.65;
    });
    s.addNotes("The Phase 1 story for leadership: we get a real-time change stream, structured events, and a replayable Kafka foundation with no commercial CDC license. For the ops team: the ask on the SQL Server side is approximately 1-2 hours of DBA time per database to enable CDC, plus configuration of the cleanup retention. The Kafka Connect infrastructure is the real investment in Phase 1, and it carries forward into Phase 2 — so it's not throwaway work. Debezium connectors get replaced in Phase 2; the Kafka topics, consumer pipelines, and monitoring stack remain intact.");
  }

  // ============================================================
  // SLIDE 12 ── SECTION: PHASE 2
  // ============================================================
  makeSectionSlide(
    "Phase 2: Enterprise CDC",
    "IBM InfoSphere IIDR, Striim, and the path beyond Debezium"
  ).addNotes("Transition to Phase 2. The trigger isn't a fixed date — it's a condition: schema changes becoming a recurring pain point, the source estate expanding beyond SQL Server, sub-second latency requirements emerging, or enterprise support SLA requirements exceeding what an open-source stack can provide. Phase 1 investment in Kafka carries forward; only the Debezium connectors are replaced.");

  // ============================================================
  // SLIDE 13 ── PHASE 2 ADVANTAGES
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s, teal);
    addTitle(s, "Why Move to Enterprise CDC?");

    const advs = [
      { t: "Direct Log Reading",          d: "Enterprise tools read the SQL Server transaction log directly — no CDC tables, no SQL Agent dependency. The source database is untouched.",         phase1: "CDC tables + SQL Agent req.",   color: teal    },
      { t: "Automated Schema Evolution",  d: "DDL changes are captured in the log and propagated automatically — no capture instance rotation, no consumer interruption, no manual runbook.",     phase1: "Manual capture instance rotation", color: greenMid },
      { t: "Sub-Second Latency",          d: "Direct log streaming without polling intervals delivers millisecond-to-low-second change propagation consistently.",                                  phase1: "Seconds–tens of seconds (poll)", color: purple  },
      { t: "Heterogeneous Sources",       d: "One platform captures from SQL Server, Oracle, Db2, PostgreSQL, MySQL, and mainframe. Unified events and a single operational console.",             phase1: "SQL Server only",               color: navyMid  },
      { t: "AG Failover Awareness",       d: "Enterprise tools understand Always On AG topologies. Failover is handled automatically — capture resumes on the new primary with no manual steps.", phase1: "Manual re-sync after failover",  color: amber   },
      { t: "Enterprise Support & SLAs",   d: "Commercial support contracts, certified version matrices, regulated-environment compliance documentation, and vendor accountability.",               phase1: "Community support only",        color: ibmBlue  },
    ];

    const cW = 4.5, cH = 1.12, sX = 0.28, sY = 1.05, gx = 0.44, gy = 0.1;
    advs.forEach((a, i) => {
      const x = sX + (i % 2) * (cW + gx);
      const y = sY + Math.floor(i / 2) * (cH + gy);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: cW, h: cH, fill: { color: lightGray }, line: { color: midGray, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.06, h: cH, fill: { color: a.color }, line: { color: a.color, width: 0 } });
      s.addText(a.t, { x: x + 0.15, y: y + 0.07, w: 2.85, h: 0.32, fontFace: FH, fontSize: 11, bold: true, color: textDark, margin: 0 });
      // Phase 1 tag
      s.addShape(pres.shapes.RECTANGLE, { x: x + 3.15, y: y + 0.07, w: 1.27, h: 0.32, fill: { color: redLight }, line: { color: "FECACA", width: 1 } });
      s.addText("Phase 1: " + a.phase1, { x: x + 3.15, y: y + 0.07, w: 1.27, h: 0.32, fontFace: FB, fontSize: 7.5, color: red, margin: 2 });
      s.addText(a.d, { x: x + 0.15, y: y + 0.44, w: cW - 0.25, h: 0.62, fontFace: FB, fontSize: 10, color: textMid, margin: 0 });
    });
    s.addNotes("This slide makes the explicit Phase 1 vs Phase 2 comparison. The right question to ask the room: which of the Phase 1 limitations will create the most friction in the first 12-18 months? The answer typically comes down to schema changes (if the source schema is actively evolving) and AG failover (if you're in a high-availability environment with regular maintenance windows). Those two pain points define the urgency of Phase 2.");
  }

  // ============================================================
  // SLIDE 14 ── IBM IIDR
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s, ibmBlue);
    addTitle(s, "IBM InfoSphere Data Replication (IIDR)");

    s.addText("Enterprise CDC Platform — acquired from DataMirror (2007). Deployed across large IBM enterprise accounts globally.", {
      x: 0.28, y: 1.02, w: 5.6, h: 0.36, fontFace: FB, fontSize: 11, color: textLight, margin: 0, italic: true
    });

    const props = [
      { l: "Log Reading",     v: "Direct SQL Server transaction log reading — no native CDC or SQL Agent required" },
      { l: "Sources",         v: "SQL Server, Oracle, Db2, IMS, VSAM, PostgreSQL, MySQL, SAP HANA" },
      { l: "Targets",         v: "Kafka (IBM Event Streams / Apache), Db2, JDBC, flat files, IBM DataStage pipelines" },
      { l: "Schema Evolution",v: "Automated DDL propagation with configurable handling — hold, skip, or apply to target" },
      { l: "AG Support",      v: "Always On AG topology awareness; automatic failover follow to new primary" },
      { l: "Latency",         v: "Sub-second change propagation from source to target" },
      { l: "Management",      v: "IBM CDC Management Console; integrates with IBM DataStage and IBM Cloud Pak for Data" },
      { l: "Licensing",       v: "Commercial, per-source pricing. Strong value in existing IBM enterprise agreements" },
    ];
    let py = 1.44;
    props.forEach((p, i) => {
      const bg = i % 2 === 0 ? lightGray : white;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: py, w: 5.6, h: 0.46, fill: { color: bg }, line: { color: midGray, width: 1 } });
      s.addText(p.l, { x: 0.36, y: py + 0.08, w: 1.25, h: 0.3, fontFace: FB, fontSize: 10.5, bold: true, color: ibmBlue, margin: 0 });
      s.addText(p.v, { x: 1.7,  y: py + 0.08, w: 4.08, h: 0.3, fontFace: FB, fontSize: 10.5, color: textMid, margin: 0 });
      py += 0.46;
    });

    // Best fit
    s.addShape(pres.shapes.RECTANGLE, { x: 6.18, y: 1.02, w: 3.54, h: 2.0, fill: { color: greenLight }, line: { color: greenMid, width: 1 } });
    s.addText("Best fit when:", { x: 6.28, y: 1.06, w: 3.3, h: 0.32, fontFace: FH, fontSize: 12, bold: true, color: greenMid, margin: 0 });
    const fits = ["Existing IBM enterprise licensing in place","IBM DataStage or Cloud Pak for Data deployed","Mainframe sources (IMS/VSAM/Db2) in scope","Enterprise support relationship with IBM required"];
    let fy2 = 1.44;
    fits.forEach(f => {
      s.addShape(pres.shapes.RECTANGLE, { x: 6.23, y: fy2 + 0.06, w: 0.05, h: 0.27, fill: { color: greenMid }, line: { color: greenMid, width: 0 } });
      s.addText(f, { x: 6.38, y: fy2, w: 3.24, h: 0.38, fontFace: FB, fontSize: 10.5, color: textDark, margin: 0 });
      fy2 += 0.42;
    });

    // Watch outs
    s.addShape(pres.shapes.RECTANGLE, { x: 6.18, y: 3.17, w: 3.54, h: 2.1, fill: { color: amberLight }, line: { color: amber, width: 1 } });
    s.addText("Consider carefully:", { x: 6.28, y: 3.21, w: 3.3, h: 0.32, fontFace: FH, fontSize: 12, bold: true, color: amber, margin: 0 });
    const watches = ["Management console UI reflects enterprise/legacy lineage","Pricing complex outside IBM account structures","Smaller community ecosystem vs. Debezium or Qlik","Cloud-native deployment story still maturing"];
    let wy = 3.58;
    watches.forEach(w => {
      s.addShape(pres.shapes.RECTANGLE, { x: 6.23, y: wy + 0.06, w: 0.05, h: 0.27, fill: { color: amber }, line: { color: amber, width: 0 } });
      s.addText(w, { x: 6.38, y: wy, w: 3.24, h: 0.38, fontFace: FB, fontSize: 10.5, color: textDark, margin: 0 });
      wy += 0.42;
    });
    s.addNotes("IBM IIDR is the mature choice for IBM-centric environments. Key differentiators vs. Debezium: true direct log reading (no SQL Agent, no CDC tables), automated schema evolution, AG-awareness. The main watch-outs: the management tooling shows its age compared to newer SaaS-oriented tools, and pricing negotiation in non-IBM environments can be complex. If the organization already has IBM enterprise agreements, IIDR often becomes cost-neutral or even cost-reducing when folded into existing licensing. Particularly strong when mainframe sources are in scope — no other CDC vendor covers IMS and VSAM as naturally.");
  }

  // ============================================================
  // SLIDE 15 ── STRIIM
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s, greenMid);
    addTitle(s, "Striim — Real-Time Data Integration Platform");

    s.addText("Founded 2012. Purpose-built for streaming integration with built-in in-flight processing via a streaming SQL engine.", {
      x: 0.28, y: 1.02, w: 5.6, h: 0.36, fontFace: FB, fontSize: 11, color: textLight, margin: 0, italic: true
    });

    const props = [
      { l: "Log Reading",         v: "Direct SQL Server transaction log reading — no native CDC or SQL Agent required" },
      { l: "Sources",             v: "SQL Server, Oracle, MySQL, PostgreSQL, SAP, Kafka, messaging systems, files" },
      { l: "Targets",             v: "Snowflake, BigQuery, Redshift, Databricks, Kafka, Azure Event Hubs, Synapse, JDBC" },
      { l: "Key Differentiator",  v: "Built-in streaming SQL engine — transform, enrich, filter, and join change streams in-flight before delivery" },
      { l: "Schema Evolution",    v: "Automated DDL capture and propagation with configurable target handling" },
      { l: "AG Support",          v: "Always On AG topology awareness; automatic failover handling" },
      { l: "Latency",             v: "Sub-second continuous delivery through in-memory processing pipeline" },
      { l: "Deployment",          v: "Cloud-native SaaS, managed cloud, or on-premises. Certified connectors for major cloud DWs." },
    ];
    let py = 1.44;
    props.forEach((p, i) => {
      const bg = i % 2 === 0 ? lightGray : white;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: py, w: 5.6, h: 0.46, fill: { color: bg }, line: { color: midGray, width: 1 } });
      s.addText(p.l, { x: 0.36, y: py + 0.08, w: 1.4,  h: 0.3, fontFace: FB, fontSize: 10.5, bold: true, color: greenMid, margin: 0 });
      s.addText(p.v, { x: 1.85, y: py + 0.08, w: 3.93, h: 0.3, fontFace: FB, fontSize: 10.5, color: textMid, margin: 0 });
      py += 0.46;
    });

    // Best fit
    s.addShape(pres.shapes.RECTANGLE, { x: 6.18, y: 1.02, w: 3.54, h: 2.12, fill: { color: greenLight }, line: { color: greenMid, width: 1 } });
    s.addText("Best fit when:", { x: 6.28, y: 1.06, w: 3.3, h: 0.32, fontFace: FH, fontSize: 12, bold: true, color: greenMid, margin: 0 });
    const fits = ["Cloud data warehouse is primary target (Snowflake, BigQuery, Databricks)","In-flight transformation or enrichment is required","Operational integration use cases (cache updates, API triggers)","Modern cloud-native deployment preferred"];
    let fy2 = 1.44;
    fits.forEach(f => {
      s.addShape(pres.shapes.RECTANGLE, { x: 6.23, y: fy2 + 0.06, w: 0.05, h: 0.27, fill: { color: greenMid }, line: { color: greenMid, width: 0 } });
      s.addText(f, { x: 6.38, y: fy2, w: 3.24, h: 0.42, fontFace: FB, fontSize: 10.5, color: textDark, margin: 0 });
      fy2 += 0.44;
    });

    // Watch outs
    s.addShape(pres.shapes.RECTANGLE, { x: 6.18, y: 3.28, w: 3.54, h: 2.3, fill: { color: amberLight }, line: { color: amber, width: 1 } });
    s.addText("Consider carefully:", { x: 6.28, y: 3.32, w: 3.3, h: 0.32, fontFace: FH, fontSize: 12, bold: true, color: amber, margin: 0 });
    const watches = ["Streaming SQL platform has a learning curve beyond pure CDC","Pricing tiers can increase with data volume at scale","Less established in mainframe / legacy source scenarios","Transformation power may be underutilised in simple CDC use cases"];
    let wy = 3.68;
    watches.forEach(w => {
      s.addShape(pres.shapes.RECTANGLE, { x: 6.23, y: wy + 0.06, w: 0.05, h: 0.27, fill: { color: amber }, line: { color: amber, width: 0 } });
      s.addText(w, { x: 6.38, y: wy, w: 3.24, h: 0.38, fontFace: FB, fontSize: 10.5, color: textDark, margin: 0 });
      wy += 0.42;
    });
    s.addNotes("Striim's key differentiator is the streaming SQL engine. Where IIDR is primarily a capture-and-land tool, Striim is designed to be a continuous processing layer — you write SQL queries that run against the change stream to filter, join, and enrich data in real time before delivery. This is especially powerful for cloud data warehouse targets where Striim has certified, optimised connectors for Snowflake, BigQuery, and Databricks. If your CDC use case is primarily 'replicate to cloud data warehouse with transformation', Striim is better positioned than IIDR. If your use case includes mainframe sources or deep IBM ecosystem integration, IIDR wins.");
  }

  // ============================================================
  // SLIDE 16 ── QLIK REPLICATE
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s, qlikGreen);
    addTitle(s, "Qlik Replicate — Data Replication & Ingestion Platform");

    s.addText("Formerly Attunity Replicate, acquired by Qlik 2019. One of the most widely deployed enterprise CDC platforms globally.", {
      x: 0.28, y: 1.02, w: 5.6, h: 0.36, fontFace: FB, fontSize: 11, color: textLight, margin: 0, italic: true
    });

    const props = [
      { l: "Log Reading",        v: "Direct SQL Server transaction log reading — no native CDC or SQL Agent required" },
      { l: "Sources",            v: "SQL Server, Oracle, MySQL, PostgreSQL, SAP, Db2, Teradata, MongoDB, files, and more" },
      { l: "Targets",            v: "Snowflake, Redshift, BigQuery, Databricks, S3, Azure Data Lake, Kafka, JDBC targets" },
      { l: "Key Differentiator", v: "Extremely broad source/target matrix; modern web-based task management console; strong DW loading optimisation" },
      { l: "Schema Evolution",   v: "Managed DDL support — propagates most schema changes; some DDL requires task reconfiguration" },
      { l: "AG Support",         v: "Always On AG topology awareness; automatic failover handling" },
      { l: "Latency",            v: "Low-latency; typically sub-second to low single-digit seconds in standard configuration" },
      { l: "Deployment",         v: "On-premises server or cloud VM; cloud-hosted options available; no SaaS-native tier" },
    ];
    let py = 1.44;
    props.forEach((p, i) => {
      const bg = i % 2 === 0 ? lightGray : white;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: py, w: 5.6, h: 0.46, fill: { color: bg }, line: { color: midGray, width: 1 } });
      s.addText(p.l, { x: 0.36, y: py + 0.08, w: 1.35, h: 0.3, fontFace: FB, fontSize: 10.5, bold: true, color: qlikGreen, margin: 0 });
      s.addText(p.v, { x: 1.82, y: py + 0.08, w: 3.96, h: 0.3, fontFace: FB, fontSize: 10.5, color: textMid, margin: 0 });
      py += 0.46;
    });

    // Best fit
    s.addShape(pres.shapes.RECTANGLE, { x: 6.18, y: 1.02, w: 3.54, h: 2.0, fill: { color: greenLight }, line: { color: greenMid, width: 1 } });
    s.addText("Best fit when:", { x: 6.28, y: 1.06, w: 3.3, h: 0.32, fontFace: FH, fontSize: 12, bold: true, color: greenMid, margin: 0 });
    const qFits = [
      "Broadest possible source/target matrix is the priority",
      "Primary use case is data warehouse or data lake loading",
      "Modern, intuitive task-based management console is valued",
      "Not IBM-centric; streaming SQL capability not needed",
    ];
    let fy2 = 1.44;
    qFits.forEach(f => {
      s.addShape(pres.shapes.RECTANGLE, { x: 6.23, y: fy2 + 0.06, w: 0.05, h: 0.27, fill: { color: greenMid }, line: { color: greenMid, width: 0 } });
      s.addText(f, { x: 6.38, y: fy2, w: 3.24, h: 0.42, fontFace: FB, fontSize: 10.5, color: textDark, margin: 0 });
      fy2 += 0.44;
    });

    // Watch outs
    s.addShape(pres.shapes.RECTANGLE, { x: 6.18, y: 3.17, w: 3.54, h: 2.1, fill: { color: amberLight }, line: { color: amber, width: 1 } });
    s.addText("Consider carefully:", { x: 6.28, y: 3.21, w: 3.3, h: 0.32, fontFace: FH, fontSize: 12, bold: true, color: amber, margin: 0 });
    const qWatches = [
      "Schema evolution less automated than IIDR or Striim — some DDL requires manual attention",
      "In-flight transformation capability limited vs. Striim",
      "Mainframe source support weaker than IBM IIDR",
      "No true SaaS tier; infrastructure required",
    ];
    let wy2 = 3.58;
    qWatches.forEach(w => {
      s.addShape(pres.shapes.RECTANGLE, { x: 6.23, y: wy2 + 0.06, w: 0.05, h: 0.27, fill: { color: amber }, line: { color: amber, width: 0 } });
      s.addText(w, { x: 6.38, y: wy2, w: 3.24, h: 0.42, fontFace: FB, fontSize: 10.5, color: textDark, margin: 0 });
      wy2 += 0.44;
    });
    s.addNotes("Qlik Replicate (formerly Attunity) is one of the most widely deployed CDC platforms in enterprise environments. Its key strength is breadth — it supports more source/target combinations than almost any competitor and has a clean, modern management console that resonates well with operations teams. The schema evolution story is good but slightly less hands-free than IIDR or Striim — some DDL changes still require attention rather than being fully automatic. It doesn't have Striim's streaming SQL engine, so complex in-flight transformation requires a separate layer. A strong choice when the primary requirement is reliable, broad-coverage data ingestion to a cloud data warehouse or data lake without needing the IBM ecosystem or streaming transformation.");
  }

  // ============================================================
  // SLIDE 17 ── VENDOR COMPARISON TABLE (5 columns)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s, teal);
    addTitle(s, "Vendor Comparison");

    const headers  = ["Capability", "Native CDC\n+ Debezium", "IBM IIDR", "Striim", "Qlik Replicate"];
    const hColors  = ["37474F", purple, ibmBlue, greenMid, qlikGreen];
    const colW     = [2.0, 1.9, 1.75, 1.75, 1.85];
    const startX   = 0.25, startY = 0.92, rowH = 0.32;

    let hx = startX;
    headers.forEach((h, i) => {
      s.addShape(pres.shapes.RECTANGLE, { x: hx, y: startY, w: colW[i], h: 0.44, fill: { color: hColors[i] }, line: { color: hColors[i], width: 0 } });
      s.addText(h, { x: hx + 0.03, y: startY, w: colW[i] - 0.06, h: 0.44, fontFace: FH, fontSize: 9.5, bold: true, color: white, align: "center", margin: 2 });
      hx += colW[i];
    });

    const rows = [
      ["Direct log reading (no SQL Agent)", "✗  Via CDC tables",  "✓  Direct",           "✓  Direct",         "✓  Direct"          ],
      ["Schema change automation",           "✗  Manual rotation", "✓  Automated",        "✓  Automated",      "~  Managed DDL"     ],
      ["AG failover awareness",              "✗  Manual resync",   "✓  Native",           "✓  Native",         "✓  Native"          ],
      ["Sub-second latency",                 "~  Polling delay",   "✓  Sub-second",       "✓  Sub-second",     "✓  Sub-second"      ],
      ["Heterogeneous sources",              "✗  SQL Server only", "✓  Multi-source",     "✓  Multi-source",   "✓  Multi-source"    ],
      ["In-flight transformation",           "~  SMTs only",       "~  Basic",            "✓  Streaming SQL",  "~  Basic only"      ],
      ["Cloud DW native connectors",         "~  Via Kafka",       "~  Via Kafka/JDBC",   "✓  Certified",      "✓  Certified"       ],
      ["Mainframe sources (IMS/VSAM)",       "✗  None",            "✓  Yes",              "✗  Limited",        "✗  Limited"         ],
      ["License cost",                       "✓  Open source",     "✗  Commercial",       "✗  Commercial",     "✗  Commercial"      ],
      ["Enterprise support SLA",             "✗  Community only",  "✓  IBM support",      "✓  Vendor SLA",     "✓  Vendor SLA"      ],
      ["Cloud-native deployment",            "~  Infra required",  "~  On-prem primary",  "✓  SaaS available", "~  On-prem / cloud" ],
    ];

    rows.forEach((row, ri) => {
      const ry = startY + 0.44 + ri * rowH;
      const bg = ri % 2 === 0 ? lightGray : white;
      let rx = startX;
      row.forEach((cell, ci) => {
        s.addShape(pres.shapes.RECTANGLE, { x: rx, y: ry, w: colW[ci], h: rowH, fill: { color: bg }, line: { color: midGray, width: 0.5 } });
        let tc = textMid;
        if (cell.startsWith("✓")) tc = greenMid;
        if (cell.startsWith("✗")) tc = red;
        if (cell.startsWith("~")) tc = amber;
        s.addText(cell, { x: rx + 0.04, y: ry + 0.03, w: colW[ci] - 0.08, h: rowH - 0.06, fontFace: FB, fontSize: 9.5, color: tc, align: ci === 0 ? "left" : "center", bold: ci === 0, margin: 0 });
        rx += colW[ci];
      });
    });
    s.addNotes("Five-column comparison. The pattern is clear: Native CDC + Debezium wins on cost (Phase 1 choice) but carries operational risk at scale. The three enterprise options all solve the core operational problems — direct log reading, AG failover, enterprise support. Differentiators: IIDR wins for IBM/mainframe environments; Striim wins for cloud DW with in-flight streaming transformation; Qlik wins for broadest source/target coverage and intuitive management without needing the IBM ecosystem or streaming SQL complexity. None of the three Phase 2 options is a wrong choice — the decision is driven by environment and roadmap.");
  }

  // ============================================================
  // SLIDE 18 ── OPERATIONAL SETUP REQUIREMENTS
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s, teal);
    addTitle(s, "What Operations Actually Has to Do");

    // Sub-header note
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 0.92, w: 9.44, h: 0.32, fill: { color: teal, transparency: 90 }, line: { color: teal, width: 1 } });
    s.addText("Enterprise CDC tools require LESS ongoing DBA effort on SQL Server than native CDC — they remove the SQL Server Agent dependency entirely.", {
      x: 0.35, y: 0.92, w: 9.3, h: 0.32, fontFace: FB, fontSize: 10, bold: true, color: tealDark, margin: 2, italic: true
    });

    const optCols  = ["Native CDC\n+ Debezium", "IBM IIDR", "Striim", "Qlik Replicate"];
    const optColors= [purple, ibmBlue, greenMid, qlikGreen];
    const colW2    = [2.0, 1.88, 1.88, 1.88, 1.88];
    const startX2  = 0.25, startY2 = 1.26, rowH2 = 0.70;

    // Header row
    s.addShape(pres.shapes.RECTANGLE, { x: startX2, y: startY2, w: colW2[0], h: 0.4, fill: { color: "37474F" }, line: { color: "37474F", width: 0 } });
    s.addText("Requirement", { x: startX2 + 0.05, y: startY2, w: colW2[0] - 0.1, h: 0.4, fontFace: FH, fontSize: 10, bold: true, color: white, margin: 2 });
    let hx2 = startX2 + colW2[0];
    optCols.forEach((h, i) => {
      s.addShape(pres.shapes.RECTANGLE, { x: hx2, y: startY2, w: colW2[i + 1], h: 0.4, fill: { color: optColors[i] }, line: { color: optColors[i], width: 0 } });
      s.addText(h, { x: hx2 + 0.03, y: startY2, w: colW2[i + 1] - 0.06, h: 0.4, fontFace: FH, fontSize: 9.5, bold: true, color: white, align: "center", margin: 2 });
      hx2 += colW2[i + 1];
    });

    const opsRows = [
      {
        label: "SQL Server\nConfig Required",
        cells: [
          "ALTER DATABASE to enable CDC; sp_cdc_enable_table per table; SQL Agent must be running",
          "Grant log-read permissions only. No CDC tables, no Agent jobs needed.",
          "Grant log-read permissions only. No CDC tables, no Agent jobs needed.",
          "Grant log-read permissions only. No CDC tables, no Agent jobs needed.",
        ],
        good: [false, true, true, true],
      },
      {
        label: "New Infrastructure\nNeeded",
        cells: [
          "Kafka Connect cluster + Apache Kafka (or managed: Confluent Cloud, Amazon MSK)",
          "IIDR server / VM + IBM CDC Management Console",
          "Striim cluster — SaaS option available or deploy on-prem nodes",
          "Qlik Replicate server (on-prem or cloud VM)",
        ],
        good: [null, null, null, null],
      },
      {
        label: "Ongoing DBA\nTasks",
        cells: [
          "Monitor SQL Agent capture/cleanup jobs; manage cleanup retention; execute schema change runbook per DDL",
          "Monitor IIDR task status only; no SQL Server Agent involvement after initial setup",
          "Monitor pipeline status only; no SQL Server Agent involvement after initial setup",
          "Monitor task status only; minimal SQL Server DBA involvement after initial setup",
        ],
        good: [false, true, true, true],
      },
      {
        label: "Schema Change\nHandling",
        cells: [
          "Manual: recreate capture instance, update Debezium connector, restart — gap window during switchover",
          "Automated: DDL captured in log and propagated to targets automatically",
          "Automated: DDL captured in log and propagated to targets automatically",
          "Managed: most DDL propagated automatically; some changes need task review",
        ],
        good: [false, true, true, null],
      },
      {
        label: "Est. DBA Setup\nEffort",
        cells: [
          "~2 hrs/database to enable CDC; ongoing schema change overhead per event",
          "~30 min: grant permissions, no CDC enablement needed",
          "~30 min: grant permissions, no CDC enablement needed",
          "~30 min: grant permissions + initial task setup via GUI",
        ],
        good: [false, true, true, true],
      },
    ];

    opsRows.forEach((row, ri) => {
      const ry = startY2 + 0.4 + ri * rowH2;
      const bg = ri % 2 === 0 ? lightGray : white;

      // Label cell
      s.addShape(pres.shapes.RECTANGLE, { x: startX2, y: ry, w: colW2[0], h: rowH2, fill: { color: "37474F" }, line: { color: midGray, width: 0.5 } });
      s.addText(row.label, { x: startX2 + 0.06, y: ry + 0.08, w: colW2[0] - 0.12, h: rowH2 - 0.16, fontFace: FH, fontSize: 10, bold: true, color: white, valign: "middle", margin: 0 });

      let rx2 = startX2 + colW2[0];
      row.cells.forEach((cell, ci) => {
        s.addShape(pres.shapes.RECTANGLE, { x: rx2, y: ry, w: colW2[ci + 1], h: rowH2, fill: { color: bg }, line: { color: midGray, width: 0.5 } });
        // Good/bad indicator dot
        if (row.good[ci] !== null) {
          const dotColor = row.good[ci] ? greenMid : red;
          s.addShape(pres.shapes.OVAL, { x: rx2 + 0.08, y: ry + 0.1, w: 0.14, h: 0.14, fill: { color: dotColor }, line: { color: dotColor, width: 0 } });
        }
        s.addText(cell, { x: rx2 + 0.26, y: ry + 0.06, w: colW2[ci + 1] - 0.32, h: rowH2 - 0.12, fontFace: FB, fontSize: 9, color: textMid, margin: 0 });
        rx2 += colW2[ci + 1];
      });
    });
    s.addNotes("This slide directly addresses the 'what does your team have to do?' question. The key message: enterprise CDC tools (IIDR, Striim, Qlik) require LESS SQL Server DBA effort than native CDC + Debezium. Native CDC requires ALTER DATABASE per database, sp_cdc_enable_table per table, SQL Agent management, and a manual schema change runbook. Enterprise tools need only read permissions to the transaction log — no CDC tables, no Agent jobs, no ongoing schema change intervention. The estimated setup effort line is particularly impactful: ~2 hours per database for native CDC vs ~30 minutes for enterprise tools. For an estate of 10 databases, that difference is significant. Use this slide proactively when the DBA or ops team objects to the complexity — point out that the Phase 2 tools actually reduce their workload.");
  }

  // ── SHARED HELPER: per-engine topology + admin slide ───────────────────────
  const makeEngineTopologySlide = (title, engineName, engineColor, optA, optB, gcpTargets, adminSteps, notes) => {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s);
    addTitle(s, title);

    s.addText("Reads the SQL Server transaction log only — zero additional load on production databases.", {
      x: 0.28, y: 0.93, w: 9.44, h: 0.28, fontFace: FB, fontSize: 11, color: textMid, margin: 0, italic: true
    });

    // ── FLOW DIAGRAM (y: 1.30 – 3.04) ──────────────────────────────────────
    const fY = 1.30, fH = 1.74;

    // Source box
    const srcX = 0.28, srcW = 1.82;
    s.addShape(pres.shapes.RECTANGLE, { x: srcX, y: fY, w: srcW, h: fH, fill: { color: navy }, line: { color: navy, width: 0 }, shadow: mkShadow() });
    s.addText("SQL Server", { x: srcX, y: fY + 0.16, w: srcW, h: 0.36, fontFace: FH, fontSize: 12, bold: true, color: white, align: "center", margin: 0 });
    s.addText("Production\n(On-Premises)", { x: srcX, y: fY + 0.54, w: srcW, h: 0.5, fontFace: FB, fontSize: 9.5, color: tealLight, align: "center", margin: 0 });
    s.addText("Transaction log\nPort 1433", { x: srcX, y: fY + 1.12, w: srcW, h: 0.48, fontFace: FB, fontSize: 8.5, color: midGray, align: "center", margin: 0, italic: true });

    // Arrow source → engine
    s.addShape(pres.shapes.LINE, { x: 2.12, y: fY + fH / 2, w: 0.46, h: 0, line: { color: navy, width: 2, endArrowType: "arrow" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 2.08, y: fY + 0.06, w: 0.54, h: 0.32, fill: { color: lightGray }, line: { color: midGray, width: 1 } });
    s.addText("reads log\nread-only", { x: 2.08, y: fY + 0.06, w: 0.54, h: 0.32, fontFace: FB, fontSize: 7, color: textDark, align: "center", margin: 1, italic: true });

    // Engine box
    const engX = 2.65, engW = 3.62;
    s.addShape(pres.shapes.RECTANGLE, { x: engX, y: fY, w: engW, h: fH, fill: { color: "F5F8FF" }, line: { color: engineColor, width: 2 }, shadow: mkShadow() });
    s.addText(engineName, { x: engX, y: fY + 0.12, w: engW, h: 0.38, fontFace: FH, fontSize: 14, bold: true, color: engineColor, align: "center", margin: 0 });
    // Option A
    s.addShape(pres.shapes.RECTANGLE, { x: engX + 0.12, y: fY + 0.60, w: engW - 0.24, h: 0.22, fill: { color: engineColor }, line: { color: engineColor, width: 0 } });
    s.addText(optA.label, { x: engX + 0.12, y: fY + 0.60, w: engW - 0.24, h: 0.22, fontFace: FB, fontSize: 9, bold: true, color: white, align: "center", margin: 0 });
    s.addText(optA.sub, { x: engX + 0.14, y: fY + 0.84, w: engW - 0.28, h: 0.32, fontFace: FB, fontSize: 8.5, color: textMid, align: "center", margin: 0 });
    // Option B
    s.addShape(pres.shapes.RECTANGLE, { x: engX + 0.12, y: fY + 1.22, w: engW - 0.24, h: 0.22, fill: { color: greenMid }, line: { color: greenMid, width: 0 } });
    s.addText(optB.label, { x: engX + 0.12, y: fY + 1.22, w: engW - 0.24, h: 0.22, fontFace: FB, fontSize: 9, bold: true, color: white, align: "center", margin: 0 });
    s.addText(optB.sub, { x: engX + 0.14, y: fY + 1.46, w: engW - 0.28, h: 0.22, fontFace: FB, fontSize: 8.5, color: textMid, align: "center", margin: 0 });

    // Arrow engine → targets
    const arr2X = engX + engW + 0.06;
    s.addShape(pres.shapes.LINE, { x: arr2X, y: fY + fH / 2, w: 0.44, h: 0, line: { color: engineColor, width: 2, endArrowType: "arrow" } });

    // GCP Targets box
    const tgtX = arr2X + 0.46, tgtW = 9.72 - tgtX;
    s.addShape(pres.shapes.RECTANGLE, { x: tgtX, y: fY, w: tgtW, h: fH, fill: { color: "EFF7F3" }, line: { color: greenMid, width: 1 } });
    s.addText("GCP TARGETS", { x: tgtX, y: fY + 0.08, w: tgtW, h: 0.26, fontFace: FH, fontSize: 9.5, bold: true, color: greenMid, align: "center", margin: 0 });
    gcpTargets.forEach((label, i) => {
      const ty = fY + 0.40 + i * 0.44;
      s.addShape(pres.shapes.RECTANGLE, { x: tgtX + 0.1, y: ty, w: tgtW - 0.2, h: 0.36, fill: { color: greenMid }, line: { color: greenMid, width: 0 } });
      s.addText(label, { x: tgtX + 0.1, y: ty, w: tgtW - 0.2, h: 0.36, fontFace: FB, fontSize: 9.5, bold: true, color: white, align: "center", margin: 0 });
    });

    // ── ADMIN SETUP (y: 3.12 – 5.30) ───────────────────────────────────────
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 3.12, w: 9.44, h: 0.28, fill: { color: engineColor }, line: { color: engineColor, width: 0 } });
    s.addText("ADMINISTRATOR SETUP — WHAT YOU NEED TO DO", {
      x: 0.28, y: 3.12, w: 9.44, h: 0.28, fontFace: FH, fontSize: 10, bold: true, color: white, align: "center", margin: 0
    });

    // 6 step boxes: w=1.5, gap=0.088, starting x=0.28
    const stpW = 1.5, stpH = 1.72, stpGap = 0.088, stpY = 3.46;
    adminSteps.forEach((step, i) => {
      const sx = 0.28 + i * (stpW + stpGap);
      s.addShape(pres.shapes.RECTANGLE, { x: sx, y: stpY, w: stpW, h: stpH, fill: { color: lightGray }, line: { color: midGray, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x: sx, y: stpY, w: stpW, h: 0.34, fill: { color: engineColor }, line: { color: engineColor, width: 0 } });
      s.addText(`${i + 1}`, { x: sx, y: stpY, w: stpW, h: 0.34, fontFace: FH, fontSize: 14, bold: true, color: white, align: "center", margin: 0 });
      s.addText(step.t, { x: sx + 0.07, y: stpY + 0.40, w: stpW - 0.14, h: 0.38, fontFace: FH, fontSize: 9.5, bold: true, color: textDark, margin: 0 });
      s.addText(step.d, { x: sx + 0.07, y: stpY + 0.80, w: stpW - 0.14, h: 0.86, fontFace: FB, fontSize: 8.5, color: textMid, margin: 0 });
    });

    s.addNotes(notes);
    return s;
  };

  // ============================================================
  // SLIDE 19-A ── IBM IIDR TOPOLOGY & ADMIN SETUP
  // ============================================================
  makeEngineTopologySlide(
    "IBM IIDR — Topology & Admin Setup",
    "IBM InfoSphere Data Replication (IIDR)",
    ibmBlue,
    { label: "Option A — On-Premises VM", sub: "Linux (RHEL/Ubuntu) or Windows Server · 4 vCPU, 16 GB RAM · sits in your data center" },
    { label: "Option B — GCP Compute Engine VM", sub: "e2-standard-4 · Linux · requires VPN or Cloud Interconnect back to SQL Server" },
    ["BigQuery", "Kafka on GCP", "Cloud Storage (GCS)"],
    [
      { t: "SQL Server permissions",     d: "Grant VIEW SERVER STATE and VIEW DATABASE STATE to the IIDR service account. No ALTER DATABASE or SQL Agent change needed." },
      { t: "Provision VM",               d: "Linux (RHEL 7+) or Windows Server 2016+. Minimum 4 vCPU, 16 GB RAM. On-prem server or GCP e2-standard-4 instance." },
      { t: "Install IIDR software",      d: "Run IBM installer. Install IIDR server + Management Console (IIMC). Requires IBM license. Installs in ~30 min." },
      { t: "Configure source",           d: "In IIMC: add SQL Server datastore — hostname, port 1433, credentials. IIDR auto-discovers schemas and tables." },
      { t: "Configure GCP target",       d: "Add BigQuery datastore (GCP service account JSON key). Or add Kafka endpoint for Kafka on GCP / Confluent." },
      { t: "Define subscription & start",d: "Select source tables → create subscription → start mirroring. IIDR runs full load once, then continuous log-based CDC." },
    ],
    "For the administrator: the two SQL commands (VIEW SERVER STATE + VIEW DATABASE STATE) are the only SQL Server-side changes needed. Everything else is configuration in the IIDR Management Console — a GUI-driven wizard. The VM sizing of 4 vCPU/16GB handles most workloads; scale up for very high TPS environments. GCP deployment requires network connectivity back to on-prem SQL Server — VPN or Dedicated Interconnect. IIDR reads the SQL Server transaction log using SQL Server's Change Tracking APIs directly, bypassing CDC tables entirely. For AG environments, IIDR can be pointed at a replica node to reduce primary load further."
  );

  // ============================================================
  // SLIDE 19-B ── STRIIM TOPOLOGY & ADMIN SETUP
  // ============================================================
  {
    const striimOrange = "E65100";
    makeEngineTopologySlide(
      "Striim — Topology & Admin Setup",
      "Striim  (SaaS or Self-Managed)",
      striimOrange,
      { label: "Option A — Striim Cloud (SaaS)", sub: "No VM to manage — Striim hosts the engine. Sign up at striim.io. Connect to SQL Server over VPN." },
      { label: "Option B — GCP Compute Engine VM", sub: "e2-standard-4 · Linux · install Striim package · connect to SQL Server over VPN or Interconnect" },
      ["BigQuery (native connector)", "Kafka on GCP / Pub/Sub", "Cloud Storage (GCS)"],
      [
        { t: "SQL Server permissions",     d: "Grant VIEW SERVER STATE and VIEW DATABASE STATE to the Striim service account. Same as IIDR — no CDC tables needed." },
        { t: "Choose deployment model",    d: "Option A: sign up for Striim Cloud — no infra to manage. Option B: provision GCP e2-standard-4, install Striim RPM/DEB package." },
        { t: "Connect to SQL Server",      d: "In Striim Flow Designer: add SQL Server Reader component. Enter host, port 1433, credentials, table list. Wizard-driven." },
        { t: "Configure GCP target",       d: "Add BigQuery Writer (native, no Kafka needed) or Kafka Writer for Kafka on GCP. Enter GCP project, dataset, service account key." },
        { t: "Design pipeline",            d: "Drag source to target in Flow Designer. Optionally insert Streaming SQL processors for in-flight transforms, masking, or joins." },
        { t: "Start pipeline",             d: "Click Start. Striim runs initial full snapshot, then switches to continuous incremental CDC automatically. Schema changes propagate without restart." },
      ],
      "Striim's key differentiator for the SQL Server → GCP use case: native BigQuery Writer connector (no Kafka intermediary required), Streaming SQL for in-flight transformation, and Striim Cloud SaaS option that removes all infrastructure management. The SaaS option is particularly valuable if GCP is the target — Striim Cloud is hosted on GCP, so data doesn't leave the cloud ecosystem. For the SQL Server connection from Striim Cloud, you still need outbound connectivity from Striim's managed environment to your on-prem SQL Server (VPN or public endpoint). The Flow Designer makes pipeline creation accessible to data engineers without deep CDC expertise."
    );
  }

  // ============================================================
  // SLIDE 20 ── RECOMMENDATION  (SQL Server → GCP context)
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s, teal);
    addTitle(s, "Our Recommendation");

    // Context banner
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 0.93, w: 9.44, h: 0.26, fill: { color: "EEF3FD" }, line: { color: teal, width: 1 } });
    s.addText("Context: MS SQL Server (on-premises) \u2192 GCP as primary target", {
      x: 0.35, y: 0.93, w: 9.3, h: 0.26, fontFace: FB, fontSize: 10.5, color: teal, bold: true, margin: 2
    });

    // Phase 1 banner
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 1.28, w: 9.44, h: 0.94, fill: { color: purpleLight }, line: { color: purple, width: 1.5 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 1.28, w: 0.08, h: 0.94, fill: { color: purple }, line: { color: purple, width: 0 } });
    s.addText("Phase 1  ·  Start now", { x: 0.5, y: 1.30, w: 2.2, h: 0.30, fontFace: FH, fontSize: 11, bold: true, color: purple, margin: 0 });
    s.addText("Native SQL Server CDC + Debezium + Kafka", { x: 0.5, y: 1.60, w: 3.6, h: 0.30, fontFace: FH, fontSize: 13, bold: true, color: purple, margin: 0 });
    s.addText("No commercial CDC license. Builds the Kafka foundation that carries into Phase 2. Gets a real-time SQL Server change stream to GCP immediately — Kafka on GCP as the bridge.", {
      x: 4.1, y: 1.32, w: 5.48, h: 0.82, fontFace: FB, fontSize: 10.5, color: textMid, margin: 0
    });

    // Phase 2 header
    s.addText("Phase 2  ·  Move to direct log-based CDC — choose your fit for SQL Server \u2192 GCP", {
      x: 0.28, y: 2.32, w: 9.44, h: 0.34, fontFace: FH, fontSize: 12, bold: true, color: textDark, margin: 0
    });

    // 3 decision cards
    const cards = [
      {
        criteria: "IBM / Mainframe in Scope",
        product: "IBM InfoSphere IIDR",
        reasons: ["Existing IBM enterprise licensing", "Mainframe sources (IMS/VSAM) in scope", "IBM DataStage or Cloud Pak for Data in use", "GCP Compute Engine or on-prem deployment"],
        color: ibmBlue,
        x: 0.28,
      },
      {
        criteria: "GCP-Native + Transformations",
        product: "Striim  \u2605 Best for SQL Server \u2192 GCP",
        reasons: ["Native BigQuery Writer — no Kafka intermediary", "Striim Cloud SaaS runs on GCP natively", "Streaming SQL for in-flight enrichment", "Simplest path: SQL Server \u2192 BigQuery direct"],
        color: greenMid,
        x: 3.44,
        highlight: true,
      },
      {
        criteria: "Broad Coverage + DW Loading",
        product: "Qlik Replicate",
        reasons: ["Widest source/target matrix", "DW loading without complex transformation", "On-prem or GCP VM deployment", "Intuitive task-based management console"],
        color: qlikGreen,
        x: 6.6,
      },
    ];

    const cardW = 3.06, cardH = 2.76, cardY = 2.74;
    cards.forEach(c => {
      const borderW = c.highlight ? 2.5 : 1;
      const borderColor = c.highlight ? c.color : midGray;
      s.addShape(pres.shapes.RECTANGLE, { x: c.x, y: cardY, w: cardW, h: cardH, fill: { color: c.highlight ? "F0FBF5" : lightGray }, line: { color: borderColor, width: borderW }, shadow: mkShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: c.x, y: cardY, w: cardW, h: 0.08, fill: { color: c.color }, line: { color: c.color, width: 0 } });
      s.addText("If: " + c.criteria, { x: c.x + 0.1, y: cardY + 0.14, w: cardW - 0.2, h: 0.38, fontFace: FH, fontSize: 10.5, bold: true, color: textDark, margin: 0 });
      s.addShape(pres.shapes.RECTANGLE, { x: c.x + 0.1, y: cardY + 0.56, w: cardW - 0.2, h: 0.4, fill: { color: c.color }, line: { color: c.color, width: 0 } });
      s.addText(c.product, { x: c.x + 0.1, y: cardY + 0.56, w: cardW - 0.2, h: 0.4, fontFace: FH, fontSize: 11, bold: true, color: white, margin: 4 });
      let iy = cardY + 1.06;
      c.reasons.forEach(r => {
        s.addShape(pres.shapes.RECTANGLE, { x: c.x + 0.14, y: iy + 0.06, w: 0.05, h: 0.24, fill: { color: c.color }, line: { color: c.color, width: 0 } });
        s.addText(r, { x: c.x + 0.28, y: iy, w: cardW - 0.4, h: 0.38, fontFace: FB, fontSize: 10, color: textDark, margin: 0 });
        iy += 0.4;
      });
    });

    // Bottom note
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 5.27, w: 9.44, h: 0.30, fill: { color: teal, transparency: 90 }, line: { color: teal, width: 1 } });
    s.addText("All Phase 2 options: direct log reading, no SQL Agent dependency, automated schema evolution, AG failover awareness, enterprise support. Striim is the primary recommendation for SQL Server \u2192 GCP.", {
      x: 0.35, y: 5.27, w: 9.3, h: 0.30, fontFace: FB, fontSize: 9.5, color: tealDark, margin: 2, italic: true
    });
    s.addNotes("Context framing: our source is MS SQL Server on-premises; our primary target is GCP (BigQuery, Kafka on GCP). Given that, Striim is the natural Phase 2 recommendation — it has a native BigQuery Writer connector (no Kafka intermediary), Striim Cloud runs on GCP natively, and the Flow Designer makes SQL Server → BigQuery pipeline creation straightforward. IIDR is the right choice if IBM mainframe sources come into scope or if IBM licensing is already in place. Qlik is valid if the requirement is broad source/target coverage without heavy transformation and a simple GUI is valued. Phase 1 remains unchanged: Native CDC + Debezium + Kafka is the no-cost, fast-start option that builds the Kafka foundation. Emphasize: Striim highlighted because it removes the Kafka intermediary for direct-to-BigQuery delivery, which simplifies the Phase 2 architecture significantly.");
  }

  // ============================================================
  // RECIPE SLIDE A ── NATIVE CDC → GCP
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s);
    addTitle(s, "Recipe: SQL Server \u2192 GCP via Native CDC + Debezium");

    // Context bar
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 0.93, w: 9.44, h: 0.26, fill: { color: purpleLight }, line: { color: purple, width: 1 } });
    s.addText("Phase 1 path  \u2022  Open-source, no commercial CDC license  \u2022  3 moving parts: SQL Server Agent + Kafka Connect + Debezium", {
      x: 0.35, y: 0.93, w: 9.3, h: 0.26, fontFace: FB, fontSize: 10, color: purple, bold: true, margin: 2
    });

    // Steps: 2 columns × 4 rows
    const recA = [
      { n: "1", t: "Enable CDC on the database",    d: "EXEC sys.sp_cdc_enable_db  — requires sysadmin or db_owner. One command per database. No application restart needed.", color: purple },
      { n: "2", t: "Enable CDC per table",           d: "EXEC sys.sp_cdc_enable_table for each table to track. Enables SQL Server Agent capture + cleanup jobs automatically.", color: purple },
      { n: "3", t: "Confirm SQL Server Agent health",d: "Agent must be running and healthy at all times. Capture/cleanup jobs are SQL Agent jobs — monitor their status and uptime.", color: amber },
      { n: "4", t: "Deploy Kafka + Kafka Connect",   d: "Confluent Cloud on GCP is the simplest option. Self-managed: Kafka cluster + Kafka Connect cluster on GCP Compute Engine VMs.", color: purple },
      { n: "5", t: "Install Debezium connector",     d: "Download Debezium SQL Server connector JAR. Deploy to Kafka Connect. Configure JSON: SQL Server hostname, credentials, table whitelist.", color: purple },
      { n: "6", t: "Deploy BigQuery sink connector", d: "Use the BigQuery Kafka Connector (Google) or Confluent BigQuery Sink. Provide GCP project ID, dataset name, service account key.", color: purple },
      { n: "7", t: "Validate and monitor",           d: "Verify row counts source vs. target. Set up alerting on CDC lag and Agent job failures. Establish baseline for change volume.", color: purple },
      { n: "8", t: "Build schema change runbook",    d: "When a source table changes: ALTER TABLE → reconfigure CDC → update Debezium config → rolling restart. Document the procedure.", color: amber },
    ];

    const rW = 4.54, rH = 0.62, rGap = 0.07, rY = 1.27;
    recA.forEach((step, i) => {
      const col = i < 4 ? 0 : 1;
      const row = i % 4;
      const rx = 0.28 + col * (rW + 0.12);
      const ry = rY + row * (rH + rGap);
      s.addShape(pres.shapes.RECTANGLE, { x: rx, y: ry, w: rW, h: rH, fill: { color: lightGray }, line: { color: midGray, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x: rx, y: ry, w: 0.34, h: rH, fill: { color: step.color }, line: { color: step.color, width: 0 } });
      s.addText(step.n, { x: rx, y: ry, w: 0.34, h: rH, fontFace: FH, fontSize: 14, bold: true, color: white, align: "center", valign: "middle", margin: 0 });
      s.addText(step.t, { x: rx + 0.42, y: ry + 0.05, w: rW - 0.5, h: 0.22, fontFace: FH, fontSize: 10.5, bold: true, color: textDark, margin: 0 });
      s.addText(step.d, { x: rx + 0.42, y: ry + 0.28, w: rW - 0.5, h: 0.30, fontFace: FB, fontSize: 8.5, color: textMid, margin: 0 });
    });

    // Warning callouts
    const warns = [
      { icon: "\u26A0", text: "SQL Server Agent must run 24/7 — stall or failure silently stops CDC capture", color: amber },
      { icon: "\u26A0", text: "Schema changes need manual runbook + Debezium restart", color: amber },
      { icon: "\u26A0", text: "AG failover may require CDC re-enablement on the new primary", color: amber },
    ];
    const wW = (9.44 - 2 * 0.12) / 3;
    warns.forEach((w, i) => {
      const wx = 0.28 + i * (wW + 0.12);
      s.addShape(pres.shapes.RECTANGLE, { x: wx, y: 5.0, w: wW, h: 0.44, fill: { color: amberLight }, line: { color: amber, width: 1 } });
      s.addText(w.icon + "  " + w.text, { x: wx + 0.06, y: 5.0, w: wW - 0.12, h: 0.44, fontFace: FB, fontSize: 9.5, color: amber, bold: true, margin: 3 });
    });

    s.addNotes("This is the Phase 1 recipe — what you actually execute. Steps 1 and 2 are SQL Server side, 3–8 are infrastructure and tooling. The amber-highlighted steps (3 and 8) are the ongoing operational risks: SQL Server Agent failure silently stops data capture, and schema changes require a documented manual process. For the GCP side, Confluent Cloud on GCP is the simplest Kafka deployment — it eliminates managing Kafka and Kafka Connect infrastructure. The BigQuery connector handles the final mile. End-to-end, this recipe takes 1–3 days for a competent team to get working for a small table set, with additional time for testing and runbook documentation.");
  }

  // ============================================================
  // RECIPE SLIDE B ── LOG-BASED CDC → GCP
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s);
    addTitle(s, "Recipe: SQL Server \u2192 GCP via Enterprise Log-Based CDC");

    // Context bar
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 0.93, w: 9.44, h: 0.26, fill: { color: "EFF7F3" }, line: { color: greenMid, width: 1 } });
    s.addText("Phase 2 path  \u2022  IBM IIDR or Striim  \u2022  Direct log reading  \u2022  No SQL Server Agent dependency  \u2022  Automated schema evolution", {
      x: 0.35, y: 0.93, w: 9.3, h: 0.26, fontFace: FB, fontSize: 10, color: greenMid, bold: true, margin: 2
    });

    const recB = [
      { n: "1", t: "Grant SQL Server permissions",   d: "GRANT VIEW SERVER STATE and VIEW DATABASE STATE to the CDC service account. No CDC tables, no SQL Agent changes. Takes ~5 minutes.", color: greenMid },
      { n: "2", t: "Deploy CDC engine",              d: "Striim Cloud: sign up at striim.io — no VM to manage. OR: provision GCP e2-standard-4 (Linux, 16 GB RAM), install IIDR or Striim package.", color: greenMid },
      { n: "3", t: "Set up network connectivity",   d: "GCP deployment: configure VPN tunnel or Cloud Interconnect from GCP VPC to on-prem network. Port 1433 must be reachable from CDC engine.", color: teal },
      { n: "4", t: "Configure SQL Server source",    d: "In tool's UI/console: enter SQL Server hostname, port 1433, credentials. Tool auto-discovers schemas and tables. Select tables to replicate.", color: greenMid },
      { n: "5", t: "Configure BigQuery target",      d: "Enter GCP project ID, BigQuery dataset, GCP service account key. Striim has native BigQuery Writer; IIDR uses JDBC or GCS landing zone.", color: greenMid },
      { n: "6", t: "Start replication",              d: "Click Start. Tool runs initial full snapshot (reads existing rows once), then automatically switches to continuous incremental CDC from the log.", color: greenMid },
      { n: "7", t: "Validate accuracy",              d: "Verify row counts and sample data source vs. BigQuery. Check replication lag metrics in tool's monitoring dashboard.", color: greenMid },
      { n: "8", t: "Ongoing — fully automated",      d: "No DBA involvement for schema changes, AG failover, or routine operation. Alert only on replication lag or connectivity issues.", color: greenMid },
    ];

    const rW = 4.54, rH = 0.62, rGap = 0.07, rY = 1.27;
    recB.forEach((step, i) => {
      const col = i < 4 ? 0 : 1;
      const row = i % 4;
      const rx = 0.28 + col * (rW + 0.12);
      const ry = rY + row * (rH + rGap);
      s.addShape(pres.shapes.RECTANGLE, { x: rx, y: ry, w: rW, h: rH, fill: { color: lightGray }, line: { color: midGray, width: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x: rx, y: ry, w: 0.34, h: rH, fill: { color: step.color }, line: { color: step.color, width: 0 } });
      s.addText(step.n, { x: rx, y: ry, w: 0.34, h: rH, fontFace: FH, fontSize: 14, bold: true, color: white, align: "center", valign: "middle", margin: 0 });
      s.addText(step.t, { x: rx + 0.42, y: ry + 0.05, w: rW - 0.5, h: 0.22, fontFace: FH, fontSize: 10.5, bold: true, color: textDark, margin: 0 });
      s.addText(step.d, { x: rx + 0.42, y: ry + 0.28, w: rW - 0.5, h: 0.30, fontFace: FB, fontSize: 8.5, color: textMid, margin: 0 });
    });

    // Benefit callouts
    const benefits = [
      { icon: "\u2713", text: "No SQL Server Agent — direct log read", color: greenMid },
      { icon: "\u2713", text: "Schema changes automated — no runbook", color: greenMid },
      { icon: "\u2713", text: "AG failover transparent — no re-enablement", color: greenMid },
    ];
    const bW = (9.44 - 2 * 0.12) / 3;
    benefits.forEach((b, i) => {
      const bx = 0.28 + i * (bW + 0.12);
      s.addShape(pres.shapes.RECTANGLE, { x: bx, y: 5.0, w: bW, h: 0.44, fill: { color: "EFF7F3" }, line: { color: greenMid, width: 1 } });
      s.addText(b.icon + "  " + b.text, { x: bx + 0.06, y: 5.0, w: bW - 0.12, h: 0.44, fontFace: FB, fontSize: 10, color: greenMid, bold: true, margin: 3 });
    });

    s.addNotes("This is the Phase 2 recipe — much simpler operationally than the native CDC path. The only SQL Server change is two GRANT statements (step 1). Everything else is configuration in the CDC tool's UI. For Striim: the Striim Cloud SaaS option removes all infrastructure management — you sign up, connect to SQL Server over VPN, configure source and target through the web UI, and start the pipeline. For IIDR: the IIDR Management Console guides you through the setup wizard. The network connectivity step (step 3) is the one piece that requires coordination with network/infrastructure teams — VPN or Cloud Interconnect provisioning. This is typically the longest lead-time item. Plan for 1–2 weeks for VPN setup if not already in place. Steps 1–8 total hands-on time (once network is ready): approximately 4–8 hours for a first pipeline, faster for subsequent databases.");
  }

  // ============================================================
  // SLIDE 17 ── PHASED ROADMAP
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: white };
    accentBar(s, teal);
    addTitle(s, "Phased Implementation Roadmap");

    // Phase 1 box
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 1.05, w: 4.35, h: 4.2, fill: { color: purpleLight }, line: { color: purple, width: 1.5 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.28, y: 1.05, w: 4.35, h: 0.44, fill: { color: purple }, line: { color: purple, width: 0 } });
    s.addText("Phase 1 — Near-Term", { x: 0.33, y: 1.05, w: 4.24, h: 0.44, fontFace: FH, fontSize: 14, bold: true, color: white, margin: 4 });
    s.addText("Native SQL Server CDC + Debezium", { x: 0.33, y: 1.54, w: 4.24, h: 0.35, fontFace: FB, fontSize: 12, bold: true, color: purple, margin: 0 });

    const p1 = ["Enable CDC on target SQL Server databases","Deploy Debezium via Kafka Connect","Establish Kafka topics per source table","Build initial consumer pipelines","Document schema change runbook","Monitor Agent jobs and CDC lag metrics","Inventory data type coverage on all tracked tables","Set CDC cleanup retention to 7+ days"];
    let p1y = 1.95;
    p1.forEach(item => {
      s.addShape(pres.shapes.RECTANGLE, { x: 0.42, y: p1y + 0.05, w: 0.06, h: 0.26, fill: { color: purple }, line: { color: purple, width: 0 } });
      s.addText(item, { x: 0.58, y: p1y, w: 3.9, h: 0.36, fontFace: FB, fontSize: 10.5, color: textDark, margin: 0 });
      p1y += 0.37;
    });

    // Arrow
    s.addShape(pres.shapes.LINE, { x: 4.73, y: 3.15, w: 0.58, h: 0, line: { color: teal, width: 3, endArrowType: "arrow" } });
    s.addText("Trigger:\nschema change\nfriction, new\nsources, or\nsub-sec latency", { x: 4.63, y: 2.35, w: 0.72, h: 1.5, fontFace: FB, fontSize: 7.5, color: textLight, align: "center", margin: 0, italic: true });

    // Phase 2 box
    s.addShape(pres.shapes.RECTANGLE, { x: 5.42, y: 1.05, w: 4.35, h: 4.2, fill: { color: tealLight }, line: { color: teal, width: 1.5 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.42, y: 1.05, w: 4.35, h: 0.44, fill: { color: teal }, line: { color: teal, width: 0 } });
    s.addText("Phase 2 — Enterprise CDC", { x: 5.47, y: 1.05, w: 4.24, h: 0.44, fontFace: FH, fontSize: 14, bold: true, color: white, margin: 4 });
    s.addText("IBM IIDR  or  Striim", { x: 5.47, y: 1.54, w: 4.24, h: 0.35, fontFace: FB, fontSize: 12, bold: true, color: teal, margin: 0 });

    const p2 = ["Vendor evaluation / POC (IIDR vs. Striim)","Deploy direct log reader — remove CDC tables","Validate automated schema evolution in non-prod","Expand source coverage (Oracle, Db2, PostgreSQL)","Validate AG failover continuity in staging","Migrate consumers to enterprise CDC event schema","Decommission Debezium connectors per source","Establish enterprise support contract and SLA"];
    let p2y = 1.95;
    p2.forEach(item => {
      s.addShape(pres.shapes.RECTANGLE, { x: 5.56, y: p2y + 0.05, w: 0.06, h: 0.26, fill: { color: teal }, line: { color: teal, width: 0 } });
      s.addText(item, { x: 5.72, y: p2y, w: 3.9, h: 0.36, fontFace: FB, fontSize: 10.5, color: textDark, margin: 0 });
      p2y += 0.37;
    });
    s.addNotes("The roadmap communicates the two-phase commitment clearly. Phase 1 delivers real value immediately with no commercial CDC license. Phase 2 is the destination that removes the operational rough edges. The trigger for Phase 2 is a condition, not a date — schema changes becoming painful, the estate expanding beyond SQL Server, or sub-second latency becoming a requirement. Building Phase 1 on Kafka is intentional: that infrastructure carries forward. The Debezium connectors get replaced; the topics, consumer pipelines, and monitoring stack remain. Phase 1 is a genuine stepping stone, not throwaway work.");
  }

  // ============================================================
  // SLIDE 18 ── SUMMARY
  // ============================================================
  {
    const s = pres.addSlide();
    s.background = { color: navy };
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.1, h: H, fill: { color: teal }, line: { color: teal, width: 0 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: H - 0.65, w: W, h: 0.65, fill: { color: tealDark }, line: { color: tealDark, width: 0 } });

    s.addText("Summary & Recommendation", {
      x: 0.3, y: 0.18, w: 9.4, h: 0.6, fontFace: FH, fontSize: 28, bold: true, color: white, margin: 0
    });

    const pts = [
      { n: "1", t: "Log-based CDC is operationally negligible on source systems.",     d: "It reads the transaction log SQL Server writes regardless. Zero additional write load. No application changes. No source schema changes.",                              color: teal    },
      { n: "2", t: "Native SQL Server CDC is functional but operationally fragile at scale.", d: "SQL Agent dependency, schema change handling, and AG failover complexity create recurring operational burden that grows with the estate.",                          color: amber   },
      { n: "3", t: "Phase 1 with Debezium is the right near-term choice.",             d: "Open source, Kafka-native, and delivers a real change stream. Plan explicitly for schema changes, LSN offset management, and CDC cleanup retention.",                   color: purple  },
      { n: "4", t: "Phase 2 with IBM IIDR or Striim resolves the friction.",           d: "Direct log reading, automated schema evolution, AG awareness, and enterprise support. IIDR for IBM/mainframe environments; Striim for cloud DW and streaming scenarios.", color: greenMid },
    ];

    let py = 0.95;
    pts.forEach(p => {
      s.addShape(pres.shapes.OVAL, { x: 0.28, y: py + 0.04, w: 0.44, h: 0.44, fill: { color: p.color }, line: { color: p.color, width: 0 } });
      s.addText(p.n, { x: 0.28, y: py + 0.04, w: 0.44, h: 0.44, fontFace: FH, fontSize: 14, bold: true, color: white, align: "center", valign: "middle", margin: 0 });
      s.addText(p.t, { x: 0.88, y: py,       w: 8.84, h: 0.3,  fontFace: FH, fontSize: 12.5, bold: true, color: white, margin: 0 });
      s.addText(p.d, { x: 0.88, y: py + 0.3,  w: 8.84, h: 0.38, fontFace: FB, fontSize: 10.5, color: midGray, margin: 0 });
      py += 0.78;
    });

    s.addText("Questions & Discussion", { x: 0.3, y: H - 0.55, w: 9.4, h: 0.38, fontFace: FH, fontSize: 14, bold: true, color: white, margin: 0 });

    s.addNotes("Four points to leave the room with. The first and most important is the operational impact answer — worth repeating one more time: CDC adds no write load to source systems. The transaction log is already being written. We're reading it. For the technical team: the Phase 1 ask is modest and well-understood. For leadership: the two-phase approach delivers value immediately while building toward an enterprise-grade platform. The Kafka infrastructure investment in Phase 1 carries forward to Phase 2, making it a genuine stepping stone rather than throwaway work.");
  }

  await pres.writeFile({ fileName: "/sessions/eloquent-optimistic-dirac/mnt/outputs/CDC_Strategy.pptx" });
  console.log("Done!");
}

main().catch(console.error);
