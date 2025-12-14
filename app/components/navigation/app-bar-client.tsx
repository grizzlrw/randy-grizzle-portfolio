import DrawerAppBar from "./drawer-app-bar";
import { fetchSkills } from "@/lib/actions";

export default async function AppBarClient() {
  const skills = await fetchSkills();
  
  // Map skills to the format expected by DrawerAppBar
  const skillsData = skills.map(skill => ({
    id: skill.id.toString(),
    title: skill.title,
    description: skill.description,
    route: skill.route,
    imageUrl: skill.imageUrl,
    imageAlt: skill.imageAlt,
  }));

  return <DrawerAppBar skills={skillsData} />;
}