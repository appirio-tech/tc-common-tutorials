CREATE DATABASE test
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'en_US.utf8'
       LC_CTYPE = 'en_US.utf8'
       CONNECTION LIMIT = -1;
\connect test;
CREATE TABLE public.submission
(
  id serial NOT NULL,
  legacy_id text,
  status text,
  error_description text,
  data json,
  user_id bigint,
  created_by bigint,
  created_at date,
  updated_by bigint,
  updated_at date,
  reference_lookup text,
  reference json,
  CONSTRAINT submissionpk PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.submission
  OWNER TO postgres;
