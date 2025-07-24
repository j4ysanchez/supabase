-- 1. Enable RLS
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- 2. Policies for tenants table (users can only see their own tenant)
CREATE POLICY "Users can view their tenant"
  ON tenants
  FOR SELECT
  USING (id = (SELECT tenant_id FROM users WHERE users.id = auth.uid()));

-- 3. Policies for users table (users can only see users in their tenant)
CREATE POLICY "Users can view users in their tenant"
  ON users
  FOR SELECT
  USING (tenant_id = (SELECT tenant_id FROM users WHERE users.id = auth.uid()));

-- 4. Policies for recipes table (users can only access recipes in their tenant)
CREATE POLICY "Users can view recipes in their tenant"
  ON recipes
  FOR SELECT
  USING (tenant_id = (SELECT tenant_id FROM users WHERE users.id = auth.uid()));

-- Repeat similar policies for INSERT, UPDATE, DELETE as needed.