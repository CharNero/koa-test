import {
  request,
  summary,
  body,
  tags,
  prefix,
  path,
  description
} from 'koa-swagger-decorator'

const tag = tags(['评论管理'])

const commentSchema = {
  parentId: { type: 'string', required: true, description: '文章ID' },
  author: { type: 'string', required: true, description: '作者' },
  body: { type: 'string', required: true, description: '内容' },
  floor: { type: 'number', required: true, description: '楼层' },
  level: {
    type: 'boolean',
    required: true,
    description: 'true: 顶楼, false: 楼中楼'
  }
}

@prefix('/comment')
export default class CommentRouter {
  @request('POST', '')
  @summary('评论新增')
  @description('example of api')
  @tag
  @body(commentSchema)
  static async addOne(ctx) {
    const { parentId, floor, author, body, level } = ctx.validatedBody

    try {
      const CommentModel = ctx.model('comment')
      const comment = new CommentModel({
        parentId,
        floor,
        author,
        body,
        level
      })

      const ParentModel = ctx.model(level ? 'artical' : 'comment')
      const parent = await ParentModel.findById(parentId)

      console.log('parent: ', parent)
      ctx.assert(parent, 400, `该${level ? '文章' : '评论'}不存在或已删除！`)

      await comment.save()
      ctx.success(comment.toJSON())
    } catch (err) {
      ctx.fail(err.message)
    }
  }

  @request('delete', '/{id}')
  @summary('评论删除')
  @tag
  @path({ id: { type: 'string', required: true } })
  static async deleteOne(ctx) {
    const { id } = ctx.validatedParams
    const CommentModel = ctx.model('comment')

    try {
      await CommentModel.findByIdAndRemove(id)
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
    const CommentModel = ctx.model('comment')

    try {
      const comment = await CommentModel.findById(id)
      const index = comment.opts.find(item => item.optId === optId)
      if (index !== -1) {
        if (typeof flag !== 'boolean') {
          comment.opts.splice(index, 1)
        } else {
          comment.opts[index].flag = flag
        }
      } else {
        comment.opts.push({
          flag,
          optId
        })
      }
      await comment.save()
      ctx.success()
    } catch (err) {
      ctx.fail(err.message)
    }
  }

  @request('get', '/{parentId}')
  @summary('评论列表')
  @tag
  @path({ parentId: { type: 'string', required: true } })
  static async getAll(ctx) {
    const { parentId } = ctx.validatedParams
    const CommentModel = ctx.model('comment')
    const comments = await CommentModel.find({ parentId })

    if (comments) {
      ctx.success(comments)
    } else {
      ctx.fail()
    }
  }
}
