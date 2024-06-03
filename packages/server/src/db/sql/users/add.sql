INSERT INTO users("firstName", "lastName", "password", "email")
VALUES(${firstName}, ${lastName}, ${password}, ${email})
RETURNING *