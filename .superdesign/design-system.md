# Issue Journal — Design System

## Direction

A quiet, editorial developer journal: warm paper surfaces, ink-like typography, restrained green accents, and lightweight GitHub provenance cues. The reading experience is primary; repository mechanics remain visible but never dominate.

## Color

- Canvas: `#F3F0E8`
- Surface: `#FBFAF6`
- Ink: `#1B211D`
- Muted ink: `#626A64`
- Hairline: `#D8D6CE`
- Primary green: `#1F6B4F`
- Green wash: `#DDEBE4`
- Warm accent: `#B4532A`
- Code surface: `#202723`

## Typography

- Display and article titles: Georgia, `Times New Roman`, serif
- Interface and metadata: Inter, ui-sans-serif, system-ui, sans-serif
- Code: `SFMono-Regular`, Consolas, monospace
- Home title: 64–80px desktop, 44–52px mobile; tight leading
- Article title: 52–64px desktop, 38–44px mobile
- Body: 18px, 1.8 line-height, maximum readable width 680px
- Labels and metadata: 12–14px, modest letter spacing

## Layout

- Desktop max width: 1180px; gutters 24–40px
- Header: compact, one-line identity and navigation
- Home: editorial intro followed by a dominant latest-article list; tag rail alongside on wide screens
- Article: narrow reading column with metadata and labels above content
- Mobile: single column; tag filters scroll horizontally

## Components

- Wordmark: compact monogram plus journal name
- Issue card: date, serif title, excerpt, tag chips, subtle arrow
- Tag chip: outlined by default; green fill when active
- Repository link: quiet secondary button with GitHub icon
- Code block: dark surface, small radius, filename strip when available
- Footer: repository provenance and RSS link

## Motion and interaction

- 150–220ms transitions
- Hover uses color, one-pixel translation, or underline; avoid large scaling
- Clear focus rings in primary green
- Respect reduced motion

## Voice

Concise and personal. Use Japanese content labels such as「記事」「タグ」「すべて見る」while preserving technical terms and code as written.
