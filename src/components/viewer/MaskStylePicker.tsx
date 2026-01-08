import { cn } from "@/lib/utils";

export type MaskStyle = 'gray' | 'white' | 'black';

const allStyles: { id: MaskStyle; className: string }[] = [
  { id: 'gray', className: 'bg-[#9CA3AF]' },
  { id: 'white', className: 'bg-white border border-border' },
  { id: 'black', className: 'bg-black' },
];

interface MaskStylePickerProps {
  selectedStyle: MaskStyle;
  onStyleChange: (style: MaskStyle) => void;
}

export function MaskStylePicker({ selectedStyle, onStyleChange }: MaskStylePickerProps) {
  return (
    <div className="flex gap-1 p-1 bg-popover rounded-md shadow-lg border border-border">
      {allStyles.map((style) => (
        <button
          key={style.id}
          onClick={(e) => {
            e.stopPropagation();
            onStyleChange(style.id);
          }}
          className={cn(
            "w-6 h-6 rounded-sm transition-all",
            style.className,
            selectedStyle === style.id && "ring-2 ring-primary ring-offset-1"
          )}
        />
      ))}
    </div>
  );
}

export function MaskStylePreview({ style }: { style: MaskStyle }) {
  const styleClass = allStyles.find(s => s.id === style)?.className || 'bg-[#9CA3AF]';
  return (
    <div className={cn("w-5 h-5 rounded-sm", styleClass)} />
  );
}
