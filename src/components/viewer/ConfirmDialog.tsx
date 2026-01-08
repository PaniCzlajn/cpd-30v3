import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'primary' | 'destructive';
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Zatwierdź",
  cancelText = "Anuluj",
  variant = 'primary',
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-card border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-muted text-foreground hover:bg-muted/80 border-border">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={
              variant === 'primary'
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            }
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
