
import React, { useState } from 'react';
import { UserInfo, FortuneResponse, AppState } from './types';
import { generateFortune } from './services/geminiService';
import HorseSurprise from './components/HorseSurprise';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [userInfo, setUserInfo] = useState<UserInfo>({ 
    name: '', 
    birthDate: '', 
    birthType: 'solar', 
    birthTime: '', 
    gender: 'male' 
  });
  const [fortune, setFortune] = useState<FortuneResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkIfWinner = () => {
    // 5% chance for the surprise horse animation
    return Math.random() < 0.05;
  };

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.birthDate) {
      alert("이름과 생년월일을 정확히 입력해주세요.");
      return;
    }

    setAppState(AppState.LOADING);
    setError(null);

    try {
      const result = await generateFortune(userInfo);
      setFortune(result);
      
      if (checkIfWinner()) {
        setAppState(AppState.WINNER);
      } else {
        setAppState(AppState.RESULT);
      }
    } catch (err) {
      console.error(err);
      setError("운세 서버에 접속할 수 없습니다. 다시 시도해 주세요.");
      setAppState(AppState.HOME);
    }
  };

  const resetApp = () => {
    setAppState(AppState.HOME);
    setFortune(null);
  };

  const timeOptions = [
    { value: '', label: '시간 모름' },
    { value: '자시(23:30~01:29)', label: '자시 (23:30~01:29)' },
    { value: '축시(01:30~03:29)', label: '축시 (01:30~03:29)' },
    { value: '인시(03:30~05:29)', label: '인시 (03:30~05:29)' },
    { value: '묘시(05:30~07:29)', label: '묘시 (05:30~07:29)' },
    { value: '진시(07:30~09:29)', label: '진시 (07:30~09:29)' },
    { value: '사시(09:30~11:29)', label: '사시 (09:30~11:29)' },
    { value: '오시(11:30~13:29)', label: '오시 (11:30~13:29)' },
    { value: '미시(13:30~15:29)', label: '미시 (13:30~15:29)' },
    { value: '신시(15:30~17:29)', label: '신시 (15:30~17:29)' },
    { value: '유시(17:30~19:29)', label: '유시 (17:30~19:29)' },
    { value: '술시(19:30~21:29)', label: '술시 (19:30~21:29)' },
    { value: '해시(21:30~23:29)', label: '해시 (21:30~23:29)' },
  ];

  return (
    <div className="min-h-screen max-w-md mx-auto bg-[#fffaf5] relative shadow-2xl overflow-x-hidden flex flex-col border-x border-red-100">
      {/* Header */}
      <header className="p-8 text-center pt-12">
        <div className="inline-block bg-[#8B0000] text-white px-4 py-1 rounded-sm text-xs font-bold mb-3 tracking-[0.2em] shadow-md">
          2026 丙午年
        </div>
        <h1 className="text-4xl font-bold text-red-950 font-traditional mb-2 tracking-tight">붉은 말의 해 운세</h1>
        <div className="h-px w-16 bg-red-200 mx-auto my-4"></div>
        <p className="text-red-800/60 font-medium text-sm">사주 명리학으로 풀어보는 신년 가이드</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-12">
        {appState === AppState.HOME && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-red-50 mb-8">
              <form onSubmit={handleStart} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-red-900/60 mb-2 ml-1">이름</label>
                  <input 
                    type="text" 
                    placeholder="성함을 입력하세요"
                    className="w-full px-4 py-3 bg-red-50/30 rounded-lg border border-red-100 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-all text-gray-800"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-red-900/60 mb-2 ml-1">생년월일 및 구분</label>
                    <div className="flex gap-2 mb-2">
                      <button 
                        type="button"
                        onClick={() => setUserInfo({...userInfo, birthType: 'solar'})}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${userInfo.birthType === 'solar' ? 'bg-red-800 text-white' : 'bg-white text-gray-400 border border-gray-100'}`}
                      >
                        양력
                      </button>
                      <button 
                        type="button"
                        onClick={() => setUserInfo({...userInfo, birthType: 'lunar'})}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${userInfo.birthType === 'lunar' ? 'bg-red-800 text-white' : 'bg-white text-gray-400 border border-gray-100'}`}
                      >
                        음력
                      </button>
                    </div>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 bg-red-50/30 rounded-lg border border-red-100 focus:border-red-400 outline-none text-gray-800"
                      value={userInfo.birthDate}
                      onChange={(e) => setUserInfo({...userInfo, birthDate: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-red-900/60 mb-2 ml-1">태어난 시간 (선택)</label>
                  <select 
                    className="w-full px-4 py-3 bg-red-50/30 rounded-lg border border-red-100 focus:border-red-400 outline-none text-gray-800"
                    value={userInfo.birthTime}
                    onChange={(e) => setUserInfo({...userInfo, birthTime: e.target.value})}
                  >
                    {timeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-red-900/60 mb-2 ml-1">성별</label>
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setUserInfo({...userInfo, gender: 'male'})}
                      className={`flex-1 py-3 rounded-lg font-bold transition-all ${userInfo.gender === 'male' ? 'bg-red-800 text-white' : 'bg-white text-gray-400 border border-gray-100'}`}
                    >
                      남성
                    </button>
                    <button 
                      type="button"
                      onClick={() => setUserInfo({...userInfo, gender: 'female'})}
                      className={`flex-1 py-3 rounded-lg font-bold transition-all ${userInfo.gender === 'female' ? 'bg-red-800 text-white' : 'bg-white text-gray-400 border border-gray-100'}`}
                    >
                      여성
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#8B0000] text-white py-4 rounded-xl font-bold text-lg hover:bg-red-900 transition-all active:scale-95 shadow-lg mt-4 flex items-center justify-center gap-2"
                >
                  <span>🐎</span> 2026년 대운 확인하기
                </button>
              </form>
            </div>
          </div>
        )}

        {appState === AppState.LOADING && (
          <div className="flex flex-col items-center justify-center py-24 animate-in fade-in duration-300">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-red-100 border-t-red-800 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-4xl">🎴</div>
            </div>
            <p className="mt-8 text-xl font-bold text-red-950 font-traditional animate-pulse">
              천문의 기운을 읽는 중...
            </p>
            <p className="mt-2 text-red-800/40 text-sm">병오년의 붉은 말이 달려오고 있습니다</p>
          </div>
        )}

        {appState === AppState.RESULT && fortune && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-10">
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-red-50 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 text-6xl">🐎</div>
              <h2 className="text-xl font-bold text-red-950 font-traditional mb-4 flex items-center border-b border-red-50 pb-3">
                <span className="mr-2 text-red-700">●</span> 2026년 종합 총운
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">{fortune.total}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white rounded-xl p-5 border-l-4 border-l-yellow-600 shadow-sm">
                <h3 className="text-sm font-bold text-yellow-800 mb-2 flex items-center gap-1">💰 재물 및 성취</h3>
                <p className="text-xs text-gray-600 leading-normal">{fortune.wealth}</p>
              </div>
              <div className="bg-white rounded-xl p-5 border-l-4 border-l-red-600 shadow-sm">
                <h3 className="text-sm font-bold text-red-800 mb-2 flex items-center gap-1">❤️ 인연 및 애정</h3>
                <p className="text-xs text-gray-600 leading-normal">{fortune.love}</p>
              </div>
              <div className="bg-white rounded-xl p-5 border-l-4 border-l-green-600 shadow-sm">
                <h3 className="text-sm font-bold text-green-800 mb-2 flex items-center gap-1">🌱 건강 및 기운</h3>
                <p className="text-xs text-gray-600 leading-normal">{fortune.health}</p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] text-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-center font-traditional text-red-400 mb-6 text-lg tracking-widest border-b border-white/10 pb-3">행운의 수호 요소</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-[10px] text-gray-400 mb-2 uppercase tracking-tighter">Lucky Color</div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full mb-2 border border-white/20 shadow-inner" style={{ backgroundColor: fortune.luckyColor }}></div>
                    <span className="text-sm font-bold text-red-200">{fortune.luckyColor}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 leading-tight">{fortune.luckyColorReason}</p>
                </div>
                <div className="text-center border-l border-white/10">
                  <div className="text-[10px] text-gray-400 mb-2 uppercase tracking-tighter">Lucky Number</div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full mb-2 bg-white/5 flex items-center justify-center font-bold text-2xl text-yellow-400">
                      {fortune.luckyNumber}
                    </div>
                    <span className="text-sm font-bold text-red-200">숫자 {fortune.luckyNumber}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 leading-tight">{fortune.luckyNumberReason}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={resetApp}
              className="w-full bg-red-50 text-red-900 py-4 rounded-xl font-bold text-sm border border-red-100 hover:bg-red-100 transition-all active:scale-95"
            >
              다른 정보로 다시보기
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-8 text-center text-[10px] text-red-900/30 uppercase tracking-[0.3em]">
        <p>丙午年 New Year Oracle</p>
      </footer>

      {/* Special Surprise Animation */}
      {appState === AppState.WINNER && (
        <HorseSurprise onComplete={() => setAppState(AppState.RESULT)} />
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-6 left-6 right-6 bg-red-950 text-white p-4 rounded-lg shadow-2xl animate-in slide-in-from-bottom-full text-center text-sm font-medium">
          {error}
        </div>
      )}
    </div>
  );
};

export default App;
