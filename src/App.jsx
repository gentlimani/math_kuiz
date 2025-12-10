import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, Eraser, Pen, CheckCircle, XCircle, Trophy, ChevronRight, ChevronLeft, Calculator, SkipForward, User, Undo2 } from 'lucide-react';

// --- DATA: Baza e Pyetjeve (40 Pyetje) ---
const QUESTIONS = [
  // --- 1. EKUACIONE TË AVANCUARA ---
  {
    id: 1,
    type: 'text',
    question: "Llogarit: (24 - 3) : (2 + 5) = ?",
    hint: "Kryej veprimet brenda kllapave: (21) : (7).",
    options: ["3", "7", "4", "2"],
    correctAnswer: "3",
    explanation: "24 - 3 = 21 dhe 2 + 5 = 7. Pastaj 21 : 7 = 3."
  },
  {
    id: 2,
    type: 'text',
    question: "Gjej rezultatin: 24 + (224 - 43) = ?",
    hint: "Fillimisht zbritja brenda kllapave: 224 - 43.",
    options: ["181", "205", "200", "195"],
    correctAnswer: "205",
    explanation: "224 - 43 = 181. Pastaj 24 + 181 = 205."
  },
  {
    id: 3,
    type: 'text',
    question: "Llogarit: (2 + 4) x 6 = ?",
    hint: "Kryej fillimisht veprimin brenda kllapave.",
    options: ["36", "12", "48", "24"],
    correctAnswer: "36",
    explanation: "2 + 4 = 6. Pastaj 6 x 6 = 36."
  },
  {
    id: 4,
    type: 'text',
    question: "Sa bëjnë: 100 - (5 x 8) = ?",
    hint: "Shumëzimi kryhet para zbritjes.",
    options: ["60", "40", "50", "20"],
    correctAnswer: "60",
    explanation: "5 x 8 = 40. Pastaj 100 - 40 = 60."
  },

  // --- 2. KRIJIMI I PROBLEMAVE NGA EKUACIONET ---
  {
    id: 5,
    type: 'word',
    question: "Cila problemë i përshtatet ekuacionit: 50 - 20 = ?",
    hint: "Kërko një histori ku diçka hiqet ose zvogëlohet.",
    options: [
      "Ana ka 50 euro. Ajo bleu një libër 20 euro. Sa i mbetën?",
      "Ana ka 50 euro dhe mori 20 euro dhuratë. Sa ka gjithsej?",
      "Ana ka 50 euro dhe do t'i ndajë me 20 shoqe.",
      "Ana ka 50 euro, secila vlen 20 herë më shumë."
    ],
    correctAnswer: "Ana ka 50 euro. Ajo bleu një libër 20 euro. Sa i mbetën?",
    explanation: "Shenja '-' tregon zbritje (shpenzim)."
  },
  {
    id: 6,
    type: 'word',
    question: "Cila problemë i përshtatet ekuacionit: 24 + 15 = ?",
    hint: "Kërko bashkim të sasive.",
    options: [
      "Joni kishte 24 lapsa dhe i dha 15 motrës.",
      "Joni kishte 24 lapsa dhe bleu edhe 15 të tjerë.",
      "Joni kishte 24 lapsa dhe i ndau në 15 grupe.",
      "Joni humbi 15 lapsa."
    ],
    correctAnswer: "Joni kishte 24 lapsa dhe bleu edhe 15 të tjerë.",
    explanation: "+ do të thotë shtim."
  },

  // --- 3. KATRORËT MAGJIKË (TË ZGJIDHSHËM) ---
  {
    id: 7,
    type: 'svg',
    question: "Katror Magjik (Shuma 15): Gjeni X dhe Y.",
    hint: "Përdor kolonat! Kolona e dytë: 1 + 5 + X = 15. Kolona e tretë: 6 + 7 + Y = 15.",
    svg: (
      <svg viewBox="0 0 150 150" className="w-48 h-48 mx-auto">
        <rect x="0" y="0" width="150" height="150" fill="white" stroke="black" strokeWidth="2" />
        <line x1="50" y1="0" x2="50" y2="150" stroke="black" />
        <line x1="100" y1="0" x2="100" y2="150" stroke="black" />
        <line x1="0" y1="50" x2="150" y2="50" stroke="black" />
        <line x1="0" y1="100" x2="150" y2="100" stroke="black" />
        <text x="25" y="35" textAnchor="middle" fontSize="20">8</text>
        <text x="75" y="35" textAnchor="middle" fontSize="20">1</text>
        <text x="125" y="35" textAnchor="middle" fontSize="20">6</text>
        <text x="25" y="85" textAnchor="middle" fontSize="20">3</text>
        <text x="75" y="85" textAnchor="middle" fontSize="20">5</text>
        <text x="125" y="85" textAnchor="middle" fontSize="20">7</text>
        <text x="25" y="135" textAnchor="middle" fontSize="20">4</text>
        <text x="75" y="135" textAnchor="middle" fontSize="20" fill="red" fontWeight="bold">X</text>
        <text x="125" y="135" textAnchor="middle" fontSize="20" fill="blue" fontWeight="bold">Y</text>
      </svg>
    ),
    options: ["X=9, Y=2", "X=6, Y=4", "X=8, Y=2", "X=7, Y=3"],
    correctAnswer: "X=9, Y=2",
    explanation: "Kolona e mesit: 1 + 5 = 6. Mungojnë 9 (X). Kolona e fundit: 6 + 7 = 13. Mungojnë 2 (Y)."
  },
  {
    id: 8,
    type: 'svg',
    question: "Katror Magjik (Shuma 15): Cilat numra mungojnë te A dhe B?",
    hint: "Rreshti i parë: 4 + A + 2 = 15. Rreshti i dytë: 3 + 5 + B = 15.",
    svg: (
      <svg viewBox="0 0 150 150" className="w-48 h-48 mx-auto">
        <rect x="0" y="0" width="150" height="150" fill="white" stroke="black" strokeWidth="2" />
        <line x1="50" y1="0" x2="50" y2="150" stroke="black" />
        <line x1="100" y1="0" x2="100" y2="150" stroke="black" />
        <line x1="0" y1="50" x2="150" y2="50" stroke="black" />
        <line x1="0" y1="100" x2="150" y2="100" stroke="black" />
        <text x="25" y="35" textAnchor="middle" fontSize="20">4</text>
        <text x="75" y="35" textAnchor="middle" fontSize="20" fill="red" fontWeight="bold">A</text>
        <text x="125" y="35" textAnchor="middle" fontSize="20">2</text>
        <text x="25" y="85" textAnchor="middle" fontSize="20">3</text>
        <text x="75" y="85" textAnchor="middle" fontSize="20">5</text>
        <text x="125" y="85" textAnchor="middle" fontSize="20" fill="blue" fontWeight="bold">B</text>
        <text x="25" y="135" textAnchor="middle" fontSize="20">8</text>
        <text x="75" y="135" textAnchor="middle" fontSize="20">1</text>
        <text x="125" y="135" textAnchor="middle" fontSize="20">6</text>
      </svg>
    ),
    options: ["A=9, B=7", "A=8, B=6", "A=7, B=9", "A=5, B=5"],
    correctAnswer: "A=9, B=7",
    explanation: "Rreshti 1: 4+2=6, duhen 9. Rreshti 2: 3+5=8, duhen 7."
  },

  // --- 4. MBLEDHJE E ZBRITJE TË MËDHA ---
  {
    id: 9,
    type: 'text',
    question: "Gjeni shumën: 468 + 285 = ?",
    hint: "Mblidh me shtyllë, duke mbajtur mend.",
    options: ["753", "643", "743", "653"],
    correctAnswer: "753",
    explanation: "8+5=13 (3, mbaj 1); 6+8+1=15 (5, mbaj 1); 4+2+1=7."
  },
  {
    id: 10,
    type: 'text',
    question: "Kryeni zbritjen: 800 - 435 = ?",
    hint: "Merr hua nga qindëshet deri te njëshet.",
    options: ["465", "365", "475", "375"],
    correctAnswer: "365",
    explanation: "10-5=5; 9-3=6; 7-4=3. Rezultati: 365."
  },
  {
    id: 11,
    type: 'text',
    question: "Gjeni numrin që mungon: 1000 = 800 + ___ + 50 + 3",
    hint: "Duhet të bëhet 1000. Kemi 800 + 50 + 3 = 853.",
    options: ["200", "100", "147", "153"],
    correctAnswer: "147",
    explanation: "1000 - 853 = 147."
  },
  {
    id: 12,
    type: 'text',
    question: "Gjeni ndryshimin: 900 - 27 = ?",
    hint: "Merrni hua te 9-ta.",
    options: ["873", "883", "973", "827"],
    correctAnswer: "873",
    explanation: "10-7=3; 9-2=7; mbetet 8."
  },

  // --- 5. SHUMËZIMI DHE PJESËTIMI ---
  {
    id: 13,
    type: 'text',
    question: "Si shkruhet shuma 4 + 4 + 4 + 4 + 4 si shumëzim?",
    hint: "Numëro sa herë përsëritet numri 4.",
    options: ["4 x 5", "5 x 4", "4 x 4", "20"],
    correctAnswer: "5 x 4",
    explanation: "Numri 4 përsëritet 5 herë, pra 5 x 4."
  },
  {
    id: 14,
    type: 'text',
    question: "Sa bëjnë 8 x 6?",
    hint: "Tabela e shumëzimit të 8-ës.",
    options: ["48", "56", "42", "54"],
    correctAnswer: "48",
    explanation: "8 x 6 = 48."
  },
  {
    id: 15,
    type: 'text',
    question: "Cili numër mungon: ___ : 4 = 9",
    hint: "Përdor shumëzimin e kundërt: 9 x 4.",
    options: ["36", "32", "28", "45"],
    correctAnswer: "36",
    explanation: "36 : 4 = 9 sepse 9 x 4 = 36."
  },
  {
    id: 16,
    type: 'text',
    question: "Llogarit: 324 x 2 = ?",
    hint: "Shumëzo secilën shifër me 2.",
    options: ["648", "628", "548", "644"],
    correctAnswer: "648",
    explanation: "2x4=8, 2x2=4, 2x3=6."
  },
  
  // --- 6. MODELIM DHE GJEOMETRI ---
  {
    id: 17,
    type: 'text',
    question: "Cili numër vjen pas? 12, 16, 20, 24, ...",
    hint: "Numrat rriten me nga 4.",
    options: ["26", "28", "30", "32"],
    correctAnswer: "28",
    explanation: "24 + 4 = 28."
  },
  {
    id: 18,
    type: 'text',
    question: "Sa është perimetri i një katrori me brinjë 5 cm?",
    hint: "Perimetri = 4 x brinja.",
    options: ["20 cm", "25 cm", "15 cm", "10 cm"],
    correctAnswer: "20 cm",
    explanation: "4 x 5 cm = 20 cm."
  },
  {
    id: 19,
    type: 'text',
    question: "Sa brinjë ka një trekëndësh?",
    hint: "Emri e tregon.",
    options: ["3", "4", "5", "2"],
    correctAnswer: "3",
    explanation: "Trekëndëshi ka 3 brinjë."
  },
  {
    id: 20,
    type: 'text',
    question: "Sa minuta ka 1 orë e gjysmë?",
    hint: "1 orë = 60 min, gjysmë ore = 30 min.",
    options: ["60", "90", "100", "120"],
    correctAnswer: "90",
    explanation: "60 + 30 = 90 minuta."
  },
  {
    id: 21,
    type: 'text',
    question: "Rrumbullakos numrin 47 në dhjetëshen më të afërt.",
    options: ["40", "50", "45", "60"],
    correctAnswer: "50",
    explanation: "7 > 5, prandaj shkojmë te 50."
  },
  {
    id: 22,
    type: 'text',
    question: "Cili numër është çift?",
    options: ["33", "45", "88", "91"],
    correctAnswer: "88",
    explanation: "Numrat çift mbarojnë me 0, 2, 4, 6, 8."
  },
  {
    id: 23,
    type: 'text',
    question: "9 x 9 = ?",
    options: ["81", "72", "99", "18"],
    correctAnswer: "81",
    explanation: "9 x 9 = 81."
  },
  {
    id: 24,
    type: 'text',
    question: "45 : 5 = ?",
    options: ["8", "9", "7", "6"],
    correctAnswer: "9",
    explanation: "9 x 5 = 45."
  },
  {
    id: 25,
    type: 'text',
    question: "Gjej ndryshimin: 1000 - 1 = ?",
    options: ["999", "900", "1001", "990"],
    correctAnswer: "999",
    explanation: "Një më pak se 1000 është 999."
  },
  {
    id: 26,
    type: 'text',
    question: "Cila shenjë duhet: 356 ? 287",
    options: [">", "<", "=", "+"],
    correctAnswer: ">",
    explanation: "356 është më i madh se 287."
  },
  {
    id: 27,
    type: 'text',
    question: "Sa bëjnë 7 x 8?",
    options: ["56", "54", "49", "64"],
    correctAnswer: "56",
    explanation: "7 x 8 = 56."
  },
  {
    id: 28,
    type: 'word',
    question: "Një libër kushton 5 euro. Sa kushtojnë 6 libra?",
    options: ["30 euro", "25 euro", "35 euro", "11 euro"],
    correctAnswer: "30 euro",
    explanation: "6 x 5 = 30 euro."
  },
  {
    id: 29,
    type: 'text',
    question: "Gjej shumën: 125 + 125 = ?",
    options: ["250", "200", "300", "225"],
    correctAnswer: "250",
    explanation: "100+100=200; 25+25=50. Totali 250."
  },
  {
    id: 30,
    type: 'text',
    question: "Cili numër vjen para 500?",
    options: ["499", "490", "501", "400"],
    correctAnswer: "499",
    explanation: "500 - 1 = 499."
  },
  {
    id: 31,
    type: 'text',
    question: "Sa bëjnë 30 : 3?",
    options: ["10", "3", "33", "90"],
    correctAnswer: "10",
    explanation: "3 x 10 = 30."
  },
  {
    id: 32,
    type: 'text',
    question: "1 kg = ? g",
    options: ["1000 g", "100 g", "10 g", "500 g"],
    correctAnswer: "1000 g",
    explanation: "1 kilogram ka 1000 gram."
  },
  {
    id: 33,
    type: 'text',
    question: "Cili numër është 100 më shumë se 245?",
    options: ["345", "255", "1245", "246"],
    correctAnswer: "345",
    explanation: "245 + 100 = 345."
  },
  {
    id: 34,
    type: 'text',
    question: "Sa bëjnë 0 x 9?",
    options: ["0", "9", "1", "90"],
    correctAnswer: "0",
    explanation: "Çdo numër i shumëzuar me 0 jep 0."
  },
  {
    id: 35,
    type: 'text',
    question: "Cila figurë nuk ka asnjë kënd?",
    options: ["Rrethi", "Trekëndëshi", "Katrori", "Drejtkëndëshi"],
    correctAnswer: "Rrethi",
    explanation: "Rrethi është vijë e lakuar e mbyllur, pa kënde."
  },
  {
    id: 36,
    type: 'text',
    question: "Gjej ndryshimin: 65 - 28 = ?",
    options: ["37", "47", "33", "43"],
    correctAnswer: "37",
    explanation: "15-8=7; 5-2=3. Rezultati 37."
  },
  {
    id: 37,
    type: 'text',
    question: "Sa bëjnë 6 + 6 + 6 + 6?",
    options: ["24", "18", "30", "12"],
    correctAnswer: "24",
    explanation: "4 x 6 = 24."
  },
  {
    id: 38,
    type: 'text',
    question: "Gjej çerekun e 20.",
    hint: "Çereku do të thotë të pjesëtosh me 4.",
    options: ["5", "4", "10", "2"],
    correctAnswer: "5",
    explanation: "20 : 4 = 5."
  },
  {
    id: 39,
    type: 'text',
    question: "Cili është numri më i madh treshifror?",
    options: ["999", "100", "900", "99"],
    correctAnswer: "999",
    explanation: "Pas 999 vjen 1000 (katërshifror)."
  },
  {
    id: 40,
    type: 'word',
    question: "Një shitës ka 80 tullumbace. 30 janë të kuqe, 20 janë të verdha, të tjerat janë blu. Sa tullumbace blu janë?",
    hint: "80 - (30 + 20).",
    options: ["30", "40", "50", "20"],
    correctAnswer: "30",
    explanation: "30 + 20 = 50. 80 - 50 = 30 blu."
  }
];

// --- COMPONENTS ---

// 1. Drawing Canvas Component (Corrected for Touch)
const DrawingCanvas = ({ questionId }) => { 
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('black');
  
  // Clear canvas when question changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }
  }, [questionId]);

  // Setup canvas for high DPI and resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        const rect = parent.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    // Check for touch events
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      offsetX: clientX - rect.left,
      offsetY: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    // Prevent scrolling on touch devices when drawing
    if (e.cancelable) e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = getCoordinates(e);
    
    ctx.lineWidth = color === 'white' ? 20 : 3;
    ctx.strokeStyle = color;
    
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    // Prevent scrolling on touch devices when drawing
    if (e.cancelable) e.preventDefault();
    
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = getCoordinates(e);
    
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border-2 border-indigo-100 overflow-hidden">
      <div className="bg-indigo-50 p-2 flex justify-between items-center border-b border-indigo-100">
        <span className="text-indigo-800 font-bold flex items-center gap-2">
          <Pen size={18} />
          Tabela e Shkrimit
        </span>
        <div className="flex gap-2">
          <button 
            onClick={() => setColor('black')} 
            className={`p-2 rounded-full ${color === 'black' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border'}`}
            title="Laps"
          >
            <Pen size={16} />
          </button>
          <button 
            onClick={() => setColor('white')} 
            className={`p-2 rounded-full ${color === 'white' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border'}`}
            title="Gomë"
          >
            <Eraser size={16} />
          </button>
          <button 
            onClick={clearCanvas} 
            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
            title="Pastro"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
      <div className="flex-grow relative bg-white cursor-crosshair">
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ touchAction: 'none' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
    </div>
  );
};

// 2. Main App Component
export default function MathQuizApp() {
  const [studentName, setStudentName] = useState('');
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [history, setHistory] = useState([]);

  // --- WELCOME SCREEN LOGIC ---
  if (!isQuizStarted) {
    return (
      <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={48} className="text-indigo-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800">Mirësevini në Kuizin e Matematikës!</h1>
          <p className="text-gray-600">Përshëndetje! Si e ke emrin?</p>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Shkruaj emrin tënd këtu..."
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-center text-lg font-medium transition-all"
            />
            
            <button
              onClick={() => {
                if (studentName.trim()) setIsQuizStarted(true);
              }}
              disabled={!studentName.trim()}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                studentName.trim() 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Fillo Kuizin <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = QUESTIONS[currentQuestionIndex];

  const handleAnswerSelect = (option) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(option);
  };

  const checkAnswer = () => {
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    const resultRecord = {
      questionId: currentQ.id,
      isCorrect: isCorrect,
      selected: selectedAnswer
    };
    
    setHistory([...history, resultRecord]);
    setIsAnswerChecked(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setShowResult(true);
    }
  };

  const skipQuestion = () => {
    const resultRecord = {
      questionId: currentQ.id,
      isCorrect: false,
      selected: null
    };
    
    setHistory([...history, resultRecord]);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const newHistory = [...history];
      const lastAction = newHistory.pop();
      
      if (lastAction && lastAction.isCorrect) {
        setScore(score - 1);
      }

      setHistory(newHistory);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setHistory([]);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy size={48} className="text-yellow-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Të lumtë {studentName}!</h2>
          <p className="text-gray-600 mb-6">Ti përfundove testin e matematikës.</p>
          
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Rezultati i {studentName}</p>
            <p className="text-5xl font-bold text-blue-600">{score} / {QUESTIONS.length}</p>
          </div>

          <div className="space-y-3">
            <button 
              onClick={restartQuiz}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              Provo Përsëri
            </button>
            
            <button
              onClick={() => {
                setStudentName('');
                setIsQuizStarted(false);
                restartQuiz();
              }}
              className="w-full py-3 text-indigo-600 font-medium hover:bg-indigo-50 rounded-xl transition-colors"
            >
              Ndrysho emrin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-6 font-sans">
      <header className="mb-4 max-w-7xl mx-auto flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Calculator className="text-indigo-600" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Matematika me {studentName}</h1>
            <p className="text-xs text-gray-500">Përgatitje për Test - Klasa 3</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm text-gray-500">Pyetja</p>
            <p className="font-bold text-indigo-600">{currentQuestionIndex + 1} / {QUESTIONS.length}</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-indigo-100 flex items-center justify-center font-bold text-indigo-600 bg-white">
            {currentQuestionIndex + 1}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-120px)]">
        {/* Left Column: Question Area */}
        <div className="flex flex-col h-full gap-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 flex-grow flex flex-col justify-between">
            
            <div className="mb-6">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {currentQ.type === 'svg' ? 'Gjeometri / Logjikë' : (currentQ.type === 'word' ? 'Problemë' : 'Llogaritje')}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed mb-6">
                {currentQ.question}
              </h2>

              {currentQ.type === 'svg' && (
                <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
                  {currentQ.svg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentQ.options.map((option, idx) => {
                  let statusClass = "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50";
                  
                  if (isAnswerChecked) {
                    if (option === currentQ.correctAnswer) {
                      statusClass = "border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500";
                    } else if (option === selectedAnswer) {
                      statusClass = "border-red-300 bg-red-50 text-red-700";
                    } else {
                      statusClass = "border-gray-100 text-gray-400";
                    }
                  } else if (selectedAnswer === option) {
                    statusClass = "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600 text-indigo-700";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={isAnswerChecked}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 font-medium text-lg flex justify-between items-center ${statusClass}`}
                    >
                      <span>{option}</span>
                      {isAnswerChecked && option === currentQ.correctAnswer && <CheckCircle size={20} className="text-green-600" />}
                      {isAnswerChecked && option === selectedAnswer && option !== currentQ.correctAnswer && <XCircle size={20} className="text-red-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback & Navigation Section */}
            <div>
              {isAnswerChecked && (
                <div className={`mb-4 p-4 rounded-xl ${selectedAnswer === currentQ.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
                  <p className="font-bold flex items-center gap-2 mb-1">
                    {selectedAnswer === currentQ.correctAnswer ? `Saktë ${studentName}! Bravo!` : `Jo fiks ${studentName}...`}
                  </p>
                  <p className="text-sm opacity-90">{currentQ.explanation}</p>
                </div>
              )}

              <div className="flex gap-3">
                {/* Back Button */}
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all border-2 border-gray-200 flex items-center gap-2 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="Kthehu (Fshin përgjigjen)"
                >
                  <Undo2 size={20} />
                  <span className="hidden sm:inline">Kthehu</span>
                </button>

                {!isAnswerChecked ? (
                  <>
                    <button
                      onClick={checkAnswer}
                      disabled={!selectedAnswer}
                      className={`flex-grow py-3 rounded-xl font-bold text-lg transition-all shadow-sm ${
                        selectedAnswer 
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Kontrollo
                    </button>
                    <button
                      onClick={skipQuestion}
                      className="px-4 py-3 rounded-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all border-2 border-indigo-100 flex items-center gap-2"
                      title="Kapërce pyetjen"
                    >
                      <span>Kapërce</span>
                      <SkipForward size={20} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="flex-grow py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                  >
                    Vazhdo <ChevronRight size={20} />
                  </button>
                )}
              </div>
              
              {!isAnswerChecked && (
                <div className="mt-4 text-center">
                  <button className="text-sm text-gray-400 hover:text-indigo-500 underline" title={currentQ.hint}>
                    Kam nevojë për ndihmë (Hint)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Canvas Area (Calculations) */}
        <div className="h-96 lg:h-full min-h-[400px]">
          <DrawingCanvas questionId={currentQ.id} />
        </div>
      </main>
    </div>
  );
}
