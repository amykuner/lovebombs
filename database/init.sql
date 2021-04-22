-- Project database schema
BEGIN;
DROP TABLE IF EXISTS users, fac_members, compliments CASCADE;

SET timezone = 'Europe/London';

CREATE TABLE fac_members (
  id serial primary key,
  full_name varchar(255) NOT NULL,
  img_url  text,
  cohort_name varchar(255),
  fac_role varchar(255)
);

CREATE TABLE users (
  id serial primary key,
  username varchar(255) NOT NULL
);


CREATE TABLE compliments (
  id serial primary key,
  user_id  integer References users(id) ON DELETE CASCADE,
  fac_member_id  integer References fac_members(id) ON DELETE CASCADE,
  text_content text,
  created_at timestamp
);




INSERT INTO fac_members (full_name, img_url, cohort_name, fac_role ) VALUES
  ('Amy', 'https://avatars.githubusercontent.com/u/72794385?v=4', 'fac21', 'student'),
  ('Antonio', 'https://avatars.githubusercontent.com/u/63958540?v=4', 'fac21', 'student'),
  ('Mariya', 'https://avatars.githubusercontent.com/u/72445011?v=4', 'fac21', 'student'),
  ('Neville', 'https://avatars.githubusercontent.com/u/60395899?v=4', 'fac21', 'student')

;


INSERT INTO users ( username) VALUES
  ('user1'),
  ('unknown genius')
;

INSERT INTO compliments ( user_id, fac_member_id, text_content, created_at) VALUES
  (2, 1, 'Amy is funny', (SELECT CURRENT_TIMESTAMP)),
  (1, 2, 'Antonio is smart', (SELECT CURRENT_TIMESTAMP))
;



COMMIT;
