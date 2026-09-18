import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_hero_rotating_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_rotating_words" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "secondary_image_id" integer;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "secondary_image_id" integer;
  ALTER TABLE "pages_blocks_hero_rotating_words" ADD CONSTRAINT "pages_blocks_hero_rotating_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_rotating_words" ADD CONSTRAINT "_pages_v_blocks_hero_rotating_words_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_rotating_words_order_idx" ON "pages_blocks_hero_rotating_words" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_rotating_words_parent_id_idx" ON "pages_blocks_hero_rotating_words" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_rotating_words_order_idx" ON "_pages_v_blocks_hero_rotating_words" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_rotating_words_parent_id_idx" ON "_pages_v_blocks_hero_rotating_words" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_secondary_image_id_media_id_fk" FOREIGN KEY ("secondary_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_secondary_image_id_media_id_fk" FOREIGN KEY ("secondary_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_secondary_image_idx" ON "pages_blocks_hero" USING btree ("secondary_image_id");
  CREATE INDEX "_pages_v_blocks_hero_secondary_image_idx" ON "_pages_v_blocks_hero" USING btree ("secondary_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_rotating_words" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_rotating_words" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_rotating_words" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_rotating_words" CASCADE;
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_secondary_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT "_pages_v_blocks_hero_secondary_image_id_media_id_fk";
  
  DROP INDEX "pages_blocks_hero_secondary_image_idx";
  DROP INDEX "_pages_v_blocks_hero_secondary_image_idx";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "secondary_image_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "secondary_image_id";`)
}
