import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1791287984179 implements MigrationInterface {
  name = 'InitialSchema1791287984179';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "journal_pages" ("id" uuid NOT NULL, "journal_id" uuid NOT NULL, "user_id" uuid NOT NULL, "title" character varying(255) NOT NULL DEFAULT '', "content" jsonb NOT NULL, "paper_type" character varying(20) NOT NULL DEFAULT 'lined', "page_number" integer NOT NULL DEFAULT '1', "entry_date" date NOT NULL, "is_favorite" boolean NOT NULL DEFAULT false, "tags" text array NOT NULL DEFAULT '{}', "client_created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "client_updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "server_updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "revision" integer NOT NULL DEFAULT '1', "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_f233f9b39b0e45bca873786eb5a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a0e928fb5ee006ea90a6ac26b8" ON "journal_pages" ("journal_id", "page_number") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_47cccc4ef5f5b37c56cfc8f136" ON "journal_pages" ("user_id", "entry_date") `,
    );
    await queryRunner.query(
      `CREATE TABLE "journals" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "title" character varying(255) NOT NULL, "description" text, "cover_color" character varying(32), "default_paper_type" character varying(20) NOT NULL DEFAULT 'lined', "client_created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "client_updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "server_updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "revision" integer NOT NULL DEFAULT '1', "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_157a30136385dd81cdd19111380" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" uuid NOT NULL, "user_id" uuid NOT NULL, "name" character varying(100) NOT NULL, "color" character varying(32), "client_created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "client_updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "server_updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "revision" integer NOT NULL DEFAULT '1', "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1d8718578ce96a09d1aa2237a1" ON "tags" ("user_id", "name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "display_name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "journal_pages" ADD CONSTRAINT "FK_c5d2e71f3c5071094d5b8cfb610" FOREIGN KEY ("journal_id") REFERENCES "journals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "journal_pages" ADD CONSTRAINT "FK_623d46ae39ff7c62ae2d0293e86" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" ADD CONSTRAINT "FK_dcd8f26897887ea1ca19e9b910a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ADD CONSTRAINT "FK_74603743868d1e4f4fc2c0225b6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tags" DROP CONSTRAINT "FK_74603743868d1e4f4fc2c0225b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journals" DROP CONSTRAINT "FK_dcd8f26897887ea1ca19e9b910a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journal_pages" DROP CONSTRAINT "FK_623d46ae39ff7c62ae2d0293e86"`,
    );
    await queryRunner.query(
      `ALTER TABLE "journal_pages" DROP CONSTRAINT "FK_c5d2e71f3c5071094d5b8cfb610"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1d8718578ce96a09d1aa2237a1"`,
    );
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "journals"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_47cccc4ef5f5b37c56cfc8f136"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a0e928fb5ee006ea90a6ac26b8"`,
    );
    await queryRunner.query(`DROP TABLE "journal_pages"`);
  }
}
