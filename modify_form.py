import re

file_path = r"c:\Users\HP\OneDrive\Desktop\SEDMS\frontend\src\pages\W.encoder\Register Beneficiary.jsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add errors state
if "const [errors, setErrors]" not in content:
    content = content.replace(
        "const [formData, setFormData] = useState({",
        "const [errors, setErrors] = useState({});\n  const [formData, setFormData] = useState({"
    )

# 2. Update updateFormData to clear errors
update_func = """  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };"""
content = re.sub(
    r"const updateFormData = \(field, value\) => \{[\s\S]*?\};",
    update_func,
    content
)

# 3. Update nextStep function
next_step_func = """  const nextStep = () => {
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
  };"""

content = re.sub(
    r"const nextStep = \(\) => \{[\s\S]*?setCurrentStep\(prev => Math\.min\(prev \+ 1, 6\)\);\n  \};",
    next_step_func,
    content
)

# 4. Find all inputs and selects that update formData (except files) and inject error display underneath them
# A typical pattern:
#           <input 
#             ...
#             onChange={(e) => updateFormData('fieldName', e.target.value)}
#           />
# We can inject {errors.fieldName && <p className="text-red-500 text-xs mt-1">{errors.fieldName}</p>}
# right after "/>" or "</select>" or "</textarea>" if it's attached to updateFormData.

def replacer(match):
    full_match = match.group(0)
    field_name = match.group(1)
    if "updateFormData" in full_match and "updateFormData(''," not in full_match:
        # Avoid double inject
        if f"errors.{field_name} && <p" not in full_match:
            to_inject = f"{{errors.{field_name} && <p className=\"text-red-500 text-xs mt-1 flex items-center gap-1\"><AlertTriangle className=\"w-3 h-3\"/> {{errors.{field_name}}}</p>}}"
            return full_match + "\n            " + to_inject
    return full_match

# For input self closing tag
content = re.sub(r"<input\s+[^>]*?updateFormData\(['\"](.*?)['\"].*?/>", replacer, content, flags=re.DOTALL)
# For select tag
content = re.sub(r"<select\s+[^>]*?updateFormData\(['\"](.*?)['\"].*?</select>", replacer, content, flags=re.DOTALL)
# For textarea tag
content = re.sub(r"<textarea\s+[^>]*?updateFormData\(['\"](.*?)['\"].*?</textarea>", replacer, content, flags=re.DOTALL)

# Handle buttons with updateFormData (like device type, surveyType, guarantee)
# Wait, surveyType and guarantee etc are buttons.
# Let's add an error message block for special fields manually:
if "{errors.surveyType &&" not in content:
    content = content.replace("].map(type => (", "{errors.surveyType && <p className=\"text-red-500 text-xs mt-1 mb-2 flex items-center gap-1\"><AlertTriangle className=\"w-3 h-3\"/> {errors.surveyType}</p>}\n        {[", 1)

if "{errors.offGridType &&" not in content:
    content = content.replace("{['Solar Grid', 'Hydro Power', 'Wind'].map(ogt => (", "{errors.offGridType && <p className=\"text-red-500 text-xs mt-1 mb-2 flex items-center gap-1 w-full col-span-3\"><AlertTriangle className=\"w-3 h-3\"/> {errors.offGridType}</p>}\n                {['Solar Grid', 'Hydro Power', 'Wind'].map(ogt => (", 1)

if "{errors.electricityAccess &&" not in content:
    content = content.replace("<button \n              onClick={() => updateFormData('electricityAccess', 'Yes')", "{errors.electricityAccess && <p className=\"text-red-500 text-xs mb-2 flex items-center gap-1 w-full\"><AlertTriangle className=\"w-3 h-3\"/> {errors.electricityAccess}</p>}\n            <button \n              onClick={() => updateFormData('electricityAccess', 'Yes')", 1)

if "{errors.equipmentType &&" not in content:
    content = content.replace("<button \n              onClick={() => updateFormData('equipmentType', 'Home Solar System')", "{errors.equipmentType && <p className=\"text-red-500 text-xs mb-2 flex items-center gap-1 w-full\"><AlertTriangle className=\"w-3 h-3\"/> {errors.equipmentType}</p>}\n            <button \n              onClick={() => updateFormData('equipmentType', 'Home Solar System')", 1)

if "{errors.guarantee &&" not in content:
    content = content.replace("<button \n              onClick={() => updateFormData('guarantee', 'Guarantee')", "{errors.guarantee && <p className=\"text-red-500 text-xs mb-2 flex items-center gap-1 w-full\"><AlertTriangle className=\"w-3 h-3\"/> {errors.guarantee}</p>}\n            <button \n              onClick={() => updateFormData('guarantee', 'Guarantee')", 1)

if "{errors.devices &&" not in content:
    content = content.replace("{['Phone Charging', 'Radio'", "{errors.devices && <p className=\"text-red-500 text-xs mb-2 w-full flex items-center gap-1\"><AlertTriangle className=\"w-3 h-3\"/> {errors.devices}</p>}\n            {['Phone Charging', 'Radio'", 1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Finished!")
