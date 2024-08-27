import { EditProfileForm } from "../_components/user-form";

export default function EditProfile({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className="flex justify-center items-center w-full min-h-screen overflow-hidden">
      <EditProfileForm userId={id} />
    </main>
  );
}
