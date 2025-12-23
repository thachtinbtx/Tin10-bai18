
import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Code, HelpCircle, BookOpen, Star, Trophy, RefreshCcw, Lightbulb, Hash, Keyboard, Cpu, ArrowRight, MousePointer2, AlertTriangle, Box, Ruler, Type, ToggleLeft } from 'lucide-react';
import Terminal from './components/Terminal';
import { playClickSound, playSuccessSound, playErrorSound } from './utils/sounds';

// --- Visual Components ---

const GlowCard: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else if (entry.boundingClientRect.top > window.innerHeight) setIsVisible(false);
      },
      { threshold: 0.1, rootMargin: "-20px" }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={elementRef}
      className={`relative rounded-3xl md:rounded-[3rem] border transition-all duration-700 ease-out transform ${className}
        ${isVisible 
          ? 'translate-y-0 opacity-100 shadow-xl md:shadow-[0_35px_80px_-20px_rgba(0,0,0,0.4)] ring-2 md:ring-4 ring-offset-4 md:ring-offset-8 ring-indigo-200 bg-white border-white' 
          : 'translate-y-8 md:translate-y-16 opacity-0 shadow-none bg-gray-100 border-gray-200'
        }
      `}
    >
      <div className={`absolute inset-0 rounded-3xl md:rounded-[3rem] pointer-events-none transition-opacity duration-1000 overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
         <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[60px] md:blur-[120px]"></div>
         <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[60px] md:blur-[120px]"></div>
      </div>
      <div className="relative z-10 p-6 md:p-12 lg:p-16">
        {children}
      </div>
    </div>
  );
};

const ConceptDiagram = () => (
  <div className="w-full p-6 md:p-12 rounded-3xl md:rounded-[3rem] my-8 md:my-12 flex flex-col xl:flex-row items-center justify-between gap-8 md:gap-12 bg-slate-50 border-2 md:border-4 border-slate-200 relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03] md:opacity-[0.05] bg-[linear-gradient(to_right,#80808012_2px,transparent_2px),linear-gradient(to_bottom,#80808012_2px,transparent_2px)] bg-[size:24px_24px] md:bg-[size:48px_48px]"></div>

    <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6 group flex-1">
      <div className="w-24 h-24 md:w-48 md:h-48 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center shadow-lg md:shadow-[0_15px_40px_rgba(22,163,74,0.3)] transition-transform group-hover:-translate-y-2 md:group-hover:-translate-y-4 bg-gradient-to-br from-green-400 to-green-600 text-white">
        <Keyboard className="w-12 h-12 md:w-24 md:h-24" strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <div className="font-black text-xl md:text-4xl uppercase tracking-widest mb-2 md:mb-4 text-green-700">INPUT</div>
        <div className="text-sm md:text-2xl font-bold text-slate-700 bg-white px-4 py-1 md:px-8 md:py-2 rounded-full shadow-md border border-slate-200">Bàn phím</div>
        <div className="mt-2 md:mt-4 font-mono font-black text-lg md:text-4xl text-green-800 bg-green-100 px-4 py-2 md:px-8 md:py-3 rounded-xl md:rounded-2xl border-2 md:border-4 border-green-200">input()</div>
      </div>
    </div>

    <div className="flex flex-col items-center gap-2">
      <ArrowRight className="rotate-90 xl:rotate-0 w-10 h-10 md:w-20 md:h-20 text-slate-300" />
    </div>

    <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6 group flex-1">
      <div className="w-24 h-24 md:w-48 md:h-48 rounded-full flex items-center justify-center shadow-lg md:shadow-[0_15px_40px_rgba(79,70,229,0.3)] transition-transform group-hover:rotate-12 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white relative">
        <Cpu className="w-12 h-12 md:w-24 md:h-24 animate-pulse-slow" strokeWidth={1.5} />
        <div className="absolute inset-0 border-4 md:border-8 border-dashed border-white/30 rounded-full animate-[spin_15s_linear_infinite]"></div>
      </div>
      <div className="text-center">
        <div className="font-black text-xl md:text-4xl uppercase tracking-widest mb-2 md:mb-4 text-indigo-700">PROCESS</div>
        <div className="text-sm md:text-2xl font-bold text-slate-700 bg-white px-4 py-1 md:px-8 md:py-2 rounded-full shadow-md border border-slate-200">CPU Xử lý</div>
        <div className="mt-2 md:mt-4 font-mono font-black text-lg md:text-4xl text-indigo-800 bg-indigo-100 px-4 py-2 md:px-8 md:py-3 rounded-xl md:rounded-2xl border-2 md:border-4 border-indigo-200">Chương trình</div>
      </div>
    </div>

    <div className="flex flex-col items-center gap-2">
      <ArrowRight className="rotate-90 xl:rotate-0 w-10 h-10 md:w-20 md:h-20 text-slate-300" />
    </div>

    <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6 group flex-1">
      <div className="w-24 h-24 md:w-48 md:h-48 rounded-2xl md:rounded-[2.5rem] flex items-center justify-center shadow-lg md:shadow-[0_15px_40px_rgba(37,99,235,0.3)] transition-transform group-hover:-translate-y-2 md:group-hover:-translate-y-4 bg-gradient-to-br from-blue-400 to-blue-600 text-white">
        <Monitor className="w-12 h-12 md:w-24 md:h-24" strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <div className="font-black text-xl md:text-4xl uppercase tracking-widest mb-2 md:mb-4 text-blue-700">OUTPUT</div>
        <div className="text-sm md:text-2xl font-bold text-slate-700 bg-white px-4 py-1 md:px-8 md:py-2 rounded-full shadow-md border border-slate-200">Màn hình</div>
        <div className="mt-2 md:mt-4 font-mono font-black text-lg md:text-4xl text-blue-800 bg-blue-100 px-4 py-2 md:px-8 md:py-3 rounded-xl md:rounded-2xl border-2 md:border-4 border-blue-200">print()</div>
      </div>
    </div>
  </div>
);

const InputExampleDiagram = () => (
  <div className="w-full p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] border-2 md:border-4 flex flex-col gap-6 md:gap-10 my-8 md:my-10 bg-slate-50 border-slate-300 shadow-inner">
    <h4 className="font-black text-xl md:text-4xl flex items-center gap-3 md:gap-4 text-black">
      <MousePointer2 className="w-6 h-6 md:w-12 md:h-12 text-purple-800" />
      Minh hoạ luồng xử lý
    </h4>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 text-center">
      <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl relative bg-white border-2 md:border-4 border-slate-300 shadow-md">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-700 text-white text-xs md:text-xl font-black rounded-full uppercase shadow-md">Bước 1</div>
        <div className="font-mono text-sm md:text-xl mb-2 md:mb-4 text-slate-500 font-bold">Code chạy:</div>
        <code className="block p-3 md:p-5 rounded-lg md:rounded-xl mb-4 md:mb-6 font-black text-xl md:text-4xl bg-slate-100 border md:border-2 border-slate-400 text-green-900 shadow-inner">
          input("Tên:")
        </code>
        <div className="text-sm md:text-2xl font-bold text-black leading-relaxed">Máy tính dừng lại chờ đợi.</div>
      </div>

      <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl relative bg-white border-2 md:border-4 border-slate-300 shadow-md">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-700 text-white text-xs md:text-xl font-black rounded-full uppercase shadow-md">Bước 2</div>
        <div className="font-mono text-sm md:text-xl mb-2 md:mb-4 text-slate-500 font-bold">Người dùng:</div>
        <div className="inline-flex items-center gap-2 md:gap-4 px-4 py-2 md:px-6 md:py-4 rounded-lg md:rounded-xl mb-4 md:mb-6 font-black text-xl md:text-4xl bg-slate-100 border md:border-2 border-slate-400 text-black shadow-inner">
          <Keyboard className="w-6 h-6 md:w-8 md:h-8" /> "An" ↵
        </div>
        <div className="text-sm md:text-2xl font-bold text-black leading-relaxed">Nhập "An" và nhấn Enter.</div>
      </div>

      <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl relative bg-white border-2 md:border-4 border-slate-300 shadow-md">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-700 text-white text-xs md:text-xl font-black rounded-full uppercase shadow-md">Bước 3</div>
        <div className="font-mono text-sm md:text-xl mb-2 md:mb-4 text-slate-500 font-bold">Bộ nhớ:</div>
        <div className="block p-3 md:p-5 rounded-lg md:rounded-xl mb-4 md:mb-6 font-black font-mono text-2xl md:text-5xl bg-slate-100 border md:border-2 border-slate-400 text-yellow-900 shadow-inner">
          "An"
        </div>
        <div className="text-sm md:text-2xl font-bold text-black leading-relaxed">Xâu "An" được đưa vào biến.</div>
      </div>
    </div>
  </div>
);

const DataTypeVisuals = () => (
  <div className="grid grid-cols-1 gap-6 md:gap-12 mb-10 md:mb-16">
    {[
      { label: 'int', title: 'Số Nguyên', desc: 'Dùng để đếm. Không có phần lẻ.', example: '1, 100, -5', color: 'blue', icon: <Box className="w-6 h-6 md:w-10 md:h-10" /> },
      { label: 'float', title: 'Số Thực', desc: 'Dùng để đo lường. Có dấu chấm.', example: '3.14, 1.5', color: 'green', icon: <Ruler className="w-6 h-6 md:w-10 md:h-10" /> },
      { label: 'str', title: 'Xâu Kí Tự', desc: 'Văn bản. Để trong nháy kép.', example: '"Hello"', color: 'yellow', icon: <Type className="w-6 h-6 md:w-10 md:h-10" /> },
      { label: 'bool', title: 'Logic', desc: 'Chỉ có True hoặc False.', example: 'True, False', color: 'red', icon: <ToggleLeft className="w-6 h-6 md:w-10 md:h-10" /> },
    ].map((type) => (
      <div key={type.label} className={`group relative p-6 md:p-12 bg-white border-2 md:border-4 border-${type.color}-100 rounded-3xl md:rounded-[3rem] hover:border-${type.color}-500 transition-all duration-300`}>
        <div className={`hidden md:flex absolute -top-10 left-16 w-20 h-20 bg-${type.color}-500 rounded-3xl items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
          {type.icon}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          <div className="text-center md:text-left">
            <h4 className={`text-4xl md:text-6xl font-black text-${type.color}-900 mb-1 md:mb-2`}>{type.label}</h4>
            <div className={`text-xs md:text-2xl font-black uppercase tracking-[0.2em] text-slate-400 mb-2 md:mb-4`}>{type.title}</div>
            <p className="text-base md:text-3xl font-bold text-slate-700 leading-tight md:max-w-xl">{type.desc}</p>
          </div>
          <div className={`p-4 md:p-10 bg-${type.color}-50 rounded-2xl md:rounded-[2.5rem] border-2 md:border-4 border-${type.color}-200 font-mono text-2xl md:text-6xl font-black text-${type.color}-700 shadow-inner w-full md:w-auto md:min-w-[350px] text-center`}>
            {type.example}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// --- Data ---
const quizzes = [
  { id: 1, question: "Lệnh input() dùng để làm gì?", options: ["Xuất dữ liệu", "Nhập dữ liệu", "Tính toán", "Dừng chương trình"], correct: 1, explanation: "input() dùng để nhận dữ liệu từ bàn phím.", difficulty: 'Dễ' },
  { id: 2, question: "Lệnh print() dùng để làm gì?", options: ["Nhập dữ liệu", "Xuất dữ liệu ra màn hình", "Xóa màn hình", "Lưu file"], correct: 1, explanation: "print() đưa dữ liệu ra màn hình.", difficulty: 'Dễ' },
  { id: 3, question: "Hàm input() luôn trả về kiểu dữ liệu gì?", options: ["Số nguyên (int)", "Số thực (float)", "Xâu kí tự (str)", "Logic (bool)"], correct: 2, explanation: "Bất kể bạn nhập gì, input() luôn trả về chuỗi (string).", difficulty: 'TB' },
  { id: 4, question: "Để chuyển xâu '123' thành số nguyên, ta dùng lệnh nào?", options: ["float('123')", "str(123)", "int('123')", "type('123')"], correct: 2, explanation: "int() chuyển đổi xâu thành số nguyên.", difficulty: 'Dễ' },
  { id: 5, question: "Kết quả của lệnh type(10.5) là gì?", options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'bool'>"], correct: 2, explanation: "10.5 là số thực (float).", difficulty: 'Dễ' },
  { id: 6, question: "Lệnh nào sau đây sẽ BÁO LỖI?", options: ["int('15')", "float(10)", "int('10.5')", "str(100)"], correct: 2, explanation: "int() không thể chuyển trực tiếp xâu chứa dấu chấm động ('10.5') thành số nguyên.", difficulty: 'Khó' },
  { id: 7, question: "Kết quả của print('A' + 'B') là gì?", options: ["AB", "A B", "Lỗi", "0"], correct: 0, explanation: "Toán tử + với xâu kí tự có tác dụng nối xâu.", difficulty: 'TB' },
  { id: 8, question: "Để nhập một số thực từ bàn phím, ta nên viết:", options: ["x = input()", "x = int(input())", "x = float(input())", "x = str(input())"], correct: 2, explanation: "Cần dùng float() bao bên ngoài input().", difficulty: 'TB' },
  { id: 9, question: "Kiểu dữ liệu 'bool' có mấy giá trị?", options: ["1", "2", "3", "Vô số"], correct: 1, explanation: "Chỉ có True và False.", difficulty: 'Dễ' },
  { id: 10, question: "Kết quả của 10 > 5 là?", options: ["True", "False", "10", "5"], correct: 0, explanation: "Phép so sánh trả về kiểu bool (True).", difficulty: 'Dễ' }
];

const exercises = [
  { id: 1, title: "Lời chào", desc: "Nhập tên và in ra: 'Xin chào [Tên]!'", hint: "Dùng input() và print()." },
  { id: 2, title: "Phép cộng", desc: "Nhập vào 2 số nguyên a và b. In ra tổng.", hint: "Dùng int(input())." },
  { id: 3, title: "Tính tuổi", desc: "Nhập năm sinh. In ra tuổi hiện tại.", hint: "Tuổi = 2024 - Năm sinh." },
  { id: 4, title: "Hình chữ nhật", desc: "Nhập chiều dài, rộng (số thực). Tính chu vi, diện tích.", hint: "Dùng float(input())." },
  { id: 5, title: "Đổi tiền", desc: "Nhập số tiền USD. Đổi sang VND (1 USD = 24k).", hint: "Tiền Việt = Tiền Đô * 24000." }
];

// --- Main Component ---

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [demoInput, setDemoInput] = useState("");
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number | null}>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quiz-p-v4');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const correctCount = Object.keys(quizAnswers).filter(key => {
    const qId = parseInt(key);
    const answerIdx = quizAnswers[qId];
    return quizzes.find(q => q.id === qId)?.correct === answerIdx;
  }).length;

  useEffect(() => {
    localStorage.setItem('quiz-p-v4', JSON.stringify(quizAnswers));
  }, [quizAnswers]);

  const handleAnswer = (qId: number, optionIdx: number) => {
    const isCorrect = quizzes.find(q => q.id === qId)?.correct === optionIdx;
    if (isCorrect) playSuccessSound();
    else playErrorSound();
    setQuizAnswers(prev => ({...prev, [qId]: optionIdx}));
  };

  const resetQuiz = () => {
    playClickSound();
    if (window.confirm("Bắt đầu lại bài kiểm tra?")) setQuizAnswers({});
  };

  const sectionTitle = `text-3xl md:text-5xl lg:text-8xl font-black mb-6 md:mb-12 flex items-center gap-4 md:gap-6 text-indigo-900 leading-tight`;
  const bodyText = "text-base md:text-2xl lg:text-4xl leading-relaxed text-slate-900 font-bold"; 

  const navItems = [
    { id: 'intro', icon: <BookOpen />, label: 'Lý thuyết' },
    { id: 'types', icon: <Hash />, label: 'Kiểu Dữ Liệu' },
    { id: 'quiz', icon: <HelpCircle />, label: 'Trắc nghiệm' },
    { id: 'practice', icon: <Code />, label: 'Bài tập' },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-500 selection:text-white pb-32 md:pb-80 bg-[#A9A9A9] text-black overflow-x-hidden">
      
      {/* Navigation Dock */}
      <div className="fixed bottom-4 md:bottom-10 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="flex gap-4 md:gap-10 p-3 md:p-6 rounded-full pointer-events-auto transition-all duration-300 bg-white/95 backdrop-blur-2xl border-2 md:border-4 border-white/40 shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { 
                playClickSound(); 
                setActiveSection(item.id); 
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); 
              }}
              className={`p-3 md:p-6 rounded-full transition-all duration-300 group relative
                ${activeSection === item.id 
                  ? 'bg-indigo-700 text-white shadow-xl scale-110 md:scale-125' 
                  : 'text-slate-900 hover:text-indigo-900 hover:bg-white'}`}
            >
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: window.innerWidth < 768 ? 20 : 40 })}
              <span className="hidden md:block absolute -top-20 left-1/2 -translate-x-1/2 px-6 py-3 bg-slate-900 text-white text-xl font-black rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl z-50">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-full md:max-w-[92vw] mx-auto pt-10 md:pt-24 px-4 md:px-8 space-y-16 md:space-y-48">
        
        {/* Header */}
        <header className="text-center space-y-6 md:space-y-12 py-10 md:py-20">
          <div className="inline-block px-4 py-1 md:px-10 md:py-4 rounded-full border-2 md:border-4 border-white/50 bg-white/30 font-black uppercase tracking-widest text-xs md:text-3xl mb-4 md:mb-8 text-white shadow-xl backdrop-blur-md">
            Tin Học 10 - Bài 18
          </div>
          <h1 className="text-4xl md:text-7xl lg:text-[10rem] font-black tracking-tighter leading-none drop-shadow-xl animate-shine bg-[length:200%_auto] bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-yellow-200 via-white to-cyan-300">
            VÀO RA ĐƠN GIẢN
          </h1>
          <p className="text-lg md:text-4xl lg:text-6xl max-w-6xl mx-auto font-black leading-tight text-white drop-shadow-lg">
            Giao tiếp với máy tính bằng Python!
          </p>
        </header>

        {/* --- Section 1: Intro --- */}
        <section id="intro" className="space-y-16 md:space-y-32">
          
          <GlowCard>
            <h2 className={sectionTitle}>
              <Lightbulb className="w-10 h-10 md:w-32 md:h-32 flex-shrink-0 text-yellow-500" />
              1. Luồng hoạt động
            </h2>
            
            <div className={bodyText}>
              <p className="mb-6 md:mb-12 font-black text-slate-800 text-xl md:text-4xl lg:text-6xl">
                Dữ liệu đi như thế nào?
              </p>
              
              <ConceptDiagram />

              <div className="flex flex-col gap-6 md:gap-10 mt-8 md:mt-16">
                <div className="p-6 md:p-12 rounded-2xl md:rounded-[3rem] bg-green-50 border-2 md:border-4 border-green-200 shadow-lg relative">
                  <strong className="text-green-800 text-xl md:text-5xl block mb-2 md:mb-6 font-black uppercase tracking-wider">INPUT (Nhập)</strong>
                  <p className="text-sm md:text-4xl leading-relaxed text-green-900 font-bold">Dữ liệu vào qua <code className="font-mono bg-green-200 px-2 rounded-lg border">input()</code>.</p>
                </div>
                <div className="p-6 md:p-12 rounded-2xl md:rounded-[3rem] bg-indigo-50 border-2 md:border-4 border-indigo-200 shadow-lg relative">
                  <strong className="text-indigo-800 text-xl md:text-5xl block mb-2 md:mb-6 font-black uppercase tracking-wider">PROCESS (Xử lý)</strong>
                  <p className="text-sm md:text-4xl leading-relaxed text-indigo-900 font-bold">Máy tính tính toán và suy nghĩ.</p>
                </div>
                <div className="p-6 md:p-12 rounded-2xl md:rounded-[3rem] bg-blue-50 border-2 md:border-4 border-blue-200 shadow-lg relative">
                  <strong className="text-blue-800 text-xl md:text-5xl block mb-2 md:mb-6 font-black uppercase tracking-wider">OUTPUT (Xuất)</strong>
                  <p className="text-sm md:text-4xl leading-relaxed text-blue-900 font-bold">Kết quả hiện ra qua <code className="font-mono bg-blue-200 px-2 rounded-lg border">print()</code>.</p>
                </div>
              </div>
            </div>
          </GlowCard>

          {/* INPUT Command */}
          <div className="flex flex-col gap-10 md:gap-20">
            <GlowCard>
              <h3 className="text-3xl md:text-7xl font-black mb-6 md:mb-10 text-green-900 flex items-center gap-4 md:gap-6">
                <Keyboard className="w-10 h-10 md:w-20 md:h-20" /> Lệnh Nhập: input()
              </h3>
              <p className={`${bodyText} mb-6`}>
                Nhận thông tin từ người dùng qua bàn phím.
              </p>

              <InputExampleDiagram />
              
              <div className="bg-amber-50 border-l-[8px] md:border-l-[16px] border-amber-500 p-6 md:p-12 rounded-r-2xl md:rounded-r-[3rem] my-8 shadow-xl">
                <div className="flex items-center gap-3 md:gap-6 mb-2 md:mb-6">
                  <AlertTriangle className="text-amber-700 w-8 h-8 md:w-16 md:h-16" />
                  <span className="font-black text-lg md:text-5xl text-amber-800 uppercase tracking-tighter">CẢNH BÁO!</span>
                </div>
                <p className="text-sm md:text-5xl text-amber-900 font-black leading-tight">
                  Mọi thứ nhập vào luôn là <span className="underline decoration-amber-500">Xâu kí tự (String)</span>.
                </p>
              </div>

              <div className="bg-slate-100 p-6 md:p-12 rounded-2xl md:rounded-[3rem] border-2 md:border-4 border-dashed border-slate-300 shadow-inner">
                <label className="block font-black text-base md:text-4xl mb-4 md:mb-8 text-slate-800 flex items-center gap-2 md:gap-4">
                  Dùng thử tương tác:
                </label>
                <input 
                  type="text" 
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  placeholder="Nhập thử tại đây..."
                  className="w-full p-4 md:p-12 text-xl md:text-6xl rounded-xl md:rounded-[2.5rem] bg-white border-4 md:border-8 border-slate-400 focus:border-green-500 outline-none font-mono shadow-md text-black font-black"
                />
              </div>
            </GlowCard>
            
            <Terminal 
              title="Code minh hoạ"
              code={`# Nhập tên và in lời chào
ten = input("Bạn tên là gì? ")
print("Chào bạn", ten, "!")`}
              output={`Bạn tên là gì? Python\nChào bạn Python !`}
            />
          </div>
        </section>

        {/* --- Section 2: Types --- */}
        <section id="types" className="space-y-16 md:space-y-32">
          <GlowCard>
            <h2 className={sectionTitle}>
              <Hash className="w-10 h-10 md:w-20 md:h-20" />
              2. Kiểu Dữ Liệu
            </h2>
            
            <DataTypeVisuals />

            <div className="mt-12 md:mt-24 pt-12 md:pt-24 border-t-4 md:border-t-8 border-slate-100 space-y-10 md:space-y-20">
              <h3 className="text-3xl md:text-8xl font-black flex items-center gap-4 md:gap-10 text-slate-900">
                <RefreshCcw className="w-10 h-10 md:w-28 md:h-28 text-purple-600" />
                Ép kiểu dữ liệu
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                <div className="p-6 md:p-16 rounded-2xl md:rounded-[4rem] bg-purple-50 border-l-8 md:border-l-[32px] border-purple-500 shadow-lg">
                  <code className="text-3xl md:text-8xl font-black text-purple-900 font-mono">int( )</code>
                  <div className="font-mono text-lg md:text-4xl text-slate-900 font-black mt-4">Sang số nguyên</div>
                </div>

                <div className="p-6 md:p-16 rounded-2xl md:rounded-[4rem] bg-pink-50 border-l-8 md:border-l-[32px] border-pink-500 shadow-lg">
                  <code className="text-3xl md:text-8xl font-black text-pink-900 font-mono">float( )</code>
                  <div className="font-mono text-lg md:text-4xl text-slate-900 font-black mt-4">Sang số thực</div>
                </div>
              </div>
            </div>
          </GlowCard>
        </section>

        {/* --- Section 3: Quiz --- */}
        <section id="quiz" className="space-y-12 md:space-y-24">
           <div className="p-8 md:p-32 rounded-3xl md:rounded-[5rem] bg-gradient-to-br from-indigo-800 to-purple-900 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-10 md:gap-20">
                <div className="text-center xl:text-left space-y-4 md:space-y-10">
                  <h2 className="text-4xl md:text-8xl lg:text-[10rem] font-black flex flex-col md:flex-row items-center gap-4 md:gap-14 tracking-tighter">
                    <Trophy className="text-yellow-300 w-20 h-20 md:w-48 md:h-48" />
                    BÀI TẬP
                  </h2>
                </div>
                
                <div className="bg-white/10 p-6 md:p-16 rounded-3xl md:rounded-[4rem] backdrop-blur-3xl border-4 md:border-8 border-white/20 shadow-2xl flex flex-col items-center min-w-[200px] md:min-w-[400px]">
                   <div className="text-sm md:text-4xl font-black uppercase mb-2 md:mb-6 opacity-60">SCORE</div>
                   <div className="text-6xl md:text-[15rem] font-black text-yellow-300 font-mono leading-none">
                     {correctCount}
                   </div>
                   <div className="text-lg md:text-5xl font-black mt-2 opacity-40">/ {quizzes.length}</div>
                </div>
              </div>
              <button 
                onClick={resetQuiz}
                className="absolute top-4 right-4 md:top-16 md:right-16 p-3 md:p-8 bg-white/20 rounded-full"
              >
                <RefreshCcw size={window.innerWidth < 768 ? 24 : 64} />
              </button>
           </div>

           <div className="grid grid-cols-1 gap-8 md:gap-20">
             {quizzes.map((q) => {
               const answer = quizAnswers[q.id];
               const isAnswered = answer !== undefined && answer !== null;
               const isCorrect = isAnswered && answer === q.correct;

               return (
                 <GlowCard key={q.id} className={`!p-6 md:!p-20 !rounded-3xl md:!rounded-[5rem]
                   ${isAnswered 
                      ? (isCorrect ? '!bg-green-50 !border-green-500' : '!bg-red-50 !border-red-500') 
                      : ''}`}>
                   
                   <h3 className="text-2xl md:text-7xl font-black text-slate-900 leading-tight mb-6 md:mb-14">{q.question}</h3>
                   
                   <div className="grid grid-cols-1 gap-4 md:gap-10">
                     {q.options.map((opt, idx) => {
                       let btnClass = 'bg-slate-50 border-2 md:border-4 border-slate-200 text-slate-800 font-black';
                       
                       if (isAnswered) {
                         if (idx === q.correct) btnClass = 'bg-green-500 text-white border-green-600';
                         else if (idx === answer) btnClass = 'bg-red-500 text-white border-red-600 opacity-50';
                         else btnClass = 'opacity-20 grayscale pointer-events-none';
                       }

                       return (
                         <button
                           key={idx}
                           disabled={isAnswered}
                           onClick={() => handleAnswer(q.id, idx)}
                           className={`w-full p-4 md:p-14 rounded-2xl md:rounded-[3.5rem] text-left transition-all text-lg md:text-6xl flex items-center gap-4 md:gap-12 ${btnClass}`}
                         >
                           <div className="w-8 h-8 md:w-28 md:h-28 flex-shrink-0 rounded-full border-2 md:border-8 border-current flex items-center justify-center font-black opacity-30">
                             {String.fromCharCode(65 + idx)}
                           </div>
                           <span className="leading-tight">{opt}</span>
                         </button>
                       );
                     })}
                   </div>

                   {isAnswered && (
                     <div className={`mt-8 md:mt-14 p-6 md:p-16 rounded-2xl md:rounded-[4rem] border-4 md:border-[12px]
                       ${isCorrect ? 'bg-green-100 text-green-900 border-green-200' : 'bg-red-100 text-red-900 border-red-200'}`}>
                       <p className="text-lg md:text-6xl font-black leading-tight">{q.explanation}</p>
                     </div>
                   )}
                 </GlowCard>
               );
             })}
           </div>
        </section>

        {/* --- Section 4: Practice --- */}
        <section id="practice" className="space-y-16 md:space-y-32">
          <div className="text-center space-y-6 md:space-y-16">
             <h2 className="text-5xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600 leading-none">
               THỰC HÀNH
             </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:gap-20">
            {exercises.map((ex) => (
              <GlowCard key={ex.id} className="!p-6 md:!p-20 !rounded-3xl md:!rounded-[5rem]">
                <div className="flex items-center gap-4 md:gap-14 mb-4 md:mb-14">
                  <span className="w-12 h-12 md:w-32 md:h-32 rounded-xl md:rounded-[2.5rem] bg-indigo-700 text-white text-xl md:text-7xl font-black flex items-center justify-center">
                    {ex.id}
                  </span>
                  <h3 className="text-2xl md:text-8xl font-black text-slate-900 tracking-tight">{ex.title}</h3>
                </div>
                <p className="text-lg md:text-6xl font-black text-slate-800 leading-tight bg-slate-50 p-6 md:p-14 rounded-2xl md:rounded-[3.5rem] border-2 md:border-8 border-slate-100 mb-6 md:mb-14">
                  {ex.desc}
                </p>
                <div className="bg-yellow-50 p-6 md:p-14 rounded-2xl md:rounded-[4rem] border-l-8 md:border-l-[40px] border-yellow-400 shadow-xl flex items-start gap-4 md:gap-12">
                  <Lightbulb size={window.innerWidth < 768 ? 40 : 100} className="text-yellow-600 shrink-0" />
                  <p className="text-sm md:text-5xl font-black italic text-slate-900 leading-tight">{ex.hint}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;
