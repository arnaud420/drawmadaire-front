import { RoundType } from '../models/GameModel';

export const isSentenceValid = (sentence: string, gameType: RoundType): boolean => {
  const cleanSentence = sentence.trim();

  switch (gameType) {
    case RoundType.SENTENCE:
      return cleanSentence.length >= 5 && cleanSentence.indexOf(' ') > 0;
    case RoundType.WORD:
      return cleanSentence.length >= 2 && cleanSentence.indexOf(' ') === -1;
    default:
      return cleanSentence.length > 2;
  }
}

export const getSentenceError = (gameType: RoundType): string => {
  switch (gameType) {
    case RoundType.SENTENCE:
      return 'Votre expression doit être une phrase.';
    case RoundType.WORD:
      return 'Votre expression doit être un seul mot.';
    default:
      return 'Votre expression doit faire au moins 2 caractères.';
  }
}
