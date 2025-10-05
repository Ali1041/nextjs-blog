-- Create contacts table for lead generation
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    industry TEXT,
    project_scope TEXT,
    message TEXT,
    source TEXT DEFAULT 'website',
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);

-- Add RLS (Row Level Security) policies
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to read contacts
CREATE POLICY "Allow authenticated users to read contacts" ON contacts
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policy to allow anyone to insert contacts (for the contact form)
CREATE POLICY "Allow anyone to insert contacts" ON contacts
    FOR INSERT WITH CHECK (true);

-- Policy to allow authenticated users to update contacts
CREATE POLICY "Allow authenticated users to update contacts" ON contacts
    FOR UPDATE USING (auth.role() = 'authenticated');
