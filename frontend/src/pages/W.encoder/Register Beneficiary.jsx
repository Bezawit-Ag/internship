import React, { useState } from 'react';
import { 
  CheckCircle2, ChevronLeft, ChevronRight, Send, 
  Sun, Building2, Zap, MapPin, User, Package, Settings, 
  UploadCloud, AlertTriangle,
  ClipboardList
} from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Survey Type', icon: ClipboardList },
  { id: 2, label: 'Location', icon: MapPin },
  { id: 3, label: 'Beneficiary Info', icon: User },
  { id: 4, label: 'Equipment Details', icon: Package },
  { id: 5, label: 'Technical Info', icon: Settings },
  { id: 6, label: 'Review', icon: CheckCircle2 }
];

const RegisterBeneficiary = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    surveyType: '',
    zone: '',
    woreda: '',
    kebele: '',
    village: '',
    latitude: '',
    longitude: '',
    fullName: '',
    nationalId: '',
    phoneNumber: '',
    gender: '',
    householdSize: '',
    monthlyIncome: '',
    lightingSource: '',
    energyNeeds: '',
    electricityAccess: 'Yes',
    devices: [],
    equipmentType: 'Home Solar System',
    serialNumber: '',
    assignedSupplier: '',
    unitPrice: '',
    guarantee: 'Guarantee',
    guaranteePeriod: '',
    installationDate: '',
    installerName: '',
    salePrice: '',
    batteryCapacity: '',
    comments: ''
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDevice = (device) => {
    setFormData(prev => {
      const devices = prev.devices.includes(device)
        ? prev.devices.filter(d => d !== device)
        : [...prev.devices, device];
      return { ...prev, devices };
    });
  };

  const renderStepIndicator = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-6 w-full max-w-4xl mx-auto flex items-center justify-between relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 -translate-y-4"></div>
      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        
        return (
          <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
              isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' :
              isActive ? 'bg-blue-600 border-blue-600 text-white' :
              'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.id}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-500' : 'text-slate-400'
            }`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );

  const Step1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h4 className="text-xl font-bold text-slate-800 mb-1">What survey data are you collecting?</h4>
        <p className="text-slate-500 text-sm">Select the type of beneficiary or installation you are registering.</p>
      </div>
      
      <div className="grid gap-4 mt-6">
        {[
          { id: 'Home/Lantern', icon: Sun, desc: 'Individual household solar system or solar lantern distribution' },
          { id: 'Institution', icon: Building2, desc: 'School, health post, hospital, government office or mosque' },
          { id: 'Off-Grid', icon: Zap, desc: 'Community solar grid, hydro power, or wind energy project' }
        ].map(type => (
          <button
            key={type.id}
            onClick={() => updateFormData('surveyType', type.id)}
            className={`flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all ${
              formData.surveyType === type.id 
                ? 'border-blue-500 bg-blue-50/50 shadow-md shadow-blue-500/10' 
                : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
            }`}
          >
            <div className={`p-3 rounded-lg ${formData.surveyType === type.id ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
              <type.icon className="w-6 h-6" />
            </div>
            <div>
              <h5 className={`font-bold ${formData.surveyType === type.id ? 'text-blue-900' : 'text-slate-700'}`}>{type.id}</h5>
              <p className="text-slate-500 text-sm mt-1">{type.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 text-red-500 font-bold mb-4">
        <MapPin className="w-5 h-5" />
        <h4 className="text-lg text-slate-800">Location Information</h4>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Zone *</label>
          <select 
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={formData.zone}
            onChange={(e) => updateFormData('zone', e.target.value)}
          >
            <option value="">Select...</option>
            <option value="North Gondar">North Gondar</option>
            <option value="South Gondar">South Gondar</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Woreda *</label>
          <select 
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={formData.woreda}
            onChange={(e) => updateFormData('woreda', e.target.value)}
          >
            <option value="">Select Zone first</option>
            <option value="Dabat">Dabat</option>
            <option value="Debarq">Debarq</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Kebele</label>
          <input 
            type="text" 
            placeholder="Kebele number or name"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.kebele}
            onChange={(e) => updateFormData('kebele', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Village / Locality</label>
          <input 
            type="text" 
            placeholder="Village name"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.village}
            onChange={(e) => updateFormData('village', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">GPS Latitude</label>
          <input 
            type="text" 
            placeholder="e.g. 12.9697"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.latitude}
            onChange={(e) => updateFormData('latitude', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">GPS Longitude</label>
          <input 
            type="text" 
            placeholder="e.g. 37.7621"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.longitude}
            onChange={(e) => updateFormData('longitude', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <div className="flex items-center gap-2 text-blue-500 font-bold mb-4">
          <User className="w-5 h-5" />
          <h4 className="text-lg text-slate-800">Customer Information</h4>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Full Name *</label>
            <input 
              type="text" 
              placeholder="e.g. Abebe Bikila"
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.fullName}
              onChange={(e) => updateFormData('fullName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">National ID *</label>
            <input 
              type="text" 
              placeholder="ET-XX-000-0000"
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.nationalId}
              onChange={(e) => updateFormData('nationalId', e.target.value)}
            />
          </div>
          <div className="space-y-2">
             <label className="text-sm font-semibold text-slate-700">Phone Number *</label>
             <input 
              type="text" 
              placeholder="+251 9..."
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.phoneNumber}
              onChange={(e) => updateFormData('phoneNumber', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Gender *</label>
            <select 
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={formData.gender}
              onChange={(e) => updateFormData('gender', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Household Size *</label>
            <select 
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={formData.householdSize}
              onChange={(e) => updateFormData('householdSize', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="1">1</option>
              <option value="2-4">2-4</option>
              <option value="5+">5+</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Monthly Income</label>
             <select 
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={formData.monthlyIncome}
              onChange={(e) => updateFormData('monthlyIncome', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="< 5000">Less than 5,000 ETB</option>
              <option value="5000-10000">5,000 - 10,000 ETB</option>
              <option value="> 10000">Above 10,000 ETB</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Energy Usage</h5>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Current Lighting Source</label>
            <select 
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={formData.lightingSource}
              onChange={(e) => updateFormData('lightingSource', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Kerosene">Kerosene</option>
              <option value="Candles">Candles</option>
              <option value="None">None</option>
            </select>
          </div>
           <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Daily Energy Needs</label>
            <select 
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={formData.energyNeeds}
              onChange={(e) => updateFormData('energyNeeds', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <label className="text-sm font-semibold text-slate-700">Current Electricity Access</label>
          <div className="flex gap-2">
            <button 
              onClick={() => updateFormData('electricityAccess', 'Yes')}
              className={`flex-1 py-3 font-semibold rounded-xl border ${formData.electricityAccess === 'Yes' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
            >Yes</button>
             <button 
              onClick={() => updateFormData('electricityAccess', 'No')}
               className={`flex-1 py-3 font-semibold rounded-xl border ${formData.electricityAccess === 'No' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
            >No</button>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700">Devices Used (select all that apply)</label>
          <div className="flex flex-wrap gap-2">
            {['Phone Charging', 'Radio', 'TV', 'Fan', 'Refrigerator', 'Medical Equipment', 'Water Pump', 'Computer'].map(device => (
              <button
                key={device}
                onClick={() => toggleDevice(device)}
                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
                  formData.devices.includes(device) 
                    ? 'border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {device}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Step4 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex items-center gap-2 text-purple-600 font-bold mb-4">
        <Package className="w-5 h-5" />
        <h4 className="text-lg text-slate-800">Equipment & Supplier Details</h4>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
         <div className="col-span-2 space-y-2">
          <label className="text-sm font-semibold text-slate-700">Equipment Type *</label>
          <div className="flex gap-2">
            <button 
              onClick={() => updateFormData('equipmentType', 'Home Solar System')}
              className={`flex-1 py-3 px-4 font-semibold rounded-xl border flex items-center justify-center gap-2 ${formData.equipmentType === 'Home Solar System' ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.equipmentType === 'Home Solar System' ? 'border-blue-500' : 'border-slate-300'}`}>
                {formData.equipmentType === 'Home Solar System' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
              Home Solar System
            </button>
            <button 
              onClick={() => updateFormData('equipmentType', 'Solar Lantern')}
              className={`flex-1 py-3 px-4 font-semibold rounded-xl border flex items-center justify-center gap-2 ${formData.equipmentType === 'Solar Lantern' ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
             >
               <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.equipmentType === 'Solar Lantern' ? 'border-blue-500' : 'border-slate-300'}`}>
                {formData.equipmentType === 'Solar Lantern' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
              Solar Lantern
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Equipment Serial Number *</label>
          <input 
            type="text" 
            placeholder="e.g. 997890"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.serialNumber}
            onChange={(e) => updateFormData('serialNumber', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Assigned Supplier *</label>
          <select 
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={formData.assignedSupplier}
            onChange={(e) => updateFormData('assignedSupplier', e.target.value)}
          >
            <option value="">Select...</option>
            <option value="Solar Solutions Ethiopia PLC">Solar Solutions Ethiopia PLC</option>
            <option value="EthioSun Light">EthioSun Light</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Unit Price (ETB)</label>
          <input 
            type="number" 
            placeholder="e.g. 2345"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.unitPrice}
            onChange={(e) => updateFormData('unitPrice', e.target.value)}
          />
        </div>
         <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Guarantee</label>
          <div className="flex gap-2">
            <button 
              onClick={() => updateFormData('guarantee', 'Guarantee')}
              className={`flex-1 py-3 font-semibold rounded-xl border ${formData.guarantee === 'Guarantee' ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
            >Guarantee</button>
             <button 
              onClick={() => updateFormData('guarantee', 'No Guarantee')}
               className={`flex-1 py-3 font-semibold rounded-xl border ${formData.guarantee === 'No Guarantee' ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
            >No Guarantee</button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Guarantee Period (Years)</label>
          <select 
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={formData.guaranteePeriod}
            onChange={(e) => updateFormData('guaranteePeriod', e.target.value)}
          >
            <option value="">Select...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>

       <div className="col-span-2 space-y-2 mt-4">
          <label className="text-sm font-semibold text-slate-700">Upload Documents</label>
          <div className="grid grid-cols-2 gap-4">
             <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer text-blue-600">
               <UploadCloud className="w-6 h-6 text-slate-400" />
               <span className="text-sm font-semibold text-slate-700">National ID</span>
               <span className="text-xs">Click to upload</span>
             </div>
             <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer text-blue-600">
               <UploadCloud className="w-6 h-6 text-slate-400" />
               <span className="text-sm font-semibold text-slate-700">Proof of Residence</span>
               <span className="text-xs">Click to upload</span>
             </div>
          </div>
        </div>
    </div>
  );

  const Step5 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex items-center gap-2 text-blue-400 font-bold mb-4">
        <Zap className="w-5 h-5" />
        <h4 className="text-lg text-slate-800">Installation & Technical Details</h4>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Installation Date</label>
          <input 
            type="date"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
            value={formData.installationDate}
            onChange={(e) => updateFormData('installationDate', e.target.value)}
          />
        </div>
         <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Installer / Agent Name</label>
          <input 
            type="text"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.installerName}
            onChange={(e) => updateFormData('installerName', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Sale Price (ETB)</label>
          <input 
            type="number"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.salePrice}
            onChange={(e) => updateFormData('salePrice', e.target.value)}
          />
        </div>
         <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Battery Capacity (Ah)</label>
          <input 
            type="number"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.batteryCapacity}
            onChange={(e) => updateFormData('batteryCapacity', e.target.value)}
          />
        </div>
        <div className="col-span-2 space-y-2">
           <label className="text-sm font-semibold text-slate-700">Additional Comments</label>
           <textarea 
            placeholder="Any additional notes or observations..."
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-y"
            value={formData.comments}
            onChange={(e) => updateFormData('comments', e.target.value)}
           ></textarea>
        </div>
      </div>
    </div>
  );

  const Step6 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 text-emerald-500 font-bold mb-4">
        <CheckCircle2 className="w-5 h-5" />
        <h4 className="text-lg text-slate-800">Review & Submit</h4>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
        <div className="mb-6">
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider block mb-1">SURVEY CLASSIFICATION</span>
          <h5 className="text-blue-900 text-lg font-bold">{formData.surveyType || 'Not Selected'}</h5>
        </div>

        <div className="grid grid-cols-2 gap-y-6">
          <div>
            <span className="text-xs text-blue-500 block mb-1">Zone</span>
            <span className="font-bold text-blue-900">{formData.zone || '-'}</span>
          </div>
          <div>
            <span className="text-xs text-blue-500 block mb-1">Woreda</span>
            <span className="font-bold text-blue-900">{formData.woreda || '-'}</span>
          </div>
           <div>
            <span className="text-xs text-blue-500 block mb-1">Beneficiary / Institution</span>
            <span className="font-bold text-blue-900">{formData.fullName || '-'}</span>
          </div>
           <div>
            <span className="text-xs text-blue-500 block mb-1">Equipment Type</span>
            <span className="font-bold text-blue-900">{formData.equipmentType || '-'}</span>
          </div>
           <div>
            <span className="text-xs text-blue-500 block mb-1">Serial Number</span>
            <span className="font-bold text-blue-900">{formData.serialNumber || '-'}</span>
          </div>
           <div>
            <span className="text-xs text-blue-500 block mb-1">Supplier</span>
            <span className="font-bold text-blue-900">{formData.assignedSupplier || '-'}</span>
          </div>
           <div>
            <span className="text-xs text-blue-500 block mb-1">Guarantee</span>
            <span className="font-bold text-blue-900">{formData.guarantee || '-'}</span>
          </div>
           <div>
            <span className="text-xs text-blue-500 block mb-1">Unit Price</span>
            <span className="font-bold text-blue-900">{formData.unitPrice ? `ETB ${formData.unitPrice}` : '-'}</span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3 text-yellow-800 text-sm">
        <AlertTriangle className="w-5 h-5 shrink-0 text-yellow-600" />
        <p>By submitting, you confirm that all entered data is accurate. The record will go to the Woreda Approver for review.</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800">Beneficiary Registration & Survey</h3>
        <p className="text-slate-500">Multi-step smart survey with conditional logic</p>
      </div>

      {renderStepIndicator()}

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <div className="min-h-[400px]">
          {currentStep === 1 && <Step1 />}
          {currentStep > 1 && formData.surveyType !== 'Home/Lantern' ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 py-20">
              <AlertTriangle className="w-12 h-12 mb-4 text-blue-300" />
              <h3 className="text-xl font-bold text-slate-700">Form Not Available</h3>
              <p>The registration flow for '{formData.surveyType}' is currently under construction.</p>
            </div>
          ) : (
            <>
              {currentStep === 2 && <Step2 />}
              {currentStep === 3 && <Step3 />}
              {currentStep === 4 && <Step4 />}
              {currentStep === 5 && <Step5 />}
              {currentStep === 6 && <Step6 />}
            </>
          )}
        </div>
        
        <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 1 
                ? 'opacity-0 pointer-events-none' 
                : 'text-slate-500 hover:bg-slate-50 border border-slate-200 hover:text-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map(step => (
              <div 
                key={step} 
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentStep === step ? 'w-6 bg-blue-600' : 
                  currentStep > step ? 'w-2 bg-emerald-500' : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>

          {(currentStep > 1 && formData.surveyType !== 'Home/Lantern') ? (
            <div className="px-6 py-3 opacity-0 pointer-events-none">Placeholder</div>
          ) : currentStep < 6 ? (
            <button 
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={() => alert("Form Submitted!")}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Send className="w-4 h-4" /> Submit Survey
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterBeneficiary;
