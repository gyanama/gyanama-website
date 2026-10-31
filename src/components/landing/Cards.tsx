import type { ComponentType } from 'react';
import type { CardKey } from '@/content/pages/types';
import { CallLogCard, DoubtCard, FeeReminderCard, LeaveCard, LoggedCard, MarkedCard, PillarsCard, PtmCard, QuizOutputCard, QuizSourceCard, ReasonsCard, ReceiptCard, RegisterCard, TeacherCheckCard, TimetableCard } from '@/components/site/cards';

export const CARDS: Record<CardKey, ComponentType> = {
  register: RegisterCard,
  callLog: CallLogCard,
  logged: LoggedCard,
  receipt: ReceiptCard,
  feeReminder: FeeReminderCard,
  pillars: PillarsCard,
  reasons: ReasonsCard,
  quizSource: QuizSourceCard,
  quizOutput: QuizOutputCard,
  timetable: TimetableCard,
  teacherCheck: TeacherCheckCard,
  marked: MarkedCard,
  leave: LeaveCard,
  ptm: PtmCard,
  doubt: DoubtCard,
};
