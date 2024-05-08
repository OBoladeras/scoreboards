@echo off
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Install python to run this application from https://www.python.org/downloads/
    echo The application will open the download page in 10 seconds
    timeout /t 10 >nul

    start "" "https://www.python.org/downloads/"
    exit
)

@echo off
pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo pip is necessary to run this application
    echo Installing pip...
    timeout /t 5 >nul

    py -m ensurepip --upgrade
)

echo Installing required packages...
pip install -r requirements.txt
