from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_db_connection
import pymysql
import seed
import schemas

app = FastAPI(title="SEDMS Dashboard API")

# 1️⃣ CORS setup so React frontend can fetch data
origins = [
    "http://localhost:5173",  # React dev server URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2️⃣ Seed the database if tables don't exist
try:
    conn = get_db_connection()
    c = conn.cursor(pymysql.cursors.DictCursor)
    c.execute("SHOW TABLES LIKE 'dashboard_stats'")
    if not c.fetchone():
        seed.seed_data()
    conn.close()
except pymysql.err.OperationalError:
    seed.seed_data()

# 3️⃣ Test route to confirm backend is running
@app.get("/api/test")
def test():
    return {"message": "Backend is running!"}

# 4️⃣ Dashboard data route
@app.get("/api/dashboard", response_model=schemas.DashboardDataResponse)
def get_dashboard_data():
    try:
        conn = get_db_connection()
        c = conn.cursor(pymysql.cursors.DictCursor)  # ✅ DictCursor returns dicts
        
        # Fetch dashboard stats
        c.execute("SELECT * FROM dashboard_stats WHERE id = 1")
        stats_row = c.fetchone()
        stats = stats_row if stats_row else {}
        
        # Fetch last 5 activity logs
        c.execute("SELECT * FROM activity_logs ORDER BY timestamp DESC LIMIT 5")
        logs_rows = c.fetchall()
        logs = logs_rows if logs_rows else []
        
        conn.close()
        
        # Static chart/sample data
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
    
    except pymysql.err.OperationalError as e:
        return {"error": f"Database connection failed: {str(e)}"}
    except Exception as e:
        return {"error": str(e)}


# 5️⃣ Area Assignment routes
@app.get("/api/area-options", response_model=schemas.AreaOptionsResponse)
def get_area_options():
    try:
        conn = get_db_connection()
        c = conn.cursor(pymysql.cursors.DictCursor)
        
        c.execute("SELECT * FROM suppliers ORDER BY name")
        suppliers = list(c.fetchall())
        
        c.execute("SELECT * FROM zones ORDER BY name")
        zones = list(c.fetchall())
        
        c.execute("SELECT * FROM woredas ORDER BY name")
        woredas = list(c.fetchall())
        
        conn.close()
        
        return schemas.AreaOptionsResponse(
            suppliers=suppliers,
            zones=zones,
            woredas=woredas
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/area-assignments")
def create_area_assignment(assignment: schemas.AreaAssignmentCreate):
    try:
        conn = get_db_connection()
        c = conn.cursor()
        
        c.execute('''
            INSERT INTO area_assignments (supplier_id, zone_id, woreda_id, kebele)
            VALUES (%s, %s, %s, %s)
        ''', (assignment.supplier_id, assignment.zone_id, assignment.woreda_id, assignment.kebele))
        
        conn.commit()
        last_id = c.lastrowid
        conn.close()
        
        return {"message": "Assignment created successfully", "id": last_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/area-assignments")
def get_area_assignments():
    try:
        conn = get_db_connection()
        c = conn.cursor(pymysql.cursors.DictCursor)
        
        query = '''
            SELECT a.id, a.kebele, 
                   s.name as supplier_name, 
                   z.name as zone_name, 
                   w.name as woreda_name
            FROM area_assignments a
            JOIN suppliers s ON a.supplier_id = s.id
            JOIN zones z ON a.zone_id = z.id
            JOIN woredas w ON a.woreda_id = w.id
            ORDER BY a.created_at DESC
        '''
        c.execute(query)
        assignments = list(c.fetchall())
        conn.close()
        
        return {"assignments": assignments}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 6️⃣ Run backend
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)