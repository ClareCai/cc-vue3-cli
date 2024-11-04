#!/usr/bin/env node

import { replaceInFile } from 'replace-in-file'
import inquirer from 'inquirer'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { exec } from 'child_process'

// 获取 __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 获取命令行参数
const args = process.argv.slice(2)
const projectNameFromArgs = args[0]

async function createProject(projectName) {
	const projectPath = path.join(process.cwd(), projectName)

	// 创建项目目录
	await fs.ensureDir(projectPath)

	// 复制模板文件到项目目录
	const templatePath = path.join(__dirname, 'template')
	await fs.copy(templatePath, projectPath)

	// 替换占位符
	const options = {
		files: path.join(projectPath, 'package.json'),
		from: /{{projectName}}/g,
		to: projectName
	}
	const optionsIndex = {
		files: path.join(projectPath, 'index.html'),
		from: /{{projectName}}/g,
		to: projectName
	}

	await replaceInFile(options)
	await replaceInFile(optionsIndex)

	// 重命名 _gitignore 为 .gitignore
	const gitignorePath = path.join(projectPath, '_gitignore')
	const newGitignorePath = path.join(projectPath, '.gitignore')
    
	await fs.rename(gitignorePath, newGitignorePath);

	// 初始化 Git 仓库
	await new Promise((resolve, reject) => {
		exec('git init', { cwd: projectPath }, (error, stdout, stderr) => {
			if (error) {
				reject(`Error initializing git: ${stderr}`)
			} else {
				console.log(`Git repository initialized in ${projectPath}`)
				resolve(stdout)
			}
		})
	})

	console.log(`项目 ${projectName} 创建成功！`)
}

async function run() {
	// 如果没有提供项目名称，则询问用户
	const projectName =
		projectNameFromArgs ||
		(
			await inquirer.prompt([
				{
					type: 'input',
					name: 'projectName',
					message: '请输入项目名称:',
					default: 'my-vue3-app'
				}
			])
		).projectName

	console.log(`项目 ${projectName} 创建中...`)
	await createProject(projectName)
}

run().catch(err => {
	console.error(err)
})
