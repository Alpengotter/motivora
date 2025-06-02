import type { HistoryItem } from '@/types/historyItem'
import { NOMINATIONS_PERSONAL } from '@/constants/nominations'

export interface TransformedUser {
  id: number;
  fullName: string;
  clinics: string;
  summary: number;
  nominations: number[];
}

export function transformData(data: HistoryItem[]): TransformedUser[] {
  const uniqueUsers = new Map<string, {
    id: number,
    fullName: string;
    clinics: Set<string>;
    summary: number;
    nominations: number[];
  }>();

  const nominationCount = NOMINATIONS_PERSONAL.length;
  const nominationTexts = NOMINATIONS_PERSONAL.map(n => n.text);

  data.forEach((item: HistoryItem) => {
    if (!item.user) return;

    const user = item.user;
    const fullName = `${user.lastName} ${user.firstName}`;
    const comment = item.comment;

    // Ищем совпадающие номинации в комментарии
    const matchedIndices = nominationTexts
      .map((text, idx) => (comment.includes(text) ? idx : -1))
      .filter(idx => idx !== -1);

    if (!uniqueUsers.has(fullName)) {
      const clinics = new Set<string>(user.clinics as string[]);
      const nominations = new Array<number>(nominationCount).fill(0);
      const id = item.id

      matchedIndices.forEach(idx => {
        nominations[idx] += item.value;
      });

      uniqueUsers.set(fullName, {
        id,
        fullName,
        clinics,
        summary: user.lemons,
        nominations
      });
    } else {
      const existing = uniqueUsers.get(fullName)!;

      // Обновляем клиники
      user.clinics.forEach(clinic => existing.clinics.add(clinic as string));

      // Обновляем номинации
      matchedIndices.forEach(idx => {
        existing.nominations[idx] += NOMINATIONS_PERSONAL[idx].value;
      });

      uniqueUsers.set(fullName, existing);
    }
  });

  return Array.from(uniqueUsers.values()).map(user => ({
    id: user.id,
    fullName: user.fullName,
    clinics: Array.from(user.clinics).join(', '),
    summary: user.summary,
    nominations: user.nominations
  }));
}
