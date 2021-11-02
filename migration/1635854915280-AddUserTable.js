const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AddUserTable1635854915280 {
    name = 'AddUserTable1635854915280'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`foto\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
