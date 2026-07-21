#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
npm install
python3 -m venv .venv
source .venv/bin/activate
pip install -r server/requirements.txt
printf '\nSetup complete. Run: ./run.sh\n'
