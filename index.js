import chalk from 'chalk';
import fs from 'fs-extra';

const path = './memes';
const link = 'https://api.memegen.link/images/';
let customLink;

async function mkdir (dir) {

	try {
		await fs.ensureDir(dir)
    console.log(chalk.green(`Folder '${dir}' has been successfully created!`))
  } catch (err) {
		console.error(chalk.red(err))
  }
}
mkdir(path);

const processFetchedImage = async (data) => {
let foundData = [];
data.slice([0], [10]).forEach((item, i) => {
	foundData.push(item.url)
})

  if (!foundData) {
    throw new Error('No images were found.');
  }
// console.log(foundData)

foundData.forEach((item) => {
	async function example (item) {
		try {
			await fs.ensureFile(item)
			console.log(chalk.green(`File '${item}' has been successfully created!`))
		} catch (err) {
			console.error(err)
		}
	}
	
	example(item)
})


}

const fetchImages = async () => {
  try {
    const res = await fetch(link);
    const data = await res.json();
    await processFetchedImage(data);
  } catch (error) {
    console.log('Error has occurred', error);
  }
};

fetchImages()
