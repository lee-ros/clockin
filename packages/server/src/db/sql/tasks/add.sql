INSERT INTO tasks("userId", "taskName", "taskDescription")
VALUES(${userId}, ${taskName}, ${taskDescription})
RETURNING *