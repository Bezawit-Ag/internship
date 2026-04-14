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
    
    suppliers = [
        ("Solar Solutions Ethiopia PLC", "LIC-2024-001", "Home Solar System", "Abebe Kebede", "+251 911 001 001", "info@solarsolutions.et", "Bahir Dar, Amhara", "Private Limited", 92, "Active"),
        ("SunPower Technologies Ltd", "LIC-2024-002", "Solar Lantern", "Meron Tadesse", "+251 912 002 002", "contact@sunpower.et", "Gondar, Amhara", "Private Limited", 87, "Active"),
        ("Green Energy Amhara", "LIC-2024-003", "Off-grid Solar Grid", "Daniel Yohannes", "+251 913 003 003", "hello@greenenergy.et", "Dessie, Amhara", "Share Company", 79, "Active"),
        ("Amhara Solar Cooperative", "LIC-2024-004", "Institutional Solar", "Hiwot Dereje", "+251 914 004 004", "support@amharasolar.et", "Debre Markos, Amhara", "Cooperative", 45, "Suspended"),
        ("BrightFuture Energy Solutions", "LIC-2024-005", "Home Solar System", "Samuel Getachew", "+251 915 005 005", "info@brightfuture.et", "Bahir Dar, Amhara", "Private Limited", 95, "Active")
    ]
    c.executemany("""
        INSERT INTO suppliers (name, license_number, service_type, contact_person, contact_phone, email, address, company_type, score, status) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, suppliers)
    zones = [("North Gondar",), ("East Gojam",), ("South Wollo",), ("Awi",), ("Wag Hemra",), ("West Gojam",)]
    c.executemany("INSERT INTO zones (name) VALUES (%s)", zones)

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
