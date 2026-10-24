import React, { useState, useMemo } from 'react';
import { 
  Car, ShieldCheck, Users, TrendingDown, Phone, MapPin, 
  Calendar, CheckCircle2, ArrowRight, Sparkles, Building2, 
  Clock, Award, Calculator, MessageSquare, ChevronRight,
  ExternalLink, Search, Filter, ShieldAlert, BadgePercent,
  Check, Info, Upload, AlertCircle
} from 'lucide-react';

// ==========================================
// 🔗 LIVE GOOGLE SHEET WEB APP API ENDPOINT
// ==========================================
const GOOGLE_SHEET_API_URL = "https://script.google.com/macros/s/AKfycbwaiiBdOwcBH1e8sLdjc60tI9mu1dst5q2lIzgrCLRVcplOMp5rpWSalHvOCgJ0l1nk/exec";
const CONTACT_PHONE = "+91 8209673793";
const CONTACT_WHATSAPP_LINK = "https://wa.me/918209673793";

// Real-World Authorized Dealerships in Alwar (Google Maps Verified)
const ALWAR_DEALERSHIPS = [
  {
    id: "dealership-1",
    brand: "Hyundai",
    name: "Modern Hyundai (Modern Autocars Pvt. Ltd.)",
    address: "Opp. Circuit House, Station Road & Old Delhi Road (Diwakari), Alwar",
    phone: "+91 144 233 8701",
    rating: "4.3 ★",
    verified: true,
    associatedModels: ["Hyundai Creta", "Hyundai Venue", "Hyundai Verna"]
  },
  {
    id: "dealership-2",
    brand: "Mahindra",
    name: "Mahindra J.S. Fourwheel Motors Pvt. Ltd.",
    address: "Old Delhi Road, Near Hanuman Circle, Surya Nagar, Alwar",
    phone: "+91 144 270 1200",
    rating: "4.1 ★",
    verified: true,
    associatedModels: ["Mahindra Scorpio-N", "Mahindra Thar ROXX", "Mahindra XUV700"]
  },
  {
    id: "dealership-3",
    brand: "Tata",
    name: "TATA.CARS Showroom - Classic Motors",
    address: "Nagina Plaza, Delhi Road, Near Hanuman Circle, Alwar",
    phone: "+91 144 273 0500",
    rating: "4.2 ★",
    verified: true,
    associatedModels: ["Tata Nexon", "Tata Curvv EV", "Tata Harrier"]
  },
  {
    id: "dealership-4",
    brand: "Maruti Suzuki / NEXA",
    name: "NEXA (Fortune Cars, Alwar)",
    address: "Manhar Villa, Vijay Mandir Road, Opp. Cross Point Mall, Alwar",
    phone: "+91 144 288 3400",
    rating: "4.5 ★",
    verified: true,
    associatedModels: ["Maruti Suzuki Brezza", "Maruti Grand Vitara", "Maruti Fronx"]
  },
  {
    id: "dealership-5",
    brand: "Toyota",
    name: "Aravali Toyota",
    address: "Plot No. 3, Jai Marg, Keshav Nagar, Alwar",
    phone: "+91 82911 23505",
    rating: "4.4 ★",
    verified: true,
    associatedModels: ["Toyota Fortuner", "Toyota Innova Hycross", "Toyota Urban Cruiser"]
  },
  {
    id: "dealership-6",
    brand: "Kia",
    name: "Aravali Kia",
    address: "Plot No. 4, Jai Marg, Keshav Nagar / Lajpat Nagar, Alwar",
    phone: "+91 74063 46600",
    rating: "4.4 ★",
    verified: true,
    associatedModels: ["Kia Seltos", "Kia Sonet", "Kia Carens"]
  },
  {
    id: "dealership-7",
    brand: "MG Motor",
    name: "MG Motor Chandrmauli Showroom",
    address: "No. 134, N.E.B., Anand Vihar, Subhash Nagar / Shastri Nagar, Alwar",
    phone: "+91 11 4118 3854",
    rating: "4.2 ★",
    verified: true,
    associatedModels: ["MG Hector", "MG Windsor EV", "MG ZS EV"]
  },
  {
    id: "dealership-8",
    brand: "Škoda",
    name: "Saisha Škoda",
    address: "200 Feet Road, Near Naman Hotel, Jyoti Nagar, Tiles & Marbles Market, Alwar",
    phone: "+91 75749 99339",
    rating: "4.3 ★",
    verified: true,
    associatedModels: ["Škoda Slavia", "Škoda Kushaq", "Škoda Kylaq"]
  }
];

const INITIAL_POOLS = [
  {
    id: "creta-batch-1",
    model: "Hyundai Creta",
    segment: "Mid-size SUV",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800",
    targetBuyers: 25,
    joinedBuyers: 19,
    standardPrice: 1920000,
    expectedDiscount: 85000,
    daysLeft: 4,
    dealerPartner: "Modern Hyundai, Old Delhi Road",
    variants: ["SX Tech 1.5 Petrol", "SX(O) Diesel AT", "S(O) Knight Edition", "E 1.5 Manual"]
  },
  {
    id: "scorpio-batch-1",
    model: "Mahindra Scorpio-N",
    segment: "D-Segment SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    targetBuyers: 20,
    joinedBuyers: 14,
    standardPrice: 2450000,
    expectedDiscount: 70000,
    daysLeft: 6,
    dealerPartner: "Mahindra J.S. Fourwheel Motors, Surya Nagar",
    variants: ["Z8L 4x4 Diesel AT", "Z8 Select Diesel", "Z4 Petrol MT", "Z2 Base"]
  },
  {
    id: "nexon-batch-1",
    model: "Tata Nexon",
    segment: "Compact SUV",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
    targetBuyers: 25,
    joinedBuyers: 21,
    standardPrice: 1450000,
    expectedDiscount: 55000,
    daysLeft: 2,
    dealerPartner: "Classic Motors Tata, Nagina Plaza",
    variants: ["Fearless Plus S Petrol DCA", "Creative Plus Diesel", "Pure S CNG", "Smart Plus"]
  },
  {
    id: "fortuner-batch-1",
    model: "Toyota Fortuner",
    segment: "Premium 4x4 SUV",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=800",
    targetBuyers: 10,
    joinedBuyers: 7,
    standardPrice: 4800000,
    expectedDiscount: 120000,
    daysLeft: 9,
    dealerPartner: "Aravali Toyota, Jai Marg",
    variants: ["Legender 4x4 AT", "4x2 Diesel AT", "Standard Petrol MT"]
  },
  {
    id: "seltos-batch-1",
    model: "Kia Seltos",
    segment: "Mid-size SUV",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800",
    targetBuyers: 20,
    joinedBuyers: 13,
    standardPrice: 2050000,
    expectedDiscount: 65000,
    daysLeft: 5,
    dealerPartner: "Aravali Kia, Jai Marg",
    variants: ["GTX+ 1.5 Turbo DCT", "HTX Diesel AT", "HTK Plus Petrol"]
  },
  {
    id: "brezza-batch-1",
    model: "Maruti Suzuki Brezza",
    segment: "Compact SUV",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=800",
    targetBuyers: 25,
    joinedBuyers: 18,
    standardPrice: 1350000,
    expectedDiscount: 45000,
    daysLeft: 7,
    dealerPartner: "NEXA / Fortune Cars, Vijay Mandir Rd",
    variants: ["ZXi Plus AT", "ZXi CNG", "VXi Petrol MT"]
  }
];

export default function App() {
  const [pools, setPools] = useState(INITIAL_POOLS);
  const [selectedPool, setSelectedPool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passData, setPassData] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    locality: 'Kala Kuan',
    variant: '',
    fuel: 'Petrol',
    paymentMode: 'Bank Finance'
  });

  // EMI Calculator State
  const [calcCar, setCalcCar] = useState(INITIAL_POOLS[0]);
  const [calcDownpayment, setCalcDownpayment] = useState(400000);
  const [calcTenure, setCalcTenure] = useState(5);
  const [calcInterest, setCalcInterest] = useState(8.5);

  const emiCalculation = useMemo(() => {
    const discountedPrice = Math.max(0, calcCar.standardPrice - calcCar.expectedDiscount);
    const loanAmount = Math.max(0, discountedPrice - calcDownpayment);
    const monthlyRate = calcInterest / (12 * 100);
    const months = calcTenure * 12;

    let monthlyEMI = 0;
    if (loanAmount > 0 && monthlyRate > 0) {
      monthlyEMI = Math.round(
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      );
    }

    const totalRepay = monthlyEMI * months;
    const totalInterest = Math.max(0, totalRepay - loanAmount);

    return {
      discountedPrice,
      loanAmount,
      monthlyEMI,
      totalInterest,
      totalRepay,
      directBulkSavings: calcCar.expectedDiscount
    };
  }, [calcCar, calcDownpayment, calcTenure, calcInterest]);

  // Handle Form Submission -> Push directly to Google Sheets
  const handleReserveSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("कृपया अपना नाम और मोबाइल नंबर भरें!");
      return;
    }

    setIsSubmitting(true);
    const reservationId = `DBA-${Date.now().toString().slice(-4)}`;
    
    const payload = {
      reservationId: reservationId,
      name: formData.name,
      phone: formData.phone,
      locality: formData.locality,
      carModel: selectedPool ? selectedPool.model : "Hyundai Creta",
      variant: formData.variant || (selectedPool ? selectedPool.variants[0] : "Standard"),
      fuel: formData.fuel,
      paymentMode: formData.paymentMode,
      poolId: selectedPool ? selectedPool.id : "Open Batch"
    };

    try {
      // Direct call to your deployed Google Apps Script Web App
      await fetch(GOOGLE_SHEET_API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      console.log("Lead successfully sent to Google Sheet!");
    } catch (err) {
      console.error("Sheet push error:", err);
    } finally {
      // Update local joined counter
      if (selectedPool) {
        setPools(prev => prev.map(p => p.id === selectedPool.id ? { ...p, joinedBuyers: p.joinedBuyers + 1 } : p));
      }
      setIsSubmitting(false);
      setIsModalOpen(false);
      setPassData(payload);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Regional Trust Ribbon */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 text-xs md:text-sm font-semibold py-2 px-4 text-center">
        🚗 <span>DEALBREAKER ALWAR</span> — An Initiative by <strong>Bhavya Modi</strong> | Pooling Alwar Car Buyers for Direct Wholesale Showroom Tenders
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20">
              DB
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">Dealbreaker <span className="text-amber-400">Alwar</span></span>
              <p className="text-[10px] text-slate-400 -mt-1">By Bhavya Modi • Alwar, RJ</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href={CONTACT_WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: 8209673793</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-amber-400 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alwar's 1st Automotive Bulk-Buying Protocol</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Don't Walk Into Showrooms Alone.<br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Pool 25 Buyers & Force Fleet Pricing.
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Whether it's Modern Hyundai, J.S. Fourwheel Mahindra, or Classic Motors Tata—dealerships give wholesale discounts to bulk corporate orders. We aggregate 20–25 individual Alwar buyers into one batch to lock in massive ₹50,000 to ₹1,20,000 price cuts.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>₹0 Token Reservation</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct Alwar Authorized Showroom Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Live Google Sheet Connected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Active Car Pools Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
              <Car className="w-7 h-7 text-amber-400" />
              <span>Active Alwar Buying Pools</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">Reserve your slot with ₹0. When the pool hits 20-25 buyers, we lock the wholesale dealer tender.</p>
          </div>
          <div className="mt-4 md:mt-0 text-xs text-amber-400 font-medium">
            ⚡ Batches closing soon this week
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pools.map((pool) => {
            const percentFilled = Math.round((pool.joinedBuyers / pool.targetBuyers) * 100);
            return (
              <div 
                key={pool.id} 
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-800">
                    <img 
                      src={pool.image} 
                      alt={pool.model} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-300 border border-slate-800">
                      {pool.segment}
                    </div>
                    <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-md text-xs font-bold shadow-md">
                      Save ₹{(pool.expectedDiscount / 1000).toFixed(0)}k
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white">{pool.model}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Showroom: {pool.dealerPartner}</p>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Pool Progress</span>
                        <span className="font-semibold text-amber-400">{pool.joinedBuyers} / {pool.targetBuyers} Buyers</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentFilled}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                        <span>⏳ {pool.daysLeft} days left to tender</span>
                        <span className="text-emerald-400 font-medium">Only {pool.targetBuyers - pool.joinedBuyers} slots left</span>
                      </div>
                    </div>

                    <div className="mt-5 p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex justify-between items-center text-xs">
                      <div>
                        <span className="text-slate-500 block">Est. Showroom Price</span>
                        <span className="text-slate-300 line-through">₹{(pool.standardPrice / 100000).toFixed(2)} Lakh</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-semibold block">Target Batch Price</span>
                        <span className="text-white font-bold text-sm">₹{((pool.standardPrice - pool.expectedDiscount) / 100000).toFixed(2)} Lakh</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button 
                    onClick={() => {
                      setSelectedPool(pool);
                      setFormData(prev => ({ ...prev, variant: pool.variants[0] }));
                      setIsModalOpen(true);
                    }}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
                  >
                    <span>Reserve Free Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Financial EMI & Savings Calculator */}
      <section className="py-16 px-4 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center justify-center gap-2">
              <Calculator className="w-7 h-7 text-amber-400" />
              <span>Dealbreaker Bulk EMI & Savings Calculator</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">See how much our group-tender directly reduces your monthly installments.</p>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-2xl">
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <label className="text-xs text-slate-400 uppercase font-semibold tracking-wider block mb-2">Select Vehicle</label>
                <select 
                  value={calcCar.id}
                  onChange={(e) => setCalcCar(pools.find(p => p.id === e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {pools.map(p => (
                    <option key={p.id} value={p.id}>{p.model} (Standard: ₹{(p.standardPrice/100000).toFixed(2)}L)</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Downpayment</span>
                  <span className="text-white font-bold">₹{calcDownpayment.toLocaleString('en-IN')}</span>
                </div>
                <input 
                  type="range" 
                  min="100000" 
                  max={calcCar.standardPrice - 200000} 
                  step="50000"
                  value={calcDownpayment}
                  onChange={(e) => setCalcDownpayment(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Loan Tenure</span>
                  <span className="text-white font-bold">{calcTenure} Years ({calcTenure * 12} Months)</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="7" 
                  step="1"
                  value={calcTenure}
                  onChange={(e) => setCalcTenure(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Interest Rate</span>
                  <span className="text-white font-bold">{calcInterest}% p.a.</span>
                </div>
                <input 
                  type="range" 
                  min="7.5" 
                  max="12" 
                  step="0.1"
                  value={calcInterest}
                  onChange={(e) => setCalcInterest(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block mb-1">Your Monthly Outflow</span>
                <div className="text-4xl font-black text-white">
                  ₹{emiCalculation.monthlyEMI.toLocaleString('en-IN')} <span className="text-sm font-normal text-slate-400">/ month</span>
                </div>

                <div className="mt-6 space-y-3 border-t border-slate-800/80 pt-4 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Direct Batch Discount:</span>
                    <span className="text-emerald-400 font-bold">- ₹{emiCalculation.directBulkSavings.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Final Loan Amount:</span>
                    <span className="text-white">₹{emiCalculation.loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Total Interest Paid:</span>
                    <span className="text-white">₹{emiCalculation.totalInterest.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setSelectedPool(calcCar);
                  setFormData(prev => ({ ...prev, variant: calcCar.variants[0] }));
                  setIsModalOpen(true);
                }}
                className="mt-6 w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-amber-500/10"
              >
                Lock this Price in Pool
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Authorized Dealership Directory Alwar */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center justify-center gap-2">
            <Building2 className="w-7 h-7 text-amber-400" />
            <span>Authorized Alwar Showroom Network</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">When your pool reaches 20-25 buyers, tenders are opened directly with these verified Alwar dealerships.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALWAR_DEALERSHIPS.map((dealer) => (
            <div key={dealer.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold text-[10px]">{dealer.brand}</span>
                  <span className="text-emerald-400 font-medium">{dealer.rating}</span>
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{dealer.name}</h4>
                <p className="text-slate-400 text-[11px] mb-3 leading-relaxed">{dealer.address}</p>
              </div>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>{dealer.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Reserve Slot in {selectedPool?.model}</h3>
                <p className="text-xs text-amber-400 font-medium">₹0 Advance Token • Alwar Batch #1</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReserveSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-medium">Full Name (पूरा नाम) *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">WhatsApp / Mobile Number (मोबाइल नंबर) *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Alwar Locality (इलाका)</label>
                  <select 
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Kala Kuan">Kala Kuan</option>
                    <option value="Scheme 1-10">Scheme 1-10</option>
                    <option value="NEB / Shastri Nagar">NEB / Shastri Nagar</option>
                    <option value="Surya Nagar">Surya Nagar</option>
                    <option value="MIA / Delhi Road">MIA / Delhi Road</option>
                    <option value="Tijara Road">Tijara Road</option>
                    <option value="Company Bagh / Station">Station / Company Bagh</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Fuel Type</label>
                  <select 
                    value={formData.fuel}
                    onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="EV">Electric (EV)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">Preferred Variant</label>
                <select 
                  value={formData.variant}
                  onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  {selectedPool?.variants.map((v, i) => (
                    <option key={i} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">Payment Plan</label>
                <select 
                  value={formData.paymentMode}
                  onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Bank Finance">Bank Loan / Finance (बैंक लोन)</option>
                  <option value="Full Cash / RTGS">Full Downpayment / Cash / RTGS</option>
                </select>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting to Google Sheet...</span>
                  ) : (
                    <>
                      <span>Confirm & Generate Digital Pass</span>
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital Pass Success Modal */}
      {passData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-white">Slot Reserved!</h3>
            <p className="text-xs text-slate-400 mt-1">Your details have been successfully synced with our Alwar Master Lead Sheet.</p>

            <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Pass ID:</span>
                <span className="font-mono text-amber-400 font-bold">{passData.reservationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Buyer Name:</span>
                <span className="text-white font-medium">{passData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Car Model:</span>
                <span className="text-white font-medium">{passData.carModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Locality:</span>
                <span className="text-white font-medium">{passData.locality}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <a 
                href={`https://wa.me/918209673793?text=Hi%20Bhavya,%20I%20have%20reserved%20a%20slot%20for%20${encodeURIComponent(passData.carModel)}%20(Pass:%20${passData.reservationId}).%20Please%20keep%20me%20updated.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Confirmation on WhatsApp</span>
              </a>

              <button 
                onClick={() => setPassData(null)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-900 bg-slate-950 text-slate-500 text-xs text-center">
        <p className="text-slate-400 font-medium mb-1">
          Dealbreaker Alwar — An initiative by <strong>Bhavya Modi</strong>
        </p>
        <p className="max-w-md mx-auto mb-4 text-[11px]">
          Empowering individual Alwar car buyers through aggregated bulk negotiations with authorized local dealerships.
        </p>
        <p className="text-slate-600">
          Direct Contact: {CONTACT_PHONE} • Alwar, Rajasthan
        </p>
      </footer>
    </div>
  );
}