import Product from '../models/ProductModel.js';
import path from 'path';
import fs from 'fs';

export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({ where: { id: req.params.id } });
    if (!response) return res.status(404).json({ msg: 'Product Not Found' });
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const saveProduct = async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ msg: 'No File Uploaded' });
  }

  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get('host')}/books/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg', '.pdf'];

  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({ msg: 'Invalid File Type' });
  }
  if (fileSize > 100000000) {
    return res.status(422).json({ msg: 'File must be less than 5 MB' });
  }

  // Ensure folders exist
  const booksPath = './public/books/';
  const thumbnailsPath = './public/thumbnails/';
  if (!fs.existsSync(booksPath)) fs.mkdirSync(booksPath, { recursive: true });
  if (!fs.existsSync(thumbnailsPath))
    fs.mkdirSync(thumbnailsPath, { recursive: true });

  try {
    await file.mv(`./public/books/${fileName}`);
    let thumbnailUrl = '';

    if (req.files.thumbnail) {
      const thumb = req.files.thumbnail;
      const thumbExt = path.extname(thumb.name);
      const thumbName = file.md5 + thumbExt;
      thumbnailUrl = `${req.protocol}://${req.get(
        'host',
      )}/thumbnails/${thumbName}`;
      await thumb.mv(`./public/thumbnails/${thumbName}`);
    }

    await Product.create({
      name,
      book: fileName,
      url,
      thumbnail: thumbnailUrl,
    });
    res.status(201).json({ msg: 'Product Created Successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) return res.status(404).json({ msg: 'No Data Found' });

    let fileName = product.book;
    let thumbnailUrl = product.thumbnail;

    if (req.files && req.files.file) {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = ['.pdf'];

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: 'Invalid File Type' });
      }
      if (fileSize > 5000000) {
        return res.status(422).json({ msg: 'File must be less than 5 MB' });
      }

      const filePath = `./public/books/${product.book}`;
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      await file.mv(`./public/books/${fileName}`);
    }

    if (req.files && req.files.thumbnail) {
      const thumb = req.files.thumbnail;
      const thumbExt = path.extname(thumb.name);
      const thumbName = fileName.split('.')[0] + thumbExt;
      thumbnailUrl = `${req.protocol}://${req.get(
        'host',
      )}/thumbnails/${thumbName}`;

      const thumbPath = `./public/thumbnails/${path.basename(
        product.thumbnail,
      )}`;
      if (product.thumbnail && fs.existsSync(thumbPath))
        fs.unlinkSync(thumbPath);
      await thumb.mv(`./public/thumbnails/${thumbName}`);
    }

    const name = req.body.title;
    const url = `${req.protocol}://${req.get('host')}/books/${fileName}`;

    await Product.update(
      { name, book: fileName, url, thumbnail: thumbnailUrl },
      { where: { id: req.params.id } },
    );
    res.status(200).json({ msg: 'Product Updated Successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) return res.status(404).json({ msg: 'No Data Found' });

    // Delete book file
    const filePath = `./public/books/${product.book}`;
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    // Delete thumbnail file (only if exists)
    if (product.thumbnail) {
      const thumbName = path.basename(product.thumbnail); // Extract filename
      const thumbPath = `./public/thumbnails/${thumbName}`;
      if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
    }

    await Product.destroy({ where: { id: req.params.id } });
    res.status(200).json({ msg: 'Product Deleted Successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// export const getProducts = async (req, res) => {
//   try {
//     const response = await Product.findAll();
//     res.json(response);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const getProductById = async (req, res) => {
//   try {
//     const response = await Product.findOne({
//       where: {
//         id: req.params.id,
//       },
//     });
//     res.json(response);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const saveProduct = (req, res) => {
//   if (req.files === null)
//     return res.status(400).json({ msg: 'No File Uploaded' });
//   const name = req.body.title;
//   const file = req.files.file;
//   const fileSize = file.data.length;
//   const ext = path.extname(file.name);
//   const fileName = file.md5 + ext;
//   const url = `${req.protocol}://${req.get('host')}/books/${fileName}`;
//   const allowedType = ['.png', '.jpg', '.jpeg', '.pdf'];

//   if (!allowedType.includes(ext.toLowerCase()))
//     return res.status(422).json({ msg: 'Invalid Books' });
//   if (fileSize > 5000000)
//     return res.status(422).json({ msg: 'Books must be less than 5 MB' });

//   file.mv(`./public/books/${fileName}`, async (err) => {
//     if (err) return res.status(500).json({ msg: err.message });
//     let thumbnailUrl = '';
//     if (req.files.thumbnail) {
//       // ✅ Jika ada thumbnail yang di-upload
//       const thumb = req.files.thumbnail;
//       const thumbExt = path.extname(thumb.name);
//       const thumbName = file.md5 + ext;
//       thumbnailUrl = `${req.protocol}://${req.get(
//         'host',
//       )}/thumbnails/${thumbName}`;

//       thumb.mv(`./public/thumbnails/${thumbName}`, (err) => {
//         if (err) return res.status(500).json({ msg: err.message });
//       });
//     }

//     try {
//       await Product.create({
//         name: name,
//         book: fileName,
//         url: url,
//         thumbnail: thumbnailUrl,
//       });
//       res.status(201).json({ msg: 'Product Created Successfuly' });
//     } catch (error) {
//       console.log(error.message);
//     }
//   });
// };

// export const updateProduct = async (req, res) => {
//   const product = await Product.findOne({
//     where: {
//       id: req.params.id,
//     },
//   });
//   if (!product) return res.status(404).json({ msg: 'No Data Found' });

//   let fileName = '';
//   if (req.files === null) {
//     fileName = product.book;
//   } else {
//     const file = req.files.file;
//     const fileSize = file.data.length;
//     const ext = path.extname(file.name);
//     fileName = file.md5 + ext;
//     const allowedType = ['.pdf'];

//     if (!allowedType.includes(ext.toLowerCase()))
//       return res.status(422).json({ msg: 'Invalid Books' });
//     if (fileSize > 5000000)
//       return res.status(422).json({ msg: 'Book must be less than 5 MB' });

//     const filepath = `./public/books/${product.book}`;
//     fs.unlinkSync(filepath);

//     file.mv(`./public/books/${fileName}`, (err) => {
//       if (err) return res.status(500).json({ msg: err.message });
//     });
//   }
//   const name = req.body.title;
//   const url = `${req.protocol}://${req.get('host')}/books/${fileName}`;

//   try {
//     await Product.update(
//       { name: name, book: fileName, url: url },
//       {
//         where: {
//           id: req.params.id,
//         },
//       },
//     );
//     res.status(200).json({ msg: 'Product Updated Successfuly' });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const deleteProduct = async (req, res) => {
//   const product = await Product.findOne({
//     where: {
//       id: req.params.id,
//     },
//   });
//   if (!product) return res.status(404).json({ msg: 'No Data Found' });

//   try {
//     const filepath = `./public/books/${product.book}`;
//     if (fs.existsSync(filepath)) {
//       fs.unlinkSync(filepath);
//     }

//     const thumbnailPath = `./public/thumbnails/${product.thumbnail}`;
//     if (product.thumbnail && fs.existsSync(thumbnailPath)) {
//       fs.unlinkSync(thumbnailPath);
//     }
//     await Product.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     res.status(200).json({ msg: 'Product Deleted Successfully' });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
