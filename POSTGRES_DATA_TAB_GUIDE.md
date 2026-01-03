# Postgres Data Tab - Step-by-Step Guide

## What You're Seeing

You're in the **Database → Data** tab, which is where you:
- Create tables
- View table data
- Run SQL queries
- Manage your database structure

---

## Step 1: Create Your First Table

### Option A: Create a Simple Table (Recommended to Start)

**For your portfolio, you might want to store:**

#### Example 1: Contact Form Submissions

1. **Click "Create table"** (the purple button you see)

2. **Table Name:**
   - Enter: `contact_submissions`
   - (Replace "my-table" with this name)

3. **Add Columns:**

   **Column 1:**
   - **column name:** `id`
   - **type:** `serial` (auto-incrementing number)
   - **default:** Leave empty or "no default"
   - **constraints:** `Primary Key`

   **Click "Add column"** to add more:

   **Column 2:**
   - **column name:** `name`
   - **type:** `varchar(255)` or `text`
   - **default:** Leave empty
   - **constraints:** Leave empty

   **Column 3:**
   - **column name:** `email`
   - **type:** `varchar(255)`
   - **default:** Leave empty
   - **constraints:** Leave empty

   **Column 4:**
   - **column name:** `message`
   - **type:** `text`
   - **default:** Leave empty
   - **constraints:** Leave empty

   **Column 5:**
   - **column name:** `created_at`
   - **type:** `timestamp`
   - **default:** `now()` or `CURRENT_TIMESTAMP`
   - **constraints:** Leave empty

4. **Click "Create"** (purple button at bottom right)

5. **Done!** Your table is created.

---

#### Example 2: Analytics/Performance Data

**Table Name:** `performance_metrics`

**Columns:**
- `id` - `serial` - Primary Key
- `metric_name` - `varchar(100)` - (e.g., "lcp", "fid", "cls")
- `metric_value` - `numeric` - The actual value
- `url` - `varchar(500)` - Page URL
- `timestamp` - `timestamp` - `now()` default

---

#### Example 3: Bot Reports

**Table Name:** `bot_reports`

**Columns:**
- `id` - `serial` - Primary Key
- `bot_name` - `varchar(50)` - (e.g., "seo", "performance")
- `report_data` - `jsonb` - Store report as JSON
- `score` - `integer` - Performance score
- `created_at` - `timestamp` - `now()` default

---

## Step 2: View Your Tables

After creating a table:

1. **You'll see your table listed** in the Data tab
2. **Click on the table name** to view its data
3. **You'll see:**
   - All rows (empty if just created)
   - Column headers
   - Options to add/edit/delete rows

---

## Step 3: Add Data to Your Table

### Method 1: Using the UI

1. **Click on your table name** (e.g., `contact_submissions`)
2. **Click "Add row"** or similar button
3. **Fill in the fields:**
   - `name`: Enter a name
   - `email`: Enter an email
   - `message`: Enter a message
   - `created_at`: Will auto-fill with current time
4. **Save**

### Method 2: Using SQL Query

1. **Click "Query" button** (usually at top of Data tab)
2. **Enter SQL:**

```sql
INSERT INTO contact_submissions (name, email, message)
VALUES ('John Doe', 'john@example.com', 'Hello, this is a test message');
```

3. **Click "Run"** or "Execute"
4. **Data is added!**

---

## Step 4: View Data

1. **Click on table name**
2. **Browse rows** - you'll see all data in a table format
3. **Use pagination** if you have many rows
4. **Search/filter** if available

---

## Step 5: Run SQL Queries

1. **Click "Query" button**
2. **Enter SQL:**

### Example Queries:

**View all data:**
```sql
SELECT * FROM contact_submissions;
```

**View recent submissions:**
```sql
SELECT * FROM contact_submissions 
ORDER BY created_at DESC 
LIMIT 10;
```

**Count rows:**
```sql
SELECT COUNT(*) FROM contact_submissions;
```

**Filter by email:**
```sql
SELECT * FROM contact_submissions 
WHERE email = 'john@example.com';
```

3. **Click "Run"**
4. **View results** below

---

## Step 6: Edit/Delete Data

### Edit Row:
1. **Click on a row** in your table
2. **Click "Edit"** button
3. **Modify values**
4. **Save**

### Delete Row:
1. **Click on a row**
2. **Click "Delete"** button
3. **Confirm deletion**

---

## Step 7: Export Data

1. **Select table**
2. **Look for "Export" button**
3. **Choose format:** CSV, JSON, SQL
4. **Download**

---

## Common PostgreSQL Types

When creating columns, use these types:

- **`serial`** - Auto-incrementing integer (for IDs)
- **`integer`** - Whole numbers
- **`numeric`** or **`decimal`** - Decimal numbers
- **`varchar(n)`** - Text with max length (e.g., `varchar(255)`)
- **`text`** - Unlimited text
- **`boolean`** - True/false
- **`timestamp`** - Date and time
- **`date`** - Just date
- **`jsonb`** - JSON data (PostgreSQL specific)
- **`uuid`** - UUID (requires extension)

---

## Constraints You Can Use

- **Primary Key** - Unique identifier
- **NOT NULL** - Field cannot be empty
- **UNIQUE** - Value must be unique
- **DEFAULT** - Default value if not provided
- **FOREIGN KEY** - Reference another table

---

## Practical Example for Your Portfolio

### Create a Contact Submissions Table:

1. **Table Name:** `contact_submissions`

2. **Columns:**
   ```
   id          serial      Primary Key
   name        varchar(255) NOT NULL
   email       varchar(255) NOT NULL
   message     text        NOT NULL
   created_at  timestamp   DEFAULT now()
   ```

3. **Click "Create"**

4. **Test it:**
   - Click "Query"
   - Run: `SELECT * FROM contact_submissions;`
   - Should show empty table (no rows yet)

---

## Next Steps

Once you've created a table and added some data:

1. ✅ **You're done with Data tab!**
2. **Move to "Extensions" tab** - Enable useful PostgreSQL extensions
3. **Move to "Credentials" tab** - Get connection details for your app

---

## Tips

- **Start simple** - Create one table first
- **Test with sample data** - Add a few rows to see how it works
- **Use SQL queries** - More powerful than UI for complex operations
- **Export before deleting** - Always export important data first

Ready to move to the **Extensions** tab? Let me know when you're done with the Data tab! 🚀

