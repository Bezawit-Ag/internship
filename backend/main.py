from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import schemas
from database import get_db_connection
import os
import pymysql

try:
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("SHOW TABLES LIKE 'dashboard_stats'")
    if not c.fetchone():
        import seed
        seed.seed_data()
    conn.close()
except pymysql.err.OperationalError:
    import seed
    seed.seed_data()

app = FastAPI(title="SEDMS Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/dashboard", response_model=schemas.DashboardDataResponse)
def get_dashboard_data():
    conn = get_db_connection()
    c = conn.cursor()
    
    c.execute("SELECT * FROM dashboard_stats WHERE id = 1")
    stats_row = c.fetchone()
    stats = dict(stats_row) if stats_row else {}
    
    c.execute("SELECT * FROM activity_logs ORDER BY timestamp DESC LIMIT 5")
    logs_rows = c.fetchall()
    logs = [dict(row) for row in logs_rows]
    
    conn.close()
    
    distribution_trend = [
        {"month": "Jan", "units_distributed": 100, "beneficiaries": 150},
        {"month": "Feb", "units_distributed": 150, "beneficiaries": 200},
        {"month": "Mar", "units_distributed": 400, "beneficiaries": 450},
        {"month": "Apr", "units_distributed": 350, "beneficiaries": 380},
        {"month": "May", "units_distributed": 600, "beneficiaries": 650},
        {"month": "Jun", "units_distributed": 800, "beneficiaries": 900},
        {"month": "Jul", "units_distributed": 500, "beneficiaries": 550},
        {"month": "Aug", "units_distributed": 700, "beneficiaries": 750},
    ]
    
    equipment_type = [
        {"name": "Home Solar", "value": 50},
        {"name": "Solar Lantern", "value": 25},
        {"name": "Off-grid", "value": 20},
        {"name": "Institutional", "value": 10},
    ]
    
    beneficiaries_by_zone = [
        {"zone": "N. Gondar", "beneficiaries": 4200},
        {"zone": "E. Gojam", "beneficiaries": 3500},
        {"zone": "S. Wollo", "beneficiaries": 3100},
        {"zone": "Awi", "beneficiaries": 1800},
        {"zone": "Wag Hemra", "beneficiaries": 1500},
        {"zone": "W. Gojam", "beneficiaries": 3800},
    ]
    
    supplier_performance = [
        {"supplier": "Solar Solutions", "score": 95},
        {"supplier": "SunPower Tech", "score": 88},
        {"supplier": "Zemen Energy", "score": 82},
        {"supplier": "BrightFuture", "score": 98},
        {"supplier": "EthioSun", "score": 75},
    ]
    
    return schemas.DashboardDataResponse(
        stats=stats,
        distribution_trend=distribution_trend,
        equipment_type=equipment_type,
        beneficiaries_by_zone=beneficiaries_by_zone,
        supplier_performance=supplier_performance,
        recent_activity=logs
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)