/**
 * ARIA Live Regions for React
 * 
 * This module provides components and hooks for announcing dynamic content
 * changes to screen reader users via ARIA live regions.
 * 
 * Based on the article by Almero Steyn:
 * https://almerosteyn.com/2017/09/aria-live-regions-in-react
 * 
 * Modernized to use React hooks and functional components.
 * 
 * @example
 * ```tsx
 * // In your root layout or app component:
 * import { LiveAnnouncer } from '@/app/features/aria-live';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <LiveAnnouncer>
 *       {children}
 *     </LiveAnnouncer>
 *   );
 * }
 * 
 * // In any child component:
 * import LiveMessage from '@/app/features/aria-live/LiveMessage';
 * 
 * function MyComponent() {
 *   const [status, setStatus] = useState("");
 *   
 *   return (
 *     <>
 *       <LiveMessage message={status} aria-live="polite" />
 *       <button onClick={() => setStatus("Action completed")}>
 *         Do Something
 *       </button>
 *     </>
 *   );
 * }
 * 
 * // Or use the hook directly:
 * import { useLiveAnnouncer } from '@/app/features/aria-live';
 * 
 * function MyOtherComponent() {
 *   const { announcePolite, announceAssertive } = useLiveAnnouncer();
 *   
 *   const handleSubmit = async () => {
 *     announcePolite("Submitting form...");
 *     await submitForm();
 *     announcePolite("Form submitted successfully");
 *   };
 *   
 *   return <button onClick={handleSubmit}>Submit</button>;
 * }
 * ```
 */

export { LiveAnnouncer, useLiveAnnouncer } from "./LiveAnnouncerContext";
export { default as LiveMessage } from "./LiveMessage";
export { default as Announcer } from "./Announcer";
export { default as MessageBlock } from "./MessageBlock";
