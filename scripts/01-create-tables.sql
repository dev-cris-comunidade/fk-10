-- Create the depoimentos (testimonials) table
CREATE TABLE IF NOT EXISTS depoimentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    since VARCHAR(10) NOT NULL,
    text TEXT NOT NULL,
    photo_url TEXT NULL,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the familias (families) table
CREATE TABLE IF NOT EXISTS familias (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    story TEXT NOT NULL,
    photo_url TEXT NULL,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the memorias (memories) table
CREATE TABLE IF NOT EXISTS memorias (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    honored_name VARCHAR(255) NOT NULL,
    submitter_name VARCHAR(255) NULL,
    message TEXT NULL,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_depoimentos_status ON depoimentos(status);
CREATE INDEX IF NOT EXISTS idx_depoimentos_created_at ON depoimentos(created_at);
CREATE INDEX IF NOT EXISTS idx_familias_status ON familias(status);
CREATE INDEX IF NOT EXISTS idx_familias_created_at ON familias(created_at);
CREATE INDEX IF NOT EXISTS idx_memorias_status ON memorias(status);
CREATE INDEX IF NOT EXISTS idx_memorias_created_at ON memorias(created_at);

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_depoimentos_updated_at BEFORE UPDATE ON depoimentos
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_familias_updated_at BEFORE UPDATE ON familias
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_memorias_updated_at BEFORE UPDATE ON memorias
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
