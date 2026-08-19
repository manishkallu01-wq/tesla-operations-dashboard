from server.app import app

def client():
    app.config["TESTING"]=True
    return app.test_client()

def test_health():
    response=client().get("/api/health")
    assert response.status_code==200 and response.get_json()=={"status":"ok"}

def test_dashboard_contract():
    payload=client().get("/api/dashboard?factory=Austin&days=7").get_json()
    assert payload["filters"]=={"factory":"Austin","days":7}
    assert set(payload)>={"kpis","trend","comparison","alerts","operations","updatedAt"}
    assert all(row["factory"]=="Austin" for row in payload["operations"])

def test_invalid_days():
    assert client().get("/api/dashboard?days=abc").status_code==400
    assert client().get("/api/dashboard?days=0").status_code==400

def test_invalid_factory():
    assert client().get("/api/dashboard?factory=Unknown").status_code==400
