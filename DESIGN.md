# Design Brief

## Direction
Study Buddy Platform — A high-fidelity productivity interface combining Linear's minimalism with glassmorphic depth, emphasizing collaborative learning through refined UI surfaces.

## Tone
Clean tech-forward aesthetic with subtle warmth: prioritizes clarity and focus over decoration, paired with soft indigo accents that evoke trust and intellectualism.

## Differentiation
Soft indigo glassmorphic overlays create a "floating workspace" effect—the AI chat, collaboration tools, and study cards appear suspended in the interface, reinforcing collaboration and focus.

## Color Palette

| Token           | OKLCH          | Role                           |
| --------------- | -------------- | ------------------------------ |
| background      | 0.145 0.014 260 | Deep navy base, cool undertone |
| foreground      | 0.95 0.01 260  | Text, maximum contrast        |
| card            | 0.18 0.014 260 | Elevated surfaces             |
| primary/accent  | 0.62 0.18 270  | Soft indigo, active states    |
| secondary       | 0.22 0.02 260  | Secondary actions, grouping   |
| muted           | 0.22 0.02 260  | Disabled, subtle text         |
| destructive     | 0.55 0.2 25    | Error, delete actions         |
| border          | 0.28 0.02 260  | Subtle separators             |

## Typography
- Display: Space Grotesk — geometric, tech-forward headings
- Body: DM Sans — refined, readable UI copy and paragraphs
- Mono: JetBrains Mono — code blocks, technical content
- Scale: hero text (5xl), section heads (3xl), labels (sm uppercase), body (base/lg)

## Elevation & Depth
Layered surfaces with subtle shadows: glass cards (50% opacity + backdrop blur) float on elevated backgrounds, creating visual hierarchy without heavy shadows. Primary accent provides depth through glowing soft indigo.

## Structural Zones

| Zone        | Background          | Border              | Notes                                  |
| ----------- | ------------------- | ------------------- | -------------------------------------- |
| Header      | card + border-b     | border/40           | Navigation rail, search bar            |
| Content     | background          | —                   | Split pane: sidebar + focus area       |
| Cards       | glass (bg/50 blur)  | border/20           | Study cards, AI chat, collaboration   |
| Footer      | card + border-t     | border/40           | Actions, secondary info               |

## Spacing & Rhythm
8px grid foundation: margins/padding use 8, 16, 24, 32px increments. Breathing room between sections (24px), tight grouping within cards (8-12px). 12px border-radius applied uniformly.

## Component Patterns
- Buttons: soft indigo primary (accent color), secondary muted, destructive red. Rounded (12px), smooth 200ms transitions.
- Cards: glassmorphic with backdrop blur, border (border/20), subtle elevated shadow on hover.
- Badges: compact, semantic colors, full border-radius for pills.
- AI Chat Sidebar: floating glass overlay, glow-indigo when active, smooth slide-in animation.

## Motion
- Entrance: fade-in + slide-up (200ms cubic-bezier(0.25, 0.46, 0.45, 0.94))
- Hover: all 200ms smooth easing, subtle glow activation on indigo accents
- Decorative: pulse-soft for "active/listening" states (2s ease-in-out)

## Constraints
- No heavy shadows (glow only on accent, max shadow-sm/elevated elsewhere)
- Glassmorphism reserved for floating/modal surfaces, not static backgrounds
- Indigo accent used sparingly: active buttons, focus states, AI indicators
- Dark mode only — no light theme variant

## Signature Detail
Soft indigo glassmorphic overlays on interactive surfaces create visual depth and emphasize the platform's collaborative, "floating workspace" nature—a refined take on glass-morphism that prioritizes readability over decoration.
