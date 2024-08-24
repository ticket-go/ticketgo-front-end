export function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col w-full h-full py-8 px-20 gap-4">
      {children}
    </section>
  );
}
