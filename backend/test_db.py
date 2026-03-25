import pymysql

def test_connection(password):
    try:
        conn = pymysql.connect(
            host="localhost",
            user="root",
            password=password,
            port=3306
        )
        print(f"SUCCESS with password: '{password}'")
        conn.close()
        return True
    except pymysql.err.OperationalError as e:
        print(f"Failed with password: '{password}' -> {e}")
        return False
    except Exception as e:
        print(f"Other error with password '{password}': {e}")
        return False

if __name__ == "__main__":
    passwords_to_test = ["Gembele1416@", "", "root", "password", "root123", "admin"]
    for pwd in passwords_to_test:
        if test_connection(pwd):
            break
