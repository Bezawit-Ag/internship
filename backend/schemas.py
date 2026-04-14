from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class SupplierResponse(BaseModel):
    id: int
    name: str
    license_number: Optional[str] = None
    service_type: Optional[str] = None
    contact_person: Optional[str] = None
    contact_phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    company_type: Optional[str] = None
    score: Optional[int] = 0
    status: Optional[str] = 'Active'

class SupplierCreate(BaseModel):
    name: str
    contact_person: str
    contact_phone: str
    license_number: str
    email: str
    address: str
    service_type: str
    company_type: Optional[str] = "Private Limited"

class SupplierDetailsResponse(SupplierResponse):
    coverage_zones: List[str] = []
    coverage_woredas: List[str] = []

class ZoneResponse(BaseModel):
    id: int
    name: str

class WoredaResponse(BaseModel):
    id: int
    zone_id: int
    name: str

class AreaOptionsResponse(BaseModel):
    suppliers: List[SupplierResponse]
    zones: List[ZoneResponse]
    woredas: List[WoredaResponse]

class AreaAssignmentCreate(BaseModel):
    supplier_id: int
    zone_id: int
    woreda_id: int
    kebele: str

class DashboardStatsResponse(BaseModel):
    total_suppliers: int
    suppliers_trend: float
    registered_contractors: int
    contractors_trend: float
    total_beneficiaries: int
    beneficiaries_trend: float
    units_distributed: int
    units_trend: float
    active_zones: int
    pending_approvals: int
    pending_trend: float
    functional_systems: int
    functional_trend: float
    non_functional_systems: int
    non_functional_trend: float

    class Config:
        from_attributes = True

class ActivityLogResponse(BaseModel):
    id: int
    user: str
    action: str
    details: str
    status: str
    timestamp: datetime

    class Config:
        from_attributes = True

class ChartDataPoint(BaseModel):
    month: str
    units_distributed: int
    beneficiaries: int

class EquipmentTypeData(BaseModel):
    name: str
    value: float

class BeneficiariesByZone(BaseModel):
    zone: str
    beneficiaries: int

class SupplierPerformance(BaseModel):
    supplier: str
    score: float

class FunctionalStatusData(BaseModel):
    name: str
    value: int

class DashboardDataResponse(BaseModel):
    stats: DashboardStatsResponse
    distribution_trend: List[ChartDataPoint]
    equipment_type: List[EquipmentTypeData]
    beneficiaries_by_zone: List[BeneficiariesByZone]
    supplier_performance: List[SupplierPerformance]
    functional_status: List[FunctionalStatusData]
    recent_activity: List[ActivityLogResponse]
