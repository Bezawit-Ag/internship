import urllib.request
import json

payload = {
    "full_name": "Test Institution",
    "national_id": "-",
    "phone": "0911",
    "gender": "",
    "household_size": "",
    "zone": "Z1",
    "woreda": "W1",
    "kebele": "K1",
    "village": "V1",
    "survey_type": "Institution",
    "equipment_type": "Home Solar System",
    "supplier": "",
    "status": "Pending Woreda",
    "details_json": "{}"
}

req = urllib.request.Request(
    'http://localhost:8000/api/beneficiaries',
    data=json.dumps(payload).encode('utf-8'),
    headers={'Content-Type': 'application/json'},
    method='POST'
)

try:
    with urllib.request.urlopen(req) as f:
        print("Success:", f.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("Failed:", e.code, e.read().decode('utf-8'))
