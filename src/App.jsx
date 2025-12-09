import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, Eraser, Pen, CheckCircle, XCircle, Trophy, ChevronRight, Calculator, SkipForward } from 'lucide-react';

// --- DATA: Question Database ---
const QUESTIONS = [
  // --- MBLEDHJE E ZBRITJE (BASIC) ---
  {
    id: 1,
    type: 'text',
    question: "Gjeni shumën: 35 + 29 = ?",
    hint: "Mblidhni njëshet: 5 + 9 = 14 (shkruaj 4, mbaj 1).",
    options: ["54", "64", "65", "514"],
    correctAnswer: "64",
    explanation: "5 + 9 = 14 (shkruaj 4, mbaj 1). 3 + 2 + 1 = 6. Totali: 64."
  },
  {
    id: 2,
    type: 'text',
    question: "Gjeni ndryshimin: 60 - 48 = ?",
    hint: "Merrni një dhjetëshe hua nga 6-ta.",
    options: ["12", "22", "28", "18"],
    correctAnswer: "12",
    explanation: "10 - 8 = 2. 5 - 4 = 1. Mbetja: 12."
  },
  {
    id: 3,
    type: 'word',
    question: "Sibora peshon 35 kg, ndërsa Buna peshon 29 kg. Sa kilogramë peshojnë të dyja vajzat së bashku?",
    hint: "Fjala 'së bashku' tregon mbledhje.",
    options: ["54 kg", "6 kg", "64 kg", "74 kg"],
    correctAnswer: "64 kg",
    explanation: "35 + 29 = 64 kg."
  },
  // --- ZBRITJE ME HUA ---
  {
    id: 4,
    type: 'text',
    question: "Llogaritni: 356 - 162 = ?",
    hint: "Filloni nga njëshet. Pastaj te dhjetëshet, merrni hua.",
    options: ["194", "214", "294", "114"],
    correctAnswer: "194",
    explanation: "6 - 2 = 4; 15 - 6 = 9; 2 - 1 = 1."
  },
  {
    id: 5,
    type: 'text',
    question: "Gjeni ndryshimin me zero të ndërmjetme: 500 - 135 = ?",
    hint: "Merrni hua zinxhir nga qindëshet.",
    options: ["365", "435", "375", "475"],
    correctAnswer: "365",
    explanation: "10 - 5 = 5; 9 - 3 = 6; 4 - 1 = 3."
  },
  // --- TREKËNDËSHAT E NUMRAVE (NUMBER PYRAMIDS) ---
  {
    id: 6,
    type: 'svg',
    question: "Gjeni numrin që mungon në majë të trekëndëshit. Numri sipër është shuma e dy numrave poshtë.",
    hint: "Mblidhni dy numrat e poshtëm: 76 + 24.",
    svg: (
      <svg viewBox="0 0 200 120" className="w-48 h-32 mx-auto">
        <polygon points="100,10 40,110 160,110" fill="none" stroke="#2563eb" strokeWidth="3" />
        <text x="100" y="50" textAnchor="middle" fontSize="24" fill="#2563eb" fontWeight="bold">?</text>
        <text x="70" y="100" textAnchor="middle" fontSize="20" fill="black">76</text>
        <text x="130" y="100" textAnchor="middle" fontSize="20" fill="black">24</text>
      </svg>
    ),
    options: ["90", "100", "110", "52"],
    correctAnswer: "100",
    explanation: "76 + 24 = 100."
  },
  {
    id: 7,
    type: 'svg',
    question: "Cili numër mungon në bazën e trekëndëshit?",
    hint: "Numri sipër (50) minus numrin poshtë (18) jep numrin tjetër.",
    svg: (
      <svg viewBox="0 0 200 120" className="w-48 h-32 mx-auto">
        <polygon points="100,10 40,110 160,110" fill="none" stroke="#dc2626" strokeWidth="3" />
        <text x="100" y="50" textAnchor="middle" fontSize="24" fill="black" fontWeight="bold">50</text>
        <text x="70" y="100" textAnchor="middle" fontSize="20" fill="black">18</text>
        <text x="130" y="100" textAnchor="middle" fontSize="24" fill="#dc2626" fontWeight="bold">?</text>
      </svg>
    ),
    options: ["68", "42", "32", "22"],
    correctAnswer: "32",
    explanation: "50 - 18 = 32."
  },
  // --- KATRORËT MAGJIKË ---
  {
    id: 8,
    type: 'svg',
    question: "Ky është një Katror Magjik. Shuma e rreshtit të parë është 15 (4 + 9 + 2). Cili numër mungon në rreshtin e dytë?",
    hint: "Shuma duhet të jetë 15. Keni 3 + 5 = 8. Sa duhet për 15?",
    svg: (
      <svg viewBox="0 0 150 150" className="w-40 h-40 mx-auto">
        <rect x="0" y="0" width="150" height="150" fill="white" stroke="black" strokeWidth="2" />
        <line x1="50" y1="0" x2="50" y2="150" stroke="black" />
        <line x1="100" y1="0" x2="100" y2="150" stroke="black" />
        <line x1="0" y1="50" x2="150" y2="50" stroke="black" />
        <line x1="0" y1="100" x2="150" y2="100" stroke="black" />
        
        {/* Row 1 */}
        <text x="25" y="35" textAnchor="middle">4</text>
        <text x="75" y="35" textAnchor="middle">9</text>
        <text x="125" y="35" textAnchor="middle">2</text>
        {/* Row 2 */}
        <text x="25" y="85" textAnchor="middle">3</text>
        <text x="75" y="85" textAnchor="middle">5</text>
        <text x="125" y="85" textAnchor="middle" fill="red" fontWeight="bold">?</text>
        {/* Row 3 */}
        <text x="25" y="135" textAnchor="middle">8</text>
        <text x="75" y="135" textAnchor="middle">1</text>
        <text x="125" y="135" textAnchor="middle">6</text>
      </svg>
    ),
    options: ["6", "7", "8", "5"],
    correctAnswer: "7",
    explanation: "3 + 5 = 8. Që të bëhen 15, duhet 15 - 8 = 7."
  },
  // --- SHUMËZIMI DHE MBLEDHJA E PËRSËRITUR ---
  {
    id: 9,
    type: 'text',
    question: "Si mund ta shkruajmë ndryshe shumën: 4 + 4 + 4 + 4 + 4 = ?",
    hint: "Numëro sa herë përsëritet numri 4.",
    options: ["4 x 4", "5 x 4", "4 + 5", "24"],
    correctAnswer: "5 x 4",
    explanation: "Numri 4 përsëritet 5 herë, pra 5 x 4."
  },
  {
    id: 10,
    type: 'text',
    question: "Cili numër vjen pas? 350, 400, 450, ...",
    hint: "Numrat po rriten me nga 50.",
    options: ["460", "500", "550", "600"],
    correctAnswer: "500",
    explanation: "450 + 50 = 500."
  },
  {
    id: 11,
    type: 'text',
    question: "Cila shifër tregon qindëshet te numri 742?",
    hint: "Shifra e parë nga e majta.",
    options: ["2", "4", "7", "Asnjëra"],
    correctAnswer: "7",
    explanation: "7 është te qindëshet, 4 te dhjetëshet, 2 te njëshet."
  },
  // --- PROBLEMA ME FJALË DHE LEKË ---
  {
    id: 12,
    type: 'word',
    question: "Një biçikletë kushton 125 euro. Një trotinet kushton 85 euro. Sa më shumë kushton biçikleta?",
    hint: "'Sa më shumë' kërkon veprimin e zbritjes.",
    options: ["210 euro", "40 euro", "30 euro", "140 euro"],
    correctAnswer: "40 euro",
    explanation: "125 - 85 = 40 euro."
  },
  {
    id: 13,
    type: 'word',
    question: "Për një fletore dhe një laps u shpenzuan 95 centë. Sa kushtoi lapsi, nëse fletorja kushtoi 67 centë?",
    hint: "Totali minus çmimin e fletores.",
    options: ["38 centë", "28 centë", "32 centë", "162 centë"],
    correctAnswer: "28 centë",
    explanation: "95 - 67 = 28 centë."
  },
  // --- PYETJE TË REJA SHTESË ---
  {
    id: 14,
    type: 'text',
    question: "Kryeni zbritjen: 900 - 27 = ?",
    hint: "Merrni hua te 9-ta.",
    options: ["873", "883", "973", "827"],
    correctAnswer: "873",
    explanation: "10 - 7 = 3; 9 - 2 = 7; mbetet 8. Rezultati: 873."
  },
  {
    id: 15,
    type: 'text',
    question: "Gjeni shumën: 468 + 285 = ?",
    hint: "Kujdes, keni dy herë kalim të rendit.",
    options: ["753", "643", "743", "653"],
    correctAnswer: "753",
    explanation: "8 + 5 = 13; 6 + 8 + 1 = 15; 4 + 2 + 1 = 7. Totali 753."
  },
  {
    id: 16,
    type: 'text',
    question: "Cila veti e mbledhjes është kjo: 35 + 47 = 47 + 35?",
    hint: "Numrat kanë ndërruar vendet.",
    options: ["Vetia e shoqërimit", "Vetia e ndërrimit (komutative)", "Vetia e shpërndarjes", "Vetia e zeros"],
    correctAnswer: "Vetia e ndërrimit (komutative)",
    explanation: "Kur ndërrojmë vendet e mbledhorëve, shuma nuk ndryshon."
  },
  {
    id: 17,
    type: 'text',
    question: "Gjeni numrin që mungon: 1000 = 800 + ___ + 50 + 3",
    hint: "Duhet të bëhet 1000. Kemi 800 + 50 + 3 = 853.",
    options: ["200", "100", "147", "153"],
    correctAnswer: "147",
    explanation: "1000 - 853 = 147."
  },
  {
    id: 18,
    type: 'text',
    question: "Plotëso vargun: 140, 141, 142, ..., ...",
    hint: "Rritje me nga 1.",
    options: ["143, 145", "143, 144", "150, 160", "139, 138"],
    correctAnswer: "143, 144",
    explanation: "Pas 142 vjen 143, pastaj 144."
  },
  {
    id: 19,
    type: 'text',
    question: "Gjeni numrin që mungon: 47 + ___ = 100",
    hint: "Zbritni 47 nga 100.",
    options: ["63", "53", "43", "57"],
    correctAnswer: "53",
    explanation: "100 - 47 = 53."
  },
  {
    id: 20,
    type: 'text',
    question: "Cila shenjë duhet: 356 ? 287",
    hint: "Krahasoni qindëshet.",
    options: ["<", ">", "=", "+"],
    correctAnswer: ">",
    explanation: "300 është më e madhe se 200."
  },
  {
    id: 21,
    type: 'text',
    question: "Kryeni zbritjen: 800 - 435 = ?",
    hint: "Marrim hua nga qindëshet deri te njëshet.",
    options: ["465", "365", "475", "375"],
    correctAnswer: "365",
    explanation: "10 - 5 = 5; 9 - 3 = 6; 7 - 4 = 3."
  },
  {
    id: 22,
    type: 'text',
    question: "Cili veprim jep rezultatin më të madh?",
    hint: "Llogarit me mend.",
    options: ["300 + 400", "800 - 200", "500 + 300", "900 - 300"],
    correctAnswer: "500 + 300",
    explanation: "700, 600, 800, 600. Më e madhja është 800."
  },
  {
    id: 23,
    type: 'text',
    question: "Si shkruhet me numra: Pesëqind e shtatë?",
    hint: "Nuk ka dhjetëshe.",
    options: ["57", "570", "507", "5007"],
    correctAnswer: "507",
    explanation: "5 qindëshe, 0 dhjetëshe, 7 njëshe."
  },
  {
    id: 24,
    type: 'text',
    question: "Llogaritni me mend: 23 + 16 + 27 = ?",
    hint: "Mblidhni 23 dhe 27 së pari.",
    options: ["56", "66", "76", "60"],
    correctAnswer: "66",
    explanation: "23 + 27 = 50; 50 + 16 = 66."
  },
  {
    id: 25,
    type: 'text',
    question: "Çfarë quhet rezultati i veprimit të zbritjes?",
    hint: "Jo shuma.",
    options: ["Shumë", "Prodhim", "Ndryshim", "Herës"],
    correctAnswer: "Ndryshim",
    explanation: "Rezultati i zbritjes quhet ndryshim."
  },
  {
    id: 26,
    type: 'text',
    question: "Në një tren ka 254 pasagjerë. Në një tjetër ka 478 pasagjerë. Sa pasagjerë janë gjithsej?",
    hint: "Mblidhni dy numrat.",
    options: ["622", "732", "722", "224"],
    correctAnswer: "732",
    explanation: "254 + 478 = 732."
  },
  {
    id: 27,
    type: 'text',
    question: "Gjeni shumën: 20 + 40 + 8 = ?",
    hint: "Mblidh dhjetëshet pastaj shtoji 8.",
    options: ["248", "68", "14", "48"],
    correctAnswer: "68",
    explanation: "60 + 8 = 68."
  },
  {
    id: 28,
    type: 'text',
    question: "Nëse 8 + 6 = 14, atëherë 14 - 6 = ?",
    hint: "Veprimi i kundërt.",
    options: ["6", "8", "20", "14"],
    correctAnswer: "8",
    explanation: "Zbritja është e kundërta e mbledhjes."
  },
  {
    id: 29,
    type: 'text',
    question: "Gjeni ndryshimin: 1000 - 1 = ?",
    hint: "Numri para 1000.",
    options: ["900", "999", "1001", "990"],
    correctAnswer: "999",
    explanation: "Një më pak se 1000 është 999."
  },
  {
    id: 30,
    type: 'svg',
    question: "Cili numër duhet të jetë në vend të pikëpyetjes në Katrorin Magjik (Shuma 15)?",
    hint: "Shuma e rreshtit të fundit: 8 + 1 + 6 = 15. Kolona e parë: 4 + 3 + 8 = 15. Gjej numrin qendror.",
    svg: (
      <svg viewBox="0 0 150 150" className="w-40 h-40 mx-auto">
        <rect x="0" y="0" width="150" height="150" fill="white" stroke="black" strokeWidth="2" />
        <line x1="50" y1="0" x2="50" y2="150" stroke="black" />
        <line x1="100" y1="0" x2="100" y2="150" stroke="black" />
        <line x1="0" y1="50" x2="150" y2="50" stroke="black" />
        <line x1="0" y1="100" x2="150" y2="100" stroke="black" />
        
        <text x="25" y="35" textAnchor="middle">4</text>
        <text x="75" y="35" textAnchor="middle">9</text>
        <text x="125" y="35" textAnchor="middle">2</text>
        
        <text x="25" y="85" textAnchor="middle">3</text>
        <text x="75" y="85" textAnchor="middle" fill="blue" fontWeight="bold">?</text>
        <text x="125" y="85" textAnchor="middle">7</text>
        
        <text x="25" y="135" textAnchor="middle">8</text>
        <text x="75" y="135" textAnchor="middle">1</text>
        <text x="125" y="135" textAnchor="middle">6</text>
      </svg>
    ),
    options: ["4", "5", "6", "10"],
    correctAnswer: "5",
    explanation: "Kolona e mesit: 9 + 5 + 1 = 15. Numri është 5."
  },
  {
    id: 31,
    type: 'text',
    question: "Kryej veprimin: 200 + 300 - 100 = ?",
    hint: "Fillimisht mblidh, pastaj zbrit.",
    options: ["400", "500", "600", "300"],
    correctAnswer: "400",
    explanation: "200 + 300 = 500; 500 - 100 = 400."
  },
  {
    id: 32,
    type: 'word',
    question: "Anisa ka 25 lule të kuqe dhe 18 lule të verdha. Sa lule ka gjithsej Anisa?",
    hint: "Mblidh 25 dhe 18.",
    options: ["33", "43", "53", "42"],
    correctAnswer: "43",
    explanation: "25 + 18 = 43."
  },
  {
    id: 33,
    type: 'word',
    question: "Libri ka 120 faqe. Goni lexoi 20 faqe dje dhe 30 faqe sot. Sa faqe i kanë mbetur?",
    hint: "Gjej sa lexoi gjithsej (20 + 30), pastaj zbriti nga totali.",
    options: ["50", "60", "70", "80"],
    correctAnswer: "70",
    explanation: "Lexoi 20 + 30 = 50. Mbetën 120 - 50 = 70."
  },
  {
    id: 34,
    type: 'text',
    question: "Rrumbullakos numrin 47 në dhjetëshen më të afërt.",
    hint: "A është më afër 40 apo 50?",
    options: ["40", "50", "45", "60"],
    correctAnswer: "50",
    explanation: "7 është më e madhe se 5, kështu që shkojmë te 50."
  },
  {
    id: 35,
    type: 'text',
    question: "Cili është numri tek midis këtyre numrave?",
    hint: "Numrat tek nuk ndahen me 2 (mbarojnë me 1, 3, 5, 7, 9).",
    options: ["22", "34", "45", "88"],
    correctAnswer: "45",
    explanation: "45 mbaron me 5, pra është tek."
  },
  {
    id: 36,
    type: 'text',
    question: "Shkruaj numrin: 'Shtatëqind e tridhjetë e dy'",
    hint: "7 qindëshe, 3 dhjetëshe, 2 njëshe.",
    options: ["723", "732", "372", "7032"],
    correctAnswer: "732",
    explanation: "732."
  },
  {
    id: 37,
    type: 'text',
    question: "Sa bëjnë 8 + 8 + 8?",
    hint: "Mbledhje e përsëritur.",
    options: ["16", "24", "32", "18"],
    correctAnswer: "24",
    explanation: "8 + 8 = 16, 16 + 8 = 24."
  },
  {
    id: 38,
    type: 'svg',
    question: "Sa trekëndësha shihni në këtë figurë?",
    hint: "Numëroni trekëndëshat e vegjël dhe të mëdhenj.",
    svg: (
      <svg viewBox="0 0 200 150" className="w-48 h-32 mx-auto">
        <polygon points="100,10 40,130 160,130" fill="none" stroke="black" strokeWidth="2" />
        <line x1="100" y1="10" x2="100" y2="130" stroke="black" strokeWidth="2" />
      </svg>
    ),
    options: ["2", "3", "4", "1"],
    correctAnswer: "3",
    explanation: "Janë 2 trekëndësha të vegjël dhe 1 i madh që i përmban të dy. Gjithsej 3."
  },
  {
    id: 39,
    type: 'text',
    question: "Gjeni numrin që është 10 më pak se 500.",
    hint: "Numërimi mbrapsht me 10.",
    options: ["400", "490", "510", "499"],
    correctAnswer: "490",
    explanation: "500 - 10 = 490."
  },
  {
    id: 40,
    type: 'text',
    question: "Cili numër është më i madh: 602 apo 620?",
    hint: "Krahasoni dhjetëshet.",
    options: ["602", "620", "Janë të barabartë", "Nuk mund ta dimë"],
    correctAnswer: "620",
    explanation: "620 ka 2 dhjetëshe, 602 ka 0 dhjetëshe."
  },
  {
    id: 41,
    type: 'text',
    question: "Sa bëjnë 6 x 5?",
    hint: "Numëro me nga 5 gjashtë herë.",
    options: ["35", "25", "30", "40"],
    correctAnswer: "30",
    explanation: "5, 10, 15, 20, 25, 30."
  },
  {
    id: 42,
    type: 'word',
    question: "Në një klasë janë 18 vajza dhe 14 djem. Sa nxënës janë gjithsej?",
    hint: "Mblidh 18 + 14.",
    options: ["22", "32", "42", "30"],
    correctAnswer: "32",
    explanation: "18 + 14 = 32."
  },
  {
    id: 43,
    type: 'text',
    question: "Kryej veprimin: 150 + 150 = ?",
    hint: "Dy herë 150.",
    options: ["200", "300", "250", "350"],
    correctAnswer: "300",
    explanation: "100 + 100 = 200; 50 + 50 = 100; 200 + 100 = 300."
  },
  {
    id: 44,
    type: 'svg',
    question: "Cila figurë është katror?",
    hint: "Katrori ka të gjitha brinjët e barabarta.",
    svg: (
      <svg viewBox="0 0 300 100" className="w-full h-24 mx-auto">
        {/* Shape A: Rectangle */}
        <rect x="10" y="20" width="60" height="40" fill="#bfdbfe" stroke="black" strokeWidth="2" />
        <text x="40" y="80" textAnchor="middle">A</text>
        
        {/* Shape B: Square */}
        <rect x="100" y="10" width="60" height="60" fill="#bbf7d0" stroke="black" strokeWidth="2" />
        <text x="130" y="90" textAnchor="middle">B</text>
        
        {/* Shape C: Circle */}
        <circle cx="230" cy="40" r="30" fill="#fecaca" stroke="black" strokeWidth="2" />
        <text x="230" y="90" textAnchor="middle">C</text>
      </svg>
    ),
    options: ["A", "B", "C", "Asnjëra"],
    correctAnswer: "B",
    explanation: "Figura B ka brinjë të barabarta, është katror."
  },
  {
    id: 45,
    type: 'text',
    question: "Sa minuta ka gjysmë ore?",
    hint: "Një orë e plotë ka 60 minuta.",
    options: ["20", "30", "40", "50"],
    correctAnswer: "30",
    explanation: "Gjysma e 60 është 30."
  }
];

// --- COMPONENTS ---

// 1. Drawing Canvas Component
const DrawingCanvas = ({ questionId }) => { 
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('black'); // 'black' or 'white' (eraser)
  
  // Auto-clear when questionId changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      // Save context state before clearing
      ctx.save();
      // Reset transform just in case
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Restore context state
      ctx.restore();
    }
  }, [questionId]);

  // Set up canvas context and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // We don't rely solely on this because event handlers might close over old state
    // But we keep it for general setup
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
    // We do NOT set color here to avoid race conditions. 
    // We set it in startDrawing/draw.
    
    // Prevent scrolling when touching canvas
    const preventScroll = (e) => {
      if (e.target === canvas) {
        e.preventDefault();
      }
    };
    
    document.body.addEventListener('touchstart', preventScroll, { passive: false });
    document.body.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.body.removeEventListener('touchstart', preventScroll);
      document.body.removeEventListener('touchmove', preventScroll);
    };
  }, []); // Only run once on mount

  // Handle resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // Save existing drawing
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(canvas, 0, 0);

        // Resize
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        
        // Restore drawing
        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.drawImage(tempCanvas, 0, 0);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial size

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = getCoordinates(e, canvas);
    
    // IMPORTANT: Set styles immediately before drawing to ensure current state is used
    ctx.lineWidth = color === 'white' ? 20 : 3;
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = getCoordinates(e, canvas);
    
    // Ensure styles are set here too for continuity
    ctx.lineWidth = color === 'white' ? 20 : 3;
    ctx.strokeStyle = color;
    
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.closePath();
    setIsDrawing(false);
  };

  const getCoordinates = (e, canvas) => {
    // Handle both mouse and touch events
    if (e.touches && e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        offsetX: e.nativeEvent.offsetX,
        offsetY: e.nativeEvent.offsetY
      };
    }
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
      <div className="flex-grow relative touch-none bg-white cursor-crosshair">
        {/* Grid background for math feel */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [history, setHistory] = useState([]);

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
    // Record as skipped/incorrect
    const resultRecord = {
      questionId: currentQ.id,
      isCorrect: false,
      selected: null
    };
    
    setHistory([...history, resultRecord]);

    // Move to next or finish
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setShowResult(true);
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
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy size={48} className="text-yellow-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Të lumtë Noar!</h2>
          <p className="text-gray-600 mb-6">Ti përfundove testin e matematikës.</p>
          
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Rezultati yt</p>
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
            <h1 className="text-xl font-bold text-gray-800">Matematika me Noarin</h1>
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
                  {currentQ.type === 'svg' ? 'Gjeometri / Logjikë' : 'Llogaritje'}
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

            {/* Feedback Section */}
            <div>
              {isAnswerChecked && (
                <div className={`mb-4 p-4 rounded-xl ${selectedAnswer === currentQ.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-amber-50 text-amber-800'}`}>
                  <p className="font-bold flex items-center gap-2 mb-1">
                    {selectedAnswer === currentQ.correctAnswer ? 'Saktë! Bravo!' : 'Jo fiks...'}
                  </p>
                  <p className="text-sm opacity-90">{currentQ.explanation}</p>
                </div>
              )}

              <div className="flex gap-3">
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
                      Kontrollo Përgjigjen
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
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
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
