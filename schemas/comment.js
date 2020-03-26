export default ({ Schema }) =>
  new Schema(
    {
      author: {
        type: Schema.Types.ObjectId,
        required: [true, '标题不能为空']
      },
      body: {
        type: String,
        required: [true, '内容不能为空']
      },
      parentId: {
        type: Schema.Types.ObjectId,
        required: true
      },
      floor: {
        type: Number,
        required: true,
        min: 1
      },
      opts: [
        {
          optId: {
            type: Schema.Types.ObjectId
          },
          flag: {
            type: Boolean
          }
        }
      ],
      level: {
        type: Boolean,
        required: true
      }
    },
    {
      collection: 'comments',
      timestamps: true
    }
  )
