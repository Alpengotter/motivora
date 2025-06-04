const translateStatistics = {
  LEMONS_ACCRUED: 'Мотикоинов начислено',
  LEMONS_SPEND: 'Мотикоинов потрачено',
  LEMONS_ACCRUED_BY_USER: 'Мотикоинов начислено',
  LEMONS_ACCRUED_BY_CLINIC: 'Мотикоинов начислено (командный)'
}

type TranslationKey = keyof typeof translateStatistics;

/**
 * Возвращает локализованную строку для указанного ключа статистики
 * @param key - Ключ статистики
 * @returns Локализованная строка или ключ, если перевод не найден
 */
export const getStatisticTranslation = (key: string): string => {
  return translateStatistics[key as TranslationKey]
    ?? `Перевод не найден: ${key}`;
}
