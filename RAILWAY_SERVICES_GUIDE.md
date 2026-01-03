# Railway Services & Nodes Guide

## What You Can Do in Railway Platform

This guide shows you what services/nodes you can add and what you can configure in each.

---

## Current Setup

You currently have:
- ✅ **raul-portfolio** (Next.js app) - Main service
- ✅ **Postgres** (Database) - Connected to your app
- ✅ **postgres-volume** (Storage) - Database storage

---

## Available Railway Services/Nodes

### 1. **Postgres Database** (You Already Have This)

**What You Can Do in Railway Dashboard:**

#### In "Database" Tab:
- **Data Tab:**
  - View all tables
  - Create new tables
  - Browse table data
  - Run SQL queries
  - Export data

- **Extensions Tab:**
  - Enable PostgreSQL extensions (e.g., `pg_trgm`, `uuid-ossp`, `postgis`)
  - View installed extensions
  - Manage extensions

- **Credentials Tab:**
  - View database connection details
  - Copy connection string
  - Reset password
  - View host, port, database name

#### In "Backups" Tab:
- **View backup history**
- **Create manual backup**
- **Restore from backup**
- **Configure automatic backups**
- **Download backup files**

#### In "Variables" Tab:
- **View database environment variables:**
  - `DATABASE_URL` - Full connection string
  - `PGHOST` - Database host
  - `PGPORT` - Database port
  - `PGDATABASE` - Database name
  - `PGUSER` - Database user
  - `PGPASSWORD` - Database password

#### In "Metrics" Tab:
- **Monitor database performance:**
  - CPU usage
  - Memory usage
  - Connection count
  - Query performance
  - Storage usage

#### In "Settings" Tab:
- **Configure database:**
  - Database name
  - Region/location
  - Resource limits (CPU, memory)
  - Auto-scaling settings
  - Restart policy

**When to Use:**
- Store user data
- Store application data
- Need relational database
- Need ACID transactions

---

### 2. **MySQL Database**

**What You Can Do:**
- Same features as Postgres
- Better for some specific use cases
- Different SQL syntax

**When to Use:**
- Prefer MySQL over Postgres
- Specific MySQL features needed
- Legacy system compatibility

---

### 3. **MongoDB**

**What You Can Do:**
- Store document-based data
- NoSQL database
- Flexible schema

**When to Use:**
- Need NoSQL database
- Document-based data structure
- Flexible schema requirements

---

### 4. **Redis**

**What You Can Do:**
- **Cache data** for faster access
- **Session storage**
- **Real-time features** (pub/sub)
- **Queue management**

**Configuration Options:**
- Memory limits
- Persistence settings
- Eviction policies

**When to Use:**
- Need fast caching
- Session management
- Real-time features
- Queue/job processing

**For Your Portfolio:**
- Cache API responses
- Cache image metadata
- Session storage
- Rate limiting

---

### 5. **Static Files Service**

**What You Can Do:**
- Host static files
- CDN distribution
- File storage

**When to Use:**
- Need separate file storage
- Large file hosting
- CDN requirements

---

### 6. **Cron Jobs**

**What You Can Do:**
- **Schedule tasks:**
  - Daily backups
  - Data cleanup
  - Email sending
  - Report generation

**Configuration:**
- Cron schedule (e.g., `0 0 * * *` for daily)
- Command to run
- Environment variables

**When to Use:**
- Scheduled tasks
- Automated jobs
- Periodic maintenance

**For Your Portfolio:**
- Daily analytics reports
- Cleanup old logs
- Generate sitemaps
- Backup data

---

### 7. **Webhook Service**

**What You Can Do:**
- Receive webhooks from external services
- Process webhook data
- Trigger actions

**When to Use:**
- GitHub webhooks
- Payment webhooks
- Third-party integrations

---

### 8. **Tunnel Service**

**What You Can Do:**
- Expose local services
- Development tunneling
- Testing webhooks locally

**When to Use:**
- Local development
- Testing integrations
- Webhook development

---

## Recommended Services for Your Portfolio

### Priority 1: **Redis** (Recommended)

**Why:**
- Cache API responses (faster performance)
- Cache bot reports
- Session storage (if you add auth later)
- Rate limiting for API endpoints

**What You Can Configure:**
- Memory limit (start with 256MB)
- Persistence (optional)
- Eviction policy

**How to Add:**
1. Railway Dashboard → New → Add Service
2. Select "Redis"
3. Railway auto-generates `REDIS_URL` variable
4. Connect to your app

---

### Priority 2: **Cron Jobs** (Optional)

**Why:**
- Schedule bot reports
- Daily analytics
- Automated backups
- Cleanup tasks

**What You Can Configure:**
- Schedule (cron syntax)
- Command to run
- Environment variables

**How to Add:**
1. Railway Dashboard → New → Add Service
2. Select "Cron"
3. Configure schedule
4. Set command (e.g., `node scripts/daily-report.js`)

---

## What You Can Do in Each Service

### General Service Actions (All Services):

#### In "Deployments" Tab:
- View deployment history
- View build logs
- Redeploy previous version
- View deployment status

#### In "Variables" Tab:
- Add environment variables
- Edit variables
- Delete variables
- View variable values
- Reference other services' variables

#### In "Metrics" Tab:
- View CPU usage
- View memory usage
- View network I/O
- View request latency
- Set up alerts

#### In "Settings" Tab:
- Change service name
- Configure resources (CPU, memory)
- Set restart policy
- Configure health checks
- Set up auto-scaling
- Change region
- Delete service

---

## Postgres-Specific Actions

### In "Database" Tab → "Data":

**Create Table:**
1. Click "Create table"
2. Enter table name
3. Add columns (name, type, constraints)
4. Set primary key
5. Save

**Run SQL Queries:**
1. Click "Query" button
2. Enter SQL (e.g., `SELECT * FROM users;`)
3. Execute
4. View results

**View Table Data:**
1. Click on table name
2. Browse rows
3. Edit data (if needed)
4. Export data

### In "Database" Tab → "Extensions":

**Enable Extension:**
1. Go to "Extensions" tab
2. Search for extension (e.g., `uuid-ossp`)
3. Click "Enable"
4. Extension is now available

**Common Extensions:**
- `uuid-ossp` - UUID generation
- `pg_trgm` - Text search
- `postgis` - Geographic data
- `pgcrypto` - Encryption

### In "Database" Tab → "Credentials":

**View Connection Info:**
- Host, port, database name
- Username, password
- Full connection string

**Reset Password:**
1. Click "Reset Password"
2. New password generated
3. Update `DATABASE_URL` in your app

**Copy Connection String:**
- Click "Copy" next to connection string
- Use in your app's environment variables

### In "Backups" Tab:

**Create Manual Backup:**
1. Click "Create Backup"
2. Wait for backup to complete
3. Download if needed

**Configure Auto-Backups:**
1. Enable "Automatic Backups"
2. Set schedule (daily, weekly)
3. Set retention period

**Restore from Backup:**
1. Select backup from list
2. Click "Restore"
3. Confirm restoration

---

## Service Connections

### How Services Connect:

**Automatic Connection:**
- Railway automatically creates environment variables
- Services can reference each other
- Example: `DATABASE_URL` is auto-created for Postgres

**Manual Connection:**
- Reference variables from other services
- Use `${SERVICE_NAME.VARIABLE_NAME}` syntax
- Example: `${REDIS.REDIS_URL}`

---

## Resource Management

### For Each Service:

**CPU:**
- Start with minimum (0.25 vCPU)
- Scale up if needed
- Monitor in Metrics tab

**Memory:**
- Start with minimum (256MB)
- Scale up based on usage
- Monitor in Metrics tab

**Storage:**
- Postgres: Auto-provisioned
- Other services: Configure as needed

---

## Cost Optimization

### Free Tier:
- 500 hours/month free
- Monitor usage in dashboard
- Stop unused services

### Paid Tier:
- Pay for what you use
- Monitor costs in dashboard
- Scale down when not needed

---

## Quick Actions Checklist

### For Postgres:
- [ ] View/create tables in "Data" tab
- [ ] Enable extensions if needed
- [ ] Configure automatic backups
- [ ] Monitor metrics
- [ ] Check connection credentials

### For Your App (raul-portfolio):
- [ ] Set environment variables
- [ ] Configure health checks
- [ ] Set resource limits
- [ ] Monitor metrics
- [ ] View deployment logs

### Add New Services:
- [ ] Redis (for caching)
- [ ] Cron (for scheduled tasks)
- [ ] Other services as needed

---

## Summary

**Current Services:**
- ✅ raul-portfolio (Next.js app)
- ✅ Postgres (Database)
- ✅ postgres-volume (Storage)

**Recommended to Add:**
- 🔄 Redis (for caching - improves performance)
- ⏰ Cron (optional - for scheduled tasks)

**What You Can Do:**
- Configure each service in Railway dashboard
- Add environment variables
- Monitor metrics
- Manage backups (Postgres)
- Scale resources
- View logs

All of this is done in the Railway dashboard - no code changes needed! 🚀

