CREATE TABLE teams (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       is_admin BOOLEAN NOT NULL DEFAULT FALSE,
                       team_id INTEGER,
                       auth_token VARCHAR(255),
                       FOREIGN KEY (team_id) REFERENCES teams(id)
);


CREATE TABLE tasks (
                       id SERIAL PRIMARY KEY,
                       title VARCHAR(100) NOT NULL,
                       description TEXT,
                       estimation_time FLOAT,
                       time_spent FLOAT,
                       column_name VARCHAR(10) NOT NULL,
                       created_by INTEGER,
                       position_on_board INTEGER,
                       FOREIGN KEY (created_by) REFERENCES users(id),
                       CONSTRAINT column_name_check CHECK (column_name IN ('todo', 'doing', 'review', 'done'))
);

CREATE TABLE sub_tasks (
                           id SERIAL PRIMARY KEY,
                           task_id INTEGER NOT NULL,
                           title VARCHAR(100) NOT NULL,
                           description TEXT,
                           completed BOOLEAN NOT NULL DEFAULT FALSE,
                           FOREIGN KEY (task_id) REFERENCES tasks(id)
);

CREATE TABLE task_assignments (
                                  id SERIAL PRIMARY KEY,
                                  task_id INTEGER NOT NULL,
                                  user_id INTEGER NOT NULL,
                                  FOREIGN KEY (task_id) REFERENCES tasks(id),
                                  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO teams (name) VALUES ('Team 1'), ('Team 2'), ('Team 3');

INSERT INTO users (username, password, is_admin, team_id) VALUES
                                                              ('AdminLogin', 'admin123', TRUE, 3),
                                                              ('user1', 'password1', FALSE, 1),
                                                              ('user2', 'password2', FALSE, 1),
                                                              ('user3', 'password3', FALSE, 2),
                                                              ('user4', 'password4', FALSE, 2);


