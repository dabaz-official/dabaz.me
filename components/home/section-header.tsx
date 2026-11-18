import ScrambleText from "@dabaz/components/scramble-text";

type SectionHeaderProps = {
  index: string;
  label: string;
};

export default function SectionHeader({ index, label }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline gap-3 border-b border-line pb-4">
      <span className="font-mono text-sm text-muted">{index}/</span>
      <h2 className="font-sans text-sm font-semibold uppercase tracking-widest">
        <ScrambleText text={label} trigger="in-view" duration={700} />
      </h2>
    </div>
  );
}
