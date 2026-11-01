# ⚡ Ohm My Vibe!

**Circuit theory meets vibe coding.**

An **unofficial, offline-first, Persian-language interactive learning workspace** inspired by PSpice and OrCAD Capture, built with HTML, CSS, and vanilla JavaScript.

![Version](https://img.shields.io/badge/version-0.5.0-blue) ![Status](https://img.shields.io/badge/status-pre--release-orange) ![Roadmap](https://img.shields.io/badge/roadmap-44%25-purple) ![License](https://img.shields.io/badge/license-not%20selected-lightgrey)

[![Download v0.5.0](https://img.shields.io/badge/Download-v0.5.0%20ZIP-2ea44f?style=for-the-badge&logo=github)](https://github.com/maklf-dev/ohm-my-vibe/releases/download/v0.5.0/PSpice_OrCAD_Offline_Phase4_v0.5.0.zip)

**[All releases](https://github.com/maklf-dev/ohm-my-vibe/releases)** · **[Report an issue](https://github.com/maklf-dev/ohm-my-vibe/issues)**

> **Work in progress:** Version 0.5.0 completes Phase 4 of an eight-phase roadmap (44% weighted progress). This is a teaching prototype, **not** an official Cadence product or a complete SPICE simulator.

## About

Ohm My Vibe! helps Persian-speaking learners explore circuit-design concepts and familiar PSpice/OrCAD Capture-style workflows through a browser-based interface and guided tutorials. The project runs locally without a backend or build step.

## What's new in v0.5.0: Phase 4

- **New Persian welcome screen** with three sections: Introduction, Download & Installation, and Resources.
- **Software background and timeline**, including an explanation of Capture versus PSpice.
- **Interactive six-step installation guide** with two official software options.
- **Official external resources** for Cadence OrCAD academic offerings, PSpice for TI, and a historical FlowCAD 17.2 guide.
- **Navigation between the welcome screen, PSpice A/D-inspired workspace, Capture-inspired interface, and learning center.**
- **Installation-topic completion and summary** integrated with the existing guided-learning experience.
- **Offline reference atlas** and locally bundled reference images.
- Preserved earlier Phase 1–3 functionality and the legacy RC example.

External installation and documentation links require internet access. **No official PSpice/OrCAD installers are included.** Current official software may differ from the historical 17.2 interface.

## Existing learning features

- Persian floating learning center with **16 topics** and guided navigation.
- UI highlighting, topic progress, explanations, and lesson summaries.
- Capture-inspired project and schematic UI workflows (partially implemented).
- A preserved **legacy RC transient-analysis demonstration**, separate from the new workspace.
- Modular development files and a bundled standalone HTML entry point.

**Important:** The new Capture-inspired environment does not yet contain a general-purpose SPICE simulation engine. The legacy RC demo is limited to its educational example.

## Quick start

1. Download the ZIP using the button above, or open [Releases](https://github.com/maklf-dev/ohm-my-vibe/releases).
2. **Extract the entire archive**; the Resources tab uses relative image paths.
3. Open `PSpice-Offline/index-standalone.html` in a current Chrome or Edge browser.
4. Explore the Introduction, Download & Installation, and Resources tabs.
5. Enter the simulated workspace or open the learning center to follow tutorials.
6. For the older RC example, open `PSpice-Offline/legacy/index-standalone.html`.

No Node.js, npm, backend, or local server is required by the packaged application design. However, direct `file://` execution and local image loading have **not** been independently verified in the supplied browser test environment and can vary with browser security settings.

## Project structure

```text
PSpice-Offline/
├── index-standalone.html       # Recommended bundled entry point
├── index.html                  # Modular development entry
├── welcome.css / welcome.js   # Phase 4 welcome and installation UI
├── welcome.html.frag
├── capture.css / capture.js   # Capture-inspired workspace
├── tutorial-manager.css / tutorial-manager.js
├── examples/                  # Example circuit data
├── legacy/                    # Previous RC demonstration
├── reference/                 # Reference images, reports and metadata
├── reference-atlas.html
├── vendor/                    # Driver.js placeholder assets
├── README-FA.md
├── PHASE-4-REPORT-FA.md
└── PHASE-4-TEST-REPORT-FA.md
```

## Roadmap

| Phase | Focus | Status |
|---|---|---|
| 1 | Baseline and source inventory | Complete |
| 2 | Capture-inspired interface | Complete |
| 3 | Persian interactive learning center | Complete |
| 4 | Welcome screen, software history, installation guide and resources | **Complete (v0.5.0)** |
| 5 | Project creation, component libraries and 200 V resistor circuit | Planned |
| 6 | Extended simulation and analysis workflows | Planned |
| 7 | Driver.js integration and expanded lessons | Planned |
| 8 | Offline validation and release hardening | Planned |

**Weighted roadmap progress: 44%.** This is a development milestone measure, not a production-readiness score.

## Testing and known limitations

Phase 4's supplied test report records Chromium interaction checks at **1280×720**, **1366×768**, and **1920×1080**, including welcome tabs, six-step guidance, learning-center navigation, and a regression check of project creation. No JavaScript errors were observed in those scenarios.

The report also states that direct local-file browsing was blocked in its test environment; real-user `file://` execution was therefore **not confirmed**. The local images were validated as files but not visually loaded in that browser test. Pixel-perfect comparison against official OrCAD 17.2 was not performed.

Additional limitations:
- No full SPICE engine or complete native OrCAD project compatibility.
- The previous RC demo is not integrated into the new Capture workspace.
- The packaged Driver.js files remain placeholders; a custom offline tutorial engine is currently used.
- Future phases will expand circuit libraries, connections, component properties, and analyses.

See [Phase 4 implementation report](PHASE-4-REPORT-FA.md) and [Phase 4 test report](PHASE-4-TEST-REPORT-FA.md).

## Official external references

- [Cadence OrCAD Academic](https://www.cadence.com/en_US/home/tools/pcb-design-and-analysis/orcad/academic.html)
- [PSpice for TI](https://www.ti.com/tool/PSPICE-FOR-TI)
- [FlowCAD PSpice 17.2 Lite Quick Start (historical PDF)](https://www.flowcad.de/AN/FlowCAD_AN_Quick_Start_PSpice_172_Lite.pdf)
- [Cadence PSpice for TI FAQs](https://www5.cadence.com/pspice-for-ti-faqs)

These are third-party resources, not bundled software.

## Feedback and contributions

Issues, bug reports, accessibility improvements, and educational corrections are welcome. Please do not submit proprietary binaries or unlicensed assets.

## License and trademarks

**No open-source license has been selected yet.** Unless otherwise stated, the repository's original code is not offered under a general reuse or redistribution license.

This is an **independent, unofficial educational project** and is not affiliated with, endorsed by, or sponsored by Cadence Design Systems. PSpice, OrCAD, and Cadence are names/trademarks of their respective owners. References to those products are for identification and educational context.

Some reference images originate from supplied educational materials; their redistribution rights should be checked before publishing the archive publicly. A future code license would not automatically cover third-party assets.

## Author

Made with curiosity, circuits, and a little vibe coding by **[maklf-dev](https://github.com/maklf-dev)**.

If this learning project is useful, consider giving it a ⭐.
