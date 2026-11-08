type SectionHeaderProps = {
  index: string;
  label: string;
};

export default function SectionHeader({ index, label }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline gap-3 border-b border-line pb-4">
      <span className="font-mono text-sm text-muted">{index}/</span>
      <h2 className="font-mono text-sm uppercase tracking-widest">{label}</h2>
    </div>
  );
}
