"""Validate dashboard structure, manifests, and Python syntax."""
from pathlib import Path
import ast, json, sys
ROOT=Path(__file__).resolve().parents[1]
required=["README.md","package.json","server/app.py","server/requirements.txt","tests/test_api.py","src/App.jsx","src/data/mockData.js","src/utils/metrics.js","src/utils/metrics.test.js",".github/workflows/ci.yml"]
errors=[f"missing: {p}" for p in required if not (ROOT/p).is_file()]
try:
    pkg=json.loads((ROOT/"package.json").read_text())
    for command in ["test","build"]:
        if command not in pkg.get("scripts",{}): errors.append(f"package.json missing {command} script")
except Exception as exc: errors.append(f"invalid package.json: {exc}")
for path in [ROOT/"server/app.py",ROOT/"tests/test_api.py"]:
    try: ast.parse(path.read_text(),filename=str(path))
    except SyntaxError as exc: errors.append(str(exc))
readme=(ROOT/"README.md").read_text().lower()
for term in ["business question","implemented architecture","run locally","tests","result interpretation","production gaps"]:
    if term not in readme: errors.append(f"README missing concept: {term}")
if errors: print("\n".join(f"ERROR {e}" for e in errors)); sys.exit(1)
print("PASS dashboard structure, manifests, syntax, and documentation contract")
