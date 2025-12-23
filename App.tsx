
import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Code, HelpCircle, BookOpen, Star, Trophy, RefreshCcw, Lightbulb, Hash, Keyboard, Cpu, ArrowRight, MousePointer2, AlertTriangle, Box, Ruler, Type, ToggleLeft, Play } from 'lucide-react';
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
      className={`relative rounded-3xl md:rounded-[2rem] border transition-all duration-700 ease-out transform ${className}
        ${isVisible
          ? 'translate-y-0 opacity-100 shadow-xl md:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] ring-2 md:ring-4 ring-offset-2 md:ring-offset-4 ring-indigo-200 bg-white border-white'
          : 'translate-y-8 md:translate-y-16 opacity-0 shadow-none bg-gray-100 border-gray-200'
        }
      `}
    >
      <div className={`absolute inset-0 rounded-3xl md:rounded-[2rem] pointer-events-none transition-opacity duration-1000 overflow-hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[40px] md:blur-[80px]"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[40px] md:blur-[80px]"></div>
      </div>
      <div className="relative z-10 p-6 md:p-10">
        {children}
      </div>
    </div>
  );
};

const ConceptDiagram = () => (
  <div className="w-full p-6 md:p-8 rounded-2xl md:rounded-[2rem] my-6 md:my-8 flex flex-col xl:flex-row items-center justify-between gap-6 md:gap-8 bg-slate-50 border-2 md:border-4 border-slate-200 relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03] md:opacity-[0.05] bg-[linear-gradient(to_right,#80808012_2px,transparent_2px),linear-gradient(to_bottom,#80808012_2px,transparent_2px)] bg-[size:24px_24px] md:bg-[size:48px_48px]"></div>

    <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4 group flex-1">
      <div className="w-20 h-20 md:w-32 md:h-32 rounded-xl md:rounded-3xl flex items-center justify-center shadow-lg transition-transform group-hover:-translate-y-2 bg-gradient-to-br from-green-400 to-green-600 text-white">
        <Keyboard className="w-10 h-10 md:w-16 md:h-16" strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <div className="font-black text-base md:text-xl uppercase tracking-widest mb-1 md:mb-2 text-green-700">INPUT</div>
        <div className="text-xs md:text-sm font-bold text-slate-700 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200">Bàn phím</div>
        <div className="mt-2 font-mono font-black text-sm md:text-xl text-green-800 bg-green-100 px-3 py-1 md:px-6 md:py-2 rounded-lg md:rounded-xl border md:border-2 border-green-200">input()</div>
      </div>
    </div>

    <div className="flex flex-col items-center gap-1">
      <ArrowRight className="rotate-90 xl:rotate-0 w-8 h-8 md:w-12 md:h-12 text-slate-300" />
    </div>

    <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4 group flex-1">
      <div className="w-20 h-20 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white relative">
        <Cpu className="w-10 h-10 md:w-16 md:h-16 animate-pulse-slow" strokeWidth={1.5} />
        <div className="absolute inset-0 border-2 md:border-4 border-dashed border-white/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
      </div>
      <div className="text-center">
        <div className="font-black text-base md:text-xl uppercase tracking-widest mb-1 md:mb-2 text-indigo-700">PROCESS</div>
        <div className="text-xs md:text-sm font-bold text-slate-700 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200">CPU Xử lý</div>
        <div className="mt-2 font-mono font-black text-sm md:text-xl text-indigo-800 bg-indigo-100 px-3 py-1 md:px-6 md:py-2 rounded-lg md:rounded-xl border md:border-2 border-indigo-200">Chương trình</div>
      </div>
    </div>

    <div className="flex flex-col items-center gap-1">
      <ArrowRight className="rotate-90 xl:rotate-0 w-8 h-8 md:w-12 md:h-12 text-slate-300" />
    </div>

    <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4 group flex-1">
      <div className="w-20 h-20 md:w-32 md:h-32 rounded-xl md:rounded-3xl flex items-center justify-center shadow-lg transition-transform group-hover:-translate-y-2 bg-gradient-to-br from-blue-400 to-blue-600 text-white">
        <Monitor className="w-10 h-10 md:w-16 md:h-16" strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <div className="font-black text-base md:text-xl uppercase tracking-widest mb-1 md:mb-2 text-blue-700">OUTPUT</div>
        <div className="text-xs md:text-sm font-bold text-slate-700 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200">Màn hình</div>
        <div className="mt-2 font-mono font-black text-sm md:text-xl text-blue-800 bg-blue-100 px-3 py-1 md:px-6 md:py-2 rounded-lg md:rounded-xl border md:border-2 border-blue-200">print()</div>
      </div>
    </div>
  </div>
);

const InputExampleDiagram = () => (
  <div className="w-full p-4 md:p-8 rounded-2xl md:rounded-[2rem] border-2 flex flex-col gap-4 md:gap-8 my-6 md:my-8 bg-slate-50 border-slate-300 shadow-inner">
    <h4 className="font-black text-base md:text-xl flex items-center gap-2 md:gap-3 text-black">
      <MousePointer2 className="w-5 h-5 md:w-8 md:h-8 text-purple-800" />
      Minh hoạ luồng xử lý
    </h4>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 text-center">
      <div className="p-4 md:p-6 rounded-xl md:rounded-2xl relative bg-white border-2 border-slate-300 shadow-md">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-700 text-white text-xs md:text-sm font-black rounded-full uppercase shadow-md">Bước 1</div>
        <div className="font-mono text-xs md:text-sm mb-1 md:mb-2 text-slate-500 font-bold">Code chạy:</div>
        <code className="block p-2 md:p-4 rounded-lg mb-2 md:mb-4 font-black text-sm md:text-xl bg-slate-100 border border-slate-400 text-green-900 shadow-inner">
          input("Tên:")
        </code>
        <div className="text-xs md:text-base font-bold text-black leading-relaxed">Máy tính dừng lại chờ đợi.</div>
      </div>

      <div className="p-4 md:p-6 rounded-xl md:rounded-2xl relative bg-white border-2 border-slate-300 shadow-md">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-700 text-white text-xs md:text-sm font-black rounded-full uppercase shadow-md">Bước 2</div>
        <div className="font-mono text-xs md:text-sm mb-1 md:mb-2 text-slate-500 font-bold">Người dùng:</div>
        <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-3 rounded-lg mb-2 md:mb-4 font-black text-sm md:text-xl bg-slate-100 border border-slate-400 text-black shadow-inner">
          <Keyboard className="w-4 h-4 md:w-6 md:h-6" /> "An" ↵
        </div>
        <div className="text-xs md:text-base font-bold text-black leading-relaxed">Nhập "An" và nhấn Enter.</div>
      </div>

      <div className="p-4 md:p-6 rounded-xl md:rounded-2xl relative bg-white border-2 border-slate-300 shadow-md">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-700 text-white text-xs md:text-sm font-black rounded-full uppercase shadow-md">Bước 3</div>
        <div className="font-mono text-xs md:text-sm mb-1 md:mb-2 text-slate-500 font-bold">Bộ nhớ:</div>
        <div className="block p-2 md:p-4 rounded-lg mb-2 md:mb-4 font-black font-mono text-base md:text-2xl bg-slate-100 border border-slate-400 text-yellow-900 shadow-inner">
          "An"
        </div>
        <div className="text-xs md:text-base font-bold text-black leading-relaxed">Xâu "An" được đưa vào biến.</div>
      </div>
    </div>
  </div>
);

const DataTypeVisuals = () => (
  <div className="grid grid-cols-1 gap-6 md:gap-10 mb-8 md:mb-16">
    {[
      {
        label: 'int',
        name: 'Số Nguyên',
        desc: 'Số dùng để đếm, không có phần thập phân.',
        valid: ['10', '-5', '0', '2025'],
        invalid: ['10.5 (là float)', '"10" (là str)', '1,000 (không dùng phẩy)'],
        color: 'blue',
        icon: <Box className="w-8 h-8 md:w-10 md:h-10" />
      },
      {
        label: 'float',
        name: 'Số Thực',
        desc: 'Số dùng để đo lường, luôn có dấu chấm động.',
        valid: ['3.14', '-0.01', '2.0', '1.5e2'],
        invalid: ['3 (là int)', '"3.14" (là str)', '3,14 (dùng chấm, ko phẩy)'],
        color: 'green',
        icon: <Ruler className="w-8 h-8 md:w-10 md:h-10" />
      },
      {
        label: 'str',
        name: 'Xâu Kí Tự',
        desc: 'Văn bản, luôn phải đặt trong dấu nháy đơn hoặc kép.',
        valid: ['"Hello"', "'Python'", '"123"', '" "'],
        invalid: ['Hello (thiếu nháy)', '123 (là int)', '"He\' (Lỗi: Lệch dấu nháy)'],
        color: 'yellow',
        icon: <Type className="w-8 h-8 md:w-10 md:h-10" />
      },
      {
        label: 'bool',
        name: 'Logic',
        desc: 'Chỉ dùng để kiểm tra đúng/sai. Chỉ có 2 giá trị.',
        valid: ['True', 'False', '10 > 5'],
        invalid: ['true (sai viết hoa)', '"True" (là str)', 'Yes/No'],
        color: 'red',
        icon: <ToggleLeft className="w-8 h-8 md:w-10 md:h-10" />
      },
    ].map((t) => (
      <div key={t.label} className={`relative p-6 md:p-10 bg-white border-l-[6px] border-${t.color}-500 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 group`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4 md:gap-6">
            <div className={`p-4 md:p-5 rounded-2xl bg-${t.color}-100 text-${t.color}-600 group-hover:scale-110 transition-transform`}>
              {t.icon}
            </div>
            <div>
              <h4 className={`text-3xl md:text-5xl font-black text-${t.color}-900`}>{t.label}</h4>
              <span className="text-sm md:text-xl font-bold uppercase tracking-wider text-slate-500">{t.name}</span>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm md:text-lg font-bold bg-${t.color}-50 text-${t.color}-600 border-2 border-${t.color}-200`}>
            Python Type
          </div>
        </div>

        {/* Description */}
        <p className="text-lg md:text-2xl font-bold text-slate-700 mb-8 leading-relaxed">
          {t.desc}
        </p>

        {/* Examples Grid */}
        <div className="grid grid-cols-2 gap-6 md:gap-8 text-base md:text-xl font-mono">
          <div className="space-y-3">
            <span className="text-sm md:text-lg font-black text-green-600 uppercase flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span> Đúng (Valid)
            </span>
            <ul className="space-y-2">
              {t.valid.map((v, i) => (
                <li key={i} className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-bold shadow-sm">{v}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <span className="text-sm md:text-lg font-black text-red-600 uppercase flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span> Sai / Lưu ý
            </span>
            <ul className="space-y-2">
              {t.invalid.map((v, i) => (
                <li key={i} className="px-4 py-3 bg-red-50 rounded-xl border border-red-100 text-red-800 opacity-90">{v}</li>
              ))}
            </ul>
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
  const [demoOutput, setDemoOutput] = useState<string | null>(null);

  // State for the new "Type Test" demo
  const [typeTestInput, setTypeTestInput] = useState("");
  const [typeTestOutput, setTypeTestOutput] = useState<{ text: string, type: string } | null>(null);

  const handleDemoRun = () => {
    if (!demoInput.trim()) return;
    playSuccessSound();
    setDemoOutput(`Xin chào, ${demoInput}!`);
  };

  const handleTypeTestRun = () => {
    if (!typeTestInput.trim()) return;
    playSuccessSound();
    // Always treat as string to demonstrate the concept
    setTypeTestOutput({
      text: typeTestInput,
      type: "<class 'str'>"
    });
  };
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>(() => {
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

  // Scroll Spy Effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'types', 'quiz', 'practice'];
      let currentSection = 'intro';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnswer = (qId: number, optionIdx: number) => {
    const isCorrect = quizzes.find(q => q.id === qId)?.correct === optionIdx;
    if (isCorrect) playSuccessSound();
    else playErrorSound();
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const resetQuiz = () => {
    playClickSound();
    if (window.confirm("Bắt đầu lại bài kiểm tra?")) setQuizAnswers({});
  };

  const sectionTitle = `text-xl md:text-3xl lg:text-5xl font-black mb-4 md:mb-8 flex items-center gap-3 md:gap-4 text-indigo-900 leading-tight`;
  const bodyText = "text-sm md:text-base lg:text-lg leading-relaxed text-slate-900 font-bold";

  const navItems = [
    { id: 'intro', icon: <BookOpen />, label: 'Lý thuyết' },
    { id: 'types', icon: <Hash />, label: 'Kiểu Dữ Liệu' },
    { id: 'quiz', icon: <HelpCircle />, label: 'Trắc nghiệm' },
    { id: 'practice', icon: <Code />, label: 'Bài tập' },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-500 selection:text-white pb-32 md:pb-80 bg-[#A9A9A9] text-black overflow-x-hidden">

      {/* Mobile Navigation (Bottom) */}
      <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center md:hidden pointer-events-none">
        <div className="flex bg-white/80 backdrop-blur-md border border-white/40 shadow-xl rounded-full px-6 py-3 pointer-events-auto gap-6 transition-all duration-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playClickSound();
                setActiveSection(item.id);
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-2 rounded-full transition-all duration-300 relative
                ${activeSection === item.id
                  ? 'text-indigo-600 scale-125'
                  : 'text-slate-500 hover:text-indigo-500'}`}
            >
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
              {activeSection === item.id && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Navigation (Right) */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 pointer-events-none hidden md:flex">
        <div className="flex flex-col gap-3 p-3 rounded-full pointer-events-auto bg-white/80 backdrop-blur-md border border-white/40 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                playClickSound();
                setActiveSection(item.id);
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`p-3 rounded-full transition-all duration-300 group relative
                ${activeSection === item.id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-500 hover:text-indigo-600 hover:bg-white'}`}
            >
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
              <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-800 text-white text-sm font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-50">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-5xl mx-auto pt-8 md:pt-20 px-4 md:px-8 space-y-12 md:space-y-32">

        {/* Header */}
        <header className="text-center space-y-4 md:space-y-8 py-8 md:py-16">
          <div className="inline-block px-4 py-1 md:px-6 md:py-2 rounded-full border border-white/50 bg-white/30 font-black uppercase tracking-widest text-[10px] md:text-sm mb-2 md:mb-4 text-white shadow-xl backdrop-blur-md">
            Tin Học 10 - Bài 18
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-none drop-shadow-xl animate-shine bg-[length:200%_auto] bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-yellow-200 via-white to-cyan-300">
            VÀO RA ĐƠN GIẢN
          </h1>
          <p className="text-sm md:text-xl max-w-2xl mx-auto font-black leading-tight text-white drop-shadow-lg">
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
              <p className="mb-6 md:mb-12 font-black text-slate-800 text-lg md:text-3xl lg:text-4xl">
                Máy tính hoạt động như thế nào nhỉ? 🤔
              </p>

              <div className="bg-yellow-50 p-6 md:p-10 rounded-3xl border-2 border-yellow-200 shadow-lg mb-8 md:mb-12">
                <p className="text-sm md:text-xl text-yellow-900 font-medium leading-relaxed">
                  Hãy tưởng tượng máy tính giống như một người bạn robot 🤖. Để robot giúp chúng ta làm bài tập, chúng ta cần làm 3 bước:
                  <br className="mb-4" />
                  1. <span className="font-black text-green-700">Đưa đề bài</span> cho robot.
                  <br />
                  2. Robot sẽ <span className="font-black text-indigo-700">suy nghĩ và tính toán</span>.
                  <br />
                  3. Robot <span className="font-black text-blue-700">viết câu trả lời</span> ra giấy.
                </p>
              </div>

              <ConceptDiagram />

              <div className="flex flex-col gap-6 md:gap-8 mt-8 md:mt-12">
                <div className="p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] bg-green-50 border-l-[8px] md:border-l-[12px] border-green-500 shadow-md transform hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl md:text-5xl">👂</span>
                    <strong className="text-green-800 text-xl md:text-4xl font-black uppercase tracking-wider">INPUT (Nhập)</strong>
                  </div>
                  <p className="text-base md:text-2xl leading-relaxed text-green-900 font-bold opacity-80 pl-2">
                    Là lúc chúng ta "nói chuyện" với máy tính.
                    <br />
                    Trong Python, ta dùng lệnh <code className="font-mono bg-green-200 text-green-800 px-3 py-1 rounded-lg border border-green-300 mx-1">input()</code> để nhập dữ liệu.
                  </p>
                </div>

                <div className="p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] bg-indigo-50 border-l-[8px] md:border-l-[12px] border-indigo-500 shadow-md transform hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl md:text-5xl">🧠</span>
                    <strong className="text-indigo-800 text-xl md:text-4xl font-black uppercase tracking-wider">PROCESS (Xử lý)</strong>
                  </div>
                  <p className="text-base md:text-2xl leading-relaxed text-indigo-900 font-bold opacity-80 pl-2">
                    Là lúc máy tính "suy nghĩ".
                    <br />
                    Máy tính sẽ cộng trừ nhân chia, hoặc xử lý văn bản theo ý chúng ta. Chúng ta không nhìn thấy quá trình này đâu!
                  </p>
                </div>

                <div className="p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] bg-blue-50 border-l-[8px] md:border-l-[12px] border-blue-500 shadow-md transform hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl md:text-5xl">🗣️</span>
                    <strong className="text-blue-800 text-xl md:text-4xl font-black uppercase tracking-wider">OUTPUT (Xuất)</strong>
                  </div>
                  <p className="text-base md:text-2xl leading-relaxed text-blue-900 font-bold opacity-80 pl-2">
                    Là lúc máy tính "trả lời".
                    <br />
                    Máy tính sẽ hiện kết quả ra màn hình bằng lệnh <code className="font-mono bg-blue-200 text-blue-800 px-3 py-1 rounded-lg border border-blue-300 mx-1">print()</code>.
                  </p>
                </div>
              </div>
            </div>
          </GlowCard>

          {/* INPUT Command */}
          <div className="flex flex-col gap-10 md:gap-20">
            <GlowCard>
              <h3 className="text-2xl md:text-5xl font-black mb-6 md:mb-10 text-green-900 flex items-center gap-4 md:gap-6">
                <Keyboard className="w-10 h-10 md:w-20 md:h-20" /> Lệnh Nhập: input()
              </h3>
              <p className={`${bodyText} mb-6`}>
                Nhận thông tin từ người dùng qua bàn phím.
              </p>

              <InputExampleDiagram />

              <div className="bg-amber-50 border-l-[6px] md:border-l-[10px] border-amber-500 p-4 md:p-8 rounded-r-xl md:rounded-r-[2rem] my-6 shadow-lg">
                <div className="flex items-center gap-2 md:gap-4 mb-2">
                  <AlertTriangle className="text-amber-700 w-6 h-6 md:w-10 md:h-10" />
                  <span className="font-black text-base md:text-xl text-amber-800 uppercase tracking-tighter">CẢNH BÁO!</span>
                </div>
                <p className="text-sm md:text-lg text-amber-900 font-black leading-tight">
                  Mọi thứ nhập vào luôn là <span className="underline decoration-amber-500">Xâu kí tự (String)</span>.
                </p>
              </div>

              <div className="bg-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-700 relative overflow-hidden group my-8">
                {/* Window Controls */}
                <div className="absolute top-0 left-0 w-full h-10 bg-slate-900/50 flex items-center px-4 gap-2 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-2 text-xs text-slate-400 font-mono font-bold">python_interactive_demo.py</span>
                </div>

                <div className="mt-8 space-y-6 md:space-y-8">
                  <div className="flex items-center gap-3 text-white">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <Code className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-bold text-lg md:text-xl">Dùng thử tương tác 1: Chào hỏi</h4>
                      <span className="text-slate-400 text-sm font-medium">Nhập tên của bạn</span>
                    </div>
                  </div>

                  {/* Code Preview */}
                  <div className="font-mono text-sm md:text-lg text-slate-300 bg-black/30 p-4 md:p-6 rounded-xl border border-white/5 shadow-inner">
                    <div className="text-slate-500 italic mb-2"># Chương trình chào hỏi đơn giản</div>
                    <div className="leading-relaxed">
                      <div><span className="text-purple-400">name</span> = <span className="text-yellow-400">input</span>(<span className="text-green-400">"Tên bạn là gì? "</span>)</div>
                      <div><span className="text-yellow-400">print</span>(<span className="text-green-400">"Xin chào, "</span> + <span className="text-purple-400">name</span> + <span className="text-green-400">"!"</span>)</div>
                    </div>
                  </div>

                  {/* Interactive Area */}
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 font-mono font-bold text-lg">{'>'}</div>
                      <input
                        type="text"
                        value={demoInput}
                        onChange={(e) => setDemoInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleDemoRun()}
                        placeholder="Nhập tên của bạn vào đây..."
                        className="w-full bg-slate-900 px-10 py-4 rounded-xl text-white font-mono text-base md:text-xl border-2 border-slate-600 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 outline-none shadow-inner placeholder:text-slate-600 transition-all"
                      />
                    </div>

                    <button
                      onClick={handleDemoRun}
                      className="self-start px-6 py-3 md:px-8 md:py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
                    >
                      <Play className="fill-current w-5 h-5 md:w-6 md:h-6" />
                      Chạy Lệnh (Run)
                    </button>
                  </div>

                  {/* Output Display */}
                  {demoOutput && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold pl-2">KẾT QUẢ (OUTPUT):</div>
                      <div className="bg-black p-4 md:p-6 rounded-xl border-l-4 border-green-500 font-mono text-lg md:text-2xl text-green-400 shadow-2xl flex items-center gap-3">
                        <Monitor className="w-6 h-6 md:w-8 md:h-8 opacity-50" />
                        <span>{demoOutput}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SECOND DEMO BLOCK: NUMBER IS STRING */}
              <div className="bg-slate-900 rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-slate-700 relative overflow-hidden group my-8">
                {/* Window Controls */}
                <div className="absolute top-0 left-0 w-full h-10 bg-slate-800 flex items-center px-4 gap-2 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                  <span className="ml-2 text-xs text-slate-500 font-mono font-bold">test_type.py</span>
                </div>

                <div className="mt-8 space-y-6 md:space-y-8">
                  <div className="flex items-center gap-3 text-white">
                    <div className="p-2 bg-pink-500/20 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-pink-400" />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-bold text-lg md:text-xl">Dùng thử tương tác 2: Nhập số</h4>
                      <span className="text-slate-400 text-sm font-medium">Điều gì xảy ra khi bạn nhập số?</span>
                    </div>
                  </div>

                  {/* Code Preview */}
                  <div className="font-mono text-sm md:text-lg text-slate-300 bg-black/30 p-4 md:p-6 rounded-xl border border-white/5 shadow-inner">
                    <div className="text-slate-500 italic mb-2"># Nhập thử một con số bất kì</div>
                    <div className="leading-relaxed">
                      <div><span className="text-purple-400">du_lieu</span> = <span className="text-yellow-400">input</span>(<span className="text-green-400">"Nhập số: "</span>)</div>
                      <div><span className="text-yellow-400">print</span>(<span className="text-green-400">"Bạn vừa nhập chuỗi kí tự: "</span>, <span className="text-purple-400">du_lieu</span>)</div>
                      <div><span className="text-yellow-400">print</span>(<span className="text-green-400">"Kiểu dữ liệu là: "</span>, <span className="text-yellow-400">type</span>(<span className="text-purple-400">du_lieu</span>))</div>
                    </div>
                  </div>

                  {/* Interactive Area */}
                  <div className="flex flex-col gap-4">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500 font-mono font-bold text-lg">{'>'}</div>
                      <input
                        type="text"
                        value={typeTestInput}
                        onChange={(e) => setTypeTestInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleTypeTestRun()}
                        placeholder="Nhập thử số 100, 3.14 hoặc bất cứ gì..."
                        className="w-full bg-slate-800 px-10 py-4 rounded-xl text-white font-mono text-base md:text-xl border-2 border-slate-600 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 outline-none shadow-inner placeholder:text-slate-500 transition-all"
                      />
                    </div>

                    <button
                      onClick={handleTypeTestRun}
                      className="self-start px-6 py-3 md:px-8 md:py-4 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
                    >
                      <Play className="fill-current w-5 h-5 md:w-6 md:h-6" />
                      Chạy Lệnh (Run)
                    </button>
                  </div>

                  {/* Output Display */}
                  {typeTestOutput && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold pl-2">KẾT QUẢ (OUTPUT):</div>
                      <div className="bg-black p-4 md:p-6 rounded-xl border-l-4 border-pink-500 font-mono text-lg md:text-2xl text-pink-400 shadow-2xl space-y-2">
                        <div className="flex items-center gap-3">
                          <Monitor className="w-6 h-6 md:w-8 md:h-8 opacity-50" />
                          <span>Bạn vừa nhập chuỗi kí tự: "{typeTestOutput.text}"</span>
                        </div>
                        <div className="flex items-center gap-3 text-yellow-400">
                          <span className="w-8"></span>
                          <span>Kiểu dữ liệu là: {typeTestOutput.type}</span>
                          <span className="animate-pulse w-3 h-6 bg-yellow-500 inline-block align-middle ml-1"></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </GlowCard>


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

            <div className="mt-8 md:mt-16 pt-8 md:pt-16 border-t-2 md:border-t-4 border-slate-100 space-y-6 md:space-y-12">
              <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-30"></div>
                <div className="relative z-10">
                  <h3 className="text-xl md:text-3xl font-black flex items-center gap-3 mb-6">
                    <Code className="text-purple-400" />
                    Lệnh kiểm tra kiểu: type()
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 font-mono text-sm md:text-base">
                    <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                      <div className="text-slate-400"># Kiểm tra số nguyên</div>
                      <div className="mt-1"><span className="text-yellow-400">type</span>(<span className="text-blue-400">2024</span>) <span className="text-slate-500">➜</span> <span className="text-green-400">&lt;class 'int'&gt;</span></div>
                    </div>
                    <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                      <div className="text-slate-400"># Kiểm tra số thực</div>
                      <div className="mt-1"><span className="text-yellow-400">type</span>(<span className="text-blue-400">3.5</span>) <span className="text-slate-500">➜</span> <span className="text-green-400">&lt;class 'float'&gt;</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl md:text-4xl font-black text-slate-900 mt-8">Ép kiểu dữ liệu (Type Casting)</h3>
              <p className="text-slate-600 font-bold max-w-2xl">Đôi khi ta cần chuyển dữ liệu từ kiểu này sang kiểu khác, ví dụ như chuyển xâu người dùng nhập thành số để tính toán.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* int() */}
                <div className="group relative p-6 bg-purple-50 border-2 border-purple-100 rounded-2xl hover:border-purple-400 transition-all">
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-purple-500 text-white text-xs font-black uppercase rounded shadow-md">Quan trọng</div>
                  <h4 className="font-mono text-2xl font-black text-purple-700 mb-2">int()</h4>
                  <p className="text-sm font-bold text-slate-700 mb-4">Chuyển thành số nguyên.</p>
                  <div className="bg-white p-3 rounded-lg border border-purple-100 font-mono text-xs md:text-sm space-y-2 shadow-inner">
                    <div className="flex justify-between"><span>int("5")</span> <span className="text-purple-600">➜ 5</span></div>
                    <div className="flex justify-between"><span>int(3.9)</span> <span className="text-purple-600">➜ 3</span></div>
                  </div>
                </div>

                {/* float() */}
                <div className="p-6 bg-pink-50 border-2 border-pink-100 rounded-2xl hover:border-pink-400 transition-all">
                  <h4 className="font-mono text-2xl font-black text-pink-700 mb-2">float()</h4>
                  <p className="text-sm font-bold text-slate-700 mb-4">Chuyển thành số thực.</p>
                  <div className="bg-white p-3 rounded-lg border border-pink-100 font-mono text-xs md:text-sm space-y-2 shadow-inner">
                    <div className="flex justify-between"><span>float("3")</span> <span className="text-pink-600">➜ 3.0</span></div>
                    <div className="flex justify-between"><span>float(5)</span> <span className="text-pink-600">➜ 5.0</span></div>
                  </div>
                </div>

                {/* str() */}
                <div className="p-6 bg-yellow-50 border-2 border-yellow-100 rounded-2xl hover:border-yellow-400 transition-all">
                  <h4 className="font-mono text-2xl font-black text-yellow-700 mb-2">str()</h4>
                  <p className="text-sm font-bold text-slate-700 mb-4">Chuyển thành xâu kí tự.</p>
                  <div className="bg-white p-3 rounded-lg border border-yellow-100 font-mono text-xs md:text-sm space-y-2 shadow-inner">
                    <div className="flex justify-between"><span>str(12)</span> <span className="text-yellow-600">➜ "12"</span></div>
                    <div className="flex justify-between"><span>str(3.5)</span> <span className="text-yellow-600">➜ "3.5"</span></div>
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        </section>

        {/* --- Section 3: Quiz --- */}
        <section id="quiz" className="space-y-8 md:space-y-16">
          <div className="p-6 md:p-12 rounded-2xl md:rounded-[3rem] bg-gradient-to-br from-indigo-800 to-purple-900 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-6 md:gap-12">
              <div className="text-center xl:text-left space-y-2 md:space-y-6">
                <h2 className="text-3xl md:text-6xl font-black flex flex-col md:flex-row items-center gap-3 md:gap-8 tracking-tighter">
                  <Trophy className="text-yellow-300 w-12 h-12 md:w-24 md:h-24" />
                  BÀI TẬP
                </h2>
              </div>

              <div className="bg-white/10 p-4 md:p-8 rounded-xl md:rounded-[2.5rem] backdrop-blur-3xl border-2 md:border-4 border-white/20 shadow-2xl flex flex-col items-center min-w-[150px] md:min-w-[250px]">
                <div className="text-xs md:text-xl font-black uppercase mb-1 md:mb-4 opacity-60">SCORE</div>
                <div className="text-4xl md:text-8xl font-black text-yellow-300 font-mono leading-none">
                  {correctCount}
                </div>
                <div className="text-sm md:text-2xl font-black mt-1 opacity-40">/ {quizzes.length}</div>
              </div>
            </div>
            <button
              onClick={resetQuiz}
              className="absolute top-3 right-3 md:top-8 md:right-8 p-2 md:p-4 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <RefreshCcw size={window.innerWidth < 768 ? 20 : 32} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:gap-20">
            {quizzes.map((q) => {
              const answer = quizAnswers[q.id];
              const isAnswered = answer !== undefined && answer !== null;
              const isCorrect = isAnswered && answer === q.correct;

              return (
                <GlowCard key={q.id} className={`!p-4 md:!p-8 !rounded-2xl md:!rounded-[2.5rem]
                   ${isAnswered
                    ? (isCorrect ? '!bg-green-50 !border-green-500' : '!bg-red-50 !border-red-500')
                    : ''}`}>

                  <h3 className="text-lg md:text-2xl font-black text-slate-900 leading-tight mb-4 md:mb-8">{q.question}</h3>

                  <div className="grid grid-cols-1 gap-3 md:gap-5">
                    {q.options.map((opt, idx) => {
                      let btnClass = 'bg-slate-50 border-2 border-slate-200 text-slate-800 font-black';

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
                          className={`w-full p-3 md:p-5 rounded-xl md:rounded-[1.5rem] text-left transition-all text-sm md:text-lg flex items-center gap-3 md:gap-5 ${btnClass}`}
                        >
                          <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 rounded-full border-2 md:border-4 border-current flex items-center justify-center font-black opacity-30 text-xs md:text-sm">
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="leading-tight">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`mt-4 md:mt-8 p-4 md:p-6 rounded-xl md:rounded-[2rem] border-2 md:border-4
                       ${isCorrect ? 'bg-green-100 text-green-900 border-green-200' : 'bg-red-100 text-red-900 border-red-200'}`}>
                      <p className="text-sm md:text-lg font-black leading-tight">{q.explanation}</p>
                    </div>
                  )}
                </GlowCard>
              );
            })}
          </div>
        </section>

        {/* --- Section 4: Practice --- */}
        <section id="practice" className="space-y-8 md:space-y-16">
          <div className="text-center space-y-4 md:space-y-8">
            <h2 className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600 leading-none">
              THỰC HÀNH
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:gap-10">
            {exercises.map((ex) => (
              <GlowCard key={ex.id} className="!p-4 md:!p-10 !rounded-2xl md:!rounded-[3rem]">
                <div className="flex items-center gap-3 md:gap-8 mb-3 md:mb-8">
                  <span className="w-10 h-10 md:w-20 md:h-20 rounded-xl md:rounded-[1.5rem] bg-indigo-700 text-white text-base md:text-3xl font-black flex items-center justify-center">
                    {ex.id}
                  </span>
                  <h3 className="text-lg md:text-4xl font-black text-slate-900 tracking-tight">{ex.title}</h3>
                </div>
                <p className="text-sm md:text-2xl font-black text-slate-800 leading-tight bg-slate-50 p-4 md:p-8 rounded-xl md:rounded-[2rem] border-2 md:border-4 border-slate-100 mb-4 md:mb-8">
                  {ex.desc}
                </p>
                <div className="bg-yellow-50 p-4 md:p-8 rounded-xl md:rounded-[2rem] border-l-4 md:border-l-[20px] border-yellow-400 shadow-xl flex items-start gap-3 md:gap-8">
                  <Lightbulb size={window.innerWidth < 768 ? 24 : 48} className="text-yellow-600 shrink-0" />
                  <p className="text-xs md:text-xl font-black italic text-slate-900 leading-tight">{ex.hint}</p>
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
