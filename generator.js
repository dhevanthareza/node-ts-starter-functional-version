const inquirer = require('inquirer');
const CURR_DIR = process.cwd();
const fs = require('fs');
const MODULE_CHOICES = fs.readdirSync(`${__dirname}/src/modules`);
const moment = require('moment');
// const listInput = require('inquirer-list-input');
const QUESTIONS = [
  {
    name: 'titleName',
    type: 'input',
    message: 'Input Title Name? (ex: Management, Role, Master Data)',
  },
  {
    name: 'modelName',
    type: 'input',
    message: 'Input Model Name? (ex: User,Role,MasterData)',
  },
  {
    name: 'tableName',
    type: 'input',
    message: 'Input Table Name? (ex: User, Role, MasterData)',
  },
  {
    name: 'repositoryName',
    type: 'input',
    message: 'Input Repository Name? (ex: User, Role, MasterData)',
  },
  {
    name: 'controllerName',
    type: 'input',
    message: 'Input Controller Name? (ex: User, Role, MasterData)',
  },
  {
    name: 'moduleName',
    type: 'input',
    message: 'Your module name(will be folder name, ex: role,masterData,user)',
  },
  {
    name: 'parentName',
    type: 'input',
    message:
      'Choose or input Parent folder or input manually (example: management, management/user )',
    choices: MODULE_CHOICES,
  },
];
// inquirer.registerPrompt('list-input', listInput);
inquirer.prompt(QUESTIONS).then(answers => {
  let {
    modelName,
    tableName,
    parentName,
    moduleName,
    controllerName,
    titleName,
    repositoryName,
  } = answers;
  repositoryName = `${repositoryName}`;

  console.log('CREATING MODULE DIR');
  fs.mkdirSync(`${CURR_DIR}/src/modules/${parentName}/${moduleName}`);

  console.log('GENERATING MODEL');
  let modelContent = fs.readFileSync(`${__dirname}/templates/template.model.ts`, 'utf8');
  modelContent = modelContent.replace(/modelName/g, modelName);
  modelContent = modelContent.replace(/TableName/g, tableName);
  fs.writeFileSync(
    `${CURR_DIR}/src/modules/${parentName}/${moduleName}/${moduleName}.model.ts`,
    modelContent,
    'utf8',
  );

  console.log('GENERATING Validation');
  let schemaContent = fs.readFileSync(`${__dirname}/templates/template.validation.ts`, 'utf8');
  schemaContent = schemaContent.replace(/moduleName/g, moduleName);
  fs.writeFileSync(
    `${CURR_DIR}/src/modules/${parentName}/${moduleName}/${moduleName}.validation.ts`,
    schemaContent,
    'utf8',
  );

  console.log('GENERATING REPOSITORY');
  let repositoryContent = fs.readFileSync(`${__dirname}/templates/template.repository.ts`, 'utf8');
  repositoryContent = repositoryContent.replace(/moduleName/g, moduleName);
  repositoryContent = repositoryContent.replace(/modelName/g, modelName);
  repositoryContent = repositoryContent.replace(/titleName/g, titleName);
  repositoryContent = repositoryContent.replace(/repositoryName/g, repositoryName);
  fs.writeFileSync(
    `${CURR_DIR}/src/modules/${parentName}/${moduleName}/${moduleName}.repository.ts`,
    repositoryContent,
    'utf8',
  );

  console.log('GENERATING CONTROLLER');
  let controllerContent = fs.readFileSync(`${__dirname}/templates/template.controller.ts`, 'utf8');
  controllerContent = controllerContent.replace(/moduleName/g, moduleName);
  controllerContent = controllerContent.replace(/repositoryName/g, repositoryName);
  controllerContent = controllerContent.replace(/titleName/g, titleName);
  controllerContent = controllerContent.replace(/controllerName/g, controllerName);
  fs.writeFileSync(
    `${CURR_DIR}/src/modules/${parentName}/${moduleName}/${moduleName}.controller.ts`,
    controllerContent,
    'utf8',
  );

  console.log('GENERATING MIGRATION');
  let migrationContent = fs.readFileSync(`${__dirname}/templates/migration.js`, 'utf8');
  migrationContent = migrationContent.replace(/tableName/g, tableName);
  fs.writeFileSync(
    `${CURR_DIR}/migrations/${moment()
      .format()
      .replace(/\D/g, '')}-create-${tableName}-table.js`,
    migrationContent,
    'utf8',
  );
});
