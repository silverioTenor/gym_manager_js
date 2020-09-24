CREATE TABLE "instructors" (
  "id" SERIAL PRIMARY KEY,
  "avatar_url" text NOT NULL,
  "name" text NOT NULL,
  "birth" timestamp NOT NULL,
  "gender" text NOT NULL,
  "services" text NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "members" (
  "id" SERIAL PRIMARY KEY,
  "avatar_url" text NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "birth" timestamp NOT NULL,
  "gender" text NOT NULL,
  "blood" text NOT NULL,
  "weight" integer NOT NULL,
  "height" integer NOT NULL,
  "created_at" timestamp NOT NULL
);
