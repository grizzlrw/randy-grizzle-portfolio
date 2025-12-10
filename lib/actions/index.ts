/**
 * Centralized server actions for data fetching and mutations
 * All actions use Next.js "use server" directive for optimal server-side execution
 */

export { fetchNotes } from "./notes";
export { fetchSkills } from "./skills";
export { getFormBySlug } from "./forms";
export { postSignup } from "./signup";
export { submitContact } from "./contact";
