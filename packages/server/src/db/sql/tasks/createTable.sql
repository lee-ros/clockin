CREATE TABLE IF NOT EXISTS tasks (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "taskName" VARCHAR(100) DEFAULT '',
    "taskDescription" TEXT DEFAULT '',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_users
        FOREIGN KEY("userId")
        REFERENCES users("id")
        ON DELETE CASCADE
);