@echo off
REM Phase 1 Backend Setup Script
REM Run this in Command Prompt to set up PostgreSQL, Prisma, and database schema

echo.
echo ========================================
echo PHASE 1 BACKEND SETUP - STEP BY STEP
echo ========================================
echo.

REM Step 1: Install Prisma
echo [1/5] Installing Prisma Client and CLI...
call npm install @prisma/client
if %errorlevel% neq 0 (
    echo ERROR: Failed to install @prisma/client
    pause
    exit /b 1
)

call npm install -D @prisma/cli
if %errorlevel% neq 0 (
    echo ERROR: Failed to install @prisma/cli
    pause
    exit /b 1
)
echo [1/5] ✓ Prisma installed successfully

REM Step 2: Install additional dependencies
echo.
echo [2/5] Installing additional dependencies (bcryptjs, zod)...
call npm install bcryptjs zod
echo [2/5] ✓ Dependencies installed

REM Step 3: Create database
echo.
echo [3/5] Creating PostgreSQL database...
psql -U postgres -c "CREATE DATABASE bems_books_db;"
if %errorlevel% neq 0 (
    echo WARNING: Database might already exist (this is OK if you're re-running)
    REM Don't exit on error here, database might already exist
)
echo [3/5] ✓ Database setup attempted (check below for errors)

REM Step 4: Show user .env.local needs DATABASE_URL
echo.
echo [4/5] Next: Update .env.local with DATABASE_URL...
echo.
echo Add this line to .env.local:
echo DATABASE_URL="postgresql://postgres:password@localhost:5432/bems_books_db"
echo.
echo (Replace 'password' with your actual PostgreSQL password)
echo.
pause

REM Step 5: Create schema and run migrations
echo.
echo [5/5] Creating database schema and running migrations...
echo.
echo Copy the Prisma schema from the documentation and paste into:
echo prisma/schema.prisma
echo.
echo Then run:
echo npx prisma migrate dev --name init
echo.
echo This will create all database tables.
echo.

echo.
echo ========================================
echo SETUP COMPLETE!
echo ========================================
echo.
echo Next steps:
echo 1. Update .env.local with DATABASE_URL
echo 2. Copy Prisma schema into prisma/schema.prisma
echo 3. Run: npx prisma migrate dev --name init
echo 4. Run: npx prisma studio
echo.
pause
