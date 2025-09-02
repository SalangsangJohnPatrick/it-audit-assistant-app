import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'error' | 'info' | 'warn';
export interface Toast { id: number; kind: ToastKind; text: string; }

@Injectable({ providedIn: 'root' })
export class ToastService {
  private idSeq = 0;
  readonly toasts = signal<Toast[]>([]);

  show(kind: ToastKind, text: string, ms = 2500): void {
    const id = ++this.idSeq;

    this.toasts.set([{ id, kind, text }]);

    setTimeout(() => this.dismiss(id), ms);
  }

  success(text: string) { this.show('success', text); }
  error(text: string) { this.show('error', text, 4000); }
  info(text: string) { this.show('info', text); }
  warn(text: string) { this.show('warn', text, 3000); }

  dismiss(id: number): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}
