import fs from 'fs/promises';

const create = async () => {
  const filePath = './src/fs/files/fresh.txt';
  
  const fileExists = async () => {
    try {
      await fs.access(filePath);
      return true;  
    } catch (error) {
      if (error.code === 'ENOENT')  // File does not exist
        return false;
      throw error;  
    }
  };

  const writeFile = async () => {
    try {
      await fs.writeFile(filePath, 'I am fresh and young', { flag: 'wx' }); //wx prevents data loss
      console.log('File has been created successfully');
    } catch (error) {
      throw error;
    }
  };

  const exists = await fileExists();
  if (exists) {
    throw new Error('FS operation failed');
  }
  await writeFile();
};

(async () => {
  try {
    await create();
  } catch (error) {
    console.error(error.message);
  }
})();