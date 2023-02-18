import PostModel from '../models/PostModel.js';
import { urlTitle } from '../helpers/Function.js';

export const getPost = async (req, res) => {
  try {
    const post = await PostModel.findAll({
      order: [['id', 'DESC']],
    });

    return res.status(200).json({ status: 200, data: post });
  } catch (e) {
    return res.status(500).json({ status: 500, data: e?.message });
  }
};

export const getPostByType = async (req, res) => {
  try {
    const isFeatured = req.query.isFeatured;
    let post = [];

    if (isFeatured == 'true') {
      post = await PostModel.findAll({
        where: {
          type: req.params.type,
          isFeatured: true,
        },
        order: [['id', 'DESC']],
      });
    } else {
      post = await PostModel.findAll({
        where: {
          type: req.params.type,
        },
        order: [['id', 'DESC']],
      });
    }

    // if (!post || post.length == 0) {
    //   return res.status(404).json({ status: 404, data: 'Post not found' });
    // }

    return res.status(200).json({ status: 200, data: post });
  } catch (e) {
    return res.status(500).json({ status: 500, data: e?.message });
  }
};

export const createPost = async (req, res) => {
  const {
    title,
    type,
    image,
    stack,
    isFeatured,
    preview,
    source_code,
    status,
  } = req.body;

  try {
    await PostModel.create({
      title,
      slug: urlTitle(title),
      type,
      image,
      stack,
      isFeatured,
      preview,
      source_code,
      status,
      user_id: req.dataUser.id,
    });

    return res.status(201).json({ status: 200, data: 'Post created' });
  } catch (e) {
    return res.status(400).json({ status: 400, data: e?.message });
  }
};

export const updatePost = async (req, res) => {
  const post = await PostModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!post) {
    return res.status(404).json({ status: 404, data: 'Post not found' });
  }

  if (post.user_id != req.dataUser.id) {
    return res.status(403).json({ status: 403, data: 'Acces Forbidden' });
  }

  const {
    title = post.title,
    slug = post.slug,
    type = post.type,
    image = post.image,
    stack = post.stack,
    isFeatured = post.isFeatured,
    preview = post.preview,
    source_code = post.source_code,
    status = post.status,
    user_id = post.user_id,
  } = req.body;

  try {
    await PostModel.update(
      {
        title,
        slug,
        type,
        image,
        stack,
        isFeatured,
        preview,
        source_code,
        status,
        user_id,
      },
      {
        where: {
          id: post.id,
        },
      }
    );

    res.status(200).json({ status: 200, data: 'Post updated' });
  } catch (e) {
    res.status(400).json({ status: 400, data: e?.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const status = await PostModel.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (status) {
      return res.status(200).json({ status: 200, data: 'Post deleted' });
    } else {
      return res.status(404).json({ status: 404, data: 'Post not found' });
    }
  } catch (e) {
    res.status(500).json({ status: 500, data: e?.message });
  }
};
