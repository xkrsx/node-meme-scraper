import chalk from 'chalk';
import fs from 'fs-extra';
import https from 'https';

const path = './memes';
const link = 'https://api.memegen.link/images/';
const foundData = [];

async function mkdir (dir) {
	try {
		await fs.ensureDir(dir)
    console.log(chalk.green(`Folder '${dir}' has been successfully created!`))
  } catch (err) {
		console.error(chalk.red(err))
  }
}

const processFetchedImage = async (data) => {
let count = '01';

await data.slice([0], [10]).forEach((item, i) => {
	foundData.push(item.url)
})

foundData.forEach((item) => {
		https.get(item,(res) => { 
			const fileName = `0${count++}.png`;
			const filePath = fs.createWriteStream(`${path}/${fileName}`); 
			res.pipe(filePath); 
			filePath.on('finish',() => { 
					filePath.close(); 
					console.log(chalk.green(`File ${fileName} has been successfully created!`))
			})		
		})
	})
		
}

const fetchImages = async () => {
  try {
    const res = await fetch(link);
    const data = await res.json();
    await processFetchedImage(data)
  } catch (error) {
    console.log(chalk.red('Error has occurred'), error);
  }
};

fetchImages();
mkdir(path);