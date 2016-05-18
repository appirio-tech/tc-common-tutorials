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
