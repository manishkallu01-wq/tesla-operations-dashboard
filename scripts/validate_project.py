"""Validate the portfolio dashboard contract without third-party packages."""
from pathlib import Path
import ast, json, sys

ROOT=Path(__file__).resolve().parents[1]
required=["README.md","package.json","server/app.py","src/App.jsx","src/data/mockData.js","src/utils/metrics.js","src/utils/metrics.test.js"]
errors=[f"missing: {p}" for p in required if not (ROOT/p).is_file()]
try:
    pkg=json.loads((ROOT/"package.json").read_text())
    for command in ["test","build"]:
        if command not in pkg.get("scripts",{}): errors.append(f"package.json missing {command} script")
except Exception as exc: errors.append(f"invalid package.json: {exc}")
try: ast.parse((ROOT/"server/app.py").read_text(),filename="server/app.py")
except SyntaxError as exc: errors.append(f"server/app.py: {exc}")
readme=(ROOT/"README.md").read_text().lower()
for term in ["business","architecture","reproducibility","mock","methodology"]:
    if term not in readme: errors.append(f"README missing concept: {term}")
if errors:
    print("\n".join(f"ERROR {e}" for e in errors)); sys.exit(1)
print("PASS dashboard structure, manifests, Python syntax, and documentation contract")
