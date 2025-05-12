import type { Nomination } from '@/types/nomination'

export const NOMINATIONS_PERSONAL: Nomination[] = [
  {
    text: 'Ментор - пройденное обучение +30',
    value: 30,
  },
  {
    text: 'Ментор - завершённый контракт +20',
    value: 20,
  },
  {
    text: 'Менти - завершенный контракт +20',
    value: 20,
  },
  {
    text: 'Ментор - демонстрация успешного результаты +20',
    value: 20,
  },
  {
    text: 'Менти - демонстрация успешного результаты +20',
    value: 20,
  },
  {
    text: 'Научная среда - выступление с лекцией о гигиене +20',
    value: 20,
  },
  {
    text: 'Научная среда - выступление в качестве спикера +10',
    value: 10,
  },
  {
    text: 'Научная среда - пополнение библиотеки +5',
    value: 5,
  },
  {
    text: 'Внутренний огонь - участие в активности сообщества (спорт) +10',
    value: 10,
  },
  {
    text: 'Внутренний огонь - участие в активности сообщества (волонтёрство) +10',
    value: 10,
  },
  {
    text: 'Внутренний огонь - участие в активности сообщества (книжный клуб) +10',
    value: 10,
  },
  {
    text: 'Приведи друга - трудоустройство друга',
    value: 0,
  }
];

export const NOMINATIONS_TEAM = [
  {
    text: 'Свои люди - проведение активности +15',
    value: 15,
  },
  {
    text: 'Свои люди - 2 хорошие новости за месяц +15',
    value: 15,
  },
  {
    text: 'Отзывы - 1 место в текущем месяце +30',
    value: 30,
  },
  {
    text: 'Отзывы - 2 место в текущем месяце +20 ',
    value: 20,
  },
  {
    text: 'Отзывы - 3 место в текущем месяце +10',
    value: 10,
  },
  ...generateWeeklySteps()
]

function generateWeeklySteps(): Nomination[] {
  const valueByPlace = [150, 130, 120, 100, 80, 60, 40, 20, 20, 20];
  const result: Nomination[] = [];

  for (let week = 1; week <= 4; week++) {
    for (let place = 1; place <= 10; place++) {
      result.push({
        text: `Шаги - ${week} неделя ${place} место`,
        value: valueByPlace[place - 1],
      });
    }
  }

  return result;
}
