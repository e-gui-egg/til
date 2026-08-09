# Theme

## Compact token summary

- Background: `#f5f1e8`
- Text: `#20211f`
- Accent: `#ac4b1c`
- Font: `system-ui, sans-serif`
- Content width: `42rem`
- Page gutter: `1.5rem`
- Display type: `clamp(3rem, 10vw, 6rem)`, line-height `0.95`
- Eyebrow: weight `700`, tracking `0.12em`, uppercase
- Breakpoints, radii, and shadows: none defined

## Raw source

`src/pages/index.astro` contains the complete current stylesheet:

```css
:global(*) {
  box-sizing: border-box;
}
:global(body) {
  margin: 0;
  color: #20211f;
  font-family: system-ui, sans-serif;
  background: #f5f1e8;
}
main {
  width: min(42rem, calc(100% - 3rem));
  margin: 0 auto;
  padding: 8rem 0;
}
.eyebrow {
  color: #ac4b1c;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
h1 {
  margin: 0.25rem 0 1rem;
  font-size: clamp(3rem, 10vw, 6rem);
  line-height: 0.95;
}
```

No Tailwind config, global stylesheet, theme provider, or token file exists.
