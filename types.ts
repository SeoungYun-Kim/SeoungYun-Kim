
export interface UserInfo {
  name: string;
  birthDate: string;
  birthType: 'solar' | 'lunar'; // 양력 or 음력
  birthTime: string; // 태어난 시간
  gender: 'male' | 'female';
}

export interface FortuneResponse {
  total: string;
  wealth: string;
  love: string;
  health: string;
  luckyColor: string;
  luckyColorReason: string;
  luckyNumber: number;
  luckyNumberReason: string;
}

export enum AppState {
  HOME = 'HOME',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  WINNER = 'WINNER'
}
