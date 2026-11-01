# ⚡ Ohm My Vibe!

**Circuit theory meets vibe coding.**

An **unofficial, offline-first, Persian-language interactive electronics learning workspace** inspired by PSpice and OrCAD Capture, built with HTML, CSS, and vanilla JavaScript.

![Version](https://img.shields.io/badge/version-0.6.0-blue) ![Status](https://img.shields.io/badge/status-pre--release-orange) ![Roadmap](https://img.shields.io/badge/roadmap-64%25-purple) ![License](https://img.shields.io/badge/license-not%20selected-lightgrey)

[![Download v0.6.0 ZIP](https://img.shields.io/badge/Download-v0.6.0%20ZIP-2ea44f?style=for-the-badge&logo=github)](https://github.com/maklf-dev/ohm-my-vibe/releases/download/v0.6.0/PSpice_OrCAD_Offline_Phase5_v0.6.0.zip)

**[All releases](https://github.com/maklf-dev/ohm-my-vibe/releases)** · **[Report an issue](https://github.com/maklf-dev/ohm-my-vibe/issues)**

> **Work in progress:** v0.6.0 completes Phase 5 of an eight-phase development roadmap, reaching **64% weighted progress**. This is an educational prototype, **not** an official Cadence product or a general-purpose SPICE simulator.

## 📖 About

**Ohm My Vibe!** helps Persian-speaking learners explore circuit design using a browser-based workspace modeled on selected PSpice / OrCAD Capture concepts. It combines a Persian learning center, guided lessons, a Capture-inspired schematic editor, and limited interactive circuit validation. It requires no backend or build process.

## 🆕 What's new in v0.6.0 — Phase 5

- **Create an Analog or Mixed A/D project** and open a blank schematic sheet.
- **Place Part:** insert `R`, `C`, `VDC`, and ground (`0`) from limited `ANALOG`, `SOURCE`, and `CAPSYM` libraries. Enable or disable libraries and see the available parts update.
- **Edit the schematic:** select, move, rotate, and delete components; double-click to edit values and display formatting.
- **Draw wires:** orthogonal horizontal/vertical routing, terminal snapping, live preview, wire selection/deletion, and exit using `Esc` or the right-click **End Mode** command.
- **Check electrical connections:** identify nodes, missing connections, missing ground, and selected short-circuit conditions for the supplied reference circuit.
- **Load the 200 V example:** `V1 = 200 V`, `R1 = 2 kΩ`, `R2 = 4 kΩ`, `R3 = 3 kΩ`; validate `R1` in parallel with the series branch `R3 + R2`, with the negative source terminal grounded.
- **Save and reopen** educational schematic projects using JSON format **v3**, with backward opening support for earlier **v2** files.
- Refined circuit-check panel and updated Persian tutorial guidance.

**Scope:** The connection checker is tailored to the reference topology (one DC source, three resistors, and ground). It is **not** a general electrical-netlist validator or numeric circuit solver.

## ✨ Features carried forward

- Persian welcome screen with Introduction, Download & Installation, and Resources tabs.
- Six-step educational installation guide and links to official external resources.
- **16-topic** Persian learning center with guided UI interactions, progress, and lesson summaries.
- PSpice A/D-inspired and Capture-inspired workspaces.
- Offline reference atlas and bundled educational images.
- Preserved legacy RC transient-analysis example, separate from the new schematic workspace.
- Modular source files plus a bundled standalone HTML entry point.

## 📥 Download and quick start

1. Download the **v0.6.0 ZIP** using the button above, or visit [Releases](https://github.com/maklf-dev/ohm-my-vibe/releases).
2. **Extract the entire archive**; reference images are loaded from relative paths.
3. Open `PSpice-Offline/index-standalone.html` in a current Chrome or Edge browser.
4. From the Persian welcome screen, enter the simulator workspace and choose the Capture-inspired interface.
5. Select **Load Sample Circuit** (the Persian equivalent is **بارگذاری مدار نمونه**) to open the 200 V circuit, then run **Check Connections** (**بررسی اتصال‌ها**).
6. Double-click a component to change its value; press `W` to wire and `Esc` to exit the active mode.
7. Use **File → Save** to export an educational JSON project and **File → Open** to restore it.

For the older RC example, open `PSpice-Offline/legacy/index-standalone.html`.

No Node.js, npm, backend, or installer is needed. **Direct `file://` execution was not confirmed in the supplied test environment**, so local-browser behavior may vary. External documentation and official software download links require internet access; no official Cadence installer is bundled.

## 🗂️ Project structure

```text
PSpice-Offline/
├── index-standalone.html              # Bundled offline entry point
├── index.html                         # Modular development entry
├── capture.js / capture.css           # Capture-inspired schematic workspace
├── phase5.css                         # Phase 5 interface styling
├── welcome.js / welcome.css           # Welcome and installation sections
├── welcome.html.frag
├── tutorial-manager.js / tutorial-manager.css
├── examples/
│   ├── DC_Circuit_Demo.capture-demo.json
│   └── RC_DEMO.pspice-demo.json
├── legacy/                            # Earlier RC demonstration
├── reference/                         # Reference images and metadata
├── reference-atlas.html
├── vendor/                             # Driver.js placeholder files
├── README-FA.md
├── PHASE-5-REPORT-FA.md
└── PHASE-5-TEST-REPORT-FA.md
```

## 🧭 Development roadmap

| Phase | Milestone | Status |
|---|---|---|
| 1 | Source inventory and baseline | Complete |
| 2 | Capture-inspired interface reconstruction | Complete |
| 3 | Persian interactive learning center | Complete |
| 4 | Welcome screen, history, installation guidance, and resources | Complete |
| 5 | Project creation, component libraries, wiring, and 200 V reference circuit | **Complete in v0.6.0** |
| 6 | Numerical voltage/current/power calculations, simulation profiles and selected analyses | Planned |
| 7 | Driver.js integration and expanded educational content | Planned |
| 8 | Offline validation and release hardening | Planned |

**Weighted roadmap completion: 64%.** This represents implementation milestones, not production readiness or simulator accuracy.

## 🧪 Testing

The supplied Phase 5 report documents Chromium/Playwright tests using embedded standalone HTML at **1280×720**, **1366×768**, and **1920×1080**. Tested scenarios include:

- Loading and validating the five-component reference circuit.
- Detecting a missing ground wire and validating the repaired connection.
- Detecting a completely unwired circuit.
- Editing a resistor value without invalidating its topology.
- Creating a project, placing a resistor, and filtering parts by enabled library.
- Exiting placement mode, saving JSON, and opening the tutorial.
- Confirming the 16-topic learning center remains available.
- Checking for JavaScript errors, horizontal overflow, and network requests in the tested embedded environment.

**Testing caveats:** Direct `file://` browser testing was blocked by the test environment and **was not verified**. The standalone HTML was tested via `page.set_content`; operating-system compatibility and pixel-perfect comparison with installed OrCAD were not assessed.

Read [Phase 5 development report](PHASE-5-REPORT-FA.md) and [Phase 5 test report](PHASE-5-TEST-REPORT-FA.md).

## ⚠️ Known limitations

- **No general-purpose SPICE engine** in the new Capture-inspired workspace.
- No numerical voltage/current/power solution in Phase 5; these are planned for Phase 6.
- Simulation Profile, Probe, Transient, DC Sweep, AC Sweep, and Bias Point are not yet integrated with the new schematic workspace.
- Connection validation is limited to the specific reference circuit and topology.
- Projects are saved as **educational JSON**, not native OrCAD `.dsn` files.
- The earlier RC demo is separate from the new editor.
- Bundled Driver.js assets are placeholders; a custom offline guide currently handles tutorials.
- The reference image bundle may contain third-party material requiring permission before public redistribution.

## 🔗 External learning resources

- [Cadence OrCAD Academic](https://www.cadence.com/en_US/home/tools/pcb-design-and-analysis/orcad/academic.html)
- [PSpice for TI](https://www.ti.com/tool/PSPICE-FOR-TI)
- [FlowCAD PSpice 17.2 Lite Quick Start (historical guide)](https://www.flowcad.de/AN/FlowCAD_AN_Quick_Start_PSpice_172_Lite.pdf)

These are external third-party references, not included installers. No new external download resource was added in Phase 5.

## 🤝 Feedback

Bug reports, accessibility feedback, and educational corrections are welcome via [GitHub Issues](https://github.com/maklf-dev/ohm-my-vibe/issues). Please do not submit proprietary executables or unlicensed reference assets.

## ⚖️ License and legal notice

**No open-source license has been selected yet.** The repository's public availability does not itself grant general permission to reuse or redistribute the original code or third-party assets.

This is an **independent, unofficial educational project** and is not affiliated with, endorsed by, or sponsored by Cadence Design Systems. PSpice, OrCAD, and Cadence are names/trademarks of their respective owners, used here for identification and educational context. No official Cadence executable or proprietary SPICE engine is distributed with this project.

Reference images may require separate redistribution permission. A future license for original code will not automatically cover third-party content.

## 👨‍💻 Author

Made with curiosity, circuits, and a little vibe coding by **[maklf-dev](https://github.com/maklf-dev)**.

If you find the project useful, consider starring the repository ⭐.
