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

const ZONE_WOREDAS = {
  "North Gondar": ["Debark", "Dabat", "Dabal"],
  "South Gondar": ["Debre Tabor", "Farta", "Fogera"],
  "North Wollo": ["Woldiya", "Kobo"],
  "South Wollo": ["Dessie Zuria", "Kombolcha"],
  "Awi": ["Dangila", "Injibara"],
  "East Gojjam": ["Debre Markos", "Bichena"],
  "West Gojjam": ["Finote Selam", "Bure"],
  "Wag Hemra": ["Sekota"],
  "Oromia": ["Kemise", "Bati"],
  "Central Gondar": ["Gondar", "Chilga"],
  "Benshangul": ["Assosa", "Bambasi"]
};

const RegisterBeneficiary = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
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
    institutionName: '',
    institutionType: '',
    representativeName: '',
    representativePhone: '',
    intendedUsage: '',
    monthlyIncomeSource: '',
    lightingSource: '',
    energyNeeds: '',
    electricityAccess: 'Yes',
    devices: [],
    equipmentType: 'Home Solar System',
    serialNumber: '',
    assignedSupplier: '',
    unitPrice: '',
    guarantee: '',
    guaranteePeriod: '',
    installationDate: '',
    installerName: '',
    salePrice: '',
    batteryCapacity: '',
    comments: '',
    idPhoto: null,
    proofPhoto: null,
    offGridType: '',
    projectCapacity: '',
    solarPanelType: '',
    noOfSolarPanel: '',
    solarPanelManufacture: '',
    solarPanelModel: '',
    batteryType: '',
    noOfBattery: '',
    batteryManufacture: '',
    batteryModel: '',
    systemVoltage: '',
    totalEnergyOfBattery: '',
    inverterType: '',
    inverterManufacture: '',
    inverterMode: '',
    noOfInverter: '',
    inverterCapacity: '',
    breakerBoard: '',
    hydroPowerType: '',
    minimumFlow: '',
    hydroHead: '',
    estimatedPowerOutput: '',
    projectCost: ''
  });

    const nextStep = () => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.surveyType) newErrors.surveyType = "Required";
      if (formData.surveyType === 'Off-Grid' && !formData.offGridType) newErrors.offGridType = "Required";
    } else if (currentStep === 2) {
      if (!formData.zone) newErrors.zone = "Required";
      if (!formData.woreda) newErrors.woreda = "Required";
      if (!formData.kebele) newErrors.kebele = "Required";
      if (!formData.village) newErrors.village = "Required";
      if (!formData.latitude) newErrors.latitude = "Required";
      if (!formData.longitude) newErrors.longitude = "Required";
    } else if (currentStep === 3) {
      if (formData.surveyType === 'Institution') {
        if (!formData.institutionName) newErrors.institutionName = "Required";
        if (!formData.institutionType) newErrors.institutionType = "Required";
        if (!formData.representativeName) newErrors.representativeName = "Required";
        if (!formData.representativePhone) newErrors.representativePhone = "Required";
        if (!formData.intendedUsage) newErrors.intendedUsage = "Required";
        if (!formData.monthlyIncomeSource) newErrors.monthlyIncomeSource = "Required";
      } else {
        if (!formData.fullName) newErrors.fullName = "Required";
        if (!formData.nationalId) newErrors.nationalId = "Required";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Required";
        if (!formData.gender) newErrors.gender = "Required";
        if (!formData.householdSize) newErrors.householdSize = "Required";
        if (!formData.monthlyIncome) newErrors.monthlyIncome = "Required";
        if (!formData.lightingSource) newErrors.lightingSource = "Required";
        if (!formData.energyNeeds) newErrors.energyNeeds = "Required";
        if (!formData.electricityAccess) newErrors.electricityAccess = "Required";
        if (formData.devices.length === 0) newErrors.devices = "Required";
      }
    } else if (currentStep === 4) {
      if (!formData.equipmentType) newErrors.equipmentType = "Required";
      if (!formData.serialNumber) newErrors.serialNumber = "Required";
      if (!formData.assignedSupplier) newErrors.assignedSupplier = "Required";
      if (!formData.unitPrice) newErrors.unitPrice = "Required";
      if (!formData.guarantee) newErrors.guarantee = "Required";
      if (formData.guarantee === 'Guarantee' && !formData.guaranteePeriod) newErrors.guaranteePeriod = "Required";
    } else if (currentStep === 5) {
      if (formData.surveyType === 'Off-Grid') {
        if (!formData.projectCapacity) newErrors.projectCapacity = "Required";
        if (!formData.projectCost) newErrors.projectCost = "Required";
        if (!formData.installationDate) newErrors.installationDate = "Required";
        
        if (formData.offGridType === 'Hydro Power') {
          if (!formData.hydroPowerType) newErrors.hydroPowerType = "Required";
          if (!formData.minimumFlow) newErrors.minimumFlow = "Required";
          if (!formData.hydroHead) newErrors.hydroHead = "Required";
          if (!formData.estimatedPowerOutput) newErrors.estimatedPowerOutput = "Required";
        }
        if (formData.offGridType === 'Solar Grid') {
          if (!formData.solarPanelType) newErrors.solarPanelType = "Required";
          if (!formData.noOfSolarPanel) newErrors.noOfSolarPanel = "Required";
          if (!formData.solarPanelManufacture) newErrors.solarPanelManufacture = "Required";
          if (!formData.solarPanelModel) newErrors.solarPanelModel = "Required";
          if (!formData.batteryType) newErrors.batteryType = "Required";
          if (!formData.noOfBattery) newErrors.noOfBattery = "Required";
          if (!formData.batteryManufacture) newErrors.batteryManufacture = "Required";
          if (!formData.batteryModel) newErrors.batteryModel = "Required";
          if (!formData.batteryCapacity) newErrors.batteryCapacity = "Required";
          if (!formData.totalEnergyOfBattery) newErrors.totalEnergyOfBattery = "Required";
          if (!formData.systemVoltage) newErrors.systemVoltage = "Required";
          if (!formData.inverterType) newErrors.inverterType = "Required";
          if (!formData.inverterManufacture) newErrors.inverterManufacture = "Required";
          if (!formData.inverterMode) newErrors.inverterMode = "Required";
          if (!formData.noOfInverter) newErrors.noOfInverter = "Required";
          if (!formData.inverterCapacity) newErrors.inverterCapacity = "Required";
          if (!formData.breakerBoard) newErrors.breakerBoard = "Required";
        }
      } else {
         if (!formData.installationDate) newErrors.installationDate = "Required";
         if (!formData.installerName) newErrors.installerName = "Required";
         if (!formData.salePrice) newErrors.salePrice = "Required";
         if (!formData.batteryCapacity) newErrors.batteryCapacity = "Required";
         if (!formData.comments) newErrors.comments = "Required";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setCurrentStep(prev => Math.min(prev + 1, 6));
  };
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const toggleDevice = (device) => {
    setFormData(prev => {
      const devices = prev.devices.includes(device)
        ? prev.devices.filter(d => d !== device)
        : [...prev.devices, device];
      return { ...prev, devices };
    });
    setErrors(prev => ({ ...prev, devices: undefined }));
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
        {errors.surveyType && <p className="text-red-500 text-xs mt-1 mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> {errors.surveyType}</p>}
        {[
          { id: 'Home/Lantern', icon: Sun, desc: 'Individual household solar system or solar lantern distribution' },
          { id: 'Institution', icon: Building2, desc: 'School, health post, hospital, government office or mosque' },
          { id: 'Off-Grid', icon: Zap, desc: 'Community solar grid, hydro power, or wind energy project' }
        ].map(type => (
          <div key={type.id}>
            <button
              onClick={() => updateFormData('surveyType', type.id)}
              className={`flex w-full items-start gap-4 p-5 rounded-xl border-2 text-left transition-all ${
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
            {type.id === 'Off-Grid' && formData.surveyType === 'Off-Grid' && (
              <div className="ml-16 mt-4">
                {errors.offGridType && <p className="text-red-500 text-xs mt-1 mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> {errors.offGridType}</p>}
                <div className="grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-2">
                  {['Solar Grid', 'Hydro Power', 'Wind'].map(ogt => (
                  <button
                    key={ogt}
                    onClick={() => updateFormData('offGridType', ogt)}
                    className={`p-3 text-sm font-semibold rounded-xl border-2 transition-all ${
                      formData.offGridType === ogt
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {ogt}
                  </button>
                ))}
                </div>
              </div>
            )}
          </div>
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
            onChange={(e) => { updateFormData('zone', e.target.value); updateFormData('woreda', ''); }}
          >
            <option value="">Select...</option>
            {Object.keys(ZONE_WOREDAS).map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Woreda *</label>
          <select 
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={formData.woreda}
            onChange={(e) => updateFormData('woreda', e.target.value)}
            disabled={!formData.zone}
          >
            <option value="">Select Zone first</option>
            {formData.zone && ZONE_WOREDAS[formData.zone]?.map(woreda => (
              <option key={woreda} value={woreda}>{woreda}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Kebele *</label>
          <input 
            type="text" 
            placeholder="Kebele number or name"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.kebele}
            onChange={(e) => updateFormData('kebele', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Village / Locality *</label>
          <input 
            type="text" 
            placeholder="Village name"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.village}
            onChange={(e) => updateFormData('village', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">GPS Latitude *</label>
          <input 
            type="text" 
            placeholder="e.g. 12.9697"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.latitude}
            onChange={(e) => updateFormData('latitude', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">GPS Longitude *</label>
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

  const Step3 = () => {
    if (formData.surveyType === 'Institution') {
      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <div className="flex items-center gap-2 text-purple-600 font-bold mb-4">
              <Building2 className="w-5 h-5" />
              <h4 className="text-lg text-slate-800">Institution Information</h4>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Institution Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Dabat Primary School"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.institutionName}
                  onChange={(e) => updateFormData('institutionName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Institution Type *</label>
                <select 
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  value={formData.institutionType}
                  onChange={(e) => updateFormData('institutionType', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="School">School</option>
                  <option value="Health Post">Health Post</option>
                  <option value="Health Center">Health Center</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Government Office">Government Office</option>
                  <option value="Mosque">Mosque</option>
                  <option value="Church">Church</option>
                  <option value="Market">Market</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Representative Name *</label>
                <input 
                  type="text" 
                  placeholder="Name of institution head"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.representativeName}
                  onChange={(e) => updateFormData('representativeName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Representative Phone *</label>
                <input 
                  type="text" 
                  placeholder="+251 9..."
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.representativePhone}
                  onChange={(e) => updateFormData('representativePhone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Intended Usage *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Classroom lighting and computer lab"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.intendedUsage}
                  onChange={(e) => updateFormData('intendedUsage', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Monthly Income Source *</label>
                <select 
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  value={formData.monthlyIncomeSource}
                  onChange={(e) => updateFormData('monthlyIncomeSource', e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="Government Budget">Government Budget</option>
                  <option value="NGO/Donor">NGO/Donor</option>
                  <option value="Community Contribution">Community Contribution</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
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
            <label className="text-sm font-semibold text-slate-700">Monthly Income *</label>
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
            <label className="text-sm font-semibold text-slate-700">Current Lighting Source *</label>
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
            <label className="text-sm font-semibold text-slate-700">Daily Energy Needs *</label>
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
          <label className="text-sm font-semibold text-slate-700">Current Electricity Access *</label>
          {errors.electricityAccess && <p className="text-red-500 text-xs mb-2 flex items-center gap-1 w-full"><AlertTriangle className="w-3 h-3"/> {errors.electricityAccess}</p>}
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
          <label className="text-sm font-semibold text-slate-700">Devices Used (select all that apply) *</label>
          {errors.devices && <p className="text-red-500 text-xs mb-2 w-full flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> {errors.devices}</p>}
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
};

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
            {errors.equipmentType && <p className="text-red-500 text-xs mb-2 flex items-center gap-1 w-full"><AlertTriangle className="w-3 h-3"/> {errors.equipmentType}</p>}
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
          <label className="text-sm font-semibold text-slate-700">
            {formData.surveyType === 'Institution' || formData.surveyType === 'Off-Grid' ? 'Contractor' : 'Assigned Supplier'} *
          </label>
          <select 
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={formData.assignedSupplier}
            onChange={(e) => updateFormData('assignedSupplier', e.target.value)}
          >
            <option value="">Select...</option>
            {formData.surveyType === 'Institution' || formData.surveyType === 'Off-Grid' ? (
              <>
                <option value="Sunrise Contractors">Sunrise Contractors</option>
                <option value="GreenGrid Builders">GreenGrid Builders</option>
              </>
            ) : (
              <>
                <option value="Solar Solutions Ethiopia PLC">Solar Solutions Ethiopia PLC</option>
                <option value="EthioSun Light">EthioSun Light</option>
              </>
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Unit Price (ETB) *</label>
          <input 
            type="number" 
            placeholder="e.g. 2345"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.unitPrice}
            onChange={(e) => updateFormData('unitPrice', e.target.value)}
          />
        </div>
         <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Guarantee *</label>
          <div className="flex gap-2">
            {errors.guarantee && <p className="text-red-500 text-xs mb-2 flex items-center gap-1 w-full"><AlertTriangle className="w-3 h-3"/> {errors.guarantee}</p>}
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

        {formData.guarantee === 'Guarantee' && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Guarantee Period (Years) *</label>
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
        )}
      </div>

       <div className="col-span-2 space-y-2 mt-4">
           <label className="text-sm font-semibold text-slate-700">Upload Documents</label>
          <div className="grid grid-cols-2 gap-4">
             <label className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer text-blue-600">
               <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => updateFormData('idPhoto', e.target.files[0])} />
               <UploadCloud className={`w-6 h-6 ${formData.idPhoto ? 'text-emerald-500' : 'text-slate-400'}`} />
               <span className="text-sm font-semibold text-slate-700">{formData.idPhoto ? 'ID Uploaded' : 'National ID'}</span>
               <span className="text-xs truncate max-w-full text-center px-2">{formData.idPhoto ? formData.idPhoto.name : 'Click or tap to scan ID'}</span>
             </label>
             <label className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 hover:border-blue-300 transition-colors cursor-pointer text-blue-600">
               <input type="file" accept="image/*, application/pdf" className="hidden" onChange={(e) => updateFormData('proofPhoto', e.target.files[0])} />
               <UploadCloud className={`w-6 h-6 ${formData.proofPhoto ? 'text-emerald-500' : 'text-slate-400'}`} />
               <span className="text-sm font-semibold text-slate-700">{formData.proofPhoto ? 'Document Uploaded' : 'Proof of Residence'}</span>
               <span className="text-xs truncate max-w-full text-center px-2">{formData.proofPhoto ? formData.proofPhoto.name : 'Click to upload proof'}</span>
             </label>
          </div>
        </div>
    </div>
  );

  const Step5 = () => {
    if (formData.surveyType === 'Off-Grid') {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="flex items-center gap-2 text-emerald-500 font-bold mb-6 border-b pb-4">
            <Zap className="w-6 h-6" />
            <h4 className="text-xl text-slate-800">Project Installation Information</h4>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Project Capacity (KW)</label>
              <input type="number" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.projectCapacity} onChange={(e) => updateFormData('projectCapacity', e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Project Cost</label>
              <input type="number" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.projectCost} onChange={(e) => updateFormData('projectCost', e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Date of Installation / Construction Year</label>
              <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.installationDate} onChange={(e) => updateFormData('installationDate', e.target.value)} />
            </div>

            {formData.offGridType === 'Hydro Power' && (
              <>
                <div className="col-span-2 mt-4 pt-4 border-t">
                   <h5 className="font-bold text-slate-700 mb-4">Hydro Power Details</h5>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Hydro Power Type</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" value={formData.hydroPowerType} onChange={(e) => updateFormData('hydroPowerType', e.target.value)}>
                    <option value="">Select...</option>
                    <option value="Pico Hydro Power <=5KW">Pico Hydro Power {"<="}5KW</option>
                    <option value="Micro Hydro Power 5-100KW">Micro Hydro Power 5-100KW</option>
                    <option value="Mini Hydro Power 100-1000KW">Mini Hydro Power 100-1000KW</option>
                    <option value="Small Hydro Power 1000-10000KW">Small Hydro Power 1000-10000KW</option>
                    <option value="Medium Hydro Power 10-100MW">Medium Hydro Power 10-100MW</option>
                    <option value="Large /Mega Hydro Power 100MW and above">Large /Mega Hydro Power 100MW and above</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Minimum Flow (M3/sec)</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.minimumFlow} onChange={(e) => updateFormData('minimumFlow', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Head (m)</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.hydroHead} onChange={(e) => updateFormData('hydroHead', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Estimated Power output (KW)</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.estimatedPowerOutput} onChange={(e) => updateFormData('estimatedPowerOutput', e.target.value)} />
                </div>
              </>
            )}

            {formData.offGridType === 'Solar Grid' && (
              <>
                <div className="col-span-2 mt-4 pt-4 border-t">
                   <h5 className="font-bold text-slate-700 mb-4">Solar Panel Information</h5>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Solar Panel Type</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" value={formData.solarPanelType} onChange={(e) => updateFormData('solarPanelType', e.target.value)}>
                     <option value="">Select...</option>
                     <option value="Mon Crystal">Mon Crystal</option>
                     <option value="Poly Crystal">Poly Crystal</option>
                     <option value="Amorphas">Amorphas</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">No of Solar Panel</label>
                  <input type="number" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.noOfSolarPanel} onChange={(e) => updateFormData('noOfSolarPanel', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Solar Panel Manufacture</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.solarPanelManufacture} onChange={(e) => updateFormData('solarPanelManufacture', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Solar Panel Model</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.solarPanelModel} onChange={(e) => updateFormData('solarPanelModel', e.target.value)} />
                </div>

                <div className="col-span-2 mt-4 pt-4 border-t">
                   <h5 className="font-bold text-slate-700 mb-4">Battery Information</h5>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Battery Type</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" value={formData.batteryType} onChange={(e) => updateFormData('batteryType', e.target.value)}>
                     <option value="">Select...</option>
                     <option value="Lead Acid">Lead Acid</option>
                     <option value="Lithium Ion">Lithium Ion</option>
                     <option value="Jel Type">Jel Type</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">No of Battery</label>
                  <input type="number" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.noOfBattery} onChange={(e) => updateFormData('noOfBattery', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Battery Manufacture</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.batteryManufacture} onChange={(e) => updateFormData('batteryManufacture', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Battery Model</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.batteryModel} onChange={(e) => updateFormData('batteryModel', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Battery Capacity (Ahr)</label>
                  <input type="number" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.batteryCapacity} onChange={(e) => updateFormData('batteryCapacity', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Total Energy of Batter (KWhr)</label>
                  <input type="number" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.totalEnergyOfBattery} onChange={(e) => updateFormData('totalEnergyOfBattery', e.target.value)} />
                </div>

                <div className="col-span-2 mt-4 pt-4 border-t">
                   <h5 className="font-bold text-slate-700 mb-4">Inverter & System Information</h5>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">System Voltage (V)</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" value={formData.systemVoltage} onChange={(e) => updateFormData('systemVoltage', e.target.value)}>
                     <option value="">Select...</option>
                     <option value="12V">12V</option>
                     <option value="24V">24V</option>
                     <option value="48V">48V</option>
                     <option value="96V">96V</option>
                     <option value="112V">112V</option>
                     <option value="120V">120V</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Inverter Type</label>
                  <select className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" value={formData.inverterType} onChange={(e) => updateFormData('inverterType', e.target.value)}>
                     <option value="">Select...</option>
                     <option value="Off Gride">Off Gride</option>
                     <option value="On Gride">On Gride</option>
                     <option value="High Bride">High Bride</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Invertor Manufacture</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.inverterManufacture} onChange={(e) => updateFormData('inverterManufacture', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Inverter Mode</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.inverterMode} onChange={(e) => updateFormData('inverterMode', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">No of Inverter/Charge Controller</label>
                  <input type="number" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.noOfInverter} onChange={(e) => updateFormData('noOfInverter', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Inverter Capacity (KW)</label>
                  <input type="number" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.inverterCapacity} onChange={(e) => updateFormData('inverterCapacity', e.target.value)} />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Breaker Board (SDB)</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" value={formData.breakerBoard} onChange={(e) => updateFormData('breakerBoard', e.target.value)} />
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
    
    return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex items-center gap-2 text-blue-400 font-bold mb-4">
        <Zap className="w-5 h-5" />
        <h4 className="text-lg text-slate-800">Installation & Technical Details</h4>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Installation Date *</label>
          <input 
            type="date"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
            value={formData.installationDate}
            onChange={(e) => updateFormData('installationDate', e.target.value)}
          />
        </div>
         <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Installer / Agent Name *</label>
          <input 
            type="text"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.installerName}
            onChange={(e) => updateFormData('installerName', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Sale Price (ETB) *</label>
          <input 
            type="number"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.salePrice}
            onChange={(e) => updateFormData('salePrice', e.target.value)}
          />
        </div>
         <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Battery Capacity (Ah) *</label>
          <input 
            type="number"
            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.batteryCapacity}
            onChange={(e) => updateFormData('batteryCapacity', e.target.value)}
          />
        </div>
        <div className="col-span-2 space-y-2">
           <label className="text-sm font-semibold text-slate-700">Additional Comments *</label>
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
};

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
            <span className="font-bold text-blue-900">{formData.surveyType === 'Institution' ? formData.institutionName : formData.fullName || '-'}</span>
          </div>
           <div>
            <span className="text-xs text-blue-500 block mb-1">Equipment Type</span>
            <span className="font-bold text-blue-900">{formData.surveyType === 'Off-Grid' ? formData.offGridType : formData.equipmentType || '-'}</span>
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
          {currentStep > 1 && !['Home/Lantern', 'Institution', 'Off-Grid'].includes(formData.surveyType) ? (
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

          {(currentStep > 1 && !['Home/Lantern', 'Institution', 'Off-Grid'].includes(formData.surveyType)) ? (
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
