export function FixedBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#fafafa]">
      <div
        className="bg-dot-grid absolute inset-0"
        style={{ maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 85%)" }}
      />
      <div className="animate-blob-1 absolute -top-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-[#ff006e] opacity-[0.12] blur-[120px]" />
      <div className="animate-blob-2 absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-[#00e5ff] opacity-[0.11] blur-[130px]" />
      <div className="animate-blob-3 absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-[#ff006e] opacity-[0.08] blur-[120px]" />
    </div>
  );
}
