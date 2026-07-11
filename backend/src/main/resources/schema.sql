ALTER TABLE product ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0;
ALTER TABLE product ALTER COLUMN imageurl TYPE TEXT;
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'USER'
);
INSERT INTO users (name, email,password,role)
VALUES ('Praveen Admin', 'praveen@gmail.com','admin123', 'ADMIN')
ON CONFLICT (email) DO NOTHING;

