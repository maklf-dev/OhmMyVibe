# ⚡ Ohm My Vibe!

### A little circuit theory, a little vibe coding, and a lot of learning.

**An unofficial, offline-first, Persian interactive learning workspace inspired by PSpice and OrCAD Capture.**

**Status:** Work in Progress  
**Version:** 0.4.0  
**Roadmap Progress:** 38%  
**Stack:** HTML, CSS, JavaScript

[![Download v0.4.0 ZIP](https://img.shields.io/badge/Download-v0.4.0%20ZIP-2ea44f?style=for-the-badge)](https://github.com/maklf-dev/ohm-my-vibe/releases/download/v0.4.0/PSpice_OrCAD_Offline_Phase3_v0.4.0.zip)

[Browse all releases](https://github.com/maklf-dev/ohm-my-vibe/releases) · [Report an issue](https://github.com/maklf-dev/ohm-my-vibe/issues)

> **Early Development Release:** This project is not finished software, an official Cadence product, or a general-purpose SPICE simulator.

## 📖 About

**Ohm My Vibe!** is a browser-based learning project that recreates selected interface concepts and workflows associated with PSpice and OrCAD Capture.

It combines a desktop-inspired interface with Persian, step-by-step interactive tutorials to help beginners understand electronic circuit-design concepts.

The project uses vanilla HTML, CSS, and JavaScript. It requires no backend, build system, package installation, or mandatory internet connection.

The current interface is primarily inspired by the OrCAD Capture Lite 17.2 learning environment.

## ✨ Current Features

- PSpice / OrCAD Capture-inspired browser interface.
- Floating Persian learning center.
- 16 educational topics across 5 categories.
- 57 guided steps with interface highlighting.
- Tutorial search, navigation, progress indicators, and lesson summaries.
- Relevant formulas and calculation notes.
- Movable and collapsible learning panel.
- Optional progress persistence using browser local storage, where supported.
- Limited interactive project and schematic workflows.
- Preserved legacy RC circuit demonstration with transient-analysis plotting.
- Self-contained offline HTML version.
- Detailed Persian development and testing reports.

**Note:** Some tutorials are educational previews. Their corresponding application workflows are not yet fully implemented.

## 📥 Download and Installation

1. Download the current ZIP from the button above or from the Releases page.
2. Extract the archive while preserving its folder structure.
3. Open `PSpice-Offline/index-standalone.html` in Chrome or Edge.
4. Launch the Persian Learning Center and choose a topic.
5. Follow the guided instructions.
6. To explore the earlier RC demo, open `PSpice-Offline/legacy/index-standalone.html`.

No Node.js, npm, or installer is required.

Direct `file://` execution and persistent local storage still require wider compatibility testing on target browsers.

## 🗂️ Project Structure

- `index-standalone.html`: self-contained offline application.
- `index.html`: modular development entry point.
- `capture.js` and `capture.css`: main workspace behavior and styling.
- `tutorial-manager.js` and `tutorial-manager.css`: guided tutorials, progress, and learning center.
- `examples/`: sample circuit data.
- `legacy/`: preserved RC simulation demonstration.
- `reference/`: research and visual references, subject to redistribution rights.
- `reference-atlas.html`: reference browsing page.
- `README-FA.md`: Persian release documentation.
- `PHASE-3-REPORT-FA.md`: implementation details.
- `PHASE-3-TEST-REPORT-FA.md`: test notes.

## 🧭 Development Roadmap

| Phase | Milestone | Status |
|---|---|---|
| 1 | Source inventory and baseline | Complete |
| 2 | PSpice / Capture interface reconstruction | Complete |
| 3 | Persian interactive learning center | Complete |
| 4 | Welcome page, history, and installation guidance | Planned |
| 5 | Extended circuit exercises and libraries | Planned |
| 6 | Expanded simulation and analysis workflows | Planned |
| 7 | Driver.js integration and improved learning content | Planned |
| 8 | Offline testing and release hardening | Planned |

**Current weighted roadmap completion: 38%.**

This is an internal milestone measurement, not a production-readiness score.

## ⚠️ Known Limitations

- No general-purpose SPICE engine in the new workspace.
- Native `.opj` and `.dsn` import/export is not supported.
- Advanced analyses are partially represented by educational previews.
- The legacy RC example is not a generalized simulation engine.
- The bundled Driver.js files are placeholders. The current Persian tutorial system uses a custom offline engine.
- Browser-specific storage and local-file behavior require additional testing.
- UI fidelity, accessibility, and simulation coverage are still evolving.

## 🧪 Testing

The Phase 3 test report documents Chromium-based checks at 1280×720, 1366×768, and 1920×1080.

Testing covered educational navigation, topic completion, selected interface actions, and regression checks against the previous RC demonstration.

These checks do not establish full simulator accuracy or universal browser compatibility.

For detailed results, see [Phase 3 Test Report](PHASE-3-TEST-REPORT-FA.md).

## 🤝 Feedback and Contributions

Bug reports, accessibility suggestions, educational corrections, and implementation feedback are welcome through GitHub Issues.

Please discuss major changes before submitting extensive contributions. Do not submit proprietary executables or unlicensed third-party assets.

## ⚖️ Legal Notice

This is an independent, unofficial educational reconstruction and is **not affiliated with, sponsored by, endorsed by, or approved by Cadence Design Systems, Inc.**

Cadence, PSpice, and OrCAD are trademarks of their respective owners. Their names are used for identification and educational reference.

No official Cadence executable or proprietary simulation engine is distributed with this project.

Some reference imagery originates from educational materials and may require additional permission before redistribution.

**License status:** An open-source license has not yet been selected. Public availability does not grant unrestricted reuse or redistribution rights. Code licensing and third-party asset rights should be reviewed separately.

## 👨‍💻 Author

Built with curiosity, circuit theory, and a little vibe coding by **[maklf-dev](https://github.com/maklf-dev)**.

If you find the project useful, consider giving the repository a ⭐.