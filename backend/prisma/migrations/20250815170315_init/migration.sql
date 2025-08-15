-- CreateTable
CREATE TABLE "public"."Superhero" (
    "id" TEXT NOT NULL,
    "nickname" VARCHAR(100) NOT NULL,
    "real_name" VARCHAR(120) NOT NULL,
    "origin_description" TEXT NOT NULL,
    "superpowers" TEXT NOT NULL,
    "catch_phrase" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Superhero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "superheroId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "public"."Superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
