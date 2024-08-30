export default function MyAccount({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen bg-background"></main>
  );
}
