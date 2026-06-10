import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1780046496160 implements MigrationInterface {
    name = 'InitialMigration1780046496160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_2863682842e688ca198eb25c12\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tarea\` (\`id\` int NOT NULL AUTO_INCREMENT, \`usuarioId\` int NOT NULL, \`titulo\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NULL, \`completada\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`historial\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tareaId\` int NOT NULL, \`usuarioId\` int NOT NULL, \`accion\` varchar(255) NOT NULL, \`valorAnterior\` varchar(255) NULL, \`valorNuevo\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tarea\` ADD CONSTRAINT \`FK_af665380e0ef31355c5f4fc9ed7\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`historial\` ADD CONSTRAINT \`FK_909f5381b42d0cffd35bfd72ea8\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`historial\` DROP FOREIGN KEY \`FK_909f5381b42d0cffd35bfd72ea8\``);
        await queryRunner.query(`ALTER TABLE \`tarea\` DROP FOREIGN KEY \`FK_af665380e0ef31355c5f4fc9ed7\``);
        await queryRunner.query(`DROP TABLE \`historial\``);
        await queryRunner.query(`DROP TABLE \`tarea\``);
        await queryRunner.query(`DROP INDEX \`IDX_2863682842e688ca198eb25c12\` ON \`usuario\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
    }

}
