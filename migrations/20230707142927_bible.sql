-- Add migration script here
-- CREATE TABLE IF NOT EXISTS sentences
-- (
--     id            INTEGER PRIMARY KEY NOT NULL,
--     version_name  TEXT                NOT NULL,
--     book_name     TEXT                NOT NULL,
--     chapter       INTEGER             NOT NULL,
--     section       INTEGER             NOT NULL,
--     sentence      TEXT                NOT NULL,
-- );

CREATE TABLE IF NOT EXISTS sentences(version TEXT NOT NULL, book TEXT NOT NULL, chapter INTEGER OT NULL, section INTEGER NOT NULL, sentence TEXT NOT NULL);
