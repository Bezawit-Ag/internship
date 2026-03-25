from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class SupplierResponse(BaseModel):
    id: int
    name: str

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
    total_beneficiaries: int
    beneficiaries_trend: float
    units_distributed: int
    units_trend: float
    active_zones: int
    pending_approvals: int
    pending_trend: float
    equipment_issues: int
    issues_trend: float

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

class DashboardDataResponse(BaseModel):
    stats: DashboardStatsResponse
    distribution_trend: List[ChartDataPoint]
    equipment_type: List[EquipmentTypeData]
    beneficiaries_by_zone: List[BeneficiariesByZone]
    supplier_performance: List[SupplierPerformance]
    recent_activity: List[ActivityLogResponse]
