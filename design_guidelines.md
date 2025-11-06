# Design Guidelines: Zeister Carwash AI Support Chatbot

## Design Approach
**System-Based Design using Material Design principles** for clean, functional chat interface that prioritizes readability and usability. The chatbot should feel modern, trustworthy, and seamlessly integrate with the Zeister Carwash brand while maintaining clarity in conversational flow.

## Typography System

**Primary Font Family:** Inter or Roboto via Google Fonts CDN
- Chat messages: 15px (0.9375rem), regular weight (400)
- User messages: 15px, medium weight (500)
- Timestamps: 12px (0.75rem), regular weight (400)
- Widget header title: 18px (1.125rem), semibold (600)
- Button text: 14px (0.875rem), medium weight (500)
- Input placeholder: 14px, regular weight (400)

## Layout System

**Tailwind Spacing Units:** Use 2, 3, 4, 6, and 8 as primary spacing values
- Message bubble padding: p-3 (12px)
- Message spacing: space-y-3 between messages
- Widget padding: p-4 (16px) for header/input area
- Container margins: m-6 for desktop, m-4 for mobile
- Input area: p-4 for comfortable touch targets

**Chat Widget Structure:**
- Fixed position: bottom-right corner (desktop), full-screen overlay (mobile)
- Desktop dimensions: 380px width × 600px height
- Mobile: Full viewport with safe area padding
- Border radius: rounded-lg (8px) for widget, rounded-2xl (16px) for message bubbles
- Shadow: large drop shadow for floating widget presence

## Component Library

### Chat Widget Container
- Floating widget with close/minimize controls
- Header: Brand name "Zeister Carwash Support" with status indicator (online/typing)
- Scrollable message area with auto-scroll to latest
- Fixed input area at bottom with send button

### Message Bubbles
**User Messages (right-aligned):**
- Right-aligned with max-width of 75%
- Rounded corners: rounded-2xl with sharp bottom-right corner (rounded-br-sm)
- Padding: p-3
- Include timestamp below bubble (text-xs, opacity-70)

**AI Messages (left-aligned):**
- Left-aligned with max-width of 80%
- Rounded corners: rounded-2xl with sharp bottom-left corner (rounded-bl-sm)
- Padding: p-3
- Show "Zeister Carwash" label or icon
- Include timestamp below bubble

**System Messages:**
- Center-aligned, smaller text
- Subtle styling for timestamps, connection status

### Input Area
- Text input field with placeholder: "Type uw vraag..." (Type your question...)
- Height: h-12 for comfortable mobile interaction
- Send button: Icon-only (Heroicons paper-airplane) or "Versturen" text
- Rounded input: rounded-full for modern feel
- Padding: px-4 py-3

### Quick Reply Suggestions
- Horizontal scrollable chips below input (optional initial state)
- Suggested questions: "Wat kosten de wasprogramma's?", "Wat zijn de openingstijden?", "Hoe werkt de Waspas?"
- Pill-shaped buttons: rounded-full, px-4 py-2
- Space-x-2 between chips

### Typing Indicator
- Three animated dots (scale/fade animation)
- Appears in AI message bubble position
- Subtle bounce animation

### Widget Toggle Button (Launcher)
- Floating action button: bottom-right corner
- Size: 56px × 56px (standard FAB)
- Icon: Heroicons chat-bubble-left-right or support icon
- Badge indicator for unread messages
- Smooth transition between states

## Interaction Patterns

**Chat Flow:**
1. Welcome message auto-sends on widget open: "Hallo! Hoe kan ik u helpen met uw vragen over Zeister Carwash?"
2. Quick reply suggestions display initially
3. User sends message → typing indicator → AI response
4. Smooth message animations: fade-up entrance (100ms delay per message)

**States:**
- Loading: Skeleton placeholder messages
- Error: Inline error message with retry button
- Empty state: Welcome illustration with sample questions
- Minimized: Show launcher button with notification badge

## Accessibility
- Keyboard navigation: Tab through inputs, Enter to send
- ARIA labels on all interactive elements
- Focus indicators: 2px outline on focused elements
- Screen reader announcements for new messages
- Sufficient contrast ratios (WCAG AA minimum)

## Images
No images required for core chatbot functionality. Optional: Small Zeister Carwash logo (32px × 32px) in chat header for brand reinforcement.

## Animations
**Minimal, purposeful animations only:**
- Typing indicator: gentle pulse (800ms cycle)
- Message entrance: subtle slide-up with fade (200ms ease-out)
- Widget open/close: scale and fade (300ms ease-in-out)
- No hover effects on message bubbles
- Send button: scale on click (150ms)