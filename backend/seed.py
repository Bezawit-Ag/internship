from database import init_db, get_db_connection
import datetime

def seed_data():
    init_db()
    conn = get_db_connection()
    c = conn.cursor()
    
    c.execute('''
        INSERT INTO dashboard_stats (
            id, total_suppliers, suppliers_trend, total_beneficiaries, beneficiaries_trend,
            units_distributed, units_trend, active_zones, pending_approvals, pending_trend,
            equipment_issues, issues_trend
        ) VALUES (1, 124, 12.0, 45280, 8.0, 41289, 15.0, 11, 342, -4.0, 28, -6.0)
    ''')
    
    # Insert Suppliers
    suppliers = [("Solar Solutions",), ("SunPower Tech",), ("Zemen Energy",), ("BrightFuture",), ("EthioSun",)]
    c.executemany("INSERT INTO suppliers (name) VALUES (%s)", suppliers)
    
    # Insert Zones
    zones = [("North Gondar",), ("East Gojam",), ("South Wollo",), ("Awi",), ("Wag Hemra",), ("West Gojam",)]
    c.executemany("INSERT INTO zones (name) VALUES (%s)", zones)
    
    # Insert Woredas
    woredas = [
        (1, "Debark"), (1, "Dabat"), 
        (2, "Debre Markos"), (2, "Bichena"),
        (3, "Dessie Zuria"), (3, "Kombolcha"),
        (4, "Dangila"), (4, "Injibara"),
        (5, "Sekota"),
        (6, "Finote Selam"), (6, "Bure")
    ]
    c.executemany("INSERT INTO woredas (zone_id, name) VALUES (%s, %s)", woredas)

    now = datetime.datetime.utcnow()
    activities = [
        ("Dr. Kassahun Tadesse - User Account Created", "User Account Created", "User: Biruk Habtu (WOREDA_ENCODER)", "SUCCESS", (now - datetime.timedelta(hours=1)).strftime('%Y-%m-%d %H:%M:%S')),
        ("Tigist Alemu - Supplier Registered", "Supplier Registered", "Supplier: BrightFuture Energy Solutions", "SUCCESS", (now - datetime.timedelta(hours=2)).strftime('%Y-%m-%d %H:%M:%S')),
        ("Selamawit Girma - Submission Approved", "Submission Approved", "Beneficiary: Abebe Bikila (BEN-001)", "SUCCESS", (now - datetime.timedelta(hours=3)).strftime('%Y-%m-%d %H:%M:%S')),
        ("Mulugeta Bekele - Submission Rejected", "Submission Rejected", "Beneficiary: Sara Worku (BEN-004)", "ERROR", (now - datetime.timedelta(hours=4)).strftime('%Y-%m-%d %H:%M:%S')),
        ("Biruk Hailu - Beneficiary Registered", "Beneficiary Registered", "Beneficiary: Dagne Hailu (BEN-007)", "INFO", (now - datetime.timedelta(hours=5)).strftime('%Y-%m-%d %H:%M:%S'))
    ]
    
    c.executemany('''
        INSERT INTO activity_logs (user, action, details, status, timestamp)
        VALUES (%s, %s, %s, %s, %s)
    ''', activities)
    
    conn.commit()
    conn.close()
    print("Database seeded successfully with initial dashboard data using MySQL.")

if __name__ == "__main__":
    seed_data()
