import {
  request,
  summary,
  body,
  tags,
  prefix,
  path,
  description
} from 'koa-swagger-decorator'

const tag = tags(['文章管理'])

const articalSchema = {
  title: { type: 'string', required: true, description: '标题' },
  author: { type: 'string', required: true, description: '作者' },
  body: { type: 'string', required: true, description: '内容' }
}

@prefix('/artical')
export default class ArticalRouter {
  @request('POST', '')
  @summary('文章新增')
  @description('example of api')
  @tag
  @body(articalSchema)
  static async addOne(ctx) {
    const { title, author, body } = ctx.validatedBody
    const ArticalModel = ctx.model('artical')

    try {
      const artical = new ArticalModel({
        title,
        author,
        body
      })
      await artical.save()
      ctx.success(artical.toJSON())
    } catch (err) {
      ctx.fail(err.message)
    }
  }

  @request('delete', '/{id}')
  @summary('文章删除')
  @tag
  @path({ id: { type: 'string', required: true } })
  static async deleteOne(ctx) {
    const { id } = ctx.validatedParams
    const ArticalModel = ctx.model('artical')

    try {
      await ArticalModel.findByIdAndRemove(id)
      ctx.success()
    } catch (err) {
      ctx.fail(err.message)
    }
  }

  @request('put', '/{id}')
  @summary('文章修改')
  @tag
  @path({ id: { type: 'string', required: true } })
  @body({ body: { type: 'string', required: true } })
  static async modifyOne(ctx) {
    const { id } = ctx.validatedParams
    const { body } = ctx.validatedBody
    const ArticalModel = ctx.model('artical')

    try {
      const artical = await ArticalModel.findById(id)
      artical.set({ body })

      await artical.save()
      ctx.success()
    } catch (err) {
      ctx.fail(err.message)
    }
  }

  @request('put', 'opt/{id}')
  @summary('赞/踩')
  @tag
  @path({ id: { type: 'string', required: true } })
  @body({
    flag: { type: 'boolean', required: true, default: undefined },
    optId: { type: 'string', required: true }
  })
  static async opt(ctx) {
    const { id } = ctx.validatedParams
    const { flag, optId } = ctx.validatedBody
    const ArticalModel = ctx.model('artical')

    try {
      const artical = await ArticalModel.findById(id)
      const index = artical.opts.find(item => item.optId === optId)
      if (index !== -1) {
        if (typeof flag !== 'boolean') {
          artical.opts.splice(index, 1)
        } else {
          artical.opts[index].flag = flag
        }
      } else {
        artical.opts.push({
          flag,
          optId
        })
      }
      await artical.save()
      ctx.success()
    } catch (err) {
      ctx.fail(err.message)
    }
  }

  @request('get', '')
  @summary('文章列表')
  @tag
  static async getAll(ctx) {
    const ArticalModel = ctx.model('artical')
    const articals = await ArticalModel.find({})

    if (articals) {
      ctx.success(articals)
    } else {
      ctx.fail(500, '服务器错误')
    }
  }

  @request('get', '/{id}')
  @summary('文章详情')
  @tag
  @path({ id: { type: 'string', required: true } })
  static async getOne(ctx) {
    const { id } = ctx.validatedParams
    const ArticalModel = ctx.model('artical')
    const artical = await ArticalModel.findById(id)

    if (!artical) {
      ctx.fail('文章不存在！')
    } else {
      ctx.success(artical.toJSON())
    }
  }
}
