# ⚡ Ohm My Vibe!

### Circuit theory meets vibe coding.

**An independent, Persian-language, offline educational workspace inspired by classic OrCAD Capture and PSpice workflows.**

[![Release](https://img.shields.io/badge/release-v1.0.0-2563eb?style=flat-square)](https://github.com/maklf-dev/ohm-my-vibe/releases/tag/v1.0.0)
![Status](https://img.shields.io/badge/status-stable%20presentation-198754?style=flat-square)
![Offline](https://img.shields.io/badge/offline-ready-0f766e?style=flat-square)
![Technology](https://img.shields.io/badge/HTML%20%7C%20CSS%20%7C%20JavaScript-no%20build%20step-f59e0b?style=flat-square)
![Project license](https://img.shields.io/badge/project%20license-not%20selected-lightgrey?style=flat-square)

[![Download v1.0.0](https://img.shields.io/badge/Download-v1.0.0%20ZIP-2ea44f?style=for-the-badge&logo=github)](https://github.com/maklf-dev/ohm-my-vibe/releases/download/v1.0.0/PSpice_OrCAD_Presentation_v1.0.0.zip)

**[All releases](https://github.com/maklf-dev/ohm-my-vibe/releases)** · **[Report an issue](https://github.com/maklf-dev/ohm-my-vibe/issues)** · **[Author](https://github.com/maklf-dev)**

> [!IMPORTANT]
> **Educational recreation, not official software.** This project is not affiliated with or endorsed by Cadence Design Systems. It does **not** include the commercial PSpice simulation engine, reproduce the full functionality of OrCAD Capture, or open native `.dsn`/`.opj` projects. Analysis demonstrations are limited to supported teaching examples.

## 📖 Overview

**Ohm My Vibe!** makes introductory circuit-design concepts approachable through an interactive, browser-based learning environment. It combines a classic desktop-style schematic workspace with a **Persian guided tour** and focused demonstrations of circuit analysis.

Version **1.0.0** is the **cleaned-up, consolidated presentation release**: the interface, styles, scripts, educational content, and **Driver.js** are bundled in one standalone HTML page. The ZIP also includes the Driver.js license notice.

This release is complete as a **self-contained educational presentation**. It is **not** a claim of feature parity with commercial PSpice/OrCAD software or universal SPICE simulation support.

## ✨ Features

### 🖥️ Capture-inspired interface

- Familiar desktop-style menus, toolbars, project navigation, schematic canvas, and simulation controls.
- Create educational projects and open a provided sample schematic.
- Place and edit supported electrical components, connect them with wires, and inspect connections.
- Use basic schematic editing, zoom, and circuit-validation tools.
- Save and reopen projects using the application's **educational JSON format**.
- Explore contextual explanations for tools and commands. Some classic UI commands are informational demonstrations rather than fully implemented editors.

### 📚 Guided Persian learning

- **16 learning topics** across **5 categories**, with **57 guided steps**.
- Step-by-step walkthroughs with highlights, popovers, actions, and learning summaries.
- Integrated **Driver.js v1.10.2** for interactive guided tours.
- A built-in guided-tour fallback if the Driver.js engine cannot be initialized.
- Searchable lesson catalog, progress tracking, resume, and progress reset.
- Local progress storage where permitted by the browser.

### 🔬 Educational circuit analysis

- Configure **simulation profiles** and inspect analysis settings.
- **DC Bias Point:** node voltages, branch currents, and component power for the supported reference circuit.
- **DC Sweep:** vary the reference source voltage and display calculated responses.
- **Transient:** examine the reference circuit's constant-DC response and a **separate analytical RC example**.
- **AC Sweep:** explore a **separate analytical RC low-pass demonstration** with gain and phase.
- View results in a **Probe-inspired SVG plot window**, with curve controls and CSV export.
- Enable voltage, current, and power annotations on the supported schematic.

> These analysis features are **deliberately limited**. They are not a general netlist solver, arbitrary-circuit SPICE engine, transistor-model simulator, or comprehensive noise analyzer. The RC demonstrations are separate from the schematic's numerical circuit model.

### 🌐 Welcome and resources

- Persian introduction explaining the relationship between SPICE, PSpice, and Capture.
- Interactive installation guidance and links to **official Cadence and Texas Instruments resources**.
- Clear entry points into the educational workspace and learning center.

External resource links need an internet connection; the **local presentation itself does not require an online runtime**.

## 📥 Download and run

1. Click **Download v1.0.0 ZIP** above (or open [Releases](https://github.com/maklf-dev/ohm-my-vibe/releases)).
2. Download `PSpice_OrCAD_Presentation_v1.0.0.zip`.
3. Extract the archive.
4. Open **`PSpice-OrCAD-Presentation/index.html`** in a modern desktop browser, preferably Chrome or Edge.
5. Explore the welcome page, enter the Capture-inspired environment, and open the Persian learning center.
6. Load the sample circuit, validate the connections, create a simulation profile, and try a supported analysis.

**Requirements:** A modern browser with JavaScript enabled. There is **no installer, npm setup, Node.js runtime, backend, CDN, or internet connection required to launch the local app**.

> **Browser note:** Progress persistence under `file://` may vary across browsers and privacy settings. The interface is primarily desktop-oriented; small-screen/mobile layouts are not presented as fully supported.

## 🧭 Suggested learning path

1. **Introduction:** understand what schematic capture and circuit simulation each do.
2. **Workspace:** identify menus, toolbars, project panels, and drawing tools.
3. **Schematic:** create a training project, place components, draw wires, and validate connectivity.
4. **Simulation:** open a profile and select a supported analysis type.
5. **Results:** compare expected electrical values with plots and measurements.
6. **Review:** revisit any topic and track completed lessons.

## 📦 Distribution contents

The **v1.0.0 release ZIP** contains exactly:

```text
PSpice-OrCAD-Presentation/
├── index.html              # Complete standalone HTML/CSS/JS application
└── LICENSE.driver-js.txt   # MIT license notice for bundled Driver.js
```

All application styles and scripts, including **Driver.js v1.10.2** and its styles, are embedded in `index.html` for portability. The source of the application can be inspected in that HTML file; this release does **not** include the older, separately organized development folders and reports.

For a GitHub repository layout, you can place `index.html`, `LICENSE.driver-js.txt`, and this `README.md` together at the repository root.

## 🧪 Scope and limitations

| Area | Available in v1.0.0 | Important boundary |
|---|---|---|
| Interactive learning | 16 topics / 57 steps; bundled Driver.js | Some UI tasks are explanatory only |
| Schematic editing | Supported components, wiring, and validation | Not full OrCAD Capture functionality |
| File management | Educational JSON import/export | No native `.dsn` / `.opj` support |
| DC analyses | Reference-circuit Bias Point and DC Sweep | Not arbitrary-circuit simulation |
| Transient / AC | DC-reference and separate analytical RC demonstrations | Not general SPICE transient/AC solving |
| Plots | Browser-rendered Probe-style charts and CSV | Not official Cadence Probe |
| Offline use | Self-contained HTML, no runtime CDN | Browser-local storage may vary |

The JavaScript included in this release passed a **syntax check** during README preparation. This is not a substitute for full functional, cross-browser, accessibility, or numerical-validation testing on users' machines.

## 🧩 Driver.js: third-party dependency and attribution

This project bundles **[Driver.js](https://driverjs.com/)** **v1.10.2**, a guided-tour library authored by **Kamran Ahmed**. Driver.js is distributed under the **MIT License**.

- The library's JavaScript and CSS are embedded in `index.html`, allowing the tutorial to run offline.
- The original Driver.js license is included as **[`LICENSE.driver-js.txt`](LICENSE.driver-js.txt)**. **Keep this file with copies of the release** to preserve the required license and copyright notice.
- The MIT license applies to **Driver.js itself**, not automatically to the original code, interface, educational text, or other content of Ohm My Vibe!.
- More information: [Driver.js documentation](https://driverjs.com/) · [Driver.js repository](https://github.com/kamranahmedse/driver.js)

## ⚖️ Project license and trademarks

**Project license:** No general-purpose license has been selected for the original Ohm My Vibe! code and content. The project may be publicly viewable, but that alone does not grant a general right to reuse, modify, or redistribute the original material. The **separately licensed Driver.js portion remains subject to its MIT license**.

**Trademark disclaimer:** This project is independent, unofficial, and educational. **Cadence**, **OrCAD**, and **PSpice** are names/trademarks of their respective owners. Their use here identifies the software workflows that inspired the teaching interface. This project is not associated with, sponsored by, endorsed by, or approved by Cadence Design Systems, Inc.

No official Cadence installer or proprietary simulation engine is bundled.

## 🐛 Feedback

Found a bug or an unclear lesson? [Open a GitHub issue](https://github.com/maklf-dev/ohm-my-vibe/issues) describing your browser, steps to reproduce, and expected behavior. Please do not attach third-party proprietary software or assets without permission.

## 👨‍💻 Author

Created by **[maklf-dev](https://github.com/maklf-dev)**, with curiosity, circuit theory, and a little vibe coding. ⚡

If the project helped you learn something, feel free to leave a ⭐ on the repository.
