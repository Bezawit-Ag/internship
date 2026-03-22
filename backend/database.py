import pymysql
import pymysql.cursors
import os
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_PORT = int(os.getenv("DB_PORT", "3306"))
DB_NAME = os.getenv("DB_NAME", "sedms")

def get_connection_no_db():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT,
        cursorclass=pymysql.cursors.DictCursor
    )

def get_db_connection():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT,
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )

def init_db():
    conn = get_connection_no_db()
    c = conn.cursor()
    c.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
    conn.commit()
    conn.close()

    conn = get_db_connection()
    c = conn.cursor()
    c.execute("DROP TABLE IF EXISTS area_assignments;")
    c.execute("DROP TABLE IF EXISTS woredas;")
    c.execute("DROP TABLE IF EXISTS zones;")
    c.execute("DROP TABLE IF EXISTS suppliers;")
    c.execute("DROP TABLE IF EXISTS activity_logs;")
    c.execute("DROP TABLE IF EXISTS dashboard_stats;")
    
    c.execute('''
        CREATE TABLE dashboard_stats (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            total_suppliers INTEGER,
            suppliers_trend REAL,
            total_beneficiaries INTEGER,
            beneficiaries_trend REAL,
            units_distributed INTEGER,
            units_trend REAL,
            active_zones INTEGER,
            pending_approvals INTEGER,
            pending_trend REAL,
            equipment_issues INTEGER,
            issues_trend REAL
        );
    ''')

    c.execute('''
        CREATE TABLE activity_logs (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            user TEXT,
            action TEXT,
            details TEXT,
            status TEXT,
            timestamp DATETIME
        );
    ''')

    c.execute('''
        CREATE TABLE suppliers (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL
        );
    ''')

    c.execute('''
        CREATE TABLE zones (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL
        );
    ''')

    c.execute('''
        CREATE TABLE woredas (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            zone_id INTEGER,
            name VARCHAR(255) NOT NULL,
            FOREIGN KEY (zone_id) REFERENCES zones(id)
        );
    ''')

    c.execute('''
        CREATE TABLE area_assignments (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            supplier_id INTEGER NOT NULL,
            zone_id INTEGER NOT NULL,
            woreda_id INTEGER NOT NULL,
            kebele VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
            FOREIGN KEY (zone_id) REFERENCES zones(id),
            FOREIGN KEY (woreda_id) REFERENCES woredas(id)
        );
    ''')
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
