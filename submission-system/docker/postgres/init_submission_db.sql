CREATE TABLE public.submission
(
  legacy_id text,
  status text,
  error_description text,
  data json,
  user_id bigint,
  created_by bigint,
  created_at date,
  updated_by bigint,
  updated_at date,
  id serial NOT NULL,
  reference_lookup text,
  reference json,
  CONSTRAINT submissionpk PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.submission
  OWNER TO postgres;

CREATE TABLE public.submission_file
(
  id serial NOT NULL,
  submission_id integer references public.submission(id),
  file_path text NOT NULL,
  file_name text NOT NULL,
  entry_type json NOT NULL,
  media_type text NOT NULL,
  file_size bigint NOT NULL,
  CONSTRAINT submissionfilepk PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

ALTER TABLE public.submission_file
  OWNER TO postgres;

