-- Enable Row Level Security (RLS) for all tables
ALTER TABLE depoimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE familias ENABLE ROW LEVEL SECURITY;
ALTER TABLE memorias ENABLE ROW LEVEL SECURITY;

-- Policies for depoimentos table
-- Allow anyone to insert new testimonials (they will be pending by default)
CREATE POLICY "Anyone can insert depoimentos" ON depoimentos
    FOR INSERT WITH CHECK (true);

-- Allow anyone to read approved testimonials
CREATE POLICY "Anyone can read approved depoimentos" ON depoimentos
    FOR SELECT USING (status = 'aprovado');

-- Only authenticated users (admins) can update testimonials
CREATE POLICY "Only authenticated users can update depoimentos" ON depoimentos
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Only authenticated users (admins) can delete testimonials
CREATE POLICY "Only authenticated users can delete depoimentos" ON depoimentos
    FOR DELETE USING (auth.role() = 'authenticated');

-- Policies for familias table
-- Allow anyone to insert new family stories (they will be pending by default)
CREATE POLICY "Anyone can insert familias" ON familias
    FOR INSERT WITH CHECK (true);

-- Allow anyone to read approved family stories
CREATE POLICY "Anyone can read approved familias" ON familias
    FOR SELECT USING (status = 'aprovado');

-- Only authenticated users (admins) can update family stories
CREATE POLICY "Only authenticated users can update familias" ON familias
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Only authenticated users (admins) can delete family stories
CREATE POLICY "Only authenticated users can delete familias" ON familias
    FOR DELETE USING (auth.role() = 'authenticated');

-- Policies for memorias table
-- Allow anyone to insert new memories (they will be pending by default)
CREATE POLICY "Anyone can insert memorias" ON memorias
    FOR INSERT WITH CHECK (true);

-- Allow anyone to read approved memories
CREATE POLICY "Anyone can read approved memorias" ON memorias
    FOR SELECT USING (status = 'aprovado');

-- Only authenticated users (admins) can update memories
CREATE POLICY "Only authenticated users can update memorias" ON memorias
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Only authenticated users (admins) can delete memories
CREATE POLICY "Only authenticated users can delete memorias" ON memorias
    FOR DELETE USING (auth.role() = 'authenticated');
