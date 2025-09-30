-- Create posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    author TEXT,
    image TEXT,
    tags TEXT,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT NOW()
);



-- Create case_studies table if it doesn't exist
CREATE TABLE IF NOT EXISTS case_studies (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    author TEXT,
    client TEXT,
    industry TEXT,
    results TEXT,
    image TEXT,
    tags TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
