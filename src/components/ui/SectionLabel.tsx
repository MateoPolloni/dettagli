export default function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-mono text-[10px] tracking-[0.1em] text-[#55555c]">{index}</span>
      <span className="h-px w-10 bg-[#2a2a2f]" />
      <span className="font-sans text-[10px] font-medium tracking-[0.34em] uppercase text-[#9a9a9e]">
        {children}
      </span>
    </div>
  );
}
