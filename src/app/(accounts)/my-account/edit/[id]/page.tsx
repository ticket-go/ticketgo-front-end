import { Section } from "@/components/section";
import { EditProfileForm } from "../_components/user-form";

export default function EditProfile({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className="flex justify-center items-center w-full h-screen overflow-hidden">
      <Section className="h-fit tab-port:px-4">
        <EditProfileForm userId={id} />
      </Section>
    </main>
  );
}
