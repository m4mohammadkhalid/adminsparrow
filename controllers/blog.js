const Blog = require("../models/blog");
const Category = require("../models/category");
const Tag = require("../models/tag");
const formidable = require("formidable");
const slugify = require("slugify");
const { stripHtml } = require("string-strip-html");
const _ = require("lodash");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { smartTrim } = require("../helpers/blog");

exports.create = (request, response) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(request, (err, fields, files) => {
    if (err) {
      return response.status(400).json({
        error: "Image Could Not Uploads",
      });
    }
    const { title, body, categories, tags } = fields;

    if (!title || !title.length) {
      return response.status(400).json({
        error: "title is required",
      });
    }

    if (!body || body.length < 200) {
      return response.status(400).json({
        error: "Content is too short",
      });
    }

    if (!categories || categories.length === 0) {
      return response.status(400).json({
        error: "At least one category is required",
      });
    }

    if (!tags || tags.length === 0) {
      return response.status(400).json({
        error: "At least one tag is required",
      });
    }

    let blog = new Blog();
    blog.title = title;
    blog.excerpt = smartTrim(body, 320, " ", " ...");
    blog.body = body;
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    blog.mdesc = stripHtml(body.substring(0, 160)).result;
    blog.postedBy = request.user._id;

    //TODO categories and tags Error

    let arrayOfCategories = categories && categories.split(",");
    let arrayOfTags = tags && tags.split(",");

    //! 10000000 bites
    if (files.photo) {
      if (files.photo.size > 10000000) {
        return response.status(400).json({
          error: "Image Should be less then 1mb in sizes",
        });
      }
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }

    blog.save((err, result) => {
      if (err) {
        return response.status(400).json({
          error: errorHandler(err),
        });
      }
      //!  response.json(result)

      Blog.findByIdAndUpdate(
        result._id,
        { $push: { categories: arrayOfCategories } },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return response.status(400).json({
            error: errorHandler(err),
          });
        } else {
          Blog.findByIdAndUpdate(
            result._id,
            { $push: { tags: arrayOfTags } },
            { new: true }
          ).exec((err, result) => {
            if (err) {
              return response.status(400).json({
                error: errorHandler(err),
              });
            } else {
              response.json(result);
            }
          });
        }
      });
    });
  });
};

exports.list = (request, response) => {
  Blog.find({})
    .populate("categories", "_id name slug")
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username")
    .select(
      "_id title slug excerpt categories tags postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return response.json({
          error: errorHandler(err),
        });
      }

      response.json({
        blogs: data,
      });
    });
};

exports.listAllBlogsCategoriesTags = (request, response) => {
  let limit = request.body.limit ? parseInt(request.body.limit) : 10
  let skip = request.body.skip ? parseInt(request.body.skip) : 0

  let blogs
  let categories
  let tags
  Blog.find({})
    .populate("categories",'_id name slug')
    .populate("tags", "_id name slug")
    .populate("postedBy", "_id name username profile")
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit)
    .select("_id title slug excerpt categories tags postedBy createdAt updatedAt")
    .exec((err, data) => {
      if (err) {
        return response.json({
          error: errorHandler(err),
        });
      }
    blogs= data     
      Category.find({}).exec((err, c) => {
        if (err) {
          return response.json({
            error: errorHandler(err)
          });
        }
        categories = c;
        Tag.find({}).exec((err, t) => {
          if (err) {
            return response.json({
              error: errorHandler(err)
            });
          }
          tags = t;
          response.json({ blogs, categories, tags, size: blogs.length });
        });
      });
    });
};


exports.read=(request, response)=>{
  const slug = request.params.slug.toLowerCase();
  Blog.findOne({slug})
  .populate("categories",'_id name slug')
  .populate("tags", "_id name slug")
  .populate("postedBy", "_id name username")
  .select("_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt")
  .exec((err, data)=>{
    if (err) {
      return response.json({
        error: errorHandler(err)
      });
    }
    response.json(data)
  })

}


exports.remove=(request, response)=>{
  const slug = request.params.slug.toLowerCase();
  Blog.findOneAndRemove({slug})
  .exec((err)=>{
    if (err) {
      return response.json({
        error: errorHandler(err)
      });
    }
    response.json({ 
      message: 'Blog Delete Success'
    })
  })

}
