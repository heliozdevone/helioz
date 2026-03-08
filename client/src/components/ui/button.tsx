export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-none border px-3 py-2 text-sm">{children}</button>
  );
}
