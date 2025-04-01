# rememberIT - Markdown Journaling App

## Overview

rememberIt is a minimalist journaling application that combines the power of markdown with a distraction-free writing environment. Write in markdown and see your journal entries beautifully formatted in real-time.

## Features

- **Two-pane Layout**: Neovim-style editor alongside a compiled journal preview
- **Real-time Preview**: See your markdown transform as you type
- **Local Storage**: All journal entries stored locally as markdown files
- **Workspace Directories**: Choose your workspace directory where journals will be saved.
- **Export Options**: Export your journals as PDF or HTML
- **Custom Styling**: Book-like appearance for your compiled journals
- **Offline-first**: No internet connection required

## Technical Stack

- **Frontend**: React, Typescript, TailwindCSS, DaisyUI
- **Backend**: Tauri (Rust-based framework)
- **Storage**: Local file system
- **Markdown Processing**: MDXEditor, remark/rehype

## Development Status

This project is currently in alpha development.

## Roadmap

- [X] Journal dashboard with responsive UI
- [X] Custom themes and styling options
- [ ] Two-pane Markdown editor with live preview
- [ ] Real-time markdown compilation
- [ ] File system integration for saving/loading
- [ ] Export functionality
- [ ] Keyboard shortcuts and Vim-like navigation

## Installation

**Start the development server**:

```bash
cd rememberIt
npm install
npm run tauri dev
```

## License

*TBD*
